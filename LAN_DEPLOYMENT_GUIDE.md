# Guía de Instalación y Despliegue en Red LAN Escolar (Sin Internet)
## Proyecto: «Economía en Acción» — I.E. «República de Argentina» – Villa de Pasco
**Área:** Ciencias Sociales · 1.° de Secundaria  
**Docente Responsable:** Lic. Jacquelin Edith Vicente Condor  
**Tecnologías:** Node.js, Express, PostgreSQL 14+, HTML5, CSS3, JavaScript / React 19  

---

### 1. Resumen de Arquitectura LAN Escolar

La aplicación está diseñada para funcionar **100% de manera autónoma en la red local (LAN)** de la institución educativa (Aula de Innovación Pedagógica - AIP o sala de cómputo), sin requerir conexión a internet:

```
                  ┌─────────────────────────────────────────────────────────┐
                  │    SERVIDOR LAN ESCOLAR (PC Docente / Servidor AIP)     │
                  │   IP Fija: 192.168.1.100                                │
                  │   - Base de Datos: PostgreSQL en puerto 5432            │
                  │   - Backend & Frontend: Node.js Express en puerto 3000  │
                  └───────────────────────────┬─────────────────────────────┘
                                              │
                      Switch / Router LAN Escolar (Sin Internet)
                                              │
         ┌─────────────────────────┬──────────┴──────────────┬─────────────────────────┐
         ▼                         ▼                         ▼                         ▼
   [PC Alumno 01]            [PC Alumno 02]            [Tablet Alumno]          [PC Docente]
http://192.168.1.100:3000 http://192.168.1.100:3000 http://192.168.1.100:3000 http://192.168.1.100:3000
```

---

### 2. Requisitos Previos en la Máquina Servidor (PC de la I.E.)

1. Sistema Operativo: Windows 10/11, Ubuntu Linux o Debian.
2. **Node.js** v18 o superior instalado (descargar el instalador una sola vez en USB).
3. **PostgreSQL** v14, 15 o 16 instalado.
4. Conexión de cable de red o Wi-Fi local al router o switch del colegio.

---

### 3. Configuración de la Base de Datos PostgreSQL

1. Abrir la terminal o `pgAdmin 4` en la PC servidora:
   ```bash
   # Iniciar sesión en PostgreSQL
   psql -U postgres
   ```

2. Crear la base de datos oficial del proyecto:
   ```sql
   CREATE DATABASE economia_accion_pasco WITH ENCODING 'UTF8';
   \c economia_accion_pasco;
   ```

3. Ejecutar el script SQL de creación de tablas y semillas:
   ```bash
   psql -U postgres -d economia_accion_pasco -f database/schema.sql
   ```

---

### 4. Configuración del Servidor Node.js / Express

1. En la carpeta raíz del proyecto, configurar las variables de entorno en el archivo `.env`:
   ```env
   PORT=3000
   NODE_ENV=production
   DATABASE_URL="postgres://postgres:TU_CLAVE@localhost:5432/economia_accion_pasco"
   ```
   *(Nota: Si no se define DATABASE_URL, el servidor utiliza automáticamente el motor de persistencia en memoria y caché local sin interrumpir el funcionamiento de los alumnos).*

2. Instalar dependencias locales (previamente empaquetadas en `node_modules`):
   ```bash
   npm install
   ```

3. Compilar la aplicación para producción:
   ```bash
   npm run build
   ```

4. Iniciar el servidor centralizado:
   ```bash
   npm start
   ```

El sistema responderá:
```
[ECONOMIA EN ACCION] Servidor educativo ejecutándose en http://0.0.0.0:3000
```

---

### 5. Cómo se Conectan los Estudiantes en la Sala de Cómputo

1. En la PC del docente, averiguar la IP local:
   - En Windows: Ejecutar `ipconfig` en CMD (ejemplo: `192.168.1.100`).
   - En Linux: Ejecutar `hostname -I`.

2. En las computadoras de los estudiantes o laptops de secundaria, abrir cualquier navegador web (Chrome, Edge, Firefox):
   ```
   http://192.168.1.100:3000
   ```

3. Cada estudiante ingresará su nombre/alias y sección (1.° A, 1.° B, 1.° C).
4. Todas las evaluaciones y notas se guardan automáticamente en el servidor central.

---

### 6. Módulo de la Docente (Lic. Jacquelin Edith Vicente Condor)

- Para acceder al panel docente, pulsar el botón **"Docente"** en la barra superior o ingresar a:
  ```
  http://192.168.1.100:3000
  ```
- Opciones disponibles para la docente:
  1. **Registro de Calificaciones:** Visualización en tiempo real de cada estudiante con su puntaje sobre 20 y equivalencia CNEB (AD, A, B, C).
  2. **Exportar CSV:** Descarga directa de la nómina para el registro auxiliar y posterior subida al SIAGIE del MINEDU.
  3. **Configuración de Evaluación:** Alternar entre Modo Formativo (con pistas) y Modo Calificado (examen), o ajustar ponderaciones.

---

### 7. Garantía de Funcionamiento Sin Internet

- **Audio:** No se descargan archivos MP3 de servidores externos; se sintetizan en tiempo real mediante el procesador de sonido Web Audio API del navegador.
- **Tipografías e Íconos:** Empaquetados localmente en el bundle.
- **Insignia Oficial:** Almacenada en la carpeta local `/public/assets/insignia-oficial.jpg`.
- **Persistencia Híbrida:** Si por alguna razón la red local tiene una microcaída de conexión, el navegador del estudiante retiene las respuestas en su almacenamiento local y las envía al reconectar.
