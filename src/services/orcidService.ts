/**
 * Consulta trabajos públicos de ORCID y conserva una caché local breve.
 */

import type { OrcidWork } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

const ORCID_ID = PERSONAL_INFO.orcidId;
const CACHE_KEY = `orcid_works_${ORCID_ID}`;
const CACHE_DURATION = 30 * 60 * 1000;
const REQUEST_TIMEOUT = 8_000;

interface OrcidApiResponse {
  group: OrcidGroup[];
}

interface OrcidGroup {
  'work-summary'?: OrcidWorkSummary[];
}

interface OrcidWorkSummary {
  'put-code'?: number;
  title?: { title?: { value?: string } };
  type?: string;
  'journal-title'?: { value?: string };
  'publication-date'?: {
    year?: { value?: string };
    month?: { value?: string };
    day?: { value?: string };
  };
  'external-ids'?: {
    'external-id'?: Array<{
      'external-id-type'?: string;
      'external-id-value'?: string;
      'external-id-url'?: { value?: string };
    }>;
  };
  url?: { value?: string };
}

interface CachedWorks {
  timestamp: number;
  data: OrcidWork[];
}

export interface FetchOrcidResult {
  works: OrcidWork[];
  source: 'live' | 'cache' | 'none';
  orcidId: string;
  url: string;
  error?: string;
}

export async function fetchOrcidWorks(): Promise<FetchOrcidResult> {
  try {
    const response = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`ORCID API HTTP ${response.status}`);
    }

    const json: unknown = await response.json();
    if (!isOrcidResponse(json)) {
      throw new Error('Respuesta inesperada de ORCID.');
    }

    const works = json.group
      .map(parseWork)
      .filter((work): work is OrcidWork => work !== null);

    if (works.length > 0) {
      saveCache(works);
    }

    return {
      works,
      source: 'live',
      orcidId: ORCID_ID,
      url: PERSONAL_INFO.orcidUrl,
    };
  } catch {
    // Si ORCID no responde, se intenta recuperar la información reciente.
  }

  const cachedWorks = readCache();
  if (cachedWorks.length > 0) {
    return {
      works: cachedWorks,
      source: 'cache',
      orcidId: ORCID_ID,
      url: PERSONAL_INFO.orcidUrl,
    };
  }

  return {
    works: [],
    source: 'none',
    orcidId: ORCID_ID,
    url: PERSONAL_INFO.orcidUrl,
    error: 'No fue posible cargar las publicaciones desde ORCID.',
  };
}

function isOrcidResponse(value: unknown): value is OrcidApiResponse {
  if (!value || typeof value !== 'object') return false;
  const response = value as Record<string, unknown>;
  return Array.isArray(response.group);
}

function parseWork(group: OrcidGroup): OrcidWork | null {
  const summary = group['work-summary']?.[0];
  if (!summary) return null;

  const title = summary.title?.title?.value?.trim();
  const putCode = summary['put-code'];

  // Descarta registros incompletos antes de mostrarlos.
  if (!title || typeof putCode !== 'number') return null;

  const publicationDate = summary['publication-date'];
  const year = publicationDate?.year?.value;
  const month = publicationDate?.month?.value;
  const day = publicationDate?.day?.value;

  const doi = findDoi(summary);
  const url = summary.url?.value?.trim() || (doi ? toDoiUrl(doi) : undefined);
  const journal = summary['journal-title']?.value?.trim();

  return {
    id: String(putCode),
    title,
    journal: journal || undefined,
    type: formatWorkType(summary.type),
    publicationDate: {
      year: year || '',
      month,
      day,
    },
    doi: doi || undefined,
    url,
    contributors: [PERSONAL_INFO.name],
    citation: buildCitation(title, year, journal),
  };
}

function findDoi(summary: OrcidWorkSummary): string | undefined {
  const externalIds = summary['external-ids']?.['external-id'] ?? [];
  const doi = externalIds.find(
    (externalId) => externalId['external-id-type']?.toLowerCase() === 'doi',
  );

  return doi?.['external-id-value']?.trim() || doi?.['external-id-url']?.value?.trim();
}

function toDoiUrl(doi: string): string {
  return doi.startsWith('http') ? doi : `https://doi.org/${doi}`;
}

function buildCitation(title: string, year?: string, journal?: string): string {
  const author = PERSONAL_INFO.name;
  const date = year ? ` (${year})` : '';
  const source = journal ? ` ${journal}.` : '';
  return `${author}${date}. ${title}.${source}`;
}

function saveCache(works: OrcidWork[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: works }),
    );
  } catch {
    // La caché es opcional; la consulta en vivo sigue funcionando.
  }
}

function readCache(): OrcidWork[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return [];

    const cached: unknown = JSON.parse(raw);
    if (!isCachedWorks(cached)) return [];

    return Date.now() - cached.timestamp < CACHE_DURATION ? cached.data : [];
  } catch {
    return [];
  }
}

function isCachedWorks(value: unknown): value is CachedWorks {
  if (!value || typeof value !== 'object') return false;
  const cache = value as Record<string, unknown>;

  return (
    typeof cache.timestamp === 'number' &&
    Array.isArray(cache.data) &&
    cache.data.every(isOrcidWork)
  );
}

function isOrcidWork(value: unknown): value is OrcidWork {
  if (!value || typeof value !== 'object') return false;
  const work = value as Record<string, unknown>;

  return (
    typeof work.id === 'string' &&
    typeof work.title === 'string' &&
    typeof work.type === 'string' &&
    typeof work.publicationDate === 'object' &&
    work.publicationDate !== null
  );
}

function formatWorkType(rawType?: string): string {
  if (!rawType) return 'Producción académica';

  const normalized = rawType.toLowerCase().replace(/_/g, '-');
  if (
    normalized === 'journal-article' ||
    normalized.includes('journal') ||
    normalized.includes('article')
  ) {
    return 'Artículo de revista';
  }

  const typeMap: Record<string, string> = {
    'conference-paper': 'Ponencia técnica',
    'book-chapter': 'Capítulo de libro',
    report: 'Informe técnico',
    preprint: 'Documento de trabajo',
    other: 'Producción académica',
  };

  return typeMap[normalized] || rawType;
}
