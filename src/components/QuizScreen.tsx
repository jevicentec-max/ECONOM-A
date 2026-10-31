import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  HelpCircle, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { EvaluationRecord, QuizAttemptLog, StudentProfile, TeacherSettings } from '../types';
import { QUIZ_CHALLENGES, CHALLENGE_1, CHALLENGE_2, CHALLENGE_3, CNEB_RUBRIC } from '../data/curriculum';
import { educationalAudio } from '../utils/audio';

interface QuizScreenProps {
  student: StudentProfile | null;
  teacherSettings: TeacherSettings;
  onFinishQuiz: (result: EvaluationRecord) => void;
  onGoToMenu: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  student,
  teacherSettings,
  onFinishQuiz,
  onGoToMenu
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0, 1, 2
  const [isOfficialMode, setIsOfficialMode] = useState<boolean>(teacherSettings.evaluationMode === 'calificada');
  const [startTime] = useState<number>(Date.now());
  const [logs, setLogs] = useState<QuizAttemptLog[]>([]);

  // Challenge 1 state: Pairing activities to sectors
  // map of item.id -> sectorId (0, 1, 2)
  const [pairings, setPairings] = useState<Record<string, number | null>>({
    'act-0': null,
    'act-1': null,
    'act-2': null,
  });

  // Challenge 2 state: Agent multiple choice
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  // Challenge 3 state: Productive chain sequencing
  const [chainSteps, setChainSteps] = useState([
    { id: 'step-3', text: 'Comercialización de la chompa terminada en el mercado de Pasco a una familia', correctPos: 2 },
    { id: 'step-1', text: 'Crianza y esquila de fibra de alpaca en las praderas de Villa de Pasco (Sector Primario)', correctPos: 0 },
    { id: 'step-2', text: 'Lavado, hilado y tejido de la lana en un taller artesanal local (Sector Secundario)', correctPos: 1 },
  ]);

  // Step feedback state
  const [stepAttempts, setStepAttempts] = useState<number>(0);
  const [isStepEvaluated, setIsStepEvaluated] = useState<boolean>(false);
  const [stepFeedback, setStepFeedback] = useState<{ isCorrect: boolean; message: string; pointsAwarded: number } | null>(null);

  // Running scores
  const [totalScore, setTotalScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);

  const activeChallenge = QUIZ_CHALLENGES[currentStep];

  // Drag and drop handler for Challenge 1
  const handleDragStart = (e: React.DragEvent, actId: string) => {
    e.dataTransfer.setData('text/plain', actId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnSector = (e: React.DragEvent, sectorId: number) => {
    e.preventDefault();
    const actId = e.dataTransfer.getData('text/plain');
    if (actId) {
      setPairings(prev => ({ ...prev, [actId]: sectorId }));
    }
  };

  // Move ordering steps for Challenge 3
  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (isStepEvaluated) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= chainSteps.length) return;

    const newSteps = [...chainSteps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIdx];
    newSteps[targetIdx] = temp;
    setChainSteps(newSteps);
    educationalAudio.playHint();
  };

