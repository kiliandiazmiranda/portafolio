// Modelos de datos compartidos entre frontend y servicios


// Estructura de un repositorio devuelto por la API de GitHub
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
  stargazers_count?: number;
  default_branch?: string;
  preview_url?: string | null;
}

// Categorización de habilidades y tecnologías del portafolio
export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  technologies: {
    name: string;
    category?: string;
  }[];
  color: string;
}

// Estado del tema visual de la aplicación
export type ThemeMode = 'light' | 'dark';

// Idiomas disponibles en la aplicación
export type Language = 'es' | 'en';

// Entidad para el modelo de datos de criaturas prehistóricas
export interface PrehistoricCreature {
  id: string;
  name: string;
  period: string;
  diet: string;
  funFact: string;
  icon: string;
}

// Entidad para el modelo de cuerpos y objetos astronómicos
export interface AstronomyObject {
  id: string;
  name: string;
  type: string;
  distance?: string;
  shortDescription: string;
  facts: [string, string, string, string];
}
