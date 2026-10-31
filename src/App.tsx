import React, { useState, useEffect } from 'react';
import { ScreenId, StudentProfile, EvaluationRecord, TeacherSettings } from './types';
import { ALL_TOPICS } from './data/curriculum';
import { EducationalStorageService } from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScreenNavModal } from './components/ScreenNavModal';
import { FlowchartModal } from './components/FlowchartModal';
import { CoverScreen } from './components/CoverScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { MenuScreen } from './components/MenuScreen';
import { TopicScreen } from './components/TopicScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { TeacherPanel } from './components/TeacherPanel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('cover');
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>(EducationalStorageService.getTeacherSettings());
  const [lastResult, setLastResult] = useState<EvaluationRecord | null>(null);
  
  // Modals
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);
  const [isFlowchartOpen, setIsFlowchartOpen] = useState<boolean>(false);
  
  // Server connectivity status
  const [serverStatus, setServerStatus] = useState<{ online: boolean; database: string }>({
    online: true,
    database: 'Node.js Express + LAN Database'
  });

  // Initialize data on mount
  useEffect(() => {
    const cachedStudent = EducationalStorageService.getCachedStudent();
    if (cachedStudent) {
      setStudent(cachedStudent);
    }
    const cachedProgress = EducationalStorageService.getCompletedTopics();
    setCompletedTopics(cachedProgress);

    const cachedResults = EducationalStorageService.getCachedEvaluationResults();
    if (cachedResults.length > 0) {
      setLastResult(cachedResults[0]);
    }

    // Check server health
    EducationalStorageService.checkServerHealth().then(status => {
      setServerStatus(status);
    });
  }, []);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveStudent = async (alias: string, section: string, avatarIndex: number) => {
    const profile = await EducationalStorageService.registerOrLoginStudent(alias, section, avatarIndex);
    setStudent(profile);
    handleNavigate('menu');
  };

  const handleTopicCompleted = (topicId: number) => {
    const updated = EducationalStorageService.markTopicCompleted(topicId);
    setCompletedTopics(updated);
  };

  const handleFinishQuiz = async (record: EvaluationRecord) => {
    setLastResult(record);
    await EducationalStorageService.submitEvaluation(record);
    handleNavigate('results');
  };

  // Helper to parse topic screen
  const isTopicScreen = currentScreen.startsWith('topic-');
  const currentTopicId = isTopicScreen ? parseInt(currentScreen.replace('topic-', ''), 10) : 0;
  const currentTopic = ALL_TOPICS[currentTopicId] || ALL_TOPICS[0];

  return (
    <div className="min-h-screen bg-[#EDF3FC] flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-200 selection:text-blue-900">
      {/* Top Institutional Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        student={student}
        onOpenNavModal={() => setIsNavModalOpen(true)}
        onOpenFlowchart={() => setIsFlowchartOpen(true)}
        serverStatus={serverStatus}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full" aria-live="polite">
        {currentScreen === 'cover' && (
          <CoverScreen
            onStart={() => handleNavigate(student ? 'menu' : 'register')}
            onOpenTeacher={() => handleNavigate('teacher')}
            onOpenNav={() => setIsNavModalOpen(true)}
          />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen
            initialStudent={student}
            onSaveStudent={handleSaveStudent}
            onBack={() => handleNavigate('cover')}
            onGoToTeacher={() => handleNavigate('teacher')}
          />
        )}

        {currentScreen === 'menu' && (
          <MenuScreen
            student={student}
            completedTopics={completedTopics}
            onSelectTopic={(topicId) => handleNavigate(`topic-${topicId}` as ScreenId)}
            onGoToQuiz={() => handleNavigate('quiz')}
            onChangeProfile={() => handleNavigate('register')}
            onGoToCover={() => handleNavigate('cover')}
          />
        )}

        {isTopicScreen && (
          <TopicScreen
            topic={currentTopic}
            completedTopics={completedTopics}
            onTopicCompleted={handleTopicCompleted}
            onNavigateTopic={(topicId) => handleNavigate(`topic-${topicId}` as ScreenId)}
            onGoToMenu={() => handleNavigate('menu')}
            onGoToQuiz={() => handleNavigate('quiz')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            student={student}
            teacherSettings={teacherSettings}
            onFinishQuiz={handleFinishQuiz}
            onGoToMenu={() => handleNavigate('menu')}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            result={
              lastResult || {
                id: 'eval-fallback',
                studentAlias: student?.alias || 'Estudiante',
                studentSection: student?.section || '1.° A',
                avatarIndex: student?.avatarIndex ?? 0,
                score: 20,
                correctCount: 3,
                errorCount: 0,
                timeSpentSeconds: 120,
                cnebLevel: 'AD',
                cnebDescription: 'Logro Destacado en el área de Ciencias Sociales.',
                completedAt: new Date().toISOString(),
                isOfficialMode: true,
                logs: []
              }
            }
            student={student}
            onRetry={() => handleNavigate('quiz')}
            onGoToMenu={() => handleNavigate('menu')}
            onGoToTeacher={() => handleNavigate('teacher')}
          />
        )}

        {currentScreen === 'teacher' && (
          <TeacherPanel
            onBackToApp={() => handleNavigate('cover')}
            serverStatus={serverStatus}
          />
        )}

        {currentScreen === 'flowchart' && (
          <div className="py-8 max-w-4xl mx-auto px-4">
            <FlowchartModal
              isOpen={true}
              onClose={() => handleNavigate('cover')}
            />
          </div>
        )}
      </main>

      {/* Global Navigation Modal for all 17 screens */}
      <ScreenNavModal
        isOpen={isNavModalOpen}
        onClose={() => setIsNavModalOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        completedTopics={completedTopics}
      />

      {/* Flowchart Diagram Modal */}
      <FlowchartModal
        isOpen={isFlowchartOpen}
        onClose={() => setIsFlowchartOpen(false)}
      />

      {/* Bottom Institutional Footer */}
      <Footer />
    </div>
  );
}
