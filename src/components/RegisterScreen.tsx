import React, { useState } from 'react';
import { User, Shield, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { AVATARS } from '../data/curriculum';
import { StudentProfile } from '../types';
import { educationalAudio } from '../utils/audio';

interface RegisterScreenProps {
  initialStudent: StudentProfile | null;
  onSaveStudent: (alias: string, section: string, avatarIndex: number) => void;
  onBack: () => void;
  onGoToTeacher: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  initialStudent,
  onSaveStudent,
  onBack,
  onGoToTeacher
}) => {
  const [alias, setAlias] = useState<string>(initialStudent?.alias || '');
  const [section, setSection] = useState<string>(initialStudent?.section || '1.° A');
  const [selectedAvatar, setSelectedAvatar] = useState<number>(initialStudent?.avatarIndex ?? 0);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAlias = alias.trim();

    // Validation: 2 to 40 characters, letters, numbers, spaces, dots, hyphens, accented characters
    const validRegex = /^[\p{L}\p{N} .'-]{2,40}$/u;

    if (!validRegex.test(cleanAlias)) {
      setErrorMsg('Por favor escribe un nombre o alias válido (de 2 a 40 caracteres, solo letras, números, espacios o guiones).');
      educationalAudio.playError();
      return;
    }

    setErrorMsg('');
    educationalAudio.playSuccess();
    onSaveStudent(cleanAlias, section, selectedAvatar);
  };

  return (
    <div className="py-6 max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-blue-900/20">
        {/* Header indicator */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Pantalla 2 · Registro del Estudiante
          </span>
          <span className="text-xs text-slate-500 font-medium">I.E. República de Argentina</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A8A] mb-2">
          ¡Bienvenido a Economía en Acción!
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Escribe tu nombre o alias y elige tu avatar temático representativo de la economía de Villa de Pasco para comenzar a explorar los contenidos.
        </p>

        <form onSubmit={validateAndSubmit} className="space-y-6">
          {/* Alias / Name Input */}
          <div>
            <label htmlFor="aliasInput" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Nombre, Apellido o Alias del Estudiante:
            </label>
            <div className="relative">
              <input
                id="aliasInput"
                type="text"
                maxLength={40}
                value={alias}
                onChange={(e) => {
                  setAlias(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Ejemplo: Jean Carlos M."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-900 focus:ring-4 focus:ring-blue-100 outline-none text-slate-800 font-semibold text-base transition-all"
                autoComplete="off"
                required
              />
              <User className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Entre 2 y 40 caracteres. Tu nombre se utilizará en los reportes de evaluación y calificaciones.
            </p>
          </div>

          {/* Section Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Grado y Sección (1.° de Secundaria):
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['1.° A', '1.° B', '1.° C'].map((sec) => (
                <button
                  type="button"
                  key={sec}
                  onClick={() => setSection(sec)}
                  className={`py-2.5 px-3 rounded-xl border-2 font-bold text-sm transition-all ${
                    section === sec
                      ? 'border-blue-900 bg-blue-900 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Elige tu Avatar Temático de Villa de Pasco:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.id;
                return (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => {
                      setSelectedAvatar(av.id);
                      educationalAudio.playHint();
                    }}
                    aria-pressed={isSelected}
                    className={`p-3 rounded-2xl border-2 text-left transition-all duration-150 flex flex-col items-center justify-center text-center ${
                      isSelected
                        ? 'border-blue-900 bg-blue-50/80 shadow ring-2 ring-blue-900/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{av.icon}</span>
                    <span className="font-bold text-xs text-blue-950 block">{av.name}</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{av.desc}</span>
                    {isSelected && (
                      <span className="mt-1.5 text-[10px] bg-blue-900 text-white font-bold px-2 py-0.5 rounded-full">
                        Seleccionado
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Portada</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <span>Continuar al Menú Principal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Alternate Teacher Portal trigger */}
        <div className="mt-6 pt-4 text-center border-t border-slate-100">
          <button
            onClick={onGoToTeacher}
            className="text-xs text-blue-900 hover:text-blue-700 font-semibold underline underline-offset-2 flex items-center justify-center gap-1.5 mx-auto"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>¿Eres docente? Haz clic aquí para ingresar al Panel de la Lic. Jacquelin Vicente</span>
          </button>
        </div>
      </div>
    </div>
  );
};
