export type ScreenId =
  | 'cover'       // Pantalla 1
  | 'register'    // Pantalla 2
  | 'menu'        // Pantalla 3
  | 'topic-0'     // Pantalla 4: Necesidades humanas
  | 'topic-1'     // Pantalla 5: Bienes económicos
  | 'topic-2'     // Pantalla 6: Los servicios
  | 'topic-3'     // Pantalla 7: Sector primario
  | 'topic-4'     // Pantalla 8: Sector secundario
  | 'topic-5'     // Pantalla 9: Sector terciario
  | 'topic-6'     // Pantalla 10: Las familias como agentes
  | 'topic-7'     // Pantalla 11: Las empresas como agentes
  | 'topic-8'     // Pantalla 12: El Estado como agente
  | 'topic-9'     // Pantalla 13: Ganadería y minería en Pasco
  | 'topic-10'    // Pantalla 14: Comercio y transporte en Pasco
  | 'topic-11'    // Pantalla 15: Relaciones económicas e interdependencia
  | 'quiz'        // Pantalla 16: Actividades y evaluación
  | 'results'     // Pantalla 17: Resultados y retroalimentación
  | 'teacher'     // Panel de Docente
  | 'flowchart';  // Diagrama de Flujo (Prompt 1)

export interface ThematicTopic {
  id: number;
  screenNumber: number; // 4 to 15
  unitIndex: number;
  title: string;
  shortConcept: string;
  pascoExample: string;
  icon: string;
  accentColor: string;
  microActivity: {
    question: string;
    options: string[];
    correctIndex: number;
    hint1: string;
    hint2: string;
    explanation: string;
  };
}

export interface ThematicUnit {
  id: number;
  title: string;
  description: string;
  icon: string;
  topics: ThematicTopic[];
}

export interface StudentProfile {
  id?: string;
  alias: string;
  section: string; // '1.° A' | '1.° B' | '1.° C'
  avatarIndex: number;
  registeredAt: string;
}

export interface QuizAttemptLog {
  challengeId: number;
  challengeName: string;
  userAnswer: string;
  isCorrect: boolean;
  scoreAwarded: number;
  attemptsUsed: number;
}

export interface EvaluationRecord {
  id: string;
  studentAlias: string;
  studentSection: string;
  avatarIndex: number;
  score: number; // 0 - 20
  correctCount: number;
  errorCount: number;
  timeSpentSeconds: number;
  cnebLevel: 'AD' | 'A' | 'B' | 'C';
  cnebDescription: string;
  completedAt: string;
  isOfficialMode: boolean;
  logs: QuizAttemptLog[];
}

export interface TeacherSettings {
  allowRetries: boolean;
  maxRetries: number;
  evaluationMode: 'formativa' | 'calificada';
  challenge1Weight: number; // default 7
  challenge2Weight: number; // default 6
  challenge3Weight: number; // default 7
  passingScore: number;     // default 11
}
