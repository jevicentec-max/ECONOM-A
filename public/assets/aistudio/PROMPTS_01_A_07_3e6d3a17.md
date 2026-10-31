ACTÚA COMO UN EXPERTO EN DISEÑO INSTRUCCIONAL, PEDAGOGÍA INTERACTIVA E INGENIERÍA DE SOFTWARE EDUCATIVO.

PROYECTO: ECONOMÍA EN ACCIÓN
Título oficial: SOFTWARE EDUCATIVO INTERACTIVO ECONOMÍA EN ACCIÓN PARA FORTALECER LA COMPRENSIÓN DE LOS SECTORES PRODUCTIVOS Y LOS AGENTES ECONÓMICOS EN ESTUDIANTES DE PRIMER GRADO DE SECUNDARIA DE LA I.E. “REPÚBLICA DE ARGENTINA” – VILLA DE PASCO.

CONTEXTO:
Institución: I.E. República de Argentina – Villa de Pasco, Perú.
Área: Ciencias Sociales.
Grado: Primero de secundaria.
Edad: 12 a 13 años.
Docente: Lic. Jacquelin Edith Vicente Condor.
Competencia: Gestiona responsablemente los recursos económicos.
Objetivo: Fortalecer la comprensión de los sectores productivos y los agentes económicos mediante recursos digitales interactivos, promoviendo aprendizajes significativos y contextualizados en la realidad económica de Villa de Pasco.

TECNOLOGÍAS:
HTML5, CSS3, JavaScript, Node.js, Express, SQL y PostgreSQL. La aplicación debe funcionar en una red LAN escolar sin Internet, con base de datos centralizada, roles de estudiante y docente, y diseño responsivo. No sustituir PostgreSQL por SQLite o MySQL ni Node.js por PHP sin autorización.
Color institucional: #1E3A8A.
INSIGNIA: Utilizar exactamente la insignia oficial de la I.E. República de Argentina – Villa de Pasco, suministrada por la usuaria. Colocarla en portada y encabezados. No inventar otra. Si no está adjunta en AI Studio, solicitarla.

PROMPT 1 — FLUJOGRAMA GENERAL DE NAVEGACIÓN
Diseñar el diagrama Mermaid con la secuencia: Portada → Registro → Menú/Temario → Contenidos → Actividades/Evaluación → Resultados → Menú/Reintento. Incorporar validación, roles, panel docente, retroalimentación, intentos, puntuación, guardado y salida. Entregar Mermaid, descripción de nodos, transiciones y rutas alternativas.

PROMPT 2 — PANTALLA 1: PORTADA INTERACTIVA
Diseñar wireframe y código HTML5/CSS3/JavaScript comentado. Incluir título Economía en Acción, subtítulo sobre sectores productivos y agentes económicos, ilustración de ganadería, minería, comercio y transporte en Villa de Pasco, insignia oficial, controles de música de fondo con play/pausa y volumen, botón Iniciar animado y diseño responsivo para estudiantes de 12 a 13 años. El audio debe iniciarse únicamente tras acción del usuario. Iniciar lleva al Registro.

PROMPT 3 — PANTALLA 2: REGISTRO DE USUARIO
Crear wireframe y código funcional con nombre o alias validado en JavaScript, seis avatares temáticos (alpaca, minería, agricultura, comercio, transporte e industria), selección accesible y botón Continuar que lleva al menú. Puede usar localStorage únicamente para la demostración, sin guardar contraseñas ni notas allí. La versión definitiva debe usar autenticación y registro seguro mediante Node.js/Express y PostgreSQL. Incluir validaciones y mensajes comprensibles.

PROMPT 4 — PANTALLA 3: MENÚ Y TEMARIO
Diseñar tarjetas visuales para cuatro unidades: I. Necesidades, bienes y servicios; II. Sectores productivos; III. Agentes económicos; IV. Economía de Villa de Pasco. Cada tarjeta mostrará descripción, avance, acceso al contenido y botón para iniciar actividades o evaluación. Incluir navegación clara, teclado, indicadores de progreso, accesibilidad y diseño responsivo.

