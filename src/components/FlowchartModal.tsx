import React, { useState } from 'react';
import { X, GitBranch, Copy, Check, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface FlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlowchartModal: React.FC<FlowchartModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mermaidSource = `graph TD
    %% PROMPT 1: FLUJOGRAMA GENERAL - SOFTWARE EDUCATIVO ECONOMÍA EN ACCIÓN
    %% I.E. República de Argentina - Villa de Pasco
    
    Start([Inicio / Carga de Aplicación]) --> P1[Pantalla 1: Portada Interactiva<br/>- Identidad institucional e insignia oficial<br/>- Audio ambiental Web Audio<br/>- Presentación de sectores de Villa de Pasco]
    
    P1 -->|Clic en INICIAR| P2[Pantalla 2: Registro de Estudiante<br/>- Validación de alias/nombre y sección<br/>- Elección de 6 avatares contextualizados]
    P1 -->|Acceso Docente| DocenteAuth{Autenticación<br/>Docente}
    DocenteAuth -->|Credenciales OK| PDocente[Panel Docente Lic. Jacquelin Vicente<br/>- Métricas grupales e individuales<br/>- Registro auxiliar CNEB AD/A/B/C<br/>- Configuración de intentos y modos]
    
    P2 -->|Validación Exitosa| P3[Pantalla 3: Menú y Temario General<br/>- Unidad I: Necesidades, bienes y servicios<br/>- Unidad II: Sectores productivos<br/>- Unidad III: Agentes económicos<br/>- Unidad IV: Economía de Villa de Pasco]
    
    P3 -->|Seleccionar Unidad / Tema| PContenido[Pantallas 4 a 15: Contenidos Temáticos 1 a 12<br/>- Concepto clave 1.° secundaria<br/>- Ejemplo local de Villa de Pasco<br/>- Microactividad interactiva]
    
    PContenido --> MiniReto{Microinteracción<br/>¿Respuesta correcta?}
    MiniReto -->|Sí| ExitoTema[Retroalimentación formativa inmediata<br/>Sonido de logro + Registro de progreso]
    MiniReto -->|No y < 3 intentos| PistaTema[Pista 1 o 2 progresiva<br/>Reintento en pantalla]
    MiniReto -->|No y = 3 intentos| ExplicaTema[Explicación formativa completa y revelación]
    
    ExitoTema --> SiguienteTema{¿Tema 12 completado?}
    ExplicaTema --> SiguienteTema
    SiguienteTema -->|No| PContenido
    SiguienteTema -->|Sí / Menú| P3
    
    P3 -->|Iniciar Retos o Botón Directo| P16[Pantalla 16: Actividades y Evaluación<br/>3 Retos Integrados: 20 Puntos]
    
    subgraph Evaluacion [Pantalla 16: Retos Vigesimales]
        R1[Reto 1: Emparejamiento Sectores<br/>Primario / Secundario / Terciario - 7 pts]
        R2[Reto 2: Selección Múltiple Casos Agentes<br/>Familias / Empresas / Estado - 6 pts]
        R3[Reto 3: Secuenciación Cadena Textil<br/>Lana alpaca -> Hilado -> Mercado - 7 pts]
        R1 --> R2 --> R3
    end
    
    P16 --> Evaluacion
    Evaluacion --> GuardarEval[(Servidor LAN Node.js + Express<br/>Base de Datos PostgreSQL)]
    
    GuardarEval --> P17[Pantalla 17: Resultados y Retroalimentación<br/>- Puntaje sobre 20 y nivel CNEB AD/A/B/C<br/>- Desglose de aciertos, errores y tiempo<br/>- Recomendaciones pedagógicas de refuerzo]
    
    P17 -->|Descargar / Imprimir| PDF[Reporte Oficial de Evaluación PDF<br/>Con insignia y firma de la docente]
    P17 -->|Reintentar| P16
    P17 -->|Volver| P3
    P17 -->|Cerrar Sesión| P1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mermaidSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-2 border-blue-900">
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-yellow-400" />
            <div>
              <h2 className="font-bold text-lg leading-tight">Flujograma de Navegación del Sistema (Prompt 1)</h2>
              <p className="text-xs text-blue-200">Arquitectura de estados, decisiones y persistencia en red LAN</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-blue-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Visual Step Guide */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-sm text-blue-950 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Secuencia Principal y Rutas Alternativas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <span className="font-bold text-blue-900 block mb-1">1. Entrada & Autenticación</span>
                <p className="text-slate-600">
                  Portada con audio andino e insignia oficial → Registro de estudiante (validación de alias y avatar) o acceso al Panel Docente con credenciales.
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <span className="font-bold text-blue-900 block mb-1">2. Exploración Curricular</span>
                <p className="text-slate-600">
                  Menú general con 4 unidades. Cada pantalla temática (4 a 15) incluye concepto, ejemplo de Pasco y microactividad con hasta 3 intentos formativos.
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <span className="font-bold text-blue-900 block mb-1">3. Evaluación (20 pts)</span>
                <p className="text-slate-600">
                  Pantalla 16 con 3 retos: emparejar sectores (7 pts), clasificar agentes (6 pts) y secuenciar cadena textil (7 pts). Práctica vs. Evaluación oficial.
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <span className="font-bold text-blue-900 block mb-1">4. Resultados & CNEB</span>
                <p className="text-slate-600">
                  Pantalla 17: reporte vigesimal, nivel CNEB (AD/A/B/C), retroalimentación personalizada, exportación PDF y guardado en servidor central Node.js/PostgreSQL.
                </p>
              </div>
            </div>
          </div>

          {/* Raw Mermaid code box for academic documentation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Código Fuente Mermaid (Listo para exportar a informe pedagógico)
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Mermaid'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 text-emerald-300 font-mono text-xs p-4 rounded-xl overflow-x-auto max-h-64 leading-relaxed border border-slate-800">
              {mermaidSource}
            </pre>
          </div>

          {/* Validation & Access Control Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-800" />
                Seguridad & Validación
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Validación estricta de alias: entre 2 y 40 caracteres, solo alfanuméricos y acentos.</li>
                <li>Respuestas de evaluación validadas en el cliente y verificadas en el backend Express.</li>
                <li>Sin contraseñas sensibles en almacenamiento no cifrado.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-emerald-700" />
                Persistencia en Red LAN Escolar
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>PostgreSQL centralizado con tablas normalizadas y llaves foráneas.</li>
                <li>Sincronización tolerante: si la red local parpadea, guarda en caché local hasta reconectar.</li>
                <li>Funciona en modo 100% offline sin requerir acceso a internet.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1E3A8A] hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Entendido, volver a la aplicación
          </button>
        </div>
      </div>
    </div>
  );
};
