/**
 * Muestra repositorios públicos de GitHub con búsqueda, filtros y paginación.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github,
  Clock,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Code2,
  ChevronLeft,
  ChevronRight,
  Globe,
  AlertCircle,
  RotateCw
} from 'lucide-react';
import { GitHubRepo } from '../types';
import {
  fetchGitHubRepos,
  formatRelativeTime,
  getLanguageColor,
  FetchReposResult
} from '../services/githubService';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DoodlePencil } from './EasterEggs/DoodleIcons';

const ITEMS_PER_PAGE = 4;

export const GithubReposSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'name'>('updated');
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const sectionRef = useRef<HTMLElement | null>(null);

  const scrollToSectionTop = () => {
    if (sectionRef.current) {
      const yOffset = -20;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToSectionTop();
  };

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const result: FetchReposResult = await fetchGitHubRepos();
      if (result.error && result.repos.length === 0) {
        setError(result.error);
        setRepos([]);
        setLanguagesList([]);
      } else {
        setRepos(result.repos);
        setLanguagesList(result.languages);
        setError(null);
      }
    } catch {
      setError('Se ha presentado un error al cargar los repositorios desde GitHub.');
      setRepos([]);
      setLanguagesList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  // Reiniciar a la primera página al alterar filtros o búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLanguage, sortBy]);

  const getLanguageCount = (lang: string) => {
    if (lang === 'all') return repos.length;
    return repos.filter((r) => r.language === lang).length;
  };

  // Filtra y ordena sin mutar la colección original.
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        if (selectedLanguage !== 'all' && repo.language !== selectedLanguage) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = repo.name.toLowerCase().includes(q);
          const matchDesc = (repo.description || '').toLowerCase().includes(q);
          const matchLang = (repo.language || '').toLowerCase().includes(q);
          const matchTopic = repo.topics.some((t) => t.toLowerCase().includes(q));
          return matchName || matchDesc || matchLang || matchTopic;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'updated') {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [repos, selectedLanguage, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredRepos.length);
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="proyectos" ref={sectionRef} className="py-14 sm:py-20 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Mis Repositorios
            </h2>

            <div className="hidden lg:flex items-center gap-1.5 rotate-[-2deg] select-none pointer-events-none text-neutral-700 dark:text-neutral-300">
              <span className="font-crayon text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span>* git status (api sync)</span>
                <DoodlePencil className="w-3.5 h-3.5 inline-block text-amber-600 dark:text-amber-400" />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 doodle-btn doodle-shadow-sm text-xs font-semibold text-neutral-50 dark:text-neutral-950 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white border-2 border-neutral-800 dark:border-neutral-200 transition-colors min-h-[36px]"
              id="github-profile-link"
              title="Ver perfil de GitHub de Kilian Diaz Miranda"
            >
              <Github className="w-3.5 h-3.5 shrink-0" />
              <span>{PERSONAL_INFO.githubUser}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70 shrink-0" />
            </a>
          </div>
        </div>

        {/* Los controles solo aparecen cuando hay datos disponibles. */}
        {!error && repos.length > 0 && (
          <div className="p-4 sm:p-5 doodle-box doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 mb-6 sm:mb-8 space-y-3.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="w-4.5 h-4.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="github-search"
                  name="github-search"
                  type="text"
                  placeholder="Buscar por nombre, tema o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 sm:py-2 doodle-input text-sm sm:text-base bg-white dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-700 text-neutral-950 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-emerald-500 min-h-[44px] sm:min-h-[40px] font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100 text-sm font-bold cursor-pointer p-1"
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-1 font-bold hidden md:inline-flex">
                  <SlidersHorizontal className="w-4 h-4" />
                  Ordenar por:
                </span>
                <div className="inline-flex w-full sm:w-auto doodle-box p-1 bg-neutral-200/80 dark:bg-neutral-800 text-xs sm:text-sm border-2 border-neutral-400 dark:border-neutral-700">
                  <button
                    onClick={() => setSortBy('updated')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 doodle-btn transition-all font-bold flex items-center justify-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[32px] ${
                      sortBy === 'updated'
                        ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 doodle-shadow-sm font-extrabold border-2 border-neutral-400 dark:border-neutral-600'
                        : 'text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white border-2 border-transparent'
                    }`}
                    title="Ordenar por más recientes (predeterminado)"
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Recientes</span>
                  </button>
                  <button
                    onClick={() => setSortBy('name')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 doodle-btn transition-all font-bold flex items-center justify-center cursor-pointer min-h-[36px] sm:min-h-[32px] ${
                      sortBy === 'name'
                        ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 doodle-shadow-sm font-extrabold border-2 border-neutral-400 dark:border-neutral-600'
                        : 'text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white border-2 border-transparent'
                    }`}
                    title="Ordenar por nombre alfabético"
                  >
                    Nombre (A-Z)
                  </button>
                </div>
              </div>
            </div>

            {languagesList.length > 0 && (
              <div className="pt-3 border-t-2 border-dashed border-neutral-300 dark:border-neutral-800">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs sm:text-sm">
                  <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 shrink-0 mr-1 hidden sm:inline">
                    Lenguaje:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedLanguage('all')}
                    className={`px-3 py-1.5 doodle-badge shrink-0 whitespace-nowrap transition-all font-mono text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 min-h-[34px] border-2 font-bold ${
                      selectedLanguage === 'all'
                        ? 'bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-neutral-950 dark:border-neutral-100 font-extrabold doodle-shadow-sm'
                        : 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 shrink-0" />
                    <span>Todos ({repos.length})</span>
                  </button>

                  {languagesList.map((lang) => {
                    const count = getLanguageCount(lang);
                    const isSelected = selectedLanguage === lang;
                    const langColor = getLanguageColor(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-1.5 doodle-badge shrink-0 whitespace-nowrap transition-all font-mono text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 min-h-[34px] border-2 font-bold ${
                          isSelected
                            ? 'bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-neutral-950 dark:border-neutral-100 font-extrabold doodle-shadow-sm'
                            : 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: langColor }}
                        />
                        <span>{lang}</span>
                        <span className="opacity-80 text-xs font-semibold">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado de carga */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-56 doodle-card bg-neutral-100 dark:bg-neutral-900 animate-pulse border-2 border-neutral-400 dark:border-neutral-700 p-6"
              />
            ))}
          </div>
        ) : error ? (
          /* No se muestran datos de respaldo cuando la API y la caché fallan. */
          <div className="p-8 sm:p-10 text-center doodle-card doodle-shadow bg-rose-50/50 dark:bg-rose-950/20 border-2 border-rose-400 dark:border-rose-800 max-w-2xl mx-auto my-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center border-2 border-rose-300 dark:border-rose-700">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-2">
              Se ha presentado un error al cargar los repositorios
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 max-w-lg mx-auto font-medium">
              No fue posible sincronizar los repositorios en tiempo real desde la API de GitHub. Puedes intentar recargar o explorar los proyectos directamente en GitHub.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={loadRepos}
                className="inline-flex items-center gap-2 px-4 py-2.5 doodle-btn doodle-shadow-sm text-sm font-bold bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-2 border-neutral-950 dark:border-neutral-100 hover:bg-neutral-800 dark:hover:bg-white transition-colors cursor-pointer min-h-[42px]"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reintentar</span>
              </button>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 doodle-btn doodle-shadow-sm text-sm font-bold bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 border-2 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors min-h-[42px]"
              >
                <Github className="w-4 h-4" />
                <span>Ver en GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </a>
            </div>
          </div>
        ) : repos.length === 0 ? (
          /* Estado vacío cuando GitHub no devuelve repositorios públicos. */
          <div className="p-10 text-center doodle-box border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/40 max-w-2xl mx-auto my-6">
            <Code2 className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              No se encontraron repositorios públicos en este momento
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 font-medium">
              Puedes visitar el perfil de GitHub directamente para ver cualquier actividad o actualización.
            </p>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 doodle-btn doodle-shadow-sm text-sm font-bold bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-2 border-neutral-950 dark:border-neutral-100 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Visitar GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
            </a>
          </div>
        ) : filteredRepos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-7 sm:mb-9">
              {paginatedRepos.map((repo) => {
                const langColor = getLanguageColor(repo.language);

                return (
                  <div
                    key={repo.id}
                    className="p-6 sm:p-7 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 flex flex-col justify-between hover:border-neutral-600 dark:hover:border-neutral-500 transition-all group"
                  >
                    <div>
                      <div className="flex items-start sm:items-center justify-between gap-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-neutral-50 tracking-tight min-w-0 flex-1 break-words sm:truncate" title={repo.name}>
                          {repo.name}
                        </h3>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 doodle-badge text-xs sm:text-sm font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 shrink-0 whitespace-nowrap border-2 border-neutral-400 dark:border-neutral-700 font-bold">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-black/20 dark:ring-white/20"
                            style={{ backgroundColor: langColor }}
                          />
                          <span>
                            {repo.language || 'Otros'}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed mb-5 line-clamp-3 min-h-[46px] font-medium">
                        {repo.description}
                      </p>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {repo.topics.slice(0, 4).map((topic, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 doodle-badge text-xs font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-2 border-neutral-300 dark:border-neutral-700"
                            >
                              #{topic}
                            </span>
                          ))}
                          {repo.topics.length > 4 && (
                            <span className="text-xs text-neutral-500 font-bold self-center">
                              +{repo.topics.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t-2 border-dashed border-neutral-300 dark:border-neutral-800 space-y-3.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono font-semibold">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm" title={`Última actualización: ${repo.updated_at}`}>
                          <Clock className="w-4 h-4 text-neutral-500" />
                          <span>Actualizado {formatRelativeTime(repo.updated_at)}</span>
                        </div>
                      </div>

                      {repo.homepage &&
                      typeof repo.homepage === 'string' &&
                      repo.homepage.trim() !== '' &&
                      repo.homepage !== repo.html_url &&
                      !repo.homepage.includes(`github.com/${PERSONAL_INFO.githubUser}`) ? (
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 doodle-btn doodle-shadow-sm text-xs sm:text-sm font-bold text-neutral-950 dark:text-neutral-50 bg-emerald-500/15 hover:bg-emerald-500/25 border-2 border-emerald-600/50 dark:border-emerald-500/50 transition-colors group/btn min-h-[42px]"
                            title="Ver página / Demo del proyecto"
                          >
                            <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                            <span>Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                          </a>

                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 doodle-btn doodle-shadow-sm text-xs sm:text-sm font-bold text-neutral-50 dark:text-neutral-950 bg-neutral-950 hover:bg-neutral-850 dark:bg-neutral-100 dark:hover:bg-white border-2 border-neutral-950 dark:border-neutral-100 transition-colors min-h-[42px]"
                            title="Ver código fuente en GitHub"
                          >
                            <Github className="w-4 h-4" />
                            <span>Repositorio</span>
                          </a>
                        </div>
                      ) : (
                        <div className="pt-1">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 doodle-btn doodle-shadow-sm text-xs sm:text-sm font-bold text-neutral-50 dark:text-neutral-950 bg-neutral-950 hover:bg-neutral-850 dark:bg-neutral-100 dark:hover:bg-white border-2 border-neutral-950 dark:border-neutral-100 transition-colors min-h-[42px]"
                            title="Ver código fuente en GitHub"
                          >
                            <Github className="w-4 h-4" />
                            <span>Repositorio</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paginador */}
            {totalPages > 1 && (
              <div className="p-4 sm:p-5 doodle-box doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4">
                <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-mono font-semibold text-center sm:text-left">
                  Mostrando <span className="font-bold text-neutral-950 dark:text-neutral-50">{startIndex + 1}</span>-
                  <span className="font-bold text-neutral-950 dark:text-neutral-50">{endIndex}</span> de{' '}
                  <span className="font-bold text-neutral-950 dark:text-neutral-50">{filteredRepos.length}</span> repositorios
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => handlePageChange(Math.max(1, validCurrentPage - 1))}
                    disabled={validCurrentPage === 1}
                    className="p-2 min-h-[40px] min-w-[40px] doodle-btn flex items-center justify-center text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer doodle-shadow-sm font-bold"
                    aria-label="Página anterior"
                    title="Página anterior"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>

                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === validCurrentPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 sm:w-9 sm:h-9 doodle-btn text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center border-2 ${
                            isActive
                              ? 'bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-neutral-950 dark:border-neutral-100 doodle-shadow ring-2 ring-neutral-400/30'
                              : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                          }`}
                          title={`Ir a la página ${pageNum}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, validCurrentPage + 1))}
                    disabled={validCurrentPage === totalPages}
                    className="p-2 min-h-[40px] min-w-[40px] doodle-btn flex items-center justify-center text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer doodle-shadow-sm font-bold"
                    aria-label="Página siguiente"
                    title="Página siguiente"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center doodle-box border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/40">
            <Code2 className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              No se encontraron repositorios con ese criterio
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Prueba cambiando la búsqueda o seleccionando otro lenguaje.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
              }}
              className="px-3 py-1.5 doodle-btn text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-2 border-neutral-300 dark:border-neutral-700 cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