PROMPT 5 — PANTALLAS 4 A 15: CONTENIDO TEMÁTICO
Crear 12 pantallas reutilizables:
4. Necesidades humanas.
5. Bienes económicos.
6. Servicios.
7. Sector primario.
8. Sector secundario.
9. Sector terciario.
10. Familias como agentes económicos.
11. Empresas como agentes económicos.
12. Estado como agente económico.
13. Ganadería y minería en Villa de Pasco.
14. Comercio y transporte.
15. Relaciones entre sectores productivos y agentes económicos.
Cada pantalla tendrá explicación breve, ilustración pertinente, ejemplo local, microinteracción (clic, selección, clasificación o arrastre), retroalimentación, progreso y botones Anterior/Siguiente. Utilizar una estructura HTML/CSS/JS reutilizable y no introducir imágenes ajenas al tema.

PROMPT 6 — PANTALLA 16: ACTIVIDADES Y EVALUACIÓN
Desarrollar wireframe y código HTML5/CSS3/JavaScript completo y comentado. Incorporar tres mecánicas:
1. Emparejamiento mediante arrastrar y soltar actividades económicas con los sectores primario, secundario y terciario, con alternativa accesible por teclado.
2. Selección múltiple sobre las funciones de familias, empresas y Estado, con retroalimentación inmediata.
3. Secuenciación de una cadena productiva local, por ejemplo lana de alpaca → transformación → comercialización.
Mostrar barra de progreso, aciertos, errores y puntaje sobre 20. En prácticas formativas permitir hasta tres intentos, con pistas progresivas y explicación final. Diferenciar estrictamente práctica de evaluación calificada; las reglas de calificación e intentos de esta última deben configurarse por la docente. La ponderación 7+6+7 es provisional.

PROMPT 7 — PANTALLA 17: RESULTADOS Y RETROALIMENTACIÓN
Crear wireframe y código frontend para mostrar aciertos, errores, tiempo empleado, puntaje obtenido sobre 20 y sugerencias de refuerzo según los contenidos no dominados. Incluir botones Reintentar, Volver al menú y Descargar reporte PDF. Permitir imprimir o guardar como PDF desde el navegador, o generar el documento desde el servidor. Guardar los resultados reales mediante Node.js/Express y PostgreSQL, vinculados al estudiante autenticado, actividad, respuestas, intentos y fecha. Incluir panel docente con seguimiento individual y grupal. Si se aporta un ejemplo PHP, marcarlo como opcional y no integrarlo como backend principal.

REQUISITOS TRANSVERSALES:
1. Mantener el nombre Economía en Acción y la identidad institucional.
2. Utilizar el escudo oficial original; no sustituirlo.
3. Funcionar sin Internet dentro de la red LAN de la institución.
4. Utilizar PostgreSQL como base de datos centralizada y SQL para consultas.
5. No usar dependencias de CDN o recursos remotos para funciones esenciales.
6. Proporcionar navegación funcional entre las 17 pantallas.
7. Mantener diseño responsivo y accesible.
8. Validar respuestas y permisos tanto en frontend como en backend.
9. No almacenar contraseñas ni calificaciones oficiales en localStorage.
10. Implementar guardado seguro de resultados, autenticación, roles, consultas parametrizadas y manejo de errores.
11. Diferenciar datos de demostración de datos reales.
12. No afirmar que una función está probada o desplegada sin verificarla.
13. Entregar estructura de carpetas, archivos completos, scripts SQL, instrucciones de instalación y pruebas funcionales.
14. Mantener la coherencia pedagógica con el CNEB del Perú y la competencia Gestiona responsablemente los recursos económicos.
15. No cambiar decisiones anteriores sin autorización.

ENTREGA FINAL:
Un proyecto integrado, organizado, ejecutable y documentado con las 17 pantallas, navegación, contenidos, actividades, resultados, insignia oficial, frontend, backend, esquema de PostgreSQL, instrucciones para uso en LAN y una relación de funcionalidades implementadas frente a las pendientes. Si AI Studio no puede ejecutar el servidor PostgreSQL, generar los archivos y explicar cómo ejecutarlos localmente, sin simular que la persistencia real ya funciona.