  // Check current challenge
  const handleVerifyStep = () => {
    let correct = false;
    let earnedPoints = 0;
    const newAttemptCount = stepAttempts + 1;
    setStepAttempts(newAttemptCount);

    if (currentStep === 0) {
      // Challenge 1 verification
      const allSelected = Object.values(pairings).every(val => val !== null);
      if (!allSelected) {
        alert('Por favor selecciona o arrastra todas las actividades a su sector antes de comprobar.');
        return;
      }
      correct = pairings['act-0'] === 0 && pairings['act-1'] === 1 && pairings['act-2'] === 2;
      earnedPoints = correct ? teacherSettings.challenge1Weight : 0;
    } else if (currentStep === 1) {
      // Challenge 2 verification
      if (selectedAgent === null) {
        alert('Por favor selecciona una alternativa.');
        return;
      }
      correct = selectedAgent === CHALLENGE_2.correctOption;
      earnedPoints = correct ? teacherSettings.challenge2Weight : 0;
    } else if (currentStep === 2) {
      // Challenge 3 verification
      correct = chainSteps[0].correctPos === 0 && chainSteps[1].correctPos === 1 && chainSteps[2].correctPos === 2;
      earnedPoints = correct ? teacherSettings.challenge3Weight : 0;
    }

    if (correct) {
      educationalAudio.playSuccess();
      setTotalScore(prev => prev + earnedPoints);
      setCorrectCount(prev => prev + 1);
      setIsStepEvaluated(true);
      setStepFeedback({
        isCorrect: true,
        pointsAwarded: earnedPoints,
        message: `¡Excelente respuesta! Has obtenido +${earnedPoints} puntos. Comprensión adecuada de la realidad económica local.`
      });
    } else {
      educationalAudio.playError();
      if (!isOfficialMode && newAttemptCount < 3) {
        // Formative practice hints
        const hintText = newAttemptCount === 1 
          ? 'Pista 1: Recuerda revisar si la actividad extrae recursos directamente o si los transforma en un taller/fábrica.'
          : 'Pista 2: Piensa en el recorrido de la lana en Villa de Pasco: primero en el campo con las alpacas, luego en el telar y finalmente en la feria.';
        setStepFeedback({
          isCorrect: false,
          pointsAwarded: 0,
          message: `${hintText} (Intento ${newAttemptCount} de 3)`
        });
      } else {
        // Attempt limit or official mode
        setErrorCount(prev => prev + 1);
        setIsStepEvaluated(true);
        setStepFeedback({
          isCorrect: false,
          pointsAwarded: 0,
          message: 'Intento finalizado. Recuerda repasar los conceptos de sectores y agentes en el menú temático.'
        });
      }
    }

    // Record log
    const logItem: QuizAttemptLog = {
      challengeId: currentStep + 1,
      challengeName: activeChallenge.title,
      userAnswer: currentStep === 0 ? JSON.stringify(pairings) : currentStep === 1 ? String(selectedAgent) : chainSteps.map(s => s.text).join(' -> '),
      isCorrect: correct,
      scoreAwarded: earnedPoints,
      attemptsUsed: newAttemptCount
    };
    setLogs(prev => [...prev, logItem]);
  };

