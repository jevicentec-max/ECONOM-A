import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  Lightbulb, 
  RotateCcw, 
  BookOpen, 
  MapPin, 
  Sparkles,
  Info
} from 'lucide-react';
import { ThematicTopic } from '../types';
import { UNITS_DATA, ALL_TOPICS } from '../data/curriculum';
import { educationalAudio } from '../utils/audio';

interface TopicScreenProps {
  topic: ThematicTopic;
  completedTopics: number[];
  onTopicCompleted: (topicId: number) => void;
  onNavigateTopic: (topicId: number) => void;
  onGoToMenu: () => void;
  onGoToQuiz: () => void;
}

export const TopicScreen: React.FC<TopicScreenProps> = ({
  topic,
  completedTopics,
  onTopicCompleted,
  onNavigateTopic,
  onGoToMenu,
  onGoToQuiz
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'good' | 'hint' | 'final'; text: string } | null>(null);

  const isAlreadyCompleted = completedTopics.includes(topic.id);
  const unit = UNITS_DATA[topic.unitIndex];
  const totalTopics = ALL_TOPICS.length; // 12
  const currentStep = topic.id + 1; // 1 to 12

  // Reset local state when topic changes
  useEffect(() => {
    setSelectedOption(null);
    setAttempts(0);
    setIsAnswered(isAlreadyCompleted);
    setIsCorrect(isAlreadyCompleted);
    setFeedbackMsg(isAlreadyCompleted ? {
      type: 'good',
      text: '¡Tema previamente completado! Puedes repasar la microactividad las veces que desees.'
    } : null);
  }, [topic.id, isAlreadyCompleted]);

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === topic.microActivity.correctIndex;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (correct) {
      setIsCorrect(true);
      setIsAnswered(true);
      setFeedbackMsg({
        type: 'good',
        text: topic.microActivity.explanation
      });
      educationalAudio.playSuccess();
      onTopicCompleted(topic.id);
    } else {
      educationalAudio.playError();
      if (newAttempts === 1) {
        setFeedbackMsg({
          type: 'hint',
          text: `Pista 1: ${topic.microActivity.hint1}`
        });
        educationalAudio.playHint();
      } else if (newAttempts === 2) {
        setFeedbackMsg({
          type: 'hint',
          text: `Pista 2 (Villa de Pasco): ${topic.microActivity.hint2}`
        });
        educationalAudio.playHint();
      } else {
        // 3rd attempt reached: format final resolution
        setIsAnswered(true);
        setIsCorrect(false);
        const correctText = topic.microActivity.options[topic.microActivity.correctIndex];
        setFeedbackMsg({
          type: 'final',
          text: `Respuesta correcta: «${correctText}». Explicación formativa: ${topic.microActivity.explanation}`
        });
        onTopicCompleted(topic.id);
      }
    }
  };

  const handleNext = () => {
    if (topic.id < totalTopics - 1) {
      onNavigateTopic(topic.id + 1);
    } else {
      onGoToQuiz();
    }
  };

  const handlePrev = () => {
    if (topic.id > 0) {
      onNavigateTopic(topic.id - 1);
    } else {
      onGoToMenu();
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4">
      {/* Top Breadcrumb & Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              Pantalla {topic.screenNumber} de 17
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {unit.title}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Tema {currentStep} de 12: <strong>{topic.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
            <div 
              className="bg-blue-800 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round((currentStep / totalTopics) * 100)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700">{currentStep}/12</span>
        </div>
      </div>

      {/* Main Educational Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-blue-900/20 mb-6">
        {/* Title & Icon Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Contenido Temático Contextualizado
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1E3A8A] tracking-tight">
              {topic.title}
            </h1>
          </div>
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0 border-2"
            style={{ backgroundColor: `${topic.accentColor}15`, borderColor: `${topic.accentColor}40` }}
          >
            {topic.icon}
          </div>
        </div>

        {/* Pedagogical 2-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Concept Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-blue-800" />
              <span>¿Qué aprenderemos?</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {topic.shortConcept}
            </p>
          </div>

          {/* Local Reality Box */}
          <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Ejemplo en Villa de Pasco</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {topic.pascoExample}
            </p>
          </div>
        </div>

        {/* Interactive Microactivity Section */}
        <div className="bg-blue-50/40 rounded-2xl p-5 border-2 border-blue-200/80 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                Microactividad: Comprueba tu aprendizaje
              </h2>
            </div>
            <div className="text-[11px] font-bold text-slate-500">
              Intentos usados: <span className="text-blue-900">{attempts} / 3</span>
            </div>
          </div>

          <p className="text-sm font-bold text-slate-900 mb-4">
            {topic.microActivity.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {topic.microActivity.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === topic.microActivity.correctIndex;

              let btnStyle = 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50 text-slate-800';
              if (isSelected && !isAnswered) {
                btnStyle = 'border-blue-900 bg-blue-100/70 text-blue-950 font-semibold ring-2 ring-blue-900/20';
              } else if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-950 line-through opacity-80';
                } else {
                  btnStyle = 'border-slate-200 bg-white text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  type="button"
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Verification trigger */}
          {!isAnswered && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
                className="px-6 py-2.5 bg-[#1E3A8A] disabled:bg-slate-300 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
              >
                Comprobar Respuesta
              </button>
            </div>
          )}

          {/* Feedback message box */}
          {feedbackMsg && (
            <div 
              className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200 ${
                feedbackMsg.type === 'good'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : feedbackMsg.type === 'hint'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-blue-50 border-blue-300 text-blue-950'
              }`}
            >
              {feedbackMsg.type === 'good' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : feedbackMsg.type === 'hint' ? (
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">
                <span className="font-bold block mb-0.5">
                  {feedbackMsg.type === 'good' ? '¡Muy bien!' : feedbackMsg.type === 'hint' ? 'Pista de apoyo:' : 'Resolución formativa:'}
                </span>
                <span>{feedbackMsg.text}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{topic.id === 0 ? 'Menú Principal' : 'Tema Anterior'}</span>
          </button>

          <button
            onClick={onGoToMenu}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Ver Menú y Temario
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <span>{topic.id === totalTopics - 1 ? 'Ir a Evaluación (Pantalla 16)' : 'Siguiente Tema'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
