/**
 * Integra GitHub, normaliza repositorios y conserva una caché local breve.
 */

import type { GitHubRepo } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

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

    const repos = data
      .filter(isGitHubApiRepo)
      .map(normalizeRepo)
      .sort(compareByUpdatedAt);

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

function normalizeRepo(repo: GitHubApiRepo): GitHubRepo {
  const language = normalizeLanguage(repo.language);

  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    language,
    topics: Array.isArray(repo.topics) ? repo.topics.filter(Boolean) : [],
    updated_at: repo.updated_at,
  };
}

function normalizeLanguage(language: string | null): string | null {
  const value = language?.trim();
  return !value || value.toLowerCase() === 'plain text' ? 'Otros' : value;
}

function compareByUpdatedAt(a: GitHubRepo, b: GitHubRepo): number {
  return Date.parse(b.updated_at) - Date.parse(a.updated_at);
}

function extractLanguages(repos: GitHubRepo[]): string[] {
  return [...new Set(repos.map((repo) => repo.language).filter(Boolean))] as string[];
}

function saveCache(repos: GitHubRepo[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: repos }),
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

    const isFresh = Date.now() - cached.timestamp < CACHE_DURATION;
    return isFresh ? cached.data.map(normalizeCachedRepo) : [];
  } catch {
    return [];
  }
}

function isCachedRepos(value: unknown): value is CachedRepos {
  if (!value || typeof value !== 'object') return false;

  const cache = value as Record<string, unknown>;
  return (
    typeof cache.timestamp === 'number' &&
    Array.isArray(cache.data) &&
    cache.data.every(isCachedRepo)
  );
}

function isCachedRepo(value: unknown): value is GitHubRepo {
  if (!value || typeof value !== 'object') return false;

  const repo = value as Record<string, unknown>;
  return (
    typeof repo.id === 'number' &&
    typeof repo.name === 'string' &&
    typeof repo.html_url === 'string' &&
    typeof repo.updated_at === 'string'
  );
}

function normalizeCachedRepo(repo: GitHubRepo): GitHubRepo {
  return {
    ...repo,
    description: repo.description ?? null,
    homepage: repo.homepage ?? null,
    language: normalizeLanguage(repo.language),
    topics: Array.isArray(repo.topics) ? repo.topics : [],
  };
}

/**
 * Convierte una fecha ISO en tiempo relativo para la interfaz.
 */
export function formatRelativeTime(dateString: string): string {
  const timestamp = Date.parse(dateString);
  if (Number.isNaN(timestamp)) return dateString;

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return 'hace un momento';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;

  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;

  const years = Math.floor(months / 12);
  return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
}

/**
 * Devuelve el color asociado al lenguaje del repositorio.
 */
export function getLanguageColor(language: string | null): string {
  switch (language?.toLowerCase()) {
    case 'typescript': return '#3178c6';
    case 'javascript': return '#f7df1e';
    case 'python': return '#3776ab';
    case 'r': return '#276dc3';
    case 'java': return '#b07219';
    case 'c#':
    case 'csharp': return '#178600';
    case 'c++':
    case 'cpp': return '#f34b7d';
    case 'php': return '#4f5d95';
    case 'html': return '#e34c26';
    case 'css': return '#563d7c';
    case 'shell':
    case 'bash': return '#89e051';
    default: return '#8b949e';
  }
}
