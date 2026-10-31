import React, { useState } from 'react';
import { Play, Volume2, ArrowRight, Sparkles, BookOpen, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { educationalAudio } from '../utils/audio';

interface CoverScreenProps {
  onStart: () => void;
  onOpenTeacher: () => void;
  onOpenNav: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart, onOpenTeacher, onOpenNav }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [vol, setVol] = useState<number>(25);

  const handleToggleAudio = () => {
    const active = educationalAudio.toggleMusic();
    setIsPlaying(active);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVol(val);
    educationalAudio.setVolume(val);
  };

  const localHighlights = [
    { icon: '🦙', title: 'Ganadería Altoandina', desc: 'Crianza de alpacas y ovinos en las praderas de Villa de Pasco', sector: 'Sector Primario' },
    { icon: '⛏️', title: 'Actividad Minera', desc: 'Extracción de minerales polimetálicos en la región Pasco', sector: 'Sector Primario' },
    { icon: '🌾', title: 'Agricultura de Altura', desc: 'Cultivos resistentes de papa nativa y maca a más de 4,000 m', sector: 'Sector Primario' },
    { icon: '🏭', title: 'Transformación Textil', desc: 'Hilado y confección de abrigadoras chompas y frazadas de lana', sector: 'Sector Secundario' },
    { icon: '🛒', title: 'Ferias y Comercio', desc: 'Intercambio comercial en ferias semanales de Chaupimarca y distritos', sector: 'Sector Terciario' },
    { icon: '🚌', title: 'Transporte y Rutas', desc: 'Conectividad de pasajeros y carga por la Carretera Central', sector: 'Sector Terciario' },
  ];

  return (
    <div className="py-6 max-w-5xl mx-auto px-4">
      {/* Hero Presentation */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-2 border-blue-900/20 text-center relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900" />

        {/* Institution Badge & Crest */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-2 shadow-lg border-2 border-blue-900 flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <img 
              src="/assets/insignia-oficial.jpg" 
              alt="Insignia oficial I.E. República de Argentina, Villa de Pasco"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/aistudio/insignia-oficial_f585c820.jpg';
              }}
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            I.E. «República de Argentina» · Villa de Pasco
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Distrito de Tinyahuarco · Provincia y Región de Pasco · 4,338 m s.n.m.</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-[#1E3A8A] tracking-tight mb-3">
          ¡ECONOMÍA EN ACCIÓN!
        </h1>
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
          Descubrimos los sectores productivos y los agentes económicos a través de la realidad de nuestra comunidad
        </p>

        {/* Course metadata */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 mt-4 mb-8">
          <span className="font-semibold text-blue-900 bg-slate-100 px-3 py-1 rounded-md">Ciencias Sociales</span>
          <span>·</span>
          <span className="font-semibold text-blue-900 bg-slate-100 px-3 py-1 rounded-md">1.° Grado de Secundaria</span>
          <span>·</span>
          <span className="text-amber-800 bg-amber-50 px-3 py-1 rounded-md font-medium border border-amber-200">
            Docente: Lic. Jacquelin Edith Vicente Condor
          </span>
        </div>

        {/* Local Economic Sectors Showcase */}
        <div className="mb-8">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Explora las actividades económicas reales de Villa de Pasco
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {localHighlights.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl p-3 text-center transition-all duration-200 hover:-translate-y-1 shadow-sm"
              >
                <div className="text-3xl mb-1.5">{item.icon}</div>
                <div className="font-bold text-xs text-blue-950 mb-0.5 leading-tight">{item.title}</div>
                <div className="text-[10px] text-amber-700 font-bold">{item.sector}</div>
                <p className="text-[10px] text-slate-700 mt-1 line-clamp-2 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Ambient Player Control (Screen 1 Requirement) */}
        <div className="max-w-md mx-auto bg-blue-50/80 border border-blue-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isPlaying
                  ? 'bg-amber-400 text-blue-950 hover:bg-amber-300 ring-2 ring-amber-400/50'
                  : 'bg-[#1E3A8A] text-white hover:bg-blue-800'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-blue-950' : 'fill-white'}`} />
              <span>{isPlaying ? 'Pausar Melodía Andina' : '▶ Activar Música Ambiental'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-700">
            <Volume2 className="w-4 h-4 text-blue-900" />
            <input
              type="range"
              min="0"
              max="100"
              value={vol}
              onChange={handleVolume}
              className="w-24 accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              title="Volumen musical"
            />
            <span className="font-bold w-7 text-right">{vol}%</span>
          </div>
        </div>

        {/* Main Animated Start CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 animate-pulse border-2 border-yellow-500 cursor-pointer"
          >
            <span>INICIAR APRENDIZAJE</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenTeacher}
            className="w-full sm:w-auto px-6 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-2xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer border border-blue-700"
          >
            <GraduationCap className="w-4 h-4 text-yellow-300" />
            <span>Panel de la Docente</span>
          </button>
        </div>

        {/* Pedagogical info banner */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            17 Pantallas Educativas Integradas
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Evaluación Vigesimal (0-20) y Rúbrica CNEB
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Funciona 100% en Red Local LAN sin Internet
          </span>
        </div>
      </div>
    </div>
  );
};
