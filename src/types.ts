/**
 * Contratos de datos compartidos entre la interfaz y los servicios.
 */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface OrcidWork {
  id: string;
  title: string;
  journal?: string;
  publicationDate: {
    year: string;
    month?: string;
    day?: string;
  };
  type: string;
  doi?: string;
  url?: string;
  citation?: string;
  contributors?: string[];
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  technologies: {
    name: string;
    category?: string;
    level?: 'Avanzado' | 'Intermedio' | 'Especialista';
  }[];
  color: string;
}

export type ThemeMode = 'light' | 'dark';

export interface PrehistoricCreature {
  id: string;
  name: string;
  period: string;
  diet: string;
  funFact: string;
  icon: string;
}

export interface AstronomyObject {
  id: string;
  name: string;
  type: string;
  distance?: string;
  shortDescription: string;
  facts: [string, string, string, string];
}
