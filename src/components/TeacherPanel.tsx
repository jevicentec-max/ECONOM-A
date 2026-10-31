import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Download, 
  Users, 
  Award, 
  Settings, 
  BarChart3, 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle2, 
  Save, 
  Database,
  FileSpreadsheet,
  RefreshCw
} from 'lucide-react';
import { EvaluationRecord, TeacherSettings } from '../types';
import { EducationalStorageService } from '../utils/storage';
import { CNEB_RUBRIC, AVATARS } from '../data/curriculum';
import { educationalAudio } from '../utils/audio';

interface TeacherPanelProps {
  onBackToApp: () => void;
  serverStatus: { online: boolean; database: string };
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({ onBackToApp, serverStatus }) => {
  const [results, setResults] = useState<EvaluationRecord[]>([]);
  const [settings, setSettings] = useState<TeacherSettings>(EducationalStorageService.getTeacherSettings());
  const [activeTab, setActiveTab] = useState<'records' | 'analytics' | 'settings'>('records');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load results from backend API or local cache
  const loadRecords = async () => {
    setIsLoading(true);
    const data = await EducationalStorageService.fetchAllResults();
    
    // If no records yet, provide initial classroom demo records to showcase the analytics
    if (data.length === 0) {
      const demoRecords: EvaluationRecord[] = [
        {
          id: 'demo-1',
          studentAlias: 'Kevin Quispe C.',
          studentSection: '1.° A',
          avatarIndex: 0,
          score: 20,
          correctCount: 3,
          errorCount: 0,
          timeSpentSeconds: 145,
          cnebLevel: 'AD',
          cnebDescription: CNEB_RUBRIC.AD.summary,
          completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          isOfficialMode: true,
          logs: []
        },
        {
          id: 'demo-2',
          studentAlias: 'Maricielo Huamán P.',
          studentSection: '1.° A',
          avatarIndex: 5,
          score: 18,
          correctCount: 3,
          errorCount: 0,
          timeSpentSeconds: 190,
          cnebLevel: 'AD',
          cnebDescription: CNEB_RUBRIC.AD.summary,
          completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          isOfficialMode: true,
          logs: []
        },
        {
          id: 'demo-3',
          studentAlias: 'Brayan Condor R.',
          studentSection: '1.° B',
          avatarIndex: 1,
          score: 15,
          correctCount: 2,
          errorCount: 1,
          timeSpentSeconds: 230,
          cnebLevel: 'A',
          cnebDescription: CNEB_RUBRIC.A.summary,
          completedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          isOfficialMode: true,
          logs: []
        },
        {
          id: 'demo-4',
          studentAlias: 'Yadhira Almerco S.',
          studentSection: '1.° B',
          avatarIndex: 2,
          score: 16,
          correctCount: 2,
          errorCount: 1,
          timeSpentSeconds: 210,
          cnebLevel: 'A',
          cnebDescription: CNEB_RUBRIC.A.summary,
          completedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
          isOfficialMode: true,
          logs: []
        },
        {
          id: 'demo-5',
          studentAlias: 'Jhair Mendoza T.',
          studentSection: '1.° C',
          avatarIndex: 4,
          score: 12,
          correctCount: 1,
          errorCount: 2,
          timeSpentSeconds: 275,
          cnebLevel: 'B',
          cnebDescription: CNEB_RUBRIC.B.summary,
          completedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
          isOfficialMode: false,
          logs: []
        }
      ];
      setResults(demoRecords);
    } else {
      setResults(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleSaveSettings = () => {
    EducationalStorageService.saveTeacherSettings(settings);
    educationalAudio.playSuccess();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  // Filter records
  const filteredResults = results.filter(r => {
    const matchesSearch = r.studentAlias.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'all' || r.studentSection === selectedSection;
    return matchesSearch && matchesSection;
  });

  // Calculate statistics
  const totalStudents = results.length;
  const avgScore = totalStudents > 0 
    ? (results.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(1) 
    : '0';
  const adCount = results.filter(r => r.cnebLevel === 'AD').length;
  const aCount = results.filter(r => r.cnebLevel === 'A').length;
  const bCount = results.filter(r => r.cnebLevel === 'B').length;
  const cCount = results.filter(r => r.cnebLevel === 'C').length;
  const passingRate = totalStudents > 0 
    ? Math.round(((adCount + aCount + bCount) / totalStudents) * 100) 
    : 0;

  // Export to CSV for SIAGIE / Registro Auxiliar Docente
  const exportToCsv = () => {
    const headers = [
      'ID Registro',
      'Estudiante (Apellidos y Nombres)',
      'Sección',
      'Puntaje Vigesimal (/20)',
      'Nivel CNEB',
      'Retos Aprobados',
      'Errores',
      'Tiempo (segundos)',
      'Modalidad',
      'Fecha Evaluacion'
    ];

    const rows = results.map(r => [
      r.id,
      `"${r.studentAlias.replace(/"/g, '""')}"`,
      r.studentSection,
      r.score,
      r.cnebLevel,
      r.correctCount,
      r.errorCount,
      r.timeSpentSeconds,
      r.isOfficialMode ? 'Calificada' : 'Formativa',
      new Date(r.completedAt).toLocaleString('es-PE')
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [
      headers.join(';'),
      ...rows.map(e => e.join(';'))
    ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Registro_Auxiliar_Economia_Accion_1Sec_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-6 max-w-6xl mx-auto px-4">
      {/* Top Banner */}
      <div className="bg-[#1E3A8A] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6 border-b-4 border-yellow-400">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl p-1.5 shadow flex items-center justify-center shrink-0">
              <img 
                src="/assets/insignia-oficial.jpg" 
                alt="Insignia oficial I.E. República de Argentina"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/insignia-oficial_f585c820.jpg';
                }}
              />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Módulo Docente de Gestión y Seguimiento de Aprendizajes
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Panel Docente: Lic. Jacquelin Edith Vicente Condor
              </h1>
              <p className="text-xs text-blue-200 mt-0.5">
                I.E. «República de Argentina» – Villa de Pasco · Área de Ciencias Sociales · 1.° de secundaria
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportToCsv}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-colors cursor-pointer"
              title="Descargar registro auxiliar en formato Excel/CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
              <span>Exportar CSV SIAGIE</span>
            </button>
            <button
              onClick={onBackToApp}
              className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 border border-blue-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Aplicación</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-blue-800">
          <button
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'records'
                ? 'bg-amber-400 text-blue-950 shadow'
                : 'text-blue-200 hover:bg-blue-800/80 hover:text-white'
            }`}
          >
            Registro de Calificaciones ({results.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-amber-400 text-blue-950 shadow'
                : 'text-blue-200 hover:bg-blue-800/80 hover:text-white'
            }`}
          >
            Analítica y Niveles CNEB
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-blue-950 shadow'
                : 'text-blue-200 hover:bg-blue-800/80 hover:text-white'
            }`}
          >
            Configuración de Evaluación
          </button>
        </div>
      </div>

      {/* TAB 1: Student Records Table */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
          {/* Controls bar: search and filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nombre o alias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700">Sección:</span>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:border-blue-900 outline-none"
              >
                <option value="all">Todas las secciones (1.° A, B, C)</option>
                <option value="1.° A">1.° A</option>
                <option value="1.° B">1.° B</option>
                <option value="1.° C">1.° C</option>
              </select>

              <button
                onClick={loadRecords}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Actualizar registros"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Estudiante / Avatar</th>
                  <th className="py-3 px-4">Sección</th>
                  <th className="py-3 px-4 text-center">Nota /20</th>
                  <th className="py-3 px-4 text-center">Nivel CNEB</th>
                  <th className="py-3 px-4 text-center">Aciertos/Errores</th>
                  <th className="py-3 px-4 text-center">Tiempo</th>
                  <th className="py-3 px-4">Modalidad</th>
                  <th className="py-3 px-4">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.length > 0 ? (
                  filteredResults.map((rec) => {
                    const av = AVATARS[rec.avatarIndex] || AVATARS[0];
                    return (
                      <tr key={rec.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <span className="text-xl">{av.icon}</span>
                          <div>
                            <span className="block">{rec.studentAlias}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{av.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">{rec.studentSection}</td>
                        <td className="py-3 px-4 text-center font-black text-sm text-[#1E3A8A]">
                          {rec.score}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span 
                            className="font-black px-2 py-0.5 rounded text-[11px]"
                            style={{
                              backgroundColor: `${CNEB_RUBRIC[rec.cnebLevel].badgeColor}20`,
                              color: CNEB_RUBRIC[rec.cnebLevel].badgeColor
                            }}
                          >
                            {rec.cnebLevel}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-600">
                          <span className="text-emerald-700 font-bold">{rec.correctCount}</span> /{' '}
                          <span className="text-red-600 font-bold">{rec.errorCount}</span>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-600 font-medium">
                          {Math.floor(rec.timeSpentSeconds / 60)}m {rec.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {rec.isOfficialMode ? (
                            <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              Calificada
                            </span>
                          ) : (
                            <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              Formativa
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px]">
                          {new Date(rec.completedAt).toLocaleDateString('es-PE', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                      No se encontraron registros de estudiantes con los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Analytics & CNEB Breakdown */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Estudiantes Evaluados</span>
              <div className="text-3xl font-black text-blue-900 mt-1">{totalStudents}</div>
              <span className="text-[11px] text-slate-500">1.° de secundaria</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Promedio General</span>
              <div className="text-3xl font-black text-[#1E3A8A] mt-1">{avgScore} <span className="text-xs text-slate-400">/20</span></div>
              <span className="text-[11px] text-slate-500">Escala vigesimal</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Tasa de Aprobación</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{passingRate}%</div>
              <span className="text-[11px] text-slate-500">Notas &ge; 11 (AD, A, B)</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Logro Destacado (AD)</span>
              <div className="text-3xl font-black text-amber-500 mt-1">{adCount}</div>
              <span className="text-[11px] text-slate-500">Puntajes 18 a 20</span>
            </div>
          </div>

          {/* CNEB Levels Distribution Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-900" />
              Distribución por Niveles de Logro del Currículo Nacional (CNEB)
            </h3>

            <div className="space-y-4">
              {[
                { level: 'AD', label: 'Logro Destacado (18 - 20 pts)', count: adCount, color: 'bg-emerald-600' },
                { level: 'A', label: 'Logro Esperado (14 - 17 pts)', count: aCount, color: 'bg-blue-800' },
                { level: 'B', label: 'En Proceso (11 - 13 pts)', count: bCount, color: 'bg-amber-500' },
                { level: 'C', label: 'En Inicio (00 - 10 pts)', count: cCount, color: 'bg-red-500' },
              ].map((item) => {
                const percent = totalStudents > 0 ? Math.round((item.count / totalStudents) * 100) : 0;
                return (
                  <div key={item.level}>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700">
                        Nivel {item.level}: {item.label}
                      </span>
                      <span className="text-slate-900">
                        {item.count} estudiantes ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`${item.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Evaluation Settings (Prompt 6 requirement) */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Configuración de Evaluación y Retos
            </h3>
            <p className="text-xs text-slate-600">
              Personaliza las reglas de evaluación de la Pantalla 16 para adaptarlas a la planificación curricular de la Lic. Jacquelin Vicente.
            </p>
          </div>

          <div className="space-y-5 pt-2">
            {/* Evaluation Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Modalidad Predeterminada de la Pantalla 16:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSettings(s => ({ ...s, evaluationMode: 'formativa' }))}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    settings.evaluationMode === 'formativa'
                      ? 'border-blue-900 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-900/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-sm font-black mb-1">Modo Formativo (Con Pistas)</div>
                  <div className="text-xs font-normal text-slate-600">
                    Permite hasta 3 intentos por reto y muestra pistas pedagógicas progresivas antes de calificar.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSettings(s => ({ ...s, evaluationMode: 'calificada' }))}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    settings.evaluationMode === 'calificada'
                      ? 'border-purple-800 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-800/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-sm font-black mb-1">Modo Examen Calificado</div>
                  <div className="text-xs font-normal text-slate-600">
                    Sin pistas inmediatas; evalúa al primer intento para registrar nota oficial en el SIAGIE.
                  </div>
                </button>
              </div>
            </div>

            {/* Reto weights (7 + 6 + 7 = 20) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Ponderación de los 3 Retos (Total: {settings.challenge1Weight + settings.challenge2Weight + settings.challenge3Weight} / 20 puntos):
              </span>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reto 1 (Sectores):</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={settings.challenge1Weight}
                    onChange={(e) => setSettings(s => ({ ...s, challenge1Weight: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Puntos</span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reto 2 (Agentes):</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={settings.challenge2Weight}
                    onChange={(e) => setSettings(s => ({ ...s, challenge2Weight: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Puntos</span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reto 3 (Cadena Textil):</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={settings.challenge3Weight}
                    onChange={(e) => setSettings(s => ({ ...s, challenge3Weight: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Puntos</span>
                </div>
              </div>
            </div>

            {/* Retries allowed */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Permitir Reintentos al Estudiante</span>
                <span className="text-[11px] text-slate-500">Los alumnos pueden volver a realizar los retos tras ver sus resultados.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.allowRetries}
                onChange={(e) => setSettings(s => ({ ...s, allowRetries: e.target.checked }))}
                className="w-5 h-5 accent-blue-900 rounded cursor-pointer"
              />
            </div>

            {/* Save notice */}
            {isSavedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Configuración docente guardada exitosamente y sincronizada en el sistema!</span>
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-6 py-2.5 bg-[#1E3A8A] hover:bg-blue-800 text-white font-black text-xs rounded-xl shadow flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios de Configuración</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
