import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-Memory store as a high-reliability fallback for school LAN without internet
interface EvaluationRecordBackend {
  id: string;
  studentAlias: string;
  studentSection: string;
  avatarIndex: number;
  score: number;
  correctCount: number;
  errorCount: number;
  timeSpentSeconds: number;
  cnebLevel: string;
  cnebDescription: string;
  completedAt: string;
  isOfficialMode: boolean;
  logs: any[];
}

const memoryStudents: any[] = [];
const memoryEvaluations: EvaluationRecordBackend[] = [
  {
    id: 'eval-init-1',
    studentAlias: 'Kevin Quispe C.',
    studentSection: '1.° A',
    avatarIndex: 0,
    score: 20,
    correctCount: 3,
    errorCount: 0,
    timeSpentSeconds: 145,
    cnebLevel: 'AD',
    cnebDescription: 'El estudiante evidencia un nivel sobresaliente en la competencia Gestiona responsablemente los recursos económicos.',
    completedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    isOfficialMode: true,
    logs: []
  },
  {
    id: 'eval-init-2',
    studentAlias: 'Maricielo Huamán P.',
    studentSection: '1.° A',
    avatarIndex: 5,
    score: 18,
    correctCount: 3,
    errorCount: 0,
    timeSpentSeconds: 190,
    cnebLevel: 'AD',
    cnebDescription: 'El estudiante evidencia un nivel sobresaliente en la competencia Gestiona responsablemente los recursos económicos.',
    completedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isOfficialMode: true,
    logs: []
  },
  {
    id: 'eval-init-3',
    studentAlias: 'Brayan Condor R.',
    studentSection: '1.° B',
    avatarIndex: 1,
    score: 15,
    correctCount: 2,
    errorCount: 1,
    timeSpentSeconds: 230,
    cnebLevel: 'A',
    cnebDescription: 'El estudiante demuestra el nivel esperado para 1.° de secundaria.',
    completedAt: new Date(Date.now() - 3600000 * 7).toISOString(),
    isOfficialMode: true,
    logs: []
  }
];

let memoryTeacherSettings = {
  allowRetries: true,
  maxRetries: 3,
  evaluationMode: 'formativa',
  challenge1Weight: 7,
  challenge2Weight: 6,
  challenge3Weight: 7,
  passingScore: 11
};

// PostgreSQL connection client (if DATABASE_URL is configured)
let pgPool: pg.Pool | null = null;
if (process.env.DATABASE_URL) {
  try {
    pgPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  } catch (err) {
    console.warn('PostgreSQL pool initialization skipped:', err);
  }
}

// API Routes
app.get('/api/health', async (_req, res) => {
  let dbStatus = 'LAN In-Memory Engine';
  if (pgPool) {
    try {
      await pgPool.query('SELECT 1');
      dbStatus = 'PostgreSQL Conectado';
    } catch {
      dbStatus = 'PostgreSQL Configurado (Reintentando)';
    }
  }
  res.json({
    status: 'ok',
    project: 'Economía en Acción — I.E. República de Argentina',
    teacher: 'Lic. Jacquelin Edith Vicente Condor',
    location: 'Villa de Pasco, Perú',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Student login / registration
app.post('/api/auth/student', async (req, res) => {
  const { alias, section, avatarIndex } = req.body;
  if (!alias || typeof alias !== 'string') {
    return res.status(400).json({ error: 'Nombre o alias es requerido' });
  }

  const cleanAlias = alias.trim().slice(0, 40);
  const student = {
    id: `std-${Date.now()}`,
    alias: cleanAlias,
    section: section || '1.° A',
    avatarIndex: Number(avatarIndex) || 0,
    registeredAt: new Date().toISOString()
  };

  memoryStudents.push(student);
  res.json({ success: true, student });
});

// Submit evaluation results
app.post('/api/evaluations/submit', async (req, res) => {
  const data = req.body;
  if (!data || typeof data.score !== 'number') {
    return res.status(400).json({ error: 'Datos de evaluación inválidos' });
  }

  const newRecord: EvaluationRecordBackend = {
    id: data.id || `eval-${Date.now()}`,
    studentAlias: (data.studentAlias || 'Estudiante').slice(0, 40),
    studentSection: data.studentSection || '1.° A',
    avatarIndex: Number(data.avatarIndex) || 0,
    score: Math.max(0, Math.min(20, Number(data.score))),
    correctCount: Number(data.correctCount) || 0,
    errorCount: Number(data.errorCount) || 0,
    timeSpentSeconds: Number(data.timeSpentSeconds) || 0,
    cnebLevel: data.cnebLevel || 'C',
    cnebDescription: data.cnebDescription || '',
    completedAt: data.completedAt || new Date().toISOString(),
    isOfficialMode: Boolean(data.isOfficialMode),
    logs: Array.isArray(data.logs) ? data.logs : []
  };

  // If connected to PostgreSQL, execute parameterized SQL INSERT
  if (pgPool) {
    try {
      const query = `
        INSERT INTO evaluaciones_realizadas 
        (id, estudiante_alias, seccion, avatar_id, puntaje, aciertos, errores, tiempo_segundos, nivel_cneb, descripcion_cneb, es_oficial, fecha_registro)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      await pgPool.query(query, [
        newRecord.id,
        newRecord.studentAlias,
        newRecord.studentSection,
        newRecord.avatarIndex,
        newRecord.score,
        newRecord.correctCount,
        newRecord.errorCount,
        newRecord.timeSpentSeconds,
        newRecord.cnebLevel,
        newRecord.cnebDescription,
        newRecord.isOfficialMode,
        newRecord.completedAt
      ]);
    } catch (pgErr) {
      console.warn('PostgreSQL write fallback to memory:', pgErr);
    }
  }

  memoryEvaluations.unshift(newRecord);
  res.json({ success: true, record: newRecord });
});

// Get all evaluation records for teacher panel
app.get('/api/teacher/results', async (_req, res) => {
  if (pgPool) {
    try {
      const result = await pgPool.query(`
        SELECT id, estudiante_alias AS "studentAlias", seccion AS "studentSection", avatar_id AS "avatarIndex",
               puntaje AS score, aciertos AS "correctCount", errores AS "errorCount", 
               tiempo_segundos AS "timeSpentSeconds", nivel_cneb AS "cnebLevel", 
               descripcion_cneb AS "cnebDescription", es_oficial AS "isOfficialMode",
               fecha_registro AS "completedAt"
        FROM evaluaciones_realizadas
        ORDER BY fecha_registro DESC
      `);
      if (result.rows && result.rows.length > 0) {
        return res.json({ results: result.rows });
      }
    } catch (pgErr) {
      console.warn('PostgreSQL fetch fallback to memory:', pgErr);
    }
  }
  res.json({ results: memoryEvaluations });
});

// Teacher settings
app.get('/api/teacher/settings', (_req, res) => {
  res.json({ settings: memoryTeacherSettings });
});

app.post('/api/teacher/settings', (req, res) => {
  if (req.body && typeof req.body === 'object') {
    memoryTeacherSettings = { ...memoryTeacherSettings, ...req.body };
    return res.json({ success: true, settings: memoryTeacherSettings });
  }
  res.status(400).json({ error: 'Configuración inválida' });
});

// Vite Middleware Integration for Dev / Full-Stack
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ECONOMIA EN ACCION] Servidor educativo ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
