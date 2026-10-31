import { StudentProfile, EvaluationRecord, TeacherSettings } from '../types';

const STORAGE_KEY_STUDENT = 'economia_accion_student_profile';
const STORAGE_KEY_PROGRESS = 'economia_accion_progress';
const STORAGE_KEY_RESULTS = 'economia_accion_results_cache';
const STORAGE_KEY_SETTINGS = 'economia_accion_teacher_settings';

export const DEFAULT_TEACHER_SETTINGS: TeacherSettings = {
  allowRetries: true,
  maxRetries: 3,
  evaluationMode: 'formativa',
  challenge1Weight: 7,
  challenge2Weight: 6,
  challenge3Weight: 7,
  passingScore: 11
};

export class EducationalStorageService {
  private static isBackendAvailable: boolean = true;

  // Local caching helpers
  public static getCachedStudent(): StudentProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_STUDENT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static setCachedStudent(student: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
    } catch {}
  }

  public static getCompletedTopics(): number[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static markTopicCompleted(topicId: number): number[] {
    const current = this.getCompletedTopics();
    if (!current.includes(topicId)) {
      const updated = [...current, topicId];
      try {
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
      } catch {}
      return updated;
    }
    return current;
  }

  public static getTeacherSettings(): TeacherSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return data ? { ...DEFAULT_TEACHER_SETTINGS, ...JSON.parse(data) } : DEFAULT_TEACHER_SETTINGS;
    } catch {
      return DEFAULT_TEACHER_SETTINGS;
    }
  }

  public static saveTeacherSettings(settings: TeacherSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {}
  }

  public static getCachedEvaluationResults(): EvaluationRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Network / LAN sync methods
  public static async checkServerHealth(): Promise<{ online: boolean; database: string }> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const body = await res.json();
        return { online: true, database: body.database || 'LAN Memory / SQLite' };
      }
    } catch {}
    return { online: false, database: 'Local Offline Browser Mode' };
  }

  public static async registerOrLoginStudent(alias: string, section: string, avatarIndex: number): Promise<StudentProfile> {
    const student: StudentProfile = {
      alias: alias.trim(),
      section,
      avatarIndex,
      registeredAt: new Date().toISOString()
    };
    this.setCachedStudent(student);

    // Try sending to Express server
    try {
      const res = await fetch('/api/auth/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (res.ok) {
        const body = await res.json();
        if (body.student) {
          this.setCachedStudent(body.student);
          return body.student;
        }
      }
    } catch {
      // In offline LAN mode, cached data is used
    }
    return student;
  }

  public static async submitEvaluation(result: EvaluationRecord): Promise<boolean> {
    // Save locally
    const currentResults = this.getCachedEvaluationResults();
    const updated = [result, ...currentResults];
    try {
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated));
    } catch {}

    // Send to central Express/PostgreSQL server
    try {
      const res = await fetch('/api/evaluations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  public static async fetchAllResults(): Promise<EvaluationRecord[]> {
    try {
      const res = await fetch('/api/teacher/results');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.results)) {
          return data.results;
        }
      }
    } catch {}
    return this.getCachedEvaluationResults();
  }
}
