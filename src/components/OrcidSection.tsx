/**
 * Muestra trabajos públicos de ORCID con búsqueda, orden y paginación.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ExternalLink,
  Calendar,
  Check,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Clock,
  AlertCircle,
  RotateCw,
  BookOpen
} from 'lucide-react';
import { OrcidWork } from '../types';
import { fetchOrcidWorks, FetchOrcidResult } from '../services/orcidService';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DoodleBook, DoodleQuote, DoodlePencil } from './EasterEggs/DoodleIcons';

const ITEMS_PER_PAGE = 4;

export const OrcidSection: React.FC = () => {
  const [works, setWorks] = useState<OrcidWork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');
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

  const loadOrcid = async () => {
    setLoading(true);
    setError(null);
    try {
      const result: FetchOrcidResult = await fetchOrcidWorks();
      if (result.error && result.works.length === 0) {
        setError(result.error);
        setWorks([]);
      } else {
        setWorks(result.works);
        setError(null);
      }
    } catch {
      setError('Se ha presentado un error al cargar las publicaciones desde ORCID.');
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrcid();
  }, []);

  // Reiniciar a la primera página al alterar búsqueda o criterio de ordenación
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleCopyCitation = (work: OrcidWork) => {
    const citation =
      work.citation ||
      `${PERSONAL_INFO.name}${work.publicationDate.year ? ` (${work.publicationDate.year})` : ''}. ${work.title}.${work.journal ? ` ${work.journal}.` : ''} ${work.doi ? `DOI: ${work.doi}` : `ORCID: ${PERSONAL_INFO.orcidUrl}`}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(work.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredWorks = useMemo(() => {
    return works
      .filter((w) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          w.title.toLowerCase().includes(q) ||
          (w.journal || '').toLowerCase().includes(q) ||
          (w.doi || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          const yearA = parseInt(a.publicationDate.year || '0', 10) || 0;
          const monthA = parseInt(a.publicationDate.month || '1', 10) || 1;
          const dayA = parseInt(a.publicationDate.day || '1', 10) || 1;

          const yearB = parseInt(b.publicationDate.year || '0', 10) || 0;
          const monthB = parseInt(b.publicationDate.month || '1', 10) || 1;
          const dayB = parseInt(b.publicationDate.day || '1', 10) || 1;

          const dateA = new Date(yearA, monthA - 1, dayA).getTime();
          const dateB = new Date(yearB, monthB - 1, dayB).getTime();

          if (dateB !== dateA) {
            return dateB - dateA;
          }
          return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
        }
        return 0;
      });
  }, [works, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredWorks.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredWorks.length);
  const paginatedWorks = filteredWorks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="orcid" ref={sectionRef} className="py-14 sm:py-20 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Investigaciones
            </h2>

            <div className="hidden lg:flex items-center gap-1.5 rotate-[2deg] select-none pointer-events-none text-neutral-700 dark:text-neutral-300">
              <span className="font-crayon text-xs text-sky-700 dark:text-sky-400 font-bold flex items-center gap-1">
                <span>/* DOI indexado */</span>
                <DoodlePencil className="w-3.5 h-3.5 inline-block text-amber-600 dark:text-amber-400" />
              </span>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.orcidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 doodle-btn doodle-shadow-sm bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700/70 text-emerald-800 dark:text-emerald-200 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors group min-h-[36px] self-start md:self-auto"
            id="orcid-profile-external-btn"
            title="Ver perfil de ORCID de Kilian Diaz Miranda"
          >
            <span className="w-5 h-5 doodle-box bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 border border-emerald-700">
              iD
            </span>
            <span className="font-mono">{PERSONAL_INFO.orcidId}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        </div>

        {/* Información y controles cuando la consulta está disponible. */}
        {!error && (
          <div className="p-4 sm:p-5 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 mb-6 sm:mb-8 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 doodle-box bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 border-2 border-emerald-500/40">
                <DoodleBook className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-950 dark:text-neutral-50">
                  Registro Abierto de Investigador (ORCID iD)
                </div>
                <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                  Trabajos, artículos y contribuciones científicas reales.
                </div>
              </div>
            </div>

            {works.length > 0 && (
              <div className="pt-3 border-t-2 border-dashed border-neutral-300 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4.5 h-4.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="orcid-search"
                    name="orcid-search"
                    type="text"
                    placeholder="Buscar por título, DOI o tema..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 doodle-input text-sm sm:text-base bg-white dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-700 text-neutral-950 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-emerald-500 min-h-[42px] font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100 text-sm font-bold cursor-pointer p-1"
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
                      onClick={() => setSortBy('recent')}
                      className={`flex-1 sm:flex-initial px-3.5 py-1.5 doodle-btn transition-all font-bold flex items-center justify-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[32px] ${
                        sortBy === 'recent'
                          ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 doodle-shadow-sm font-extrabold border-2 border-neutral-400 dark:border-neutral-600'
                          : 'text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white border-2 border-transparent'
                      }`}
                      title="Ordenar por publicaciones más recientes (predeterminado)"
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
                      title="Ordenar por nombre o título (A-Z)"
                    >
                      <span>Nombre (A-Z)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lista de trabajos */}
        {loading ? (
          <div className="space-y-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 doodle-card bg-neutral-100 dark:bg-neutral-900 animate-pulse border-2 border-neutral-400 dark:border-neutral-700"
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
              Se ha presentado un error al cargar las publicaciones
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 max-w-lg mx-auto font-medium">
              No fue posible consultar el registro de publicaciones en tiempo real desde la API de ORCID. Puedes intentar recargar o consultar el registro directamente en ORCID.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={loadOrcid}
                className="inline-flex items-center gap-2 px-4 py-2.5 doodle-btn doodle-shadow-sm text-sm font-bold bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-2 border-neutral-950 dark:border-neutral-100 hover:bg-neutral-800 dark:hover:bg-white transition-colors cursor-pointer min-h-[42px]"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reintentar</span>
              </button>
              <a
                href={PERSONAL_INFO.orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 doodle-btn doodle-shadow-sm text-sm font-bold bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 border-2 border-neutral-400 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors min-h-[42px]"
              >
                <span>Ver en ORCID</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </a>
            </div>
          </div>
        ) : works.length === 0 ? (
          /* Estado cuando no hay publicaciones registradas */
          <div className="p-10 text-center doodle-box border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/40 max-w-2xl mx-auto my-6">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              No hay publicaciones registradas públicamente en este momento
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 font-medium">
              Puedes verificar el registro oficial de autor directamente en el sitio de ORCID.
            </p>
            <a
              href={PERSONAL_INFO.orcidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 doodle-btn doodle-shadow-sm text-sm font-bold bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border-2 border-neutral-950 dark:border-neutral-100 transition-colors"
            >
              <span>Abrir perfil ORCID</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
            </a>
          </div>
        ) : filteredWorks.length > 0 ? (
          <>
            <div className="space-y-5 mb-7 sm:mb-9">
              {paginatedWorks.map((work) => {
                const isCopied = copiedId === work.id;

                return (
                  <div
                    key={work.id}
                    className="p-6 sm:p-7 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 hover:border-neutral-600 dark:hover:border-neutral-500 transition-all group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-5">
                      <div className="space-y-2.5 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          {work.type &&
                            work.type.trim() !== '' &&
                            !work.type.toLowerCase().includes('artículo de investigación') &&
                            !work.type.toLowerCase().includes('journal article') && (
                              <span className="px-3 py-1 doodle-badge text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200 border-2 border-emerald-400 dark:border-emerald-700">
                                {work.type}
                              </span>
                            )}

                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-neutral-600 dark:text-neutral-400">
                            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                            <span>{work.publicationDate.year}</span>
                          </span>

                          {work.doi && (
                            <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 font-semibold break-all">
                              DOI: {work.doi}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-neutral-50 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {work.title}
                        </h3>

                        {work.journal && (
                          <div className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                            {work.journal}
                          </div>
                        )}

                      </div>

                      <div className="flex flex-wrap items-center sm:items-end gap-2.5 shrink-0 pt-2 lg:pt-0">
                        <button
                          onClick={() => handleCopyCitation(work)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 doodle-btn doodle-shadow-sm text-xs sm:text-sm font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-400 dark:border-neutral-700 transition-colors cursor-pointer min-h-[38px]"
                          title="Copiar cita bibliográfica (APA/BibTeX)"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">¡Cita copiada!</span>
                            </>
                          ) : (
                            <>
                              <DoodleQuote className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                              <span>Copiar Cita</span>
                            </>
                          )}
                        </button>

                        <a
                          href={work.url || PERSONAL_INFO.orcidUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 doodle-btn doodle-shadow-sm text-xs sm:text-sm font-bold bg-neutral-950 hover:bg-neutral-850 dark:bg-neutral-100 dark:hover:bg-white text-neutral-50 dark:text-neutral-950 border-2 border-neutral-950 dark:border-neutral-100 transition-colors min-h-[38px]"
                          title="Ver publicación"
                        >
                          <span>Ver</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                        </a>
                      </div>
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
                  <span className="font-bold text-neutral-950 dark:text-neutral-50">{filteredWorks.length}</span> documentos
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
          <div className="p-8 text-center doodle-box border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/40">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              No se encontraron publicaciones que coincidan con "{searchQuery}".
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
