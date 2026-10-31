import React from 'react';
import { BookOpen, CheckCircle, Award, ArrowRight, ArrowLeft, PlayCircle, Star, Sparkles, UserCheck } from 'lucide-react';
import { ScreenId, StudentProfile } from '../types';
import { UNITS_DATA, AVATARS } from '../data/curriculum';

interface MenuScreenProps {
  student: StudentProfile | null;
  completedTopics: number[];
  onSelectTopic: (topicId: number) => void;
  onGoToQuiz: () => void;
  onChangeProfile: () => void;
  onGoToCover: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  student,
  completedTopics,
  onSelectTopic,
  onGoToQuiz,
  onChangeProfile,
  onGoToCover
}) => {
  const currentAvatar = student ? AVATARS[student.avatarIndex] : AVATARS[0];
  const totalTopicsCount = 12;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopicsCount) * 100);

  return (
    <div className="py-6 max-w-5xl mx-auto px-4">
      {/* Top Banner: Student status & Global Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-900/20 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 border-2 border-blue-900 rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0">
              {currentAvatar.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[#1E3A8A]">
                  ¡Hola, {student?.alias || 'Estudiante'}!
                </h1>
                <span className="text-xs bg-amber-400 text-blue-950 font-bold px-2 py-0.5 rounded-full">
                  {student?.section || '1.° A'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Avatar: <strong>{currentAvatar.name}</strong> · I.E. «República de Argentina»
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onChangeProfile}
              className="text-xs font-bold text-slate-700 hover:text-blue-900 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Cambiar Perfil
            </button>
            <button
              onClick={onGoToQuiz}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Ir a la Evaluación (Pantalla 16)</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-700">Progreso Global del Curso</span>
            <span className="text-blue-900">{completedCount} de {totalTopicsCount} temas completados ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
            <div 
              className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={totalTopicsCount}
            />
          </div>
        </div>
      </div>

      {/* The 4 Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {UNITS_DATA.map((unit) => {
          const unitCompletedTopics = unit.topics.filter(t => completedTopics.includes(t.id));
          const isUnitFullyDone = unitCompletedTopics.length === unit.topics.length;
          const unitPercent = Math.round((unitCompletedTopics.length / unit.topics.length) * 100);

          return (
            <div 
              key={unit.id}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 hover:border-blue-900/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Unidad {unit.id}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {unitCompletedTopics.length} / {unit.topics.length} Temas
                  </span>
                </div>

                <div className="flex items-start gap-3 my-2">
                  <span className="text-3xl shrink-0 p-2 bg-slate-50 rounded-xl border border-slate-200">{unit.icon}</span>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight">
                      {unit.title.replace(`Unidad ${unit.id}: `, '')}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {unit.description}
                    </p>
                  </div>
                </div>

                {/* Topics in this unit */}
                <div className="mt-4 space-y-2">
                  {unit.topics.map((t) => {
                    const isDone = completedTopics.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => onSelectTopic(t.id)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                          isDone 
                            ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 text-slate-800' 
                            : 'border-slate-200 bg-slate-50/70 hover:bg-blue-50 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span className="text-base shrink-0">{t.icon}</span>
                          <div className="truncate">
                            <span className="font-bold text-slate-500 mr-1.5">P{t.screenNumber}:</span>
                            <span className="font-bold text-slate-800">{t.title}</span>
                          </div>
                        </div>
                        {isDone ? (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold shrink-0">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Listo</span>
                          </span>
                        ) : (
                          <span className="text-blue-900 font-bold text-[11px] shrink-0 flex items-center gap-1">
                            <span>Ver</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unit action button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="w-1/2">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${unitPercent}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => onSelectTopic(unit.topics[0].id)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Estudiar Unidad</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-yellow-400">
            ¿Listo para poner a prueba tus conocimientos?
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xl">
            La Pantalla 16 contiene 3 retos prácticos (emparejamiento de sectores, selección de agentes y ordenamiento de la cadena productiva) calificados sobre 20 según la rúbrica del CNEB.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onGoToCover}
            className="px-4 py-2.5 rounded-xl border border-blue-400 text-white hover:bg-blue-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Portada</span>
          </button>
          <button
            onClick={onGoToQuiz}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Iniciar Retos y Evaluación →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
