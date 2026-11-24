/* ==========================================================
   UNIDAD 1 - Matemática 2do Primaria
   "Los números me ayudan a organizar y comprender mi entorno"
   Basado en la Planificación Anual 2027 (Liceo Tec).

   Cómo editar:
   - contenido: lista de bloques ({t:'p'}, {t:'h3'}, {t:'lista'}, {t:'ejemplo'},
     {t:'fig'}, {t:'figs'}, {t:'tabla'}, {t:'video'}).
   - juegos: lista de minijuegos (ver README para cada tipo).
   - clase: actividad en el aula, o null si esa semana no tiene.
   ========================================================== */
window.UNIDADES = window.UNIDADES || [];

/* atajos para figuras */
var F = {
  tri: function (c) { return { fig: 'figura', forma: 'triangulo', color: c || '#ff4d4f' }; },
  cua: function (c) { return { fig: 'figura', forma: 'cuadrado', color: c || '#2f8cff' }; },
  rec: function (c) { return { fig: 'figura', forma: 'rectangulo', color: c || '#34c759' }; },
  cir: function (c) { return { fig: 'figura', forma: 'circulo', color: c || '#ffb300' }; },
  rom: function (c) { return { fig: 'figura', forma: 'rombo', color: c || '#8e5cf7' }; },
  ova: function (c) { return { fig: 'figura', forma: 'ovalo', color: c || '#ff5fa2' }; }
};

window.UNIDADES.push({
  n: 1,
  titulo: 'Los números me ayudan a organizar y comprender mi entorno',
  competencia: 'Comprende, representa, compara y ordena números hasta el 100, utilizando material concreto, el valor posicional y patrones numéricos. Aplica la suma, la resta, la medición, la geometría, los datos y el dinero para resolver situaciones de la vida cotidiana.',
  semanas: [

    /* ---------------------------------------------------- SEMANA 1 */
    {
      n: 1,
      titulo: 'Contamos de 2 en 2, de 5 en 5 y de 10 en 10',
      resumen: 'Repasamos la secuencia de los números hasta el 100 y aprendemos a contar más rápido dando saltos.',
      contenido: [
        { t: 'h3', x: 'Los números van en orden' },
        { t: 'p', x: 'Los números siguen un orden: cada número es <b>uno más</b> que el anterior. Después del 9 viene el 10, después del 19 viene el 20 y después del 99 viene el 100.' },
        { t: 'h3', x: 'Contar dando saltos' },
        { t: 'p', x: 'Cuando hay muchos objetos, podemos contar más rápido si damos <b>saltos</b>. En lugar de contar de uno en uno, contamos de 2 en 2, de 5 en 5 o de 10 en 10.' },
        { t: 'fig', fig: { fig: 'recta', desde: 0, hasta: 20, paso: 1, saltos: 2 }, pie: 'Contamos de 2 en 2: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20' },
        { t: 'fig', fig: { fig: 'recta', desde: 0, hasta: 50, paso: 5, saltos: 1 }, pie: 'Contamos de 5 en 5: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50' },
        { t: 'tabla', cab: ['Contar de...', 'Así suena', 'Sirve para contar...'], filas: [
          ['2 en 2', '2, 4, 6, 8, 10, 12...', 'zapatos, calcetines, ojos'],
          ['5 en 5', '5, 10, 15, 20, 25...', 'dedos de una mano'],
          ['10 en 10', '10, 20, 30, 40, 50...', 'grupos de 10 palitos, decenas']
        ] },
        { t: 'ejemplo', titulo: 'Ejemplo', x: '¿Cuántas manzanas hay? Cuenta de 5 en 5 por cada fila: <b>5, 10, 15</b>. ¡Hay 15 manzanas!', fig: { fig: 'objetos', n: 15, tipo: 'manzana', porFila: 5 } },
        { t: 'video', titulo: 'Contar de 2 en 2, de 5 en 5 y de 10 en 10', busqueda: 'contar de 2 en 2 de 5 en 5 de 10 en 10 para niños' }
      ],
      juegos: [
        {
          tipo: 'rana', titulo: 'La ranita saltarina',
          instrucciones: ['Lee los números de arriba y piensa cuál sigue.', 'Toca la hoja que tiene el número correcto.', 'Si aciertas, la ranita salta feliz. Si no, ¡intenta otra vez!'],
          preguntas: [
            { q: '2, 4, 6, __', ops: [7, 8, 10], r: 8, pista: 'cuenta de 2 en 2' },
            { q: '10, 20, 30, __', ops: [40, 31, 35], r: 40, pista: 'cuenta de 10 en 10' },
            { q: '5, 10, 15, __', ops: [16, 20, 25], r: 20, pista: 'cuenta de 5 en 5' },
            { q: '12, 14, 16, __', ops: [17, 18, 20], r: 18 },
            { q: '35, 40, 45, __', ops: [50, 46, 55], r: 50 },
            { q: '60, 70, 80, __', ops: [90, 81, 100], r: 90 },
            { q: '48, 49, __', ops: [50, 40, 59], r: 50 },
            { q: '23, 33, 43, __', ops: [53, 44, 63], r: 53, pista: 'solo cambia el número de las decenas' }
          ]
        },
        {
          tipo: 'ordenar', titulo: 'Tren de números', q: 'Ordena de menor a mayor',
          instrucciones: ['Toca los números en orden, empezando por el más pequeño.', 'Si te equivocas, toca la casilla para quitar el número.', 'Cuando estén todos, presiona Comprobar.'],
          rondas: [
            { items: [12, 25, 38, 47, 60] },
            { items: [5, 15, 50, 55, 95] },
            { items: [13, 31, 33, 34, 43] }
          ]
        }
      ],
      clase: null
    },

    /* ---------------------------------------------------- SEMANA 2 */
    {
      n: 2,
      titulo: 'Decenas y unidades: el valor posicional',
      resumen: 'Agrupamos de 10 en 10 para formar decenas y descubrimos que cada cifra vale según el lugar donde está.',
      contenido: [
        { t: 'h3', x: '10 unidades forman 1 decena' },
        { t: 'p', x: 'Una <b>unidad</b> es un solo objeto. Cuando juntamos <b>10 unidades</b>, formamos <b>1 decena</b>. Con bloques, la decena es una barra de 10 cubitos.' },
        { t: 'figs', ancho: 150, figs: [
          { fig: 'bloques', n: 1, nombre: '1 unidad' },
          { fig: 'bloques', n: 10, nombre: '1 decena = 10 unidades' }
        ] },
        { t: 'h3', x: 'Cada cifra vale según su lugar' },
        { t: 'p', x: 'En el número <b>34</b>, el <b>3</b> está en el lugar de las decenas y vale 30. El <b>4</b> está en el lugar de las unidades y vale 4. Por eso: 34 = 30 + 4.' },
        { t: 'fig', fig: { fig: 'valorPosicional', n: 34 }, pie: '34 = 3 decenas y 4 unidades' },
        { t: 'fig', fig: { fig: 'bloques', n: 34 }, pie: '3 barras de 10 y 4 cubitos' },
        { t: 'tabla', cab: ['Número', 'Decenas', 'Unidades', 'Se lee'], filas: [
          ['25', '2', '5', 'veinticinco'],
          ['48', '4', '8', 'cuarenta y ocho'],
          ['70', '7', '0', 'setenta'],
          ['91', '9', '1', 'noventa y uno']
        ] },
        { t: 'ejemplo', titulo: '¡Ojo!', x: '<b>45</b> y <b>54</b> tienen las mismas cifras, pero no valen lo mismo. 45 tiene 4 decenas; 54 tiene 5 decenas.' },
        { t: 'video', titulo: 'Decenas y unidades para niños', busqueda: 'decenas y unidades para niños valor posicional' }
      ],
      juegos: [
        {
          tipo: 'bloques', titulo: 'Constructor de números',
          instrucciones: ['Mira el número que debes formar.', 'Usa + y - para poner barras de 10 (decenas) y cubitos (unidades).', 'Presiona Comprobar cuando creas que está listo.'],
          rondas: [23, 41, 16, 57, 70, 38]
        },
        {
          tipo: 'emparejar', titulo: 'Une las parejas',
          instrucciones: ['Toca una tarjeta de la izquierda.', 'Luego toca la tarjeta de la derecha que vale lo mismo.', 'Las parejas correctas se pintan del mismo color.'],
          pares: [
            [34, '3 decenas y 4 unidades'],
            [{ fig: 'bloques', n: 25 }, 25],
            [52, '5 decenas y 2 unidades'],
            [{ fig: 'bloques', n: 41 }, 41],
            [60, '6 decenas y 0 unidades'],
            [{ fig: 'bloques', n: 17 }, 17]
          ]
        }
      ],
      clase: {
        titulo: 'Constructores de números',
        descripcion: 'Con palitos, tapitas o bloques formamos números de dos cifras, los descomponemos en decenas y unidades y los comparamos con los signos <, > e =.',
        materiales: ['Palitos de paleta o pajillas', 'Ligas o hules para amarrar grupos de 10', 'Tapitas de colores', 'Tarjetas con números del 10 al 99'],
        pasos: [
          'En parejas, cada estudiante saca una tarjeta con un número.',
          'Forma su número: amarra grupos de 10 palitos para las decenas y deja sueltos los palitos de las unidades.',
          'Dice en voz alta: "Mi número tiene ___ decenas y ___ unidades".',
          'La pareja compara sus dos números y coloca entre ellos la tarjeta con el signo correcto (<, > o =).'
        ],
        cierre: '¿Por qué es más fácil contar palitos cuando están amarrados de 10 en 10?'
      }
    },

    /* ---------------------------------------------------- SEMANA 3 */
    {
      n: 3,
      titulo: 'Comparamos números: mayor, menor e igual',
      resumen: 'Usamos los signos >, < e = para comparar cantidades y números hasta el 100.',
      contenido: [
        { t: 'h3', x: 'Los signos para comparar' },
        { t: 'tabla', cab: ['Signo', 'Se lee', 'Ejemplo'], filas: [
          ['<b style="font-size:22px">&gt;</b>', 'mayor que', '8 &gt; 3'],
          ['<b style="font-size:22px">&lt;</b>', 'menor que', '25 &lt; 52'],
          ['<b style="font-size:22px">=</b>', 'igual a', '40 = 40']
        ] },
        { t: 'p', x: 'Un truco: imagina que el signo es la boca de un cocodrilo con mucha hambre. ¡El cocodrilo siempre abre la boca hacia el número <b>más grande</b>!' },
        { t: 'h3', x: '¿Cómo comparo números de dos cifras?' },
        { t: 'lista', items: [
          'Primero miro las <b>decenas</b>. El que tiene más decenas es el mayor: 62 &gt; 48 porque 6 decenas es más que 4 decenas.',
          'Si las decenas son iguales, miro las <b>unidades</b>: 35 &lt; 38 porque 5 unidades es menos que 8 unidades.',
          'Si las decenas y las unidades son iguales, los números son <b>iguales</b>.'
        ] },
        { t: 'ejemplo', titulo: 'Ejemplo con bloques', x: '23 tiene 2 decenas y 32 tiene 3 decenas. Entonces <b>23 &lt; 32</b>.', fig: { fig: 'bloques', n: 23 } },
        { t: 'video', titulo: 'Mayor que, menor que e igual', busqueda: 'mayor que menor que igual para niños cocodrilo' }
      ],
      juegos: [
        {
          tipo: 'cocodrilo', titulo: 'El cocodrilo hambriento',
          instrucciones: ['Mira los dos números.', 'Elige el cocodrilo que abre la boca hacia el número mayor. Si son iguales, elige el signo =.', '¡Completa todas las comparaciones!'],
          preguntas: [
            { a: 45, b: 54 }, { a: 72, b: 27 }, { a: 30, b: 30 }, { a: 89, b: 98 },
            { a: 61, b: 16 }, { a: 50, b: 49 },
            { a: { fig: 'bloques', n: 23 }, b: { fig: 'bloques', n: 32 } },
            { a: { fig: 'objetos', n: 7, tipo: 'estrella', porFila: 4 }, b: { fig: 'objetos', n: 5, tipo: 'estrella', porFila: 4 } }
          ]
        },
        {
          tipo: 'clasificar', titulo: 'Clasifica rápido', tiempo: 60,
          instrucciones: ['Aparece un número en la tarjeta amarilla.', 'Tócale a la canasta correcta: menor que 50 o mayor que 50.', 'Tienes 60 segundos. ¡Rápido!'],
          grupos: ['Menor que 50', 'Mayor que 50'],
          items: [
            { x: 12, g: 0 }, { x: 48, g: 0 }, { x: 51, g: 1 }, { x: 77, g: 1 }, { x: 9, g: 0 }, { x: 63, g: 1 },
            { x: 35, g: 0 }, { x: 99, g: 1 }, { x: 26, g: 0 }, { x: 84, g: 1 }, { x: 41, g: 0 }, { x: 70, g: 1 }
          ]
        }
      ],
      clase: null
    },

    /* ---------------------------------------------------- SEMANA 4 */
    {
      n: 4,
      titulo: 'La suma: juntamos y agregamos',
      resumen: 'Sumamos para juntar grupos o agregar objetos. Practicamos sumas de una y dos cifras sin llevar.',
      contenido: [
        { t: 'h3', x: '¿Qué es sumar?' },
        { t: 'p', x: 'Sumar es <b>juntar</b> dos o más grupos, o <b>agregar</b> objetos a un grupo, para saber cuántos hay en total. Usamos el signo <b>+</b> (más) y el signo <b>=</b> (igual).' },
        { t: 'ejemplo', titulo: 'Juntamos', x: 'Tengo 3 pelotas y me regalan 4. ¿Cuántas tengo? <b>3 + 4 = 7</b>', fig: { fig: 'objetos', n: 7, tipo: 'pelota', porFila: 7 } },
        { t: 'h3', x: 'Las partes de la suma' },
        { t: 'tabla', cab: ['3', '+', '4', '=', '7'], filas: [['sumando', '', 'sumando', '', 'total o suma']] },
        { t: 'h3', x: 'Sumamos números de dos cifras' },
        { t: 'p', x: 'Para sumar <b>34 + 15</b> escribimos un número debajo del otro: unidades debajo de unidades y decenas debajo de decenas. Primero sumamos las unidades y luego las decenas.' },
        { t: 'tabla', cab: ['', 'D', 'U'], filas: [['', '3', '4'], ['+', '1', '5'], ['<b>=</b>', '<b>4</b>', '<b>9</b>']] },
        { t: 'p', x: 'Unidades: 4 + 5 = 9. Decenas: 3 + 1 = 4. Entonces <b>34 + 15 = 49</b>.' },
        { t: 'video', titulo: 'La suma para niños', busqueda: 'la suma para niños de segundo primaria' }
      ],
      juegos: [
        {
          tipo: 'avion', titulo: 'El avión de las sumas',
          instrucciones: ['Lee la suma de arriba.', 'Toca la nube que tiene la respuesta correcta.', '¡El avión volará hasta esa nube!'],
          preguntas: [
            { q: '3 + 4 = ?', fig: { fig: 'objetos', n: 7, tipo: 'pelota', porFila: 7 }, ops: [7, 6, 8], r: 7 },
            { q: '5 + 5 = ?', ops: [10, 11, 9], r: 10 },
            { q: '12 + 6 = ?', ops: [18, 17, 19], r: 18 },
            { q: '20 + 30 = ?', ops: [50, 23, 40], r: 50, pista: '2 decenas más 3 decenas' },
            { q: '34 + 15 = ?', ops: [49, 48, 59], r: 49 },
            { q: '41 + 23 = ?', ops: [64, 63, 74], r: 64 },
            { q: '8 + 7 = ?', ops: [15, 14, 16], r: 15 },
            { q: '25 + 10 = ?', ops: [35, 26, 45], r: 35 }
          ]
        },
        {
          tipo: 'memoria', titulo: 'Memoria de sumas',
          instrucciones: ['Toca dos cartas para voltearlas.', 'Busca la suma y su resultado.', 'Si son pareja se quedan abiertas. ¡Encuentra todas!'],
          pares: [['6 + 3', 9], ['10 + 5', 15], ['20 + 20', 40], ['7 + 7', 14], ['31 + 12', 43], ['50 + 8', 58]]
        }
      ],
      clase: null
    },

    /* ---------------------------------------------------- SEMANA 5 */
    {
      n: 5,
      titulo: 'La resta: quitar y comparar',
      resumen: 'Restamos para saber cuántos quedan cuando quitamos, o cuántos más hay en un grupo que en otro.',
      contenido: [
        { t: 'h3', x: 'Restar es quitar' },
        { t: 'p', x: 'Cuando <b>quitamos</b> objetos de un grupo, restamos para saber cuántos <b>quedan</b>. Usamos el signo <b>-</b> (menos).' },
        { t: 'ejemplo', titulo: 'Quitamos', x: 'Tenía 8 manzanas y me comí 3. ¿Cuántas quedan? <b>8 - 3 = 5</b>', fig: { fig: 'objetos', n: 8, tipo: 'manzana', porFila: 8, tachar: 3 } },
        { t: 'h3', x: 'Restar también es comparar' },
        { t: 'p', x: 'Si Ana tiene 9 flores y Luis tiene 6, ¿cuántas flores <b>más</b> tiene Ana? Restamos: <b>9 - 6 = 3</b>. Ana tiene 3 flores más que Luis.' },
        { t: 'h3', x: 'Las partes de la resta' },
        { t: 'tabla', cab: ['8', '-', '3', '=', '5'], filas: [['minuendo', '', 'sustraendo', '', 'diferencia']] },
        { t: 'h3', x: 'Restamos números de dos cifras' },
        { t: 'tabla', cab: ['', 'D', 'U'], filas: [['', '5', '7'], ['-', '2', '3'], ['<b>=</b>', '<b>3</b>', '<b>4</b>']] },
        { t: 'p', x: 'Unidades: 7 - 3 = 4. Decenas: 5 - 2 = 3. Entonces <b>57 - 23 = 34</b>.' },
        { t: 'video', titulo: 'La resta para niños', busqueda: 'la resta para niños quitar segundo primaria' }
      ],
      juegos: [
        {
          tipo: 'globos', titulo: 'Revienta el globo',
          instrucciones: ['Lee la resta o el problema.', 'Los globos suben: toca el globo con la respuesta correcta para reventarlo.', 'Si se escapa, ¡no te preocupes, vuelve a salir!'],
          preguntas: [
            { q: '9 - 4 = ?', ops: [5, 4, 6], r: 5 },
            { q: '15 - 5 = ?', ops: [10, 5, 20], r: 10 },
            { q: '18 - 7 = ?', ops: [11, 12, 10], r: 11 },
            { q: '40 - 20 = ?', ops: [20, 60, 30], r: 20 },
            { q: '57 - 23 = ?', ops: [34, 33, 44], r: 34 },
            { q: 'Había 8 manzanas y se comieron 3. ¿Cuántas quedan?', fig: { fig: 'objetos', n: 8, tipo: 'manzana', porFila: 8, tachar: 3 }, ops: [5, 11, 4], r: 5 },
            { q: '68 - 35 = ?', ops: [33, 23, 43], r: 33 },
            { q: 'Ana tiene 12 crayones y Luis 7. ¿Cuántos más tiene Ana?', ops: [5, 19, 6], r: 5 }
          ]
        },
        {
          tipo: 'emparejar', titulo: 'Problema y respuesta',
          instrucciones: ['Toca un problema.', 'Luego toca su respuesta.', '¡Une todas las parejas!'],
          pares: [
            ['Tengo 10 globos y se revientan 4', 6],
            ['Hay 7 pájaros y se van 5', 2],
            ['20 - 10', 10],
            ['Tenía 15 dulces y regalé 7', 8],
            ['36 - 12', 24],
            ['Hay 9 peces y llegan 3 más', 12]
          ]
        }
      ],
      clase: null
    },

    /* ---------------------------------------------------- SEMANA 6 */
    {
      n: 6,
      titulo: 'Patrones y regularidades',
      resumen: 'Descubrimos la regla que se repite en una serie de figuras o de números para saber qué sigue.',
      contenido: [
        { t: 'h3', x: '¿Qué es un patrón?' },
        { t: 'p', x: 'Un <b>patrón</b> es algo que se repite siguiendo una <b>regla</b>. Si descubrimos la regla, podemos adivinar lo que sigue.' },
        { t: 'h3', x: 'Patrones con figuras' },
        { t: 'fig', fig: { fig: 'patron', items: [{ forma: 'triangulo', color: '#ff4d4f' }, { forma: 'circulo', color: '#2f8cff' }, { forma: 'triangulo', color: '#ff4d4f' }, { forma: 'circulo', color: '#2f8cff' }, '?'] }, pie: 'Regla: triángulo, círculo, triángulo, círculo... Sigue un triángulo.' },
        { t: 'h3', x: 'Patrones con números' },
        { t: 'tabla', cab: ['Serie', 'Regla', '¿Qué sigue?'], filas: [
          ['3, 6, 9, 12', 'sumar 3 (crece)', '15'],
          ['10, 20, 30, 40', 'sumar 10 (crece)', '50'],
          ['50, 45, 40, 35', 'restar 5 (decrece)', '30'],
          ['1, 3, 5, 7', 'sumar 2 (crece)', '9']
        ] },
        { t: 'p', x: 'Cuando los números se hacen más grandes, el patrón <b>crece</b> (aumenta). Cuando se hacen más pequeños, el patrón <b>decrece</b> (disminuye).' },
        { t: 'video', titulo: 'Patrones para niños', busqueda: 'patrones para niños de primaria figuras y números' }
      ],
      juegos: [
        {
          tipo: 'rana', titulo: 'La ranita de los patrones',
          instrucciones: ['Descubre la regla del patrón.', 'Toca la hoja con lo que sigue.', '¡Ayuda a la ranita a cruzar la laguna!'],
          preguntas: [
            { q: '¿Qué figura sigue?', fig: { fig: 'patron', items: [{ forma: 'triangulo', color: '#ff4d4f' }, { forma: 'circulo', color: '#2f8cff' }, { forma: 'triangulo', color: '#ff4d4f' }, { forma: 'circulo', color: '#2f8cff' }, '?'] }, ops: [F.tri('#ff4d4f'), F.cir('#2f8cff'), F.cua('#34c759')], r: F.tri('#ff4d4f') },
            { q: '¿Qué figura sigue?', fig: { fig: 'patron', items: [{ forma: 'cuadrado', color: '#34c759' }, { forma: 'cuadrado', color: '#34c759' }, { forma: 'rombo', color: '#8e5cf7' }, { forma: 'cuadrado', color: '#34c759' }, { forma: 'cuadrado', color: '#34c759' }, '?'] }, ops: [F.cua('#34c759'), F.rom('#8e5cf7'), F.cir('#ffb300')], r: F.rom('#8e5cf7') },
            { q: '3, 6, 9, 12, __', ops: [15, 13, 18], r: 15, pista: 'suma 3' },
            { q: '50, 45, 40, __', ops: [35, 30, 45], r: 35, pista: 'resta 5' },
            { q: '1, 3, 5, 7, __', ops: [9, 8, 10], r: 9 },
            { q: '¿Qué figura sigue?', fig: { fig: 'patron', items: [{ forma: 'circulo', color: '#ffb300' }, { forma: 'triangulo', color: '#ff5fa2' }, { forma: 'cuadrado', color: '#2f8cff' }, { forma: 'circulo', color: '#ffb300' }, { forma: 'triangulo', color: '#ff5fa2' }, '?'] }, ops: [F.cua('#2f8cff'), F.cir('#ffb300'), F.tri('#ff5fa2')], r: F.cua('#2f8cff') },
            { q: '90, 80, 70, __', ops: [60, 69, 50], r: 60 }
          ]
        },
        {
          tipo: 'clasificar', titulo: '¿Crece o decrece?', tiempo: 60,
          instrucciones: ['Lee la serie de números.', 'Si los números se hacen más grandes, toca "Crece". Si se hacen más pequeños, toca "Decrece".', '¡Tienes 60 segundos!'],
          grupos: ['Crece', 'Decrece'],
          items: [
            { x: '2, 4, 6, 8', g: 0 }, { x: '30, 25, 20', g: 1 }, { x: '10, 20, 30', g: 0 }, { x: '9, 7, 5, 3', g: 1 },
            { x: '15, 16, 17', g: 0 }, { x: '100, 90, 80', g: 1 }, { x: '5, 10, 15', g: 0 }, { x: '44, 43, 42', g: 1 },
            { x: '60, 70, 80', g: 0 }, { x: '20, 18, 16', g: 1 }
          ]
        }
      ],
      clase: null
    },

    /* ---------------------------------------------------- SEMANA 7 */
    {
      n: 7,
      titulo: 'Resolvemos problemas: suma y resta con y sin llevar',
      resumen: 'Aprendemos pasos para resolver problemas y practicamos sumas llevando y restas prestando.',
      contenido: [
        { t: 'h3', x: 'Cuatro pasos para resolver un problema' },
        { t: 'tabla', cab: ['Paso', '¿Qué hago?'], filas: [
          ['1. Leo', 'Leo el problema con calma, dos veces si es necesario.'],
          ['2. Pienso', 'Busco los datos (los números) y la pregunta. ¿Tengo que juntar o quitar?'],
          ['3. Opero', 'Hago la suma o la resta.'],
          ['4. Respondo', 'Escribo la respuesta completa: "Hay 42 niños".']
        ] },
        { t: 'h3', x: 'Palabras que nos dan pistas' },
        { t: 'lista', items: [
          '<b>Suma:</b> juntar, agregar, en total, llegan, me regalan, cuántos hay entre todos.',
          '<b>Resta:</b> quitar, perder, se van, regalé, cuántos quedan, cuántos más, cuántos menos.'
        ] },
        { t: 'h3', x: 'Suma llevando' },
        { t: 'p', x: '<b>27 + 15</b>: sumamos las unidades 7 + 5 = 12. Como 12 es 1 decena y 2 unidades, escribimos el 2 y <b>llevamos 1</b> a las decenas. Decenas: 1 + 2 + 1 = 4. Resultado: <b>42</b>.' },
        { t: 'tabla', cab: ['', 'D', 'U'], filas: [['', '<small>1</small><br>2', '<br>7'], ['+', '1', '5'], ['<b>=</b>', '<b>4</b>', '<b>2</b>']] },
        { t: 'h3', x: 'Resta prestando' },
        { t: 'p', x: '<b>42 - 17</b>: en las unidades no podemos quitar 7 de 2. Pedimos <b>prestada 1 decena</b>: el 4 se vuelve 3 y el 2 se vuelve 12. Unidades: 12 - 7 = 5. Decenas: 3 - 1 = 2. Resultado: <b>25</b>.' },
        { t: 'ejemplo', titulo: 'Problema', x: 'En el bus van 27 niños y suben 15 más. ¿Cuántos niños van ahora? Pista: "suben" significa agregar. <b>27 + 15 = 42</b>. Respuesta: van 42 niños.' },
        { t: 'video', titulo: 'Suma llevando y resta prestando', busqueda: 'suma llevando y resta prestando para niños' }
      ],
      juegos: [
        {
          tipo: 'ruleta', titulo: 'La ruleta de los problemas',
          instrucciones: ['Presiona "Girar la ruleta".', 'Lee el problema que te tocó y elige la respuesta.', 'Responde los 6 problemas para ganar.'],
          preguntas: [
            { q: 'En el bus van 27 niños y suben 15. ¿Cuántos van ahora?', ops: [42, 32, 12], r: 42 },
            { q: 'Pedro tenía 42 canicas y perdió 17. ¿Cuántas le quedan?', ops: [25, 35, 59], r: 25 },
            { q: 'María juntó 38 hojas y Ana 24. ¿Cuántas hay en total?', ops: [62, 52, 14], r: 62 },
            { q: 'En una caja hay 50 lápices. Se usan 26. ¿Cuántos quedan?', ops: [24, 34, 76], r: 24 },
            { q: 'Hay 19 niñas y 16 niños en el salón. ¿Cuántos estudiantes hay?', ops: [35, 25, 3], r: 35 },
            { q: 'Luis tiene 33 estampas y Carla 18. ¿Cuántas más tiene Luis?', ops: [15, 25, 51], r: 15 }
          ]
        },
        {
          tipo: 'clasificar', titulo: '¿Suma o resta?',
          instrucciones: ['Lee el problema de la tarjeta.', 'Piensa: ¿tengo que juntar (suma) o quitar (resta)?', 'Toca la canasta correcta.'],
          grupos: ['Suma (+)', 'Resta (-)'],
          items: [
            { x: 'Me regalan 5 dulces más', g: 0 }, { x: 'Se van 3 pájaros', g: 1 }, { x: 'Llegan 10 niños a la fiesta', g: 0 },
            { x: 'Regalé 4 crayones', g: 1 }, { x: '¿Cuántos hay en total?', g: 0 }, { x: '¿Cuántos quedan?', g: 1 },
            { x: 'Perdí 2 canicas', g: 1 }, { x: 'Junto mis ahorros con los de mi hermano', g: 0 }
          ]
        },
        {
          tipo: 'ordenar', titulo: 'Ordena los pasos',
          instrucciones: ['Toca los pasos en el orden correcto para resolver un problema.', 'Si te equivocas, toca la casilla para quitarlo.', 'Presiona Comprobar.'],
          rondas: [
            { q: '¿En qué orden resuelvo un problema?', ancho: true, items: ['Leo el problema con calma', 'Busco los datos y la pregunta', 'Hago la suma o la resta', 'Escribo la respuesta completa'] },
            { q: 'Ordena los pasos para sumar 27 + 15', ancho: true, items: ['Escribo un número debajo del otro', 'Sumo las unidades: 7 + 5 = 12', 'Escribo 2 y llevo 1 a las decenas', 'Sumo las decenas: 1 + 2 + 1 = 4'] }
          ]
        }
      ],
      clase: null
    },

    /* ---------------------------------------------------- SEMANA 8 */
    {
      n: 8,
      titulo: 'Medimos con nuestro cuerpo y con objetos',
      resumen: 'Medimos con cuartas, pies, pasos y clips; estimamos y comparamos nuestras medidas.',
      contenido: [
        { t: 'h3', x: '¿Qué es medir?' },
        { t: 'p', x: 'Medir es <b>comparar</b> el largo de un objeto con otra cosa que usamos como unidad. Podemos medir con partes de nuestro cuerpo o con objetos que todos tengan iguales.' },
        { t: 'tabla', cab: ['Unidad', '¿Cómo es?', 'Sirve para medir...'], filas: [
          ['Cuarta', 'la distancia de la punta del pulgar a la punta del meñique con la mano abierta', 'una mesa, un cuaderno'],
          ['Pie', 'el largo de un pie, pegando el talón a la punta del otro', 'el ancho del salón'],
          ['Paso', 'un paso normal al caminar', 'el patio, el pasillo'],
          ['Clip', 'clips del mismo tamaño puestos uno tras otro', 'un lápiz, un borrador']
        ] },
        { t: 'fig', fig: { fig: 'clips', n: 5, objeto: 'lapiz' }, pie: 'Este lápiz mide 5 clips.' },
        { t: 'h3', x: '¿Por qué nos salen medidas diferentes?' },
        { t: 'p', x: 'Si la maestra y un estudiante miden la misma mesa con cuartas, les salen números distintos porque sus manos son de diferente tamaño. Por eso se inventaron unidades iguales para todos, como el <b>centímetro</b> y el <b>metro</b>, que vemos en la regla y la cinta métrica.' },
        { t: 'h3', x: 'Estimar' },
        { t: 'p', x: '<b>Estimar</b> es decir más o menos cuánto mide algo <b>antes</b> de medirlo. Después medimos y comparamos: ¿estuvimos cerca?' },
        { t: 'video', titulo: 'Medidas no convencionales', busqueda: 'medidas no convencionales para niños cuarta pie paso' }
      ],
      juegos: [
        {
          tipo: 'avion', titulo: 'El avión medidor',
          instrucciones: ['Mira el objeto y los clips que tiene debajo.', 'Cuenta los clips.', 'Toca la nube con el número correcto.'],
          preguntas: [
            { q: '¿Cuántos clips mide el lápiz?', fig: { fig: 'clips', n: 4, objeto: 'lapiz' }, ops: [4, 5, 3], r: 4 },
            { q: '¿Cuántos clips mide el crayón?', fig: { fig: 'clips', n: 3, objeto: 'crayon' }, ops: [3, 2, 4], r: 3 },
            { q: '¿Cuántos clips mide el libro?', fig: { fig: 'clips', n: 6, objeto: 'libro' }, ops: [6, 5, 7], r: 6 },
            { q: '¿Cuántos clips mide el lápiz?', fig: { fig: 'clips', n: 7, objeto: 'lapiz' }, ops: [7, 6, 8], r: 7 },
            { q: 'El lápiz mide 7 clips y el crayón 3. ¿Cuántos clips más mide el lápiz?', ops: [4, 10, 3], r: 4 }
          ]
        },
        {
          tipo: 'clasificar', titulo: '¿Con pasos o con clips?',
          instrucciones: ['Lee qué vamos a medir.', 'Si es algo grande, toca "Con pasos". Si es algo pequeño, toca "Con clips".', '¡Clasifica todos!'],
          grupos: ['Con pasos', 'Con clips'],
          items: [
            { x: 'El patio', g: 0 }, { x: 'Un borrador', g: 1 }, { x: 'El pasillo', g: 0 }, { x: 'Un crayón', g: 1 },
            { x: 'La cancha', g: 0 }, { x: 'Una tijera', g: 1 }, { x: 'El salón de clases', g: 0 }, { x: 'Un sacapuntas', g: 1 }
          ]
        }
      ],
      clase: {
        titulo: 'Medimos nuestro mundo',
        descripcion: 'Medimos objetos del aula primero con manos, pies o cuerdas y después con regla y cinta métrica. Registramos y comparamos los resultados.',
        materiales: ['Cuerdas o lana', 'Clips del mismo tamaño', 'Regla y cinta métrica', 'Hoja de registro'],
        pasos: [
          'Cada equipo elige 4 objetos del aula: la mesa, la pizarra, un cuaderno y la puerta.',
          'Antes de medir, estiman cuántas cuartas o clips medirá cada objeto y lo anotan.',
          'Miden con cuartas, pies o clips y anotan el resultado.',
          'Vuelven a medir con regla o cinta métrica (en centímetros) y lo anotan.',
          'Comparan con otro equipo: ¿por qué con cuartas salieron números distintos y con la regla no?'
        ],
        cierre: '¿Qué unidad es mejor para que todos obtengamos la misma medida? ¿Por qué?'
      }
    },

    /* ---------------------------------------------------- SEMANA 9 */
    {
      n: 9,
      titulo: 'Figuras planas y sus propiedades',
      resumen: 'Reconocemos el triángulo, el cuadrado, el rectángulo y el círculo por sus lados y vértices.',
      contenido: [
        { t: 'h3', x: 'Lados y vértices' },
        { t: 'p', x: 'Los <b>lados</b> son las líneas que forman el borde de una figura. Los <b>vértices</b> son las esquinas, donde se juntan dos lados.' },
        { t: 'figs', ancho: 140, figs: [
          { fig: 'figura', forma: 'triangulo', color: '#ff4d4f', nombre: 'Triángulo', nota: '3 lados, 3 vértices' },
          { fig: 'figura', forma: 'cuadrado', color: '#2f8cff', nombre: 'Cuadrado', nota: '4 lados iguales, 4 vértices' },
          { fig: 'figura', forma: 'rectangulo', color: '#34c759', nombre: 'Rectángulo', nota: '4 lados (2 largos y 2 cortos), 4 vértices' },
          { fig: 'figura', forma: 'circulo', color: '#ffb300', nombre: 'Círculo', nota: 'línea curva, sin lados rectos ni vértices' }
        ] },
        { t: 'h3', x: 'Figuras a nuestro alrededor' },
        { t: 'lista', items: [
          'Una ventana o la pizarra pueden tener forma de <b>rectángulo</b>.',
          'Un reloj de pared o una moneda tienen forma de <b>círculo</b>.',
          'Una señal de tránsito de "ceda el paso" tiene forma de <b>triángulo</b>.',
          'Un azulejo del piso puede tener forma de <b>cuadrado</b>.'
        ] },
        { t: 'p', x: 'Las figuras planas son "planas" como un dibujo en una hoja. Los objetos que podemos tomar con la mano, como una pelota o una caja, son <b>cuerpos geométricos</b>: la pelota es una esfera y la caja es un prisma.' },
        { t: 'video', titulo: 'Figuras geométricas planas', busqueda: 'figuras geométricas planas para niños lados y vértices' }
      ],
      juegos: [
        {
          tipo: 'clasificar', titulo: 'Clasifica las figuras', tiempo: 75,
          instrucciones: ['Mira la figura de la tarjeta.', 'Cuenta sus lados.', 'Toca la canasta correcta. ¡Rápido!'],
          grupos: ['3 lados', '4 lados', 'Sin lados rectos'],
          items: [
            { fig: F.tri('#ff4d4f'), g: 0 }, { fig: F.cua('#2f8cff'), g: 1 }, { fig: F.cir('#ffb300'), g: 2 }, { fig: F.rec('#34c759'), g: 1 },
            { fig: F.tri('#8e5cf7'), g: 0 }, { fig: F.ova('#ff5fa2'), g: 2 }, { fig: F.rom('#14c4c4'), g: 1 }, { fig: F.cir('#ff7a1a'), g: 2 },
            { fig: F.rec('#ff4d4f'), g: 1 }, { fig: F.tri('#34c759'), g: 0 }
          ]
        },
        {
          tipo: 'memoria', titulo: 'Memoria de figuras',
          instrucciones: ['Voltea dos cartas.', 'Une cada figura con su nombre o su descripción.', '¡Encuentra todas las parejas!'],
          pares: [
            [F.tri('#ff4d4f'), 'Triángulo: 3 lados'],
            [F.cua('#2f8cff'), 'Cuadrado: 4 lados iguales'],
            [F.rec('#34c759'), 'Rectángulo: 2 lados largos y 2 cortos'],
            [F.cir('#ffb300'), 'Círculo: sin vértices']
          ]
        }
      ],
      clase: {
        titulo: 'Cazadores de figuras',
        descripcion: 'Recorremos el colegio fotografiando o dibujando figuras planas y cuerpos geométricos que encontramos en objetos reales. Después los clasificamos en un mural.',
        materiales: ['Hoja de registro con una columna por figura', 'Lápiz y crayones', 'Tableta o cámara (opcional)', 'Papel grande para el mural'],
        pasos: [
          'En equipos, reciben su hoja de "cazadores" con las figuras: triángulo, cuadrado, rectángulo y círculo.',
          'Recorren el colegio con la maestra y dibujan o fotografían objetos que tengan esas formas.',
          'De regreso al aula, cuentan cuántos objetos encontraron de cada figura.',
          'Pegan sus dibujos o fotos en el mural, en la columna de la figura correcta.'
        ],
        cierre: '¿Qué figura encontramos más veces en el colegio? ¿Cuál fue la más difícil de encontrar?'
      }
    },

    /* ---------------------------------------------------- SEMANA 10 */
    {
      n: 10,
      titulo: 'Pictogramas y gráficas de barras',
      resumen: 'Hacemos encuestas, contamos los votos y los mostramos en pictogramas y gráficas de barras.',
      contenido: [
        { t: 'h3', x: 'Encuesta y tabla de conteo' },
        { t: 'p', x: 'Una <b>encuesta</b> es preguntar lo mismo a varias personas. Anotamos las respuestas en una <b>tabla</b> para contarlas.' },
        { t: 'tabla', cab: ['Fruta favorita', 'Votos'], filas: [['Mango', '5'], ['Banano', '3'], ['Piña', '4'], ['Sandía', '2']] },
        { t: 'h3', x: 'Pictograma' },
        { t: 'p', x: 'En un <b>pictograma</b> cada dibujo representa un voto. Contamos los dibujos de cada fila.' },
        { t: 'fig', fig: { fig: 'picto', icono: 'estrella', max: 6, datos: [['Mango', 5], ['Banano', 3], ['Piña', 4], ['Sandía', 2]] }, pie: 'Cada estrella es 1 voto.' },
        { t: 'h3', x: 'Gráfica de barras' },
        { t: 'p', x: 'En una <b>gráfica de barras</b>, la altura de cada barra muestra cuántos votos hay. La barra más alta es la que tiene más votos.' },
        { t: 'fig', fig: { fig: 'barras', max: 6, datos: [['Mango', 5], ['Banano', 3], ['Piña', 4], ['Sandía', 2]] } },
        { t: 'ejemplo', titulo: 'Leemos la gráfica', x: 'La fruta favorita es el <b>mango</b> (5 votos). La menos elegida es la <b>sandía</b> (2 votos). El mango tiene 3 votos más que la sandía porque 5 - 2 = 3.' },
        { t: 'video', titulo: 'Pictogramas para niños', busqueda: 'pictogramas y gráficas de barras para niños' }
      ],
      juegos: [
        {
          tipo: 'grafica', titulo: 'Construye la gráfica',
          q: 'Encuesta: ¿Cuál es tu juego favorito del recreo?', columna: 'Juego',
          instrucciones: ['Lee la tabla: dice cuántos votos tuvo cada juego.', 'Usa + y - para poner una estrella por cada voto.', 'Presiona Comprobar y luego responde las preguntas.'],
          categorias: [
            { nombre: 'Fútbol', valor: 4, icono: 'estrella' },
            { nombre: 'Cuerda', valor: 2, icono: 'estrella' },
            { nombre: 'Escondite', valor: 5, icono: 'estrella' },
            { nombre: 'Rayuela', valor: 3, icono: 'estrella' }
          ],
          preguntas: [
            { q: '¿Qué juego tiene más votos?', ops: ['Escondite', 'Fútbol', 'Rayuela'], r: 'Escondite' },
            { q: '¿Cuántos votos tiene Rayuela?', ops: ['3', '4', '2'], r: '3' },
            { q: '¿Cuántos votos más tiene Escondite que Cuerda?', ops: ['3', '2', '7'], r: '3' }
          ]
        },
        {
          tipo: 'rana', titulo: 'La ranita lee pictogramas',
          instrucciones: ['Mira el pictograma: cada estrella es 1 voto.', 'Lee la pregunta.', 'Toca la hoja con la respuesta correcta.'],
          preguntas: [
            { q: '¿Cuántos votos tiene Mango?', fig: { fig: 'picto', icono: 'estrella', max: 6, datos: [['Mango', 5], ['Banano', 3], ['Piña', 4], ['Sandía', 2]] }, ops: [5, 4, 3], r: 5 },
            { q: '¿Qué fruta tiene menos votos?', fig: { fig: 'picto', icono: 'estrella', max: 6, datos: [['Mango', 5], ['Banano', 3], ['Piña', 4], ['Sandía', 2]] }, ops: ['Sandía', 'Banano', 'Piña'], r: 'Sandía' },
            { q: '¿Cuántos votos hay entre Banano y Piña?', fig: { fig: 'picto', icono: 'estrella', max: 6, datos: [['Mango', 5], ['Banano', 3], ['Piña', 4], ['Sandía', 2]] }, ops: [7, 6, 8], r: 7 },
            { q: '¿Cuántos peces hay en la pecera azul?', fig: { fig: 'picto', icono: 'pez', max: 6, datos: [['Roja', 2], ['Azul', 6], ['Verde', 4]] }, ops: [6, 4, 2], r: 6 },
            { q: '¿Cuántos peces más tiene la azul que la roja?', fig: { fig: 'picto', icono: 'pez', max: 6, datos: [['Roja', 2], ['Azul', 6], ['Verde', 4]] }, ops: [4, 8, 2], r: 4 }
          ]
        }
      ],
      clase: {
        titulo: 'Encuesta y gráfica',
        descripcion: 'Hacemos una encuesta a los compañeros (fruta favorita, mascota o color) y representamos los resultados en un pictograma o una gráfica de barras gigante.',
        materiales: ['Papelógrafo o papel kraft', 'Recortes de cuadros de papel de colores', 'Marcadores', 'Pegamento'],
        pasos: [
          'Entre todos elegimos la pregunta de la encuesta y 4 opciones de respuesta.',
          'Cada estudiante pasa al frente y pega un cuadro de papel en la columna de su respuesta.',
          'Contamos los cuadros de cada columna y escribimos el número debajo.',
          'Respondemos juntos: ¿cuál ganó?, ¿cuál tuvo menos votos?, ¿cuántos votos más tiene la primera que la última?'
        ],
        cierre: 'Si preguntáramos lo mismo en otro grado, ¿crees que el resultado sería igual? ¿Por qué?'
      }
    },

    /* ---------------------------------------------------- SEMANA 11 */
    {
      n: 11,
      titulo: 'El dinero de Guatemala: el quetzal',
      resumen: 'Conocemos las monedas y billetes del quetzal, sus equivalencias y cómo pagar y dar vuelto.',
      contenido: [
        { t: 'h3', x: 'Nuestra moneda: el quetzal' },
        { t: 'p', x: 'La moneda de Guatemala es el <b>quetzal</b> y se escribe con la letra <b>Q</b>. Por ejemplo, cinco quetzales se escribe <b>Q5</b>. Un quetzal se divide en <b>100 centavos</b>.' },
        { t: 'tabla', cab: ['Monedas', 'Billetes'], filas: [
          ['1, 5, 10, 25 y 50 centavos; Q1', 'Q1, Q5, Q10, Q20, Q50, Q100 y Q200']
        ] },
        { t: 'p', x: '<small>Los diseños y colores reales los define el Banco de Guatemala y pueden cambiar con nuevas emisiones. Los dibujos de este sitio son simplificados y solo sirven para practicar.</small>' },
        { t: 'figs', ancho: 120, figs: [
          { fig: 'dinero', v: 1, moneda: true, nombre: 'Moneda de Q1' },
          { fig: 'dinero', v: 5, nombre: 'Billete de Q5' },
          { fig: 'dinero', v: 10, nombre: 'Billete de Q10' },
          { fig: 'dinero', v: 20, nombre: 'Billete de Q20' }
        ] },
        { t: 'h3', x: 'Equivalencias' },
        { t: 'tabla', cab: ['Esto...', '...vale lo mismo que'], filas: [
          ['Q1', '100 centavos, o 2 monedas de 50 centavos'],
          ['Q5', '5 monedas de Q1'],
          ['Q10', '2 billetes de Q5'],
          ['Q20', '2 billetes de Q10, o 4 billetes de Q5']
        ] },
        { t: 'h3', x: 'Pagar y dar vuelto' },
        { t: 'p', x: 'Si un cuaderno cuesta <b>Q12</b> y pago con un billete de <b>Q20</b>, me deben dar <b>vuelto</b>. Restamos: 20 - 12 = 8. El vuelto es <b>Q8</b>.' },
        { t: 'video', titulo: 'Monedas y billetes de Guatemala', busqueda: 'monedas y billetes de Guatemala para niños quetzal' }
      ],
      juegos: [
        {
          tipo: 'tienda', titulo: 'La tiendita',
          instrucciones: ['Mira el producto y su precio.', 'Toca las monedas y billetes para ponerlos en la bandeja. Si te pasas, toca el dinero de la bandeja para quitarlo.', 'Cuando tengas el precio exacto, presiona Pagar.'],
          dinero: [{ v: 1, moneda: true }, { v: 5 }, { v: 10 }, { v: 20 }],
          rondas: [
            { prod: 'galleta', nombre: 'Galleta', precio: 2 },
            { prod: 'lapiz', nombre: 'Lápiz', precio: 3 },
            { prod: 'jugo', nombre: 'Jugo', precio: 6 },
            { prod: 'cuaderno', nombre: 'Cuaderno', precio: 12 },
            { prod: 'pelota', nombre: 'Pelota', precio: 25 },
            { prod: 'carro', nombre: 'Carrito', precio: 37 }
          ]
        },
        {
          tipo: 'emparejar', titulo: '¿Cuánto vale?',
          instrucciones: ['Toca un billete o moneda.', 'Luego toca lo que vale lo mismo.', '¡Une todas las parejas!'],
          pares: [
            [{ fig: 'dinero', v: 10, w: 100 }, '2 billetes de Q5'],
            [{ fig: 'dinero', v: 20, w: 100 }, '2 billetes de Q10'],
            [{ fig: 'dinero', v: 5, w: 100 }, '5 monedas de Q1'],
            [{ fig: 'dinero', v: 1, moneda: true }, '100 centavos'],
            ['Pago Q20 por algo de Q12', 'Vuelto: Q8']
          ]
        }
      ],
      clase: {
        titulo: 'Mi mercado escolar',
        descripcion: 'Montamos una tiendita en el aula con productos y precios. Compramos y vendemos con billetes y monedas de juguete (quetzales), sumando y restando para dar vuelto.',
        materiales: ['Empaques vacíos y limpios (cajas, botellas)', 'Etiquetas para precios', 'Billetes y monedas de juguete', 'Caja registradora de cartón', 'Hoja para anotar ventas'],
        pasos: [
          'Entre todos ponemos precios de Q1 a Q30 a los productos.',
          'Nos organizamos en vendedores y compradores; cada comprador recibe Q50 de juguete.',
          'El comprador elige 2 productos, suma los precios y paga.',
          'El vendedor calcula el vuelto con una resta y lo entrega.',
          'Cambiamos los roles para que todos sean vendedores y compradores.'
        ],
        cierre: '¿Cuánto dinero te quedó? ¿Qué harías para que te alcance para comprar un producto más?'
      }
    },

    /* ---------------------------------------------------- SEMANA 12 */
    {
      n: 12,
      titulo: 'Repaso: ¡Feria de los números!',
      resumen: 'Repasamos todo lo aprendido en la unidad con juegos de números, sumas, restas, figuras y dinero.',
      contenido: [
        { t: 'h3', x: 'Lo que aprendimos en esta unidad' },
        { t: 'tabla', cab: ['Semana', 'Tema', 'Recuerda...'], filas: [
          ['1', 'Contar de 2, 5 y 10', '10, 20, 30... son saltos de 10'],
          ['2', 'Decenas y unidades', '10 unidades = 1 decena'],
          ['3', 'Comparar', 'el cocodrilo come al mayor: &gt;, &lt;, ='],
          ['4', 'Suma', 'juntar y agregar'],
          ['5', 'Resta', 'quitar y comparar'],
          ['6', 'Patrones', 'descubre la regla'],
          ['7', 'Problemas', 'leo, pienso, opero y respondo'],
          ['8', 'Medir', 'cuartas, pies, pasos y clips'],
          ['9', 'Figuras planas', 'lados y vértices'],
          ['10', 'Gráficas', 'cada dibujo es un voto'],
          ['11', 'Dinero', 'Q1 = 100 centavos']
        ] },
        { t: 'p', x: 'Juega la ruleta y la memoria de repaso. Si alguna pregunta te cuesta, regresa a la semana de ese tema y vuelve a leer el contenido.' }
      ],
      juegos: [
        {
          tipo: 'ruleta', titulo: 'La gran ruleta del repaso',
          instrucciones: ['Gira la ruleta.', 'Responde la pregunta que te toque.', 'Completa las 8 preguntas.'],
          preguntas: [
            { q: '¿Qué número sigue? 20, 30, 40, __', ops: [50, 41, 45], r: 50 },
            { q: '¿Cuántas decenas tiene el 68?', ops: [6, 8, 68], r: 6 },
            { q: '¿Qué signo va? 39 __ 93', ops: ['<', '>', '='], r: '<' },
            { q: '26 + 13 = ?', ops: [39, 29, 49], r: 39 },
            { q: '75 - 32 = ?', ops: [43, 53, 47], r: 43 },
            { q: '¿Cuántos lados tiene un triángulo?', ops: [3, 4, 0], r: 3 },
            { q: '¿Cuántos clips mide el crayón?', fig: { fig: 'clips', n: 4, objeto: 'crayon' }, ops: [4, 3, 5], r: 4 },
            { q: 'Tengo Q20 y compro algo de Q15. ¿Cuánto me dan de vuelto?', ops: ['Q5', 'Q35', 'Q15'], r: 'Q5' }
          ]
        },
        {
          tipo: 'memoria', titulo: 'Memoria del repaso',
          instrucciones: ['Voltea dos cartas.', 'Busca las parejas que valen lo mismo.', '¡Encuéntralas todas!'],
          pares: [
            [{ fig: 'bloques', n: 32 }, 32],
            ['4 decenas', 40],
            ['18 + 11', 29],
            ['50 - 20', 30],
            [F.cua('#2f8cff'), '4 lados iguales'],
            [{ fig: 'dinero', v: 10, w: 100 }, 'Q5 + Q5']
          ]
        }
      ],
      clase: null
    }
  ]
});
