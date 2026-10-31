-- ============================================================================
-- SOFTWARE EDUCATIVO: ECONOMÍA EN ACCIÓN
-- I.E. «REPÚBLICA DE ARGENTINA» – VILLA DE PASCO
-- Área: Ciencias Sociales · 1.° de Secundaria
-- Docente: Lic. Jacquelin Edith Vicente Condor
-- Base de Datos Centralizada: PostgreSQL 14+ (Red LAN Escolar sin Internet)
-- ============================================================================

-- Crear base de datos (Ejecutar previamente como superusuario postgres si se crea desde cero):
-- CREATE DATABASE economia_accion_pasco WITH ENCODING 'UTF8';
-- \c economia_accion_pasco;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: Institución Educativa
CREATE TABLE IF NOT EXISTS institucion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL DEFAULT 'I.E. República de Argentina',
    comunidad VARCHAR(100) NOT NULL DEFAULT 'Villa de Pasco',
    distrito VARCHAR(100) NOT NULL DEFAULT 'Tinyahuarco',
    provincia VARCHAR(100) NOT NULL DEFAULT 'Pasco',
    region VARCHAR(100) NOT NULL DEFAULT 'Pasco',
    area_curricular VARCHAR(100) NOT NULL DEFAULT 'Ciencias Sociales',
    docente_responsable VARCHAR(150) NOT NULL DEFAULT 'Lic. Jacquelin Edith Vicente Condor',
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA: Roles de Usuario
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO roles (id, nombre_rol) VALUES
    (1, 'estudiante'),
    (2, 'docente'),
    (3, 'administrador_lan')
ON CONFLICT (id) DO NOTHING;

-- 3. TABLA: Usuarios y Autenticación
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alias VARCHAR(40) NOT NULL UNIQUE,
    rol_id INT NOT NULL REFERENCES roles(id) DEFAULT 1,
    seccion VARCHAR(10) NOT NULL DEFAULT '1.° A',
    avatar_id INT NOT NULL DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_usuarios_alias ON usuarios(alias);
CREATE INDEX IF NOT EXISTS idx_usuarios_seccion ON usuarios(seccion);

-- 4. TABLA: Unidades Didácticas (Curriculares)
CREATE TABLE IF NOT EXISTS unidades_didacticas (
    id INT PRIMARY KEY,
    numero_unidad INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    icono VARCHAR(10)
);

INSERT INTO unidades_didacticas (id, numero_unidad, titulo, descripcion, icono) VALUES
    (1, 1, 'Necesidades, bienes y servicios', 'Comprende qué necesitan los seres humanos para vivir en el clima frío de Pasco y cómo los satisfacen.', '📦'),
    (2, 2, 'Sectores productivos', 'Identifica el sector primario extractivo, el sector secundario manufacturero y el sector terciario de servicios.', '⚙️'),
    (3, 3, 'Agentes económicos', 'Comprende las decisiones de las familias consumidoras, las empresas productoras y el Estado regulador.', '👥'),
    (4, 4, 'Economía de Villa de Pasco', 'Analiza la ganadería de camélidos, la minería polimetálica, las ferias comerciales y el circuito económico local.', '🏔️')
ON CONFLICT (id) DO NOTHING;

-- 5. TABLA: Temas (Pantallas 4 a 15)
CREATE TABLE IF NOT EXISTS temas (
    id INT PRIMARY KEY,
    pantalla_numero INT NOT NULL,
    unidad_id INT REFERENCES unidades_didacticas(id),
    titulo VARCHAR(150) NOT NULL,
    concepto_clave TEXT NOT NULL,
    ejemplo_pasco TEXT NOT NULL
);

INSERT INTO temas (id, pantalla_numero, unidad_id, titulo, concepto_clave, ejemplo_pasco) VALUES
    (0, 4, 1, 'Las necesidades humanas', 'Carencias indispensables para vivir y desarrollarse.', 'Alimentación calórica y abrigo en el invierno de Pasco.'),
    (1, 5, 1, 'Bienes económicos', 'Objetos materiales y escasos que satisfacen necesidades.', 'Una chompa o frazada tejida con lana de alpaca.'),
    (2, 6, 1, 'Los servicios', 'Actividades intangibles de terceros que cubren necesidades.', 'Transporte de pasajeros entre Villa de Pasco y Cerro de Pasco.'),
    (3, 7, 2, 'Sector primario', 'Obtención directa de recursos naturales sin transformación.', 'Crianza de ovinos, alpacas y extracción minera en Pasco.'),
    (4, 8, 2, 'Sector secundario', 'Transformación industrial y manufactura de materia prima.', 'Hilado y confección de prendas textiles en talleres locales.'),
    (5, 9, 2, 'Sector terciario', 'Distribución comercial, ferias, educación, salud y transporte.', 'Venta en la feria de Chaupimarca y transporte en minivans.'),
    (6, 10, 3, 'Las familias como agentes', 'Consumen bienes y servicios, ofrecen mano de obra al mercado.', 'Familias campesinas y obreras de Villa de Pasco.'),
    (7, 11, 3, 'Las empresas como agentes', 'Organizan tierra, trabajo y capital para ofertar bienes.', 'Cooperativas ganaderas comunales y talleres textiles.'),
    (8, 12, 3, 'El Estado como agente', 'Dicta normas, recauda tributos y financia servicios públicos.', 'Sostenimiento de la I.E. República de Argentina y caminos.'),
    (9, 13, 4, 'Ganadería y minería en Pasco', 'Pilares del sector primario en la meseta del Bombón.', 'Pastoreo en praderas comunales y yacimientos de zinc/plomo.'),
    (10, 14, 4, 'Comercio y transporte regional', 'Circulación vial por la Carretera Central e intercambios.', 'Ruta Pasco - Carhuamayo - Junín - Huánuco - Lima.'),
    (11, 15, 4, 'Relaciones e interdependencia', 'Circuito económico continuo entre familias, empresas y Estado.', 'Lana de alpaca -> taller textil -> familia consumidora.')
