/* ==========================================================
   PROYECTOS (uno por unidad). Para agregar el de la Unidad 2,
   copia el bloque completo, cambia u: 2 y sus textos.
   ========================================================== */
window.PROYECTOS = window.PROYECTOS || [];

window.PROYECTOS.push({
  u: 1,
  titulo: 'Mi Mercado Escolar',
  frase: 'Cuento, sumo, resto y aprendo a usar mi dinero',
  objetivo: 'Organizar en equipo una tiendita escolar en la que los estudiantes pongan precios en quetzales, compren y vendan sumando y restando hasta el 100, den vuelto correctamente y registren sus ventas en un pictograma, aplicando lo aprendido en la Unidad 1.',

  fases: [
    {
      nombre: 'FASE I: Reto',
      objetivo: 'Conocer el reto del proyecto y organizar los equipos de trabajo.',
      parrafo: 'Reto: "Nuestra clase abrirá un mercado escolar. Cada equipo tendrá un puesto con 5 productos. ¿Podrán vender, cobrar y dar vuelto sin equivocarse?"',
      instrucciones: [
        'Escucha el reto que presenta la maestra y comenta con tu equipo qué se vende en un mercado de tu comunidad.',
        'Formen equipos de 4 integrantes y elijan el nombre de su puesto (frutas, librería, juguetes, panadería, etc.).',
        'Repartan los roles: vendedor, cajero, encargado de precios y encargado de la gráfica de ventas.',
        'Revisen juntos el cronograma para saber qué haremos cada semana.'
      ],
      extra: [{ t: 'cronograma', titulo: 'Cronograma' }]
    },
    {
      nombre: 'FASE II: Investigación',
      objetivo: 'Investigar precios reales y practicar el uso de monedas y billetes.',
      parrafo: 'Antes de poner precios, averiguamos cuánto cuestan las cosas y repasamos cómo pagar y dar vuelto.',
      instrucciones: [
        'Con ayuda de tu familia, pregunta el precio de 3 productos en una tienda cercana y anótalos en tu cuaderno.',
        'En clase, comparen los precios con los signos <, > e = y ordénenlos de menor a mayor.',
        'Practiquen con el minijuego "La tiendita" de la semana 11 a pagar el precio exacto.',
        'Decidan los 5 productos de su puesto y un precio entre Q1 y Q30 para cada uno.'
      ]
    },
    {
      nombre: 'FASE III: Creación',
      objetivo: 'Construir el puesto del mercado con sus productos, etiquetas de precio y caja.',
      parrafo: 'Cada equipo arma su puesto usando material reciclado y prepara todo lo necesario para vender.',
      instrucciones: [
        'Reúnan empaques vacíos y limpios o elaboren los productos con cartón y papel.',
        'Elaboren etiquetas con el precio de cada producto escrito con la letra Q (por ejemplo, Q12).',
        'Construyan una caja registradora de cartón y organicen los billetes y monedas de juguete.',
        'Preparen la hoja de ventas con una columna por producto para marcar cada venta.'
      ],
      extra: [{ t: 'entregables', titulo: 'Entregables' }]
    },
    {
      nombre: 'FASE IV: Presentación',
      objetivo: 'Abrir el mercado escolar, comprar y vender, y presentar los resultados de las ventas.',
      parrafo: 'El día del mercado, los equipos se turnan para vender y comprar. Al final, cada equipo presenta su gráfica de ventas.',
      instrucciones: [
        'Cada comprador recibe Q50 de juguete y compra en los diferentes puestos, sumando lo que gasta.',
        'El cajero calcula el vuelto con una resta y lo entrega contando el dinero en voz alta.',
        'Al terminar, el equipo cuenta sus ventas y elabora un pictograma: ¿qué producto se vendió más?',
        'Presenten su pictograma a la clase y cuenten qué aprendieron y qué mejorarían.'
      ],
      extra: [
        { t: 'avance', titulo: 'Lista de avance del equipo' },
        { t: 'rubrica', titulo: 'Rúbrica de evaluación (100 puntos)' }
      ]
    }
  ],

  cronograma: [
    ['Semana 3', 'Fase I: Reto', 'Presentación del reto, equipos, nombre del puesto y roles.'],
    ['Semana 6', 'Fase II: Investigación', 'Precios de la tienda de la comunidad; comparar y ordenar precios.'],
    ['Semana 9', 'Fase III: Creación', 'Construcción del puesto y productos con material reciclado.'],
    ['Semana 10', 'Fase III: Creación', 'Etiquetas de precios, caja registradora y hoja de ventas.'],
    ['Semana 11', 'Fase IV: Presentación', 'Día del mercado escolar: comprar, vender y dar vuelto.'],
    ['Semana 12', 'Fase IV: Presentación', 'Pictograma de ventas y presentación final.']
  ],

  entregables: [
    'Lista de 5 productos con sus precios (Fase II).',
    'Puesto del mercado con productos y etiquetas de precio (Fase III).',
    'Caja registradora y hoja de ventas (Fase III).',
    'Pictograma de ventas del equipo (Fase IV).',
    'Presentación oral de resultados (Fase IV).'
  ],

  /* La lista de avance se guarda en el navegador (si está permitido). */
  avance: [
    'Formamos el equipo y elegimos el nombre del puesto.',
    'Repartimos los roles.',
    'Investigamos precios en una tienda.',
    'Elegimos 5 productos y sus precios.',
    'Construimos el puesto y los productos.',
    'Hicimos las etiquetas de precio.',
    'Preparamos la caja y la hoja de ventas.',
    'Vendimos y dimos vuelto el día del mercado.',
    'Hicimos el pictograma de ventas.',
    'Presentamos nuestros resultados.'
  ],

  /* [criterio, descripción, puntos]. La suma debe dar 100. */
  rubrica: [
    ['Precios y etiquetas', 'Los 5 productos tienen precio entre Q1 y Q30, bien escrito con la letra Q y legible.', 15],
    ['Sumas correctas', 'Suma correctamente el total de una compra de dos o más productos.', 20],
    ['Restas y vuelto', 'Calcula y entrega el vuelto correcto, contando el dinero en voz alta.', 20],
    ['Uso de monedas y billetes', 'Reconoce los billetes y monedas y usa equivalencias (por ejemplo, Q10 = 2 de Q5).', 15],
    ['Pictograma de ventas', 'Registra las ventas y las muestra en un pictograma con título y nombres.', 15],
    ['Trabajo en equipo', 'Cumple su rol, respeta turnos y ayuda a sus compañeros.', 10],
    ['Presentación oral', 'Explica con claridad qué producto se vendió más y qué aprendió.', 5]
  ],

  galeriaTexto: 'En esta galería se publican las fotografías del proyecto Mi Mercado Escolar. Pide autorización a las familias antes de publicar fotos donde se vean los rostros de los estudiantes.',
  galeria: ['Nuestros equipos', 'Productos y etiquetas', 'La caja registradora', 'El día del mercado', 'Pictogramas de ventas', 'Presentación final']
});
