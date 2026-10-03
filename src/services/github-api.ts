// Servicio para consultar y normalizar repositorios de GitHub con cache local

import type { GitHubRepo } from '../types';
import { PERSONAL_INFO } from '../data/portfolio';

const GITHUB_USERNAME = PERSONAL_INFO.githubUser;
const CACHE_KEY = `github_repos_${GITHUB_USERNAME}`;
const CACHE_DURATION = 15 * 60 * 1000;
const REQUEST_TIMEOUT = 8_000;

interface GitHubApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
  stargazers_count?: number;
  default_branch?: string;
}

interface GitHubApiCommit {
  commit?: {
    author?: {
      date?: string;
    };
  };
}

interface CachedRepos {
  timestamp: number;
  data: GitHubRepo[];
}

export interface FetchReposResult {
  repos: GitHubRepo[];
  source: 'live' | 'cache' | 'none';
  languages: string[];
  error?: string;
}

const COMMON_PREVIEW_PATHS = [
  'assets/preview.PNG',
  'assets/preview.png',
  'assets/preview.jpg',
  'assets/preview.jpeg',
  'preview.png',
  'preview.PNG',
  'preview.jpg',
  'preview.JPG',
  'preview.jpeg',
  'images/preview.png',
  'images/preview.PNG',
  'images/preview.jpg',
  'img/preview.png',
  'img/preview.jpg',
  'docs/preview.png',
  'docs/preview.jpg',
];

// Detecta si el repositorio tiene una imagen de previsualización
export async function detectRepoPreviewImage(
  username: string,
  repoName: string,
  branch: string = 'main',
): Promise<string | null> {
  // 1. Intentar consultar árbol git en GitHub API
  try {
    const treeResponse = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/git/trees/${branch}?recursive=1`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(3500),
      },
    );

    if (treeResponse.ok) {
      const treeData: unknown = await treeResponse.json();

      if (
        treeData &&
        typeof treeData === 'object' &&
        Array.isArray((treeData as { tree?: unknown[] }).tree)
      ) {
        const treeItems = (
          treeData as { tree: { path?: string }[] }
        ).tree;

        const match = treeItems.find(
          (item) =>
            typeof item.path === 'string' &&
            /(^|\/)preview\.(png|jpg|jpeg)$/i.test(item.path),
        );

        if (match && typeof match.path === 'string') {
          return `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${match.path}`;
        }
      }
    }
  } catch {
    // Si la API falla o tiene rate limit, continuar con sondeo directo
  }

  // 2. Comprobación directa en raw.githubusercontent.com
  for (const relativePath of COMMON_PREVIEW_PATHS) {
    const testUrl = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${relativePath}`;

    try {
      const headRes = await fetch(testUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(1800),
      });

      if (headRes.ok) {
        return testUrl;
      }
    } catch {
      // Probar siguiente ruta
    }
  }

  return null;
}

export async function fetchGitHubRepos(): Promise<FetchReposResult> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Respuesta inesperada de GitHub.');
    }

    const repos = await Promise.all(
      data
        .filter(isGitHubApiRepo)
        .map(async (repo) => {
          const normalizedRepo = normalizeRepo(repo);

          const lastCommitDate = await getLastCommitDate(
            GITHUB_USERNAME,
            repo.name,
            repo.default_branch || 'main',
          );

          return {
            ...normalizedRepo,

            updated_at: lastCommitDate ?? repo.updated_at,
          };
        }),
    );

    // Ordenar exclusivamente por fecha del último commit.
    repos.sort(compareByUpdatedAt);

    saveCache(repos);

    return {
      repos,
      source: 'live',
      languages: extractLanguages(repos),
    };
  } catch {
    // Si GitHub no responde, se intenta recuperar la información reciente.
  }

  const cachedRepos = readCache();

  if (cachedRepos.length > 0) {
    return {
      repos: cachedRepos.sort(compareByUpdatedAt),
      source: 'cache',
      languages: extractLanguages(cachedRepos),
    };
  }

  return {
    repos: [],
    source: 'none',
    languages: [],
    error: 'No fue posible cargar los repositorios desde GitHub.',
  };
}

 // Obtiene exclusivamente la fecha del último commit de la rama principal del repositorio.
