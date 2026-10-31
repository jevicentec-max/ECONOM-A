import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  RotateCcw, 
  BookOpen, 
  Printer, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  GraduationCap, 
  AlertCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { EvaluationRecord, StudentProfile } from '../types';
import { CNEB_RUBRIC, AVATARS } from '../data/curriculum';
import { educationalAudio } from '../utils/audio';

interface ResultsScreenProps {
  result: EvaluationRecord;
  student: StudentProfile | null;
  onRetry: () => void;
  onGoToMenu: () => void;
  onGoToTeacher: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  student,
  onRetry,
  onGoToMenu,
  onGoToTeacher
}) => {
  const rubricInfo = CNEB_RUBRIC[result.cnebLevel];
  const currentAvatar = AVATARS[result.avatarIndex] || AVATARS[0];

  useEffect(() => {
    educationalAudio.playCelebration();
    if (result.score >= 14) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.score]);

  const formatMinutesSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // Specific pedagogical reinforcement suggestions based on challenge logs
  const getReinforcementTips = () => {
    const tips: string[] = [];
    result.logs.forEach(log => {
      if (!log.isCorrect) {
        if (log.challengeId === 1) {
          tips.push('Repasar la clasificación de sectores productivos: Recuerda que la crianza y extracción son del Sector Primario, la manufactura y tejido son del Sector Secundario, y las ferias y el transporte son del Sector Terciario.');
        } else if (log.challengeId === 2) {
          tips.push('Reforzar las funciones de los agentes económicos: Las familias consumen y ofrecen trabajo; las empresas combinan recursos para producir; el Estado establece leyes y financia servicios públicos como nuestra I.E. República de Argentina.');
        } else if (log.challengeId === 3) {
          tips.push('Analizar las etapas de la cadena productiva: Toda transformación económica inicia con la materia prima de la naturaleza, continúa con la manufactura en taller o fábrica y culmina en la distribución comercial a las familias.');
        }
      }
    });

    if (tips.length === 0) {
      tips.push('¡Dominio sobresaliente de los temas! Continúa aplicando estos conocimientos económicos para valorar el trabajo productivo y el consumo responsable en nuestra comunidad de Villa de Pasco.');
    }
    return tips;
  };

  const reinforcementList = getReinforcementTips();

  return (
    <div className="py-6 max-w-4xl mx-auto px-4">
      {/* Official Certificate Box (Print Optimized) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-blue-900/30 print:shadow-none print:border-none print:p-0">
        
        {/* Header with official insignia */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b-2 border-slate-200 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl p-1.5 shadow border-2 border-blue-900 shrink-0 flex items-center justify-center">
              <img 
                src="/assets/insignia-oficial.jpg" 
                alt="Insignia oficial I.E. República de Argentina, Villa de Pasco"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/insignia-oficial_f585c820.jpg';
                }}
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Informe Oficial de Evaluación Pedagógica · CNEB
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#1E3A8A] mt-1">
                ECONOMÍA EN ACCIÓN
              </h1>
              <p className="text-xs text-slate-700 font-semibold">
                I.E. «República de Argentina» – Villa de Pasco · Área de Ciencias Sociales · 1.° de secundaria
              </p>
              <p className="text-[11px] text-slate-500">
                Docente: Lic. Jacquelin Edith Vicente Condor · Competencia: Gestiona responsablemente los recursos económicos
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500 font-semibold">Fecha de evaluación</div>
            <div className="text-xs font-bold text-slate-800">
              {new Date(result.completedAt).toLocaleDateString('es-PE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
              ✓ Registrado en Servidor Central LAN
            </div>
          </div>
        </div>

        {/* Student Identifier Badge */}
        <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-white rounded-xl shadow-xs border border-slate-200">{currentAvatar.icon}</span>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-700">Estudiante Evaluado:</span>
              <div className="text-lg font-black text-blue-950">{result.studentAlias}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
            <div>
              <span className="text-slate-700 block text-[10px] uppercase">Sección:</span>
              <span className="text-blue-900 font-black text-sm">{result.studentSection}</span>
            </div>
            <div>
              <span className="text-slate-700 block text-[10px] uppercase">Modalidad:</span>
              <span className="text-slate-800 font-bold">{result.isOfficialMode ? 'Calificada' : 'Práctica'}</span>
            </div>
          </div>
        </div>

        {/* Main Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          {/* Vigesimal Score */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-900/30 text-center">
            <span className="text-[11px] font-bold text-blue-900 uppercase">Puntaje Vigesimal</span>
            <div className="text-4xl font-black text-[#1E3A8A] my-1">
              {result.score}<span className="text-sm font-bold text-slate-500">/20</span>
            </div>
            <span className="text-[11px] text-slate-600 font-medium">Escala 0 a 20</span>
          </div>

          {/* CNEB Level */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300 text-center">
            <span className="text-[11px] font-bold text-amber-900 uppercase">Nivel de Logro CNEB</span>
            <div 
              className="text-3xl font-black my-1"
              style={{ color: rubricInfo.badgeColor }}
            >
              {result.cnebLevel}
            </div>
            <span className="text-[11px] font-bold text-slate-700 truncate block">
              {rubricInfo.label.replace(` (${result.cnebLevel})`, '')}
            </span>
          </div>

          {/* Correct / Errors */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-600 uppercase">Retos Completados</span>
            <div className="flex items-center justify-center gap-2 my-1 text-2xl font-black">
              <span className="text-emerald-700 flex items-center gap-0.5">
                <CheckCircle2 className="w-5 h-5" /> {result.correctCount}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-red-600 flex items-center gap-0.5">
                <XCircle className="w-5 h-5" /> {result.errorCount}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">3 retos totales</span>
          </div>

          {/* Time Spent */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-600 uppercase">Tiempo Empleado</span>
            <div className="text-2xl font-black text-slate-800 my-1 flex items-center justify-center gap-1">
              <Clock className="w-5 h-5 text-blue-900" />
              <span>{formatMinutesSeconds(result.timeSpentSeconds)}</span>
            </div>
            <span className="text-[11px] text-slate-500">Duración de sesión</span>
          </div>
        </div>

        {/* Pedagogical Description & Rubric Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-blue-900" />
            <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
              Diagnóstico Pedagógico según el Currículo Nacional (CNEB):
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {rubricInfo.summary}
          </p>
        </div>

        {/* Personalized Reinforcement Suggestions (Prompt 7 requirement) */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              Recomendaciones Personalizadas de Refuerzo Pedagógico:
            </h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
            {reinforcementList.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Formal Teacher Signature Block for Print */}
        <div className="hidden print:grid grid-cols-2 gap-8 pt-12 mt-12 border-t border-slate-300 text-center text-xs">
          <div>
            <div className="w-48 h-0.5 bg-slate-800 mx-auto mb-2"></div>
            <p className="font-bold">Lic. Jacquelin Edith Vicente Condor</p>
            <p className="text-slate-600">Docente del Área de Ciencias Sociales</p>
            <p className="text-slate-500">I.E. República de Argentina — Villa de Pasco</p>
          </div>
          <div>
            <div className="w-48 h-0.5 bg-slate-800 mx-auto mb-2"></div>
            <p className="font-bold">{result.studentAlias}</p>
            <p className="text-slate-600">Estudiante de 1.° de Secundaria ({result.studentSection})</p>
            <p className="text-slate-500">Firma de conformidad del estudiante</p>
          </div>
        </div>

        {/* Action Controls for Interactive Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
              title="Descargar o imprimir reporte en PDF"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Descargar Reporte PDF / Imprimir</span>
            </button>
            <button
              onClick={onRetry}
              className="px-4 py-2.5 border-2 border-blue-900 text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Evaluación</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToMenu}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-900" />
              <span>Volver al Menú Temático</span>
            </button>
            <button
              onClick={onGoToTeacher}
              className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-amber-300 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Panel Docente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
