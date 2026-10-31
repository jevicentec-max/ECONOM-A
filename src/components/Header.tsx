import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Compass, GraduationCap, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { ScreenId, StudentProfile } from '../types';
import { AVATARS } from '../data/curriculum';
import { educationalAudio } from '../utils/audio';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  student: StudentProfile | null;
  onOpenNavModal: () => void;
  onOpenFlowchart: () => void;
  serverStatus: { online: boolean; database: string };
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  student,
  onOpenNavModal,
  onOpenFlowchart,
  serverStatus
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(25);

  const toggleMusic = () => {
    const active = educationalAudio.toggleMusic();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    educationalAudio.setVolume(val);
  };

  const currentAvatar = student ? AVATARS[student.avatarIndex] : null;

  return (
    <header className="bg-[#1E3A8A] text-white shadow-md border-b-4 border-[#FACC15]">
      {/* Top Banner with official insignia */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Insignia & School Info */}
        <div 
          onClick={() => onNavigate('cover')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Ir a la Portada"
        >
          <div className="w-14 h-14 bg-white rounded-lg p-1 shadow flex items-center justify-center shrink-0 border border-blue-200">
            <img 
              src="/assets/insignia-oficial.jpg" 
              alt="Insignia oficial I.E. República de Argentina, Villa de Pasco" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to alternative path if needed
                (e.target as HTMLImageElement).src = '/assets/aistudio/insignia-oficial_f585c820.jpg';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider text-[#FACC15] group-hover:text-yellow-300 transition-colors">
                ECONOMÍA EN ACCIÓN
              </span>
              <span className="text-xs bg-blue-800/80 text-blue-200 px-2 py-0.5 rounded border border-blue-700 hidden sm:inline-block">
                1.° Secundaria
              </span>
            </div>
            <p className="text-xs text-blue-100 font-medium">
              I.E. «República de Argentina» – Villa de Pasco · Ciencias Sociales
            </p>
            <p className="text-[11px] text-blue-200/80">
              Docente: Lic. Jacquelin Edith Vicente Condor
            </p>
          </div>
        </div>

        {/* Right: Audio Controls, Student/Teacher status, and Navigation Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Audio Synthesizer */}
          <div className="flex items-center gap-2 bg-blue-950/60 rounded-lg px-2.5 py-1.5 border border-blue-700/60 text-xs">
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-1.5 px-2 py-1 rounded font-medium transition-all ${
                isPlaying 
                  ? 'bg-amber-400 text-blue-950 shadow-sm font-bold' 
                  : 'bg-blue-800 hover:bg-blue-700 text-white'
              }`}
              title={isPlaying ? 'Pausar música ambiental' : 'Reproducir música pentatónica andina'}
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? 'Pausar' : 'Música'}</span>
            </button>
            <div className="flex items-center gap-1">
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-blue-300" /> : <Volume2 className="w-3.5 h-3.5 text-blue-300" />}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-16 accent-amber-400 cursor-pointer h-1.5 bg-blue-800 rounded-lg"
                title={`Volumen: ${volume}%`}
              />
            </div>
          </div>

          {/* Student Status or Teacher Badge */}
          {student ? (
            <div className="flex items-center gap-1.5 bg-blue-800/80 border border-blue-600 px-2.5 py-1.5 rounded-lg text-xs">
              <span className="text-base" role="img" aria-label={currentAvatar?.name}>
                {currentAvatar?.icon || '🧑‍🎓'}
              </span>
              <div className="text-left leading-tight">
                <span className="font-bold text-white block max-w-[100px] truncate">{student.alias}</span>
                <span className="text-[10px] text-yellow-300 font-semibold">{student.section || '1.° Sec'}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('register')}
              className="text-xs bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              Registrarse
            </button>
          )}

          {/* Direct Screen Navigator */}
          <button
            onClick={onOpenNavModal}
            className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white border border-blue-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            title="Mapa de 17 Pantallas"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">17 Pantallas</span>
          </button>

          {/* Prompt 1 Flowchart */}
          <button
            onClick={onOpenFlowchart}
            className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white border border-blue-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            title="Ver Flujograma General (Prompt 1)"
          >
            <span className="hidden sm:inline">Flujograma</span>
          </button>

          {/* Teacher Mode Button */}
          <button
            onClick={() => onNavigate('teacher')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentScreen === 'teacher'
                ? 'bg-amber-400 text-blue-950 shadow'
                : 'bg-blue-950 hover:bg-blue-900 text-amber-300 border border-amber-400/50'
            }`}
            title="Panel Docente de Evaluación y Calificaciones"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Docente</span>
          </button>
        </div>
      </div>

      {/* Sub-bar: Server / LAN connectivity notice */}
      <div className="bg-blue-950/90 text-blue-200 text-[11px] px-4 py-1 flex items-center justify-between border-t border-blue-800/60 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          {serverStatus.online ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Wifi className="w-3 h-3" />
              <span>Red LAN Escolar Conectada ({serverStatus.database})</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <WifiOff className="w-3 h-3" />
              <span>Modo Autónomo Local (Funciona 100% sin Internet)</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span>Villa de Pasco · Región Pasco</span>
          <span className="text-amber-400">Competencia: Gestiona responsablemente los recursos económicos</span>
        </div>
      </div>
    </header>
  );
};
