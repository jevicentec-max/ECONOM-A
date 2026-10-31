import { ThematicUnit, ThematicTopic } from '../types';

export const AVATARS = [
  { id: 0, name: 'Alpaca de Pasco', icon: '🦙', desc: 'Símbolo ganadero de las alturas de Pasco' },
  { id: 1, name: 'Minero de Pasco', icon: '⛏️', desc: 'Extracción de minerales en la región' },
  { id: 2, name: 'Agricultor Andino', icon: '🌾', desc: 'Cultivos resistentes de papa y maca' },
  { id: 3, name: 'Comerciante Local', icon: '🛒', desc: 'Intercambio en ferias de Villa de Pasco' },
  { id: 4, name: 'Transportista Pasqueño', icon: '🚌', desc: 'Conectividad entre provincias y valles' },
  { id: 5, name: 'Artesano Textil', icon: '🏭', desc: 'Transformación de lana en abrigadas prendas' },
];

export const UNITS_DATA: ThematicUnit[] = [
  {
    id: 1,
    title: 'Unidad I: Necesidades, bienes y servicios',
    description: 'Comprende qué necesitan los seres humanos para vivir y cómo satisfacen esas necesidades en su entorno.',
    icon: '📦',
    topics: [
      {
        id: 0,
        screenNumber: 4,
        unitIndex: 0,
        title: 'Las necesidades humanas',
        shortConcept: 'Las necesidades son carencias o requerimientos indispensables o convenientes que experimentan las personas para vivir, desarrollarse y alcanzar su bienestar.',
        pascoExample: 'En el clima frío de Villa de Pasco (a más de 4,300 m s.n.m.), la alimentación calórica y el abrigo grueso son necesidades primarias vitales para no enfermar.',
        icon: '🧣',
        accentColor: '#1E3A8A',
        microActivity: {
          question: 'En el gélido invierno de Villa de Pasco, ¿cuál de los siguientes elementos representa una necesidad primaria indispensable?',
          options: [
            'Ropa térmica y abrigo de lana de carnero o alpaca',
            'Un teléfono celular de última generación',
            'Boletos para un concierto en la capital'
          ],
          correctIndex: 0,
          hint1: 'Recuerda que las necesidades primarias son aquellas indispensables para la conservación de la vida y la salud.',
          hint2: 'Piensa en el clima extremo de nuestra provincia y qué protege directamente nuestro cuerpo contra las heladas.',
          explanation: '¡Exacto! El abrigo y la alimentación son necesidades primarias biológicas vitales en nuestra comunidad andina.'
        }
      },
      {
        id: 1,
        screenNumber: 5,
        unitIndex: 0,
        title: 'Bienes económicos',
        shortConcept: 'Los bienes son objetos materiales, tangibles y escasos producidos mediante el trabajo humano para satisfacer necesidades concretas.',
        pascoExample: 'Una chompa tejida artesanalmente con lana de alpaca o las herramientas mineras empleadas en los yacimientos de Pasco son bienes económicos.',
        icon: '🧶',
        accentColor: '#0D9488',
        microActivity: {
          question: '¿Cuál de los siguientes ejemplos es un BIEN ECONÓMICO según la ciencia social?',
          options: [
            'El servicio de internet que brinda una empresa',
            'Una frazada de lana confeccionada en Villa de Pasco',
            'La consulta médica en el centro de salud'
          ],
          correctIndex: 1,
          hint1: 'Un bien económico es tangible (se puede tocar físicamente) y requiere recursos para ser producido.',
          hint2: 'Distingue entre una acción o actividad (servicio) y un objeto físico concreto.',
          explanation: '¡Muy bien! La frazada de lana es un objeto físico, tangible y escaso que satisface la necesidad de abrigo.'
        }
      },
      {
        id: 2,
        screenNumber: 6,
        unitIndex: 0,
        title: 'Los servicios económicos',
        shortConcept: 'Los servicios son actividades o prestaciones intangibles que realizan personas o instituciones para satisfacer las necesidades de otros.',
        pascoExample: 'El transporte público que traslada a estudiantes y trabajadores entre Villa de Pasco y Cerro de Pasco, y la enseñanza en la I.E. República de Argentina son servicios.',
        icon: '🚌',
        accentColor: '#D97706',
        microActivity: {
          question: '¿Qué actividad representa un SERVICIO en nuestra localidad?',
          options: [
            'Un kilo de queso elaborado en la granja comunal',
            'El traslado de pasajeros en minivan desde Villa de Pasco hacia Cerro de Pasco',
            'Un quintal de papa cosechado en los campos'
          ],
          correctIndex: 1,
          hint1: 'El servicio no entrega un objeto que te llevas a casa, sino una labor que soluciona una necesidad.',
          hint2: 'El transporte es una actividad realizada por choferes y empresas para movilizar a la población.',
          explanation: '¡Excelente! El transporte de pasajeros es una actividad intangible que satisface la necesidad de desplazamiento.'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Unidad II: Sectores productivos',
    description: 'Explora cómo se clasifican las actividades económicas según la etapa de producción: primaria, secundaria y terciaria.',
    icon: '⚙️',
    topics: [
      {
        id: 3,
        screenNumber: 7,
        unitIndex: 1,
        title: 'Sector primario',
        shortConcept: 'Comprende las actividades que extraen u obtienen recursos directamente de la naturaleza sin someterlos a transformaciones industriales profundas.',
        pascoExample: 'En la meseta de Bombón y Villa de Pasco destaca la crianza de ovinos y camélidos (alpacas), así como la extracción de minerales (plomo, zinc, plata).',
        icon: '⛰️',
        accentColor: '#15803D',
        microActivity: {
          question: '¿Cuál de las siguientes actividades de nuestra región pertenece al SECTOR PRIMARIO?',
          options: [
            'La confección de guantes y medias tejidas',
            'El pastoreo y esquila de ovinos en las praderas de Villa de Pasco',
            'La venta de abarrotes en el mercado central'
          ],
          correctIndex: 1,
          hint1: 'El sector primario aprovecha los recursos directamente de la tierra y los animales.',
          hint2: 'La cría de ganado ovino y camélido es la base productiva agropecuaria de las zonas altoandinas.',
          explanation: '¡Correcto! El pastoreo y la ganadería extraen recursos naturales directamente de los animales sin transformación fabril.'
        }
      },
      {
        id: 4,
        screenNumber: 8,
        unitIndex: 1,
        title: 'Sector secundario',
        shortConcept: 'Se encarga de transformar las materias primas extraídas por el sector primario en bienes elaborados o semielaborados mediante procesos manuales o industriales.',
        pascoExample: 'Los talleres textiles que lavan, hilan y tejen la fibra de alpaca en Villa de Pasco para fabricar chompas y ponchos pertenecen a este sector.',
        icon: '🧵',
        accentColor: '#7C3AED',
        microActivity: {
          question: '¿Qué proceso ejemplifica el funcionamiento del SECTOR SECUNDARIO?',
          options: [
            'Extraer mineral de la mina de Pasco',
            'Transformar la lana cruda en frazadas y prendas de vestir en un taller',
            'Llevar las chompas en camión hacia Huancayo para su venta'
          ],
          correctIndex: 1,
          hint1: 'El sector secundario implica transformación, fabricación, manufactura o procesamiento.',
          hint2: 'Convertir materia prima en un producto terminado es la esencia de la industria y la artesanía secundaria.',
          explanation: '¡Muy bien! La manufactura textil transforma la materia prima (lana cruda) en un producto elaborado (frazadas y chompas).'
        }
      },
      {
        id: 5,
        screenNumber: 9,
        unitIndex: 1,
        title: 'Sector terciario',
        shortConcept: 'No produce bienes materiales, sino que ofrece servicios, comercio, transporte, salud, educación y finanzas para conectar la producción con el consumo.',
        pascoExample: 'Las tiendas de abarrotes en Villa de Pasco, las ferias semanales de intercambio y las entidades bancarias o postas médicas.',
        icon: '🏪',
        accentColor: '#B45309',
        microActivity: {
          question: '¿Cuál de las siguientes opciones corresponde al SECTOR TERCIARIO en nuestra provincia?',
          options: [
            'La comercialización de alimentos y ropa en los puestos del mercado',
            'La siembra de tubérculos en las chacras comunales',
            'La fundición y refinación de metales'
          ],
          correctIndex: 0,
          hint1: 'El sector terciario incluye el comercio, la distribución y los servicios ofrecidos a las personas.',
          hint2: 'Vender productos en el mercado facilita el intercambio sin crear materias primas desde cero.',
          explanation: '¡Correcto! El comercio minorista y mayorista es una actividad central del sector terciario que conecta productores con consumidores.'
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Unidad III: Agentes económicos',
    description: 'Identifica a los protagonistas de la economía: las familias que consumen, las empresas que producen y el Estado que regula y provee servicios públicos.',
    icon: '👥',
    topics: [
      {
        id: 6,
        screenNumber: 10,
        unitIndex: 2,
        title: 'Las familias como agentes económicos',
        shortConcept: 'Las familias toman decisiones sobre qué consumir para satisfacer sus necesidades, administran su presupuesto y ofrecen su fuerza de trabajo a las empresas y al Estado.',
        pascoExample: 'Una familia de Villa de Pasco que trabaja en la ganadería o el transporte, percibe ingresos y compra víveres en la tienda local.',
        icon: '👨‍👩‍👧‍👦',
        accentColor: '#BE185D',
        microActivity: {
          question: '¿Cuál es el rol primordial de las FAMILIAS en el circuito económico?',
          options: [
            'Aprobar leyes laborales nacionales',
            'Consumir bienes y servicios para su bienestar y ofrecer mano de obra',
            'Emitir billetes y monedas en el banco central'
          ],
          correctIndex: 1,
          hint1: 'Las familias son las principales consumidoras de la economía y aportan el factor trabajo.',
          hint2: 'Las leyes corresponden al Estado, y la emisión de dinero a la banca central.',
          explanation: '¡Excelente! Las familias son las unidades de consumo por excelencia y proveen el trabajo necesario para que la economía funcione.'
        }
      },
      {
        id: 7,
        screenNumber: 11,
        unitIndex: 2,
        title: 'Las empresas como agentes económicos',
        shortConcept: 'Las empresas combinan los factores productivos (tierra/recursos, trabajo y capital) para producir bienes y servicios destinados al mercado.',
        pascoExample: 'Una cooperativa comunal de Villa de Pasco que acopia leche y lana, contrata personal y comercializa quesos y prendas artesanales.',
        icon: '🏭',
        accentColor: '#4338CA',
        microActivity: {
          question: '¿Qué objetivo principal persiguen las EMPRESAS como agentes económicos?',
          options: [
            'Producir bienes o prestar servicios organizando recursos para atender el mercado',
            'Cobrar tributos municipales para pavimentar calles',
            'Recibir clases en una institución educativa'
          ],
          correctIndex: 0,
          hint1: 'Las empresas son unidades de producción organizadas para abastecer a la sociedad.',
          hint2: 'Cobrar tributos es una función exclusiva del Estado o municipios.',
          explanation: '¡Correcto! Las empresas son las responsables de organizar los recursos para generar la oferta de bienes y servicios.'
        }
      },
      {
        id: 8,
        screenNumber: 12,
        unitIndex: 2,
        title: 'El Estado como agente económico',
        shortConcept: 'El Estado establece el marco legal y normas de convivencia, recauda tributos y provee bienes y servicios públicos esenciales (educación, salud, seguridad y caminos).',
        pascoExample: 'El Ministerio de Educación y la DRE Pasco financian y supervisan la I.E. República de Argentina para garantizar educación gratuita y de calidad.',
        icon: '🏛️',
        accentColor: '#0369A1',
        microActivity: {
          question: '¿Cuál de las siguientes acciones es una función económica exclusiva del ESTADO?',
          options: [
            'Comprar ropa en el centro comercial para uso privado',
            'Financiar y administrar escuelas públicas como nuestra I.E. República de Argentina',
            'Fijar los precios de venta de todas las bodegas particulares'
          ],
          correctIndex: 1,
          hint1: 'El Estado provee servicios públicos universales financiados con los impuestos de todos.',
          hint2: 'La educación y la salud pública son compromisos constitucionales del Estado peruano.',
          explanation: '¡Muy bien! El Estado garantiza bienes y servicios públicos esenciales como nuestra institución educativa y vías de comunicación.'
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Unidad IV: Economía de Villa de Pasco',
    description: 'Analiza la realidad económica local, las cadenas productivas de la meseta del Bombón y cómo interactúan los sectores y agentes.',
    icon: '🏔️',
    topics: [
      {
        id: 9,
        screenNumber: 13,
        unitIndex: 3,
        title: 'Ganadería y minería en Villa de Pasco',
        shortConcept: 'La economía de nuestra provincia combina la ancestral ganadería ovina y de camélidos en pastos naturales altoandinos con la histórica minería polimetálica subterránea y a tajo abierto.',
        pascoExample: 'En las comunidades campesinas de Villa de Pasco se esquilan alpacas Huacaya, mientras en los distritos vecinos operan yacimientos de plata, plomo y zinc.',
        icon: '🦙',
        accentColor: '#166534',
        microActivity: {
          question: '¿Por qué la ganadería y la minería en Pasco corresponden ambas al sector primario?',
          options: [
            'Porque ambas venden chompas y joyas en vitrinas de tiendas de lujo',
            'Porque ambas extraen u obtienen recursos directamente del medio natural',
            'Porque ambas son financiadas únicamente por el municipio local'
          ],
          correctIndex: 1,
          hint1: 'Tanto la cría de animales como la extracción de minerales toman riquezas naturales sin elaborar productos manufacturados.',
          hint2: 'El sector primario abarca agricultura, ganadería, pesca y minería extractiva.',
          explanation: '¡Exacto! Ambas actividades pertenecen al sector primario porque obtienen materias primas directamente de la naturaleza.'
        }
      },
      {
        id: 10,
        screenNumber: 14,
        unitIndex: 3,
        title: 'Comercio y transporte regional',
        shortConcept: 'El comercio y el transporte dinamizan la economía pasqueña al permitir la distribución de materias primas hacia centros de procesamiento y el ingreso de alimentos de la costa y selva.',
        pascoExample: 'Vehículos de carga y pasajeros circulan por la Carretera Central conectando Villa de Pasco con Cerro de Pasco, Huánuco, Junín y Lima.',
        icon: '🚚',
        accentColor: '#9A3412',
        microActivity: {
          question: '¿Qué efecto positivo genera el desarrollo del transporte y comercio en las familias de Villa de Pasco?',
          options: [
            'Aísla a la comunidad para que no lleguen productos de otras regiones',
            'Permite vender la lana y quesos a mejores precios y acceder a víveres variados',
            'Obliga a las familias a consumir únicamente lo que cultivan en su patio'
          ],
          correctIndex: 1,
          hint1: 'El comercio y transporte amplían las oportunidades de venta y abastecimiento.',
          hint2: 'Una comunidad comunicada puede comercializar sus productos ganaderos y comprar frutas y verduras de la selva o costa.',
          explanation: '¡Muy bien! El transporte y comercio integran a Villa de Pasco con los mercados regionales, facilitando el bienestar familiar.'
        }
      },
      {
        id: 11,
        screenNumber: 15,
        unitIndex: 3,
        title: 'Relaciones e interdependencia económica',
        shortConcept: 'Ningún sector ni agente funciona de forma aislada. El flujo económico une a familias, empresas y Estado en una cadena continua de producción, intercambio y consumo.',
        pascoExample: 'Un criador de alpacas en Villa de Pasco (sector primario) vende fibra a un taller textil (sector secundario), que confecciona chompas vendidas en una tienda (sector terciario) a una familia para abrigarse.',
        icon: '🔄',
        accentColor: '#1E3A8A',
        microActivity: {
          question: 'En el circuito económico de Villa de Pasco, ¿quién adquiere el producto final elaborado para satisfacer sus necesidades de abrigo?',
          options: [
            'La materia prima de lana cruda',
            'La familia consumidora que compra la chompa en la feria',
            'El pastizal donde pastan las alpacas'
          ],
          correctIndex: 1,
          hint1: 'El fin último de toda la cadena de producción es el consumo por parte de las personas.',
          hint2: 'Las familias son las usuarias y consumidoras que cierran el circuito económico.',
          explanation: '¡Brillante! Has comprendido la interdependencia económica: las familias consumen el bien final cerrando el circuito económico.'
        }
      }
    ]
  }
];

export const ALL_TOPICS: ThematicTopic[] = UNITS_DATA.flatMap(u => u.topics);

export const CHALLENGE_1 = {
  id: 1,
  title: 'Reto 1: Clasificación de Sectores Productivos',
  subtitle: 'Relaciona cada actividad económica de Villa de Pasco con su sector correspondiente.',
  instructions: 'Arrastra cada tarjeta a su sector productivo, o selecciónalo desde el menú desplegable accesible.',
  points: 7,
  items: [
    { id: 'act-0', name: 'Pastoreo y esquila de alpacas en Villa de Pasco', correctSector: 0, sectorName: 'Primario' },
    { id: 'act-1', name: 'Hilado industrial y confección de chompas abrigadoras', correctSector: 1, sectorName: 'Secundario' },
    { id: 'act-2', name: 'Venta de víveres y ropa en la feria dominical', correctSector: 2, sectorName: 'Terciario' },
  ],
  sectors: [
    { id: 0, name: 'Sector Primario', desc: 'Extracción de recursos naturales', icon: '🐑' },
    { id: 1, name: 'Sector Secundario', desc: 'Transformación y manufactura', icon: '🧵' },
    { id: 2, name: 'Sector Terciario', desc: 'Servicios, comercio y transporte', icon: '🛒' },
  ]
};

export const CHALLENGE_2 = {
  id: 2,
  title: 'Reto 2: Identificación de Agentes Económicos',
  subtitle: 'Analiza el caso y determina qué agente económico cumple la función indicada.',
  instructions: 'Lee con atención la situación económica de nuestra comunidad y selecciona la opción correcta.',
  points: 6,
  scenario: 'En Villa de Pasco, una entidad construye y da mantenimiento al local de la I.E. República de Argentina, paga el sueldo de los profesores y establece las normas de convivencia y tributación regional.',
  question: '¿Qué agente económico está cumpliendo esta función?',
  options: [
    { id: 0, name: 'Las Familias', desc: 'Consumen y ofrecen mano de obra para el sustento' },
    { id: 1, name: 'Las Empresas Privadas', desc: 'Producen bienes y servicios buscando rentabilidad' },
    { id: 2, name: 'El Estado', desc: 'Regula, recauda tributos y provee servicios públicos esenciales' }
  ],
  correctOption: 2,
  explanation: 'El Estado es el agente económico encargado de proveer servicios públicos esenciales como la educación pública y administrar las leyes del país.'
};

export const CHALLENGE_3 = {
  id: 3,
  title: 'Reto 3: Cadena Productiva Textil en Villa de Pasco',
  subtitle: 'Secuencia las etapas desde la obtención de la materia prima hasta el consumidor.',
  instructions: 'Utiliza los botones de subir (↑) y bajar (↓) o el arrastre para ordenar la cadena de valor en su secuencia lógica correcta.',
  points: 7,
  steps: [
    { id: 'step-3', text: 'Comercialización de la chompa terminada en el mercado de Pasco a una familia', correctPos: 2 },
    { id: 'step-1', text: 'Crianza y esquila de fibra de alpaca en las praderas de Villa de Pasco (Sector Primario)', correctPos: 0 },
    { id: 'step-2', text: 'Lavado, hilado y tejido de la lana en un taller artesanal local (Sector Secundario)', correctPos: 1 },
  ],
  correctOrderText: [
    'Crianza y esquila de fibra de alpaca en las praderas de Villa de Pasco (Sector Primario)',
    'Lavado, hilado y tejido de la lana en un taller artesanal local (Sector Secundario)',
    'Comercialización de la chompa terminada en el mercado de Pasco a una familia'
  ],
  explanation: 'La cadena productiva inicia con la extracción de la materia prima (sector primario), continúa con la transformación artesanal o fabril (sector secundario) y concluye con la distribución y venta comercial (sector terciario).'
};

export const QUIZ_CHALLENGES = [CHALLENGE_1, CHALLENGE_2, CHALLENGE_3];

export const CNEB_RUBRIC = {
  AD: {
    min: 18,
    max: 20,
    label: 'Logro Destacado (AD)',
    badgeColor: '#15803D',
    summary: 'El estudiante evidencia un nivel sobresaliente en la competencia "Gestiona responsablemente los recursos económicos", diferenciando con precisión los sectores productivos y explicando con argumentos sólidos el rol de los agentes económicos en Villa de Pasco.'
  },
  A: {
    min: 14,
    max: 17,
    label: 'Logro Esperado (A)',
    badgeColor: '#1E3A8A',
    summary: 'El estudiante demuestra el nivel esperado para 1.° de secundaria, identificando con claridad los sectores primario, secundario y terciario, así como la interdependencia entre familias, empresas y Estado.'
  },
  B: {
    min: 11,
    max: 13,
    label: 'En Proceso (B)',
    badgeColor: '#D97706',
    summary: 'El estudiante está cerca de alcanzar el nivel esperado. Conviene repasar la distinción entre bienes y servicios y la clasificación de actividades transformadoras del sector secundario.'
  },
  C: {
    min: 0,
    max: 10,
    label: 'En Inicio (C)',
    badgeColor: '#DC2626',
    summary: 'El estudiante requiere acompañamiento y retroalimentación pedagógica para comprender las nociones básicas de necesidades, sectores económicos y funciones de los agentes.'
  }
};