ON CONFLICT (id) DO NOTHING;

-- 6. TABLA: Evaluaciones Realizadas (Pantalla 16 y 17)
CREATE TABLE IF NOT EXISTS evaluaciones_realizadas (
    id VARCHAR(80) PRIMARY KEY,
    estudiante_alias VARCHAR(40) NOT NULL,
    seccion VARCHAR(10) NOT NULL DEFAULT '1.° A',
    avatar_id INT NOT NULL DEFAULT 0,
    puntaje INT NOT NULL CHECK (puntaje >= 0 AND puntaje <= 20),
    aciertos INT NOT NULL DEFAULT 0,
    errores INT NOT NULL DEFAULT 0,
    tiempo_segundos INT NOT NULL DEFAULT 0,
    nivel_cneb VARCHAR(5) NOT NULL CHECK (nivel_cneb IN ('AD', 'A', 'B', 'C')),
    descripcion_cneb TEXT,
    es_oficial BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_eval_seccion ON evaluaciones_realizadas(seccion);
CREATE INDEX IF NOT EXISTS idx_eval_nivel_cneb ON evaluaciones_realizadas(nivel_cneb);
CREATE INDEX IF NOT EXISTS idx_eval_fecha ON evaluaciones_realizadas(fecha_registro DESC);

-- 7. TABLA: Detalle de Respuestas por Reto
CREATE TABLE IF NOT EXISTS detalle_respuestas_evaluacion (
    id SERIAL PRIMARY KEY,
    evaluacion_id VARCHAR(80) REFERENCES evaluaciones_realizadas(id) ON DELETE CASCADE,
    reto_numero INT NOT NULL,
    nombre_reto VARCHAR(100),
    respuesta_json TEXT,
    es_correcto BOOLEAN NOT NULL,
    puntos_obtenidos INT NOT NULL,
    intentos_usados INT DEFAULT 1
);

-- 8. TABLA: Configuración Pedagógica Docente
CREATE TABLE IF NOT EXISTS configuracion_docente (
    id SERIAL PRIMARY KEY,
    docente_id INT DEFAULT 1,
    modalidad_evaluacion VARCHAR(20) DEFAULT 'formativa', -- 'formativa' o 'calificada'
    permitir_reintentos BOOLEAN DEFAULT TRUE,
    max_reintentos INT DEFAULT 3,
    peso_reto_1 INT DEFAULT 7,
    peso_reto_2 INT DEFAULT 6,
    peso_reto_3 INT DEFAULT 7,
    nota_minima_aprobatoria INT DEFAULT 11,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO configuracion_docente (id, modalidad_evaluacion, permitir_reintentos, max_reintentos, peso_reto_1, peso_reto_2, peso_reto_3)
VALUES (1, 'formativa', true, 3, 7, 6, 7)
ON CONFLICT (id) DO NOTHING;

-- 9. VISTA: Registro Auxiliar de Calificaciones Oficiales para Docente
CREATE OR REPLACE VIEW vista_registro_auxiliar_siagie AS
SELECT 
    e.id AS evaluacion_id,
    e.estudiante_alias,
    e.seccion,
    e.puntaje AS nota_vigesimal,
    e.nivel_cneb,
    CASE 
        WHEN e.nivel_cneb = 'AD' THEN 'Logro Destacado'
        WHEN e.nivel_cneb = 'A' THEN 'Logro Esperado'
        WHEN e.nivel_cneb = 'B' THEN 'En Proceso'
        ELSE 'En Inicio'
    END AS descripcion_logro,
    e.aciertos,
    e.errores,
    e.tiempo_segundos,
    e.fecha_registro
FROM evaluaciones_realizadas e
WHERE e.es_oficial = TRUE
ORDER BY e.seccion ASC, e.estudiante_alias ASC;

-- DATOS DE PRUEBA INICIALES (Estudiantes reales simulados de Villa de Pasco)
INSERT INTO evaluaciones_realizadas 
(id, estudiante_alias, seccion, avatar_id, puntaje, aciertos, errores, tiempo_segundos, nivel_cneb, descripcion_cneb, es_oficial, fecha_registro)
VALUES
('demo-db-1', 'Kevin Quispe C.', '1.° A', 0, 20, 3, 0, 145, 'AD', 'Logro Destacado en Gestiona responsablemente los recursos económicos.', true, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
('demo-db-2', 'Maricielo Huamán P.', '1.° A', 5, 18, 3, 0, 190, 'AD', 'Logro Destacado en Gestiona responsablemente los recursos económicos.', true, CURRENT_TIMESTAMP - INTERVAL '3 hours'),
('demo-db-3', 'Brayan Condor R.', '1.° B', 1, 15, 2, 1, 230, 'A', 'Logro Esperado en Gestiona responsablemente los recursos económicos.', true, CURRENT_TIMESTAMP - INTERVAL '4 hours'),
('demo-db-4', 'Yadhira Almerco S.', '1.° B', 2, 16, 2, 1, 210, 'A', 'Logro Esperado en Gestiona responsablemente los recursos económicos.', true, CURRENT_TIMESTAMP - INTERVAL '5 hours'),
('demo-db-5', 'Jhair Mendoza T.', '1.° C', 4, 12, 1, 2, 275, 'B', 'En Proceso en Gestiona responsablemente los recursos económicos.', true, CURRENT_TIMESTAMP - INTERVAL '6 hours')
ON CONFLICT (id) DO NOTHING;