async function getLastCommitDate(
  username: string,
  repoName: string,
  branch: string = 'main',
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/commits?sha=${encodeURIComponent(branch)}&per_page=1`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const commit = data[0] as GitHubApiCommit;

    return commit.commit?.author?.date ?? null;
  } catch {
    return null;
  }
}

function isGitHubApiRepo(value: unknown): value is GitHubApiRepo {
  if (!value || typeof value !== 'object') return false;

  const repo = value as Record<string, unknown>;

  return (
    typeof repo.id === 'number' &&
    typeof repo.name === 'string' &&
    typeof repo.html_url === 'string' &&
    typeof repo.updated_at === 'string'
  );
}

const KNOWN_PREVIEWS: Record<string, string> = {
  organized:
    'https://raw.githubusercontent.com/KilianDiazMiranda/organized/main/assets/preview.PNG',
};

function normalizeRepo(repo: GitHubApiRepo): GitHubRepo {
  const language = normalizeLanguage(repo.language);
  const normalizedName = (repo.name || '').toLowerCase();
  const preview_url = KNOWN_PREVIEWS[normalizedName] || null;

  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    language,
    topics: Array.isArray(repo.topics)
      ? repo.topics.filter(Boolean)
      : [],
    updated_at: repo.updated_at,
    stargazers_count:
      typeof repo.stargazers_count === 'number'
        ? repo.stargazers_count
        : 0,
    default_branch: repo.default_branch || 'main',
    preview_url,
  };
}

function normalizeLanguage(language: string | null): string | null {
  const value = language?.trim();

  return !value || value.toLowerCase() === 'plain text'
    ? 'Otros'
    : value;
}

 // Ordena los repositorios exclusivamente por la fecha del último commit.
function compareByUpdatedAt(
  a: GitHubRepo,
  b: GitHubRepo,
): number {
  return Date.parse(b.updated_at) - Date.parse(a.updated_at);
}

function extractLanguages(repos: GitHubRepo[]): string[] {
  return [
    ...new Set(
      repos
        .map((repo) => repo.language)
        .filter(Boolean),
    ),
  ] as string[];
}

function saveCache(repos: GitHubRepo[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: repos,
      }),
    );
  } catch {
    // La caché no es necesaria para consultar la API.
  }
}

function readCache(): GitHubRepo[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY);

    if (!raw) return [];

    const cached: unknown = JSON.parse(raw);

    if (!isCachedRepos(cached)) return [];

    const isFresh =
      Date.now() - cached.timestamp < CACHE_DURATION;

    return isFresh
      ? cached.data.map(normalizeCachedRepo)
      : [];
  } catch {
    return [];
  }
}

function isCachedRepos(
  value: unknown,
): value is CachedRepos {
  if (!value || typeof value !== 'object') return false;

  const cache = value as Record<string, unknown>;

  return (
    typeof cache.timestamp === 'number' &&
    Array.isArray(cache.data) &&
    cache.data.every(isCachedRepo)
  );
}

function isCachedRepo(
  value: unknown,
): value is GitHubRepo {
  if (!value || typeof value !== 'object') return false;

  const repo = value as Record<string, unknown>;

  return (
    typeof repo.id === 'number' &&
    typeof repo.name === 'string' &&
    typeof repo.html_url === 'string' &&
    typeof repo.updated_at === 'string'
  );
}

function normalizeCachedRepo(
  repo: GitHubRepo,
): GitHubRepo {
  return {
    ...repo,
    description: repo.description ?? null,
    homepage: repo.homepage ?? null,
    language: normalizeLanguage(repo.language),
    topics: Array.isArray(repo.topics)
      ? repo.topics
      : [],
    stargazers_count:
      typeof repo.stargazers_count === 'number'
        ? repo.stargazers_count
        : 0,
    default_branch: repo.default_branch || 'main',
    preview_url: repo.preview_url ?? null,
  };
}

// Convierte una fecha ISO a formato relativo legible en español o inglés
export function formatRelativeTime(
  dateString: string,
  lang: 'es' | 'en' = 'es',
): string {
  const timestamp = Date.parse(dateString);

  if (Number.isNaN(timestamp)) return dateString;

  const seconds = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / 1000),
  );

  if (seconds < 60) return lang === 'es' ? 'hace un momento' : 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    if (lang === 'es') {
      return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    }
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    if (lang === 'es') {
      return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    if (lang === 'es') {
      return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    if (lang === 'es') {
      return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(months / 12);
  if (lang === 'es') {
    return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

// Retorna el color distintivo asociado al lenguaje de programación
export function getLanguageColor(
  language: string | null,
): string {
  switch (language?.toLowerCase()) {
    case 'typescript':
      return '#3178c6';

    case 'javascript':
      return '#f7df1e';

    case 'python':
      return '#3776ab';

    case 'r':
      return '#276dc3';

    case 'java':
      return '#b07219';

    case 'c#':
    case 'csharp':
      return '#178600';

    case 'c++':
    case 'cpp':
      return '#f34b7d';

    case 'php':
      return '#4f5d95';

    case 'html':
      return '#e34c26';

    case 'css':
      return '#563d7c';

    case 'shell':
    case 'bash':
      return '#89e051';

    default:
      return '#8b949e';
  }
}