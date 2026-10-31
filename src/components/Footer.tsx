import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-6 border-t-2 border-slate-800 text-xs mt-12 print:hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-bold text-white text-sm">
            PROYECTO EDUCATIVO: «ECONOMÍA EN ACCIÓN»
          </p>
          <p className="text-slate-400 mt-0.5">
            I.E. «República de Argentina» – Villa de Pasco · Área de Ciencias Sociales · 1.° de secundaria
          </p>
          <p className="text-amber-400/90 text-[11px] mt-1 font-medium">
            Docente Responsable: Lic. Jacquelin Edith Vicente Condor · Currículo Nacional (CNEB)
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end text-xs text-slate-400 gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold">Diseñado para funcionar sin Internet en red LAN</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Arquitectura compatible con Node.js, Express y PostgreSQL
          </p>
          <p className="text-[10px] text-slate-400">
            Villa de Pasco, Pasco, Perú · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