  // Next step or finish
  const handleProceed = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setIsStepEvaluated(false);
      setStepAttempts(0);
      setStepFeedback(null);
    } else {
      // Finish Evaluation and emit final record
      const finalScore = totalScore;
      let level: 'AD' | 'A' | 'B' | 'C' = 'C';
      if (finalScore >= 18) level = 'AD';
      else if (finalScore >= 14) level = 'A';
      else if (finalScore >= 11) level = 'B';
      else level = 'C';

      const timeSpent = Math.max(1, Math.round((Date.now() - startTime) / 1000));

      const record: EvaluationRecord = {
        id: `eval-${Date.now()}`,
        studentAlias: student?.alias || 'Estudiante Anónimo',
        studentSection: student?.section || '1.° A',
        avatarIndex: student?.avatarIndex ?? 0,
        score: finalScore,
        correctCount: correctCount,
        errorCount: errorCount,
        timeSpentSeconds: timeSpent,
        cnebLevel: level,
        cnebDescription: CNEB_RUBRIC[level].summary,
        completedAt: new Date().toISOString(),
        isOfficialMode,
        logs: logs
      };

      onFinishQuiz(record);
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4">
      {/* Top Card: Progress & Score status */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-900/20 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
                Pantalla 16 de 17 · Actividades y Evaluación
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                isOfficialMode 
                  ? 'bg-purple-100 text-purple-900 border-purple-300' 
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}>
                {isOfficialMode ? 'Modo Evaluación Calificada' : 'Modo Práctica Formativa'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1E3A8A] mt-1">
              Reto {currentStep + 1} de 3: {activeChallenge.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-blue-50 px-4 py-2.5 rounded-2xl border border-blue-200 shrink-0">
            <div>
              <div className="text-[10px] text-slate-700 font-bold uppercase">Puntaje Acumulado</div>
              <div className="text-2xl font-black text-blue-900 leading-tight">
                {totalScore} <span className="text-xs font-bold text-slate-700">/ 20</span>
              </div>
            </div>
            <Award className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        {/* Challenge Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[0, 1, 2].map((idx) => (
            <div 
              key={idx} 
              className={`flex-1 h-2 rounded-full transition-all ${
                idx === currentStep 
                  ? 'bg-amber-400 ring-2 ring-amber-400/30' 
                  : idx < currentStep 
                  ? 'bg-blue-900' 
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Instructions banner */}
        <p className="text-xs sm:text-sm text-slate-700 mb-6 font-medium">
          {activeChallenge.instructions}
        </p>

        {/* CHALLENGE 1: Emparejamiento de sectores (7 pts) */}
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Activities list to classify */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                Actividades Económicas de Villa de Pasco (Arrastra o selecciona con el menú):
              </span>
              <div className="space-y-3">
                {CHALLENGE_1.items.map((item, idx) => (
                  <div
                    key={item.id}
                    draggable={!isStepEvaluated}
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className="p-3.5 bg-white border-2 border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-blue-400 cursor-grab active:cursor-grabbing transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{['🐑', '🏭', '🛒'][idx]}</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{item.name}</span>
                    </div>

                    {/* Accessible dropdown menu for keyboard / mobile users */}
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[11px] text-slate-700 font-bold hidden sm:inline">Sector:</span>
                      <select
                        disabled={isStepEvaluated}
                        value={pairings[item.id] ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          setPairings(prev => ({ ...prev, [item.id]: val }));
                        }}
                        className="px-3 py-1.5 rounded-lg border-2 border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 focus:border-blue-900 outline-none"
                        aria-label={`Seleccionar sector para ${item.name}`}
                      >
                        <option value="">-- Elige sector --</option>
                        <option value="0">Sector Primario</option>
                        <option value="1">Sector Secundario</option>
                        <option value="2">Sector Terciario</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dropzones for 3 sectors */}
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Zonas de los Sectores Productivos:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CHALLENGE_1.sectors.map((sec) => {
                  const assignedItems = CHALLENGE_1.items.filter(it => pairings[it.id] === sec.id);

                  return (
                    <div
                      key={sec.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropOnSector(e, sec.id)}
                      className="p-4 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/50 min-h-[140px] flex flex-col justify-between transition-colors hover:bg-blue-100/50"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{sec.icon}</span>
                          <span className="font-bold text-xs sm:text-sm text-blue-950">{sec.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-700">{sec.desc}</p>
                      </div>

                      {/* Display assigned items */}
                      <div className="mt-3 space-y-1.5">
                        {assignedItems.length > 0 ? (
                          assignedItems.map(it => (
                            <div key={it.id} className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 rounded-md shadow-xs truncate">
                              ✓ {it.name}
                            </div>
                          ))
                        ) : (
                          <div className="text-[11px] text-slate-600 italic">
                            Arrastra aquí o usa el menú
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CHALLENGE 2: Selección analítica de agentes económicos (6 pts) */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                Caso Real en Villa de Pasco:
              </span>
              <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                «{CHALLENGE_2.scenario}»
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900 mb-3">
                {CHALLENGE_2.question}
              </p>

              <div className="space-y-3">
                {CHALLENGE_2.options.map((opt) => {
                  const isSelected = selectedAgent === opt.id;
                  let style = 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50 text-slate-800';
                  if (isSelected && !isStepEvaluated) {
                    style = 'border-blue-900 bg-blue-100/70 text-blue-950 ring-2 ring-blue-900/20';
                  } else if (isStepEvaluated) {
                    if (opt.id === CHALLENGE_2.correctOption) {
                      style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected && opt.id !== CHALLENGE_2.correctOption) {
                      style = 'border-red-400 bg-red-50 text-red-950 line-through opacity-70';
                    } else {
                      style = 'border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      type="button"
                      key={opt.id}
                      disabled={isStepEvaluated}
                      onClick={() => setSelectedAgent(opt.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${style}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + opt.id)}
                      </span>
                      <div>
                        <div className="font-bold">{opt.name}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CHALLENGE 3: Ordenamiento de cadena productiva textil (7 pts) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Secuencia la Cadena Productiva Textil (Lana de Alpaca):
              </span>
              <p className="text-xs text-slate-600 mb-4">
                Utiliza los botones de subir (↑) y bajar (↓) para ordenar las etapas desde el origen en las punas de Pasco hasta el consumidor final.
              </p>

              <div className="space-y-3">
                {chainSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-4 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {step.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        disabled={isStepEvaluated || idx === 0}
                        onClick={() => moveStep(idx, 'up')}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-bold transition-colors"
                        title="Subir etapa"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={isStepEvaluated || idx === chainSteps.length - 1}
                        onClick={() => moveStep(idx, 'down')}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-bold transition-colors"
                        title="Bajar etapa"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step Feedback Box */}
        {stepFeedback && (
          <div 
            className={`mt-6 p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200 ${
              stepFeedback.isCorrect 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {stepFeedback.isCorrect ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold">
                {stepFeedback.isCorrect ? '¡Respuesta Correcta!' : 'Refuerzo formativo:'}
              </div>
              <div>{stepFeedback.message}</div>
            </div>
          </div>
        )}

        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onGoToMenu}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Menú</span>
          </button>

          {!isStepEvaluated ? (
            <button
              type="button"
              onClick={handleVerifyStep}
              className="px-8 py-3 bg-[#1E3A8A] hover:bg-blue-800 text-white font-black text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Comprobar Respuesta del Reto
            </button>
          ) : (
            <button
              type="button"
              onClick={handleProceed}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>{currentStep === 2 ? 'Ver Resultados Finales (Pantalla 17)' : 'Continuar al Siguiente Reto'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
