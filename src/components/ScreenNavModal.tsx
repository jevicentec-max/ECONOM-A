import React from 'react';
import { X, CheckCircle, ChevronRight, BookOpen, Award, UserCheck, Home, GraduationCap, GitBranch } from 'lucide-react';
import { ScreenId } from '../types';
import { ALL_TOPICS, UNITS_DATA } from '../data/curriculum';

interface ScreenNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  completedTopics: number[];
}

export const ScreenNavModal: React.FC<ScreenNavModalProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
  completedTopics
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-2 border-blue-900">
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            <div>
              <h2 className="font-bold text-lg leading-tight">Mapa de las 17 Pantallas del Software</h2>
              <p className="text-xs text-blue-200">Navega directamente a cualquier pantalla educativa del proyecto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-blue-800 text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Main sections: 1 to 3 */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Fase Inicial: Acceso y Selección
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => { onSelectScreen('cover'); onClose(); }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  currentScreen === 'cover'
                    ? 'border-blue-900 bg-blue-50 font-bold text-blue-900'
                    : 'border-slate-200 hover:border-blue-400 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-800" />
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Pantalla 1</div>
                    <div className="text-sm font-bold">Portada Interactiva</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { onSelectScreen('register'); onClose(); }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  currentScreen === 'register'
                    ? 'border-blue-900 bg-blue-50 font-bold text-blue-900'
                    : 'border-slate-200 hover:border-blue-400 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-800" />
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Pantalla 2</div>
                    <div className="text-sm font-bold">Registro de Estudiante</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { onSelectScreen('menu'); onClose(); }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  currentScreen === 'menu'
                    ? 'border-blue-900 bg-blue-50 font-bold text-blue-900'
                    : 'border-slate-200 hover:border-blue-400 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-800" />
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Pantalla 3</div>
                    <div className="text-sm font-bold">Menú y Temario</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Units: Pantallas 4 to 15 */}
          {UNITS_DATA.map((unit) => (
            <div key={unit.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-[#1E3A8A] flex items-center gap-1.5">
                  <span>{unit.icon}</span>
                  <span>{unit.title}</span>
                </span>
                <span className="text-xs text-slate-700 font-medium">
                  {unit.topics.filter(t => completedTopics.includes(t.id)).length} de {unit.topics.length} completados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {unit.topics.map((t) => {
                  const screenTarget: ScreenId = `topic-${t.id}` as ScreenId;
                  const isCurrent = currentScreen === screenTarget;
                  const isDone = completedTopics.includes(t.id);

                  return (
                    <button
                      key={t.id}
                      onClick={() => { onSelectScreen(screenTarget); onClose(); }}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'border-blue-800 bg-blue-100/70 font-semibold text-blue-950 shadow-sm'
                          : isDone
                          ? 'border-emerald-300 bg-emerald-50/60 text-slate-800 hover:bg-emerald-100/50'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                          <span>Pantalla {t.screenNumber}</span>
                          {isDone && <CheckCircle className="w-3 h-3 text-emerald-600 inline" />}
                        </div>
                        <div className="text-xs font-bold truncate text-slate-800">{t.title}</div>
                      </div>
                      <span className="text-lg shrink-0">{t.icon}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Evaluations: 16 and 17 */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Fase Evaluativa y Cierre
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => { onSelectScreen('quiz'); onClose(); }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  currentScreen === 'quiz'
                    ? 'border-amber-500 bg-amber-50 font-bold text-amber-950'
                    : 'border-amber-200 hover:border-amber-400 bg-amber-50/40 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-xs font-semibold text-amber-700">Pantalla 16</div>
                    <div className="text-sm font-bold">Actividades y Evaluación (3 Retos)</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>

              <button
                onClick={() => { onSelectScreen('results'); onClose(); }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  currentScreen === 'results'
                    ? 'border-blue-900 bg-blue-50 font-bold text-blue-900'
                    : 'border-slate-200 hover:border-blue-400 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Pantalla 17</div>
                    <div className="text-sm font-bold">Resultados y Reporte Oficial PDF</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Modos Especiales: Docente y Flujograma */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2">
            <button
              onClick={() => { onSelectScreen('teacher'); onClose(); }}
              className="flex-1 p-2.5 rounded-lg bg-blue-950 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-900 transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Acceder al Panel Docente (Lic. Jacquelin Vicente)</span>
            </button>
            <button
              onClick={() => { onSelectScreen('flowchart'); onClose(); }}
              className="flex-1 p-2.5 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-colors border border-slate-300"
            >
              <GitBranch className="w-4 h-4 text-blue-900" />
              <span>Ver Flujograma General del Sistema (Prompt 1)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Cerrar Navegador
          </button>
        </div>
      </div>
    </div>
  );
};
