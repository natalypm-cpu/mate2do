/* ==========================================================
   Motor del sitio de clase (no necesitas editar este archivo
   para cambiar contenido: edita los archivos de src/data/).
   ========================================================== */
(function () {
  'use strict';

  var SITIO = window.SITIO || {};
  var UNIDADES = window.UNIDADES || [];
  var PROYECTOS = window.PROYECTOS || [];
  var PAGINA = window.PAGINA || { tipo: 'inicio' };
  var EMBED = !!PAGINA.embed;

  /* ---------------- utilidades ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function barajar(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  /* Almacenamiento seguro: en un iframe de Google Sites puede estar bloqueado */
  var memoria = {};
  var store = {
    get: function (k, def) {
      try { var v = window.localStorage.getItem('clase:' + k); return v == null ? def : JSON.parse(v); }
      catch (e) { return k in memoria ? memoria[k] : def; }
    },
    set: function (k, v) {
      memoria[k] = v;
      try { window.localStorage.setItem('clase:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento: seguimos */ }
    }
  };

  /* ---------------- enlaces ---------------- */
  var RUTAS = {
    inicio: function () { return 'index.html'; },
    unidades: function () { return 'contenidos.html'; },
    unidad: function (u) { return 'unidad-' + u + '.html'; },
    semana: function (u, s) { return 'u' + u + '-semana-' + pad2(s) + '.html'; },
    proyectos: function () { return 'proyectos.html'; },
    proyecto: function (u) { return 'proyecto-u' + u + '.html'; },
    galeria: function (u) { return 'galeria-u' + u + '.html'; }
  };
  function href(tipo, a, b) {
    var f = RUTAS[tipo](a, b);
    if (EMBED) return (SITIO.urlBase || '') + f;
    return f;
  }
  var TARGET = EMBED ? ' target="_top"' : '';

  /* ---------------- íconos de línea (SVG) ---------------- */
  var I = {
    abajo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    telescopio: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 30l34-14 5 12-34 14z"/><path d="M42 16l8-3 5 12-8 3"/><path d="M4 32l4-2 5 12-4 2z"/><path d="M28 38l-8 20M30 37l10 21M29 37v8"/><circle cx="29" cy="35" r="3"/></svg>',
    estrella: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" aria-hidden="true"><path d="M32 6l7.6 16.4L57 24.6 44 37l3.4 18L32 46.2 16.6 55 20 37 7 24.6l17.4-2.2z"/></svg>',
    personas: '<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="60" cy="28" r="14"/><path d="M34 86c0-16 12-28 26-28s26 12 26 28"/><circle cx="24" cy="38" r="10"/><path d="M6 86c0-12 8-21 18-21 5 0 9 2 12 5"/><circle cx="96" cy="38" r="10"/><path d="M114 86c0-12-8-21-18-21-5 0-9 2-12 5"/></svg>',
    bombilla: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 44c0-6-8-10-8-20a16 16 0 0 1 32 0c0 10-8 14-8 20z"/><path d="M24 50h16M26 56h12M32 4V0M8 24H4M60 24h-4M14 8l-3-3M50 8l3-3"/></svg>',
    lupa: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><circle cx="20" cy="20" r="13"/><path d="M30 30l12 12"/><path d="M16 15l9 5-9 5z" fill="currentColor" stroke="none"/></svg>',
    imagen: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="40" height="32" rx="3"/><circle cx="16" cy="19" r="4"/><path d="M4 34l12-10 9 8 7-6 12 10"/></svg>',
    estrellaRelleno: function (on) {
      return '<svg viewBox="0 0 64 64" class="' + (on ? 'on' : '') + '" aria-hidden="true"><path d="M32 4l8.5 18.2L60 24.6 45.5 38.3 49.3 58 32 48.2 14.7 58l3.8-19.7L4 24.6l19.5-2.4z" fill="' + (on ? '#ffcc00' : '#e3e6ee') + '" stroke="' + (on ? '#e0a800' : '#c9cedb') + '" stroke-width="3" stroke-linejoin="round"/></svg>';
    },
    estrellita: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.9 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.3l7-.8z" fill="#ffcc00"/></svg>',
    sonido: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>',
    mudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
    canasta: '<svg viewBox="0 0 60 44" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16h52l-6 24H10z"/><path d="M16 16l8-12M44 16l-8-12M20 24v10M30 24v10M40 24v10"/></svg>',
    signo: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" aria-hidden="true"><path d="M18 18a6 6 0 1 1 8 5.6c-1.4.6-2 1.6-2 3V30"/><circle cx="24" cy="37" r="1.5" fill="currentColor"/></svg>'
  };

  /* ---------------- figuras (SVG en línea) ---------------- */
  var COLORES = ['#ff4d4f', '#2f8cff', '#34c759', '#ffb300', '#8e5cf7', '#ff5fa2', '#14c4c4', '#ff7a1a'];
  var FIG = {
    /* bloques base 10: decenas como barras, unidades como cubos */
    bloques: function (o) {
      var n = o.n, d = Math.floor(n / 10), u = n % 10, x = 6, s = '';
      for (var i = 0; i < d; i++) {
        s += '<rect x="' + x + '" y="6" width="14" height="110" rx="2" fill="#2f8cff" stroke="#1c64c0" stroke-width="2"/>';
        for (var k = 1; k < 10; k++) s += '<line x1="' + x + '" x2="' + (x + 14) + '" y1="' + (6 + k * 11) + '" y2="' + (6 + k * 11) + '" stroke="#1c64c0" stroke-width="1.4"/>';
        x += 19;
      }
      if (d) x += 10;
      for (var j = 0; j < u; j++) {
        var cx = x + (j % 3) * 15, cy = 104 - Math.floor(j / 3) * 15;
        s += '<rect x="' + cx + '" y="' + cy + '" width="12" height="12" rx="2" fill="#ffcc00" stroke="#c99a00" stroke-width="2"/>';
      }
      var w = x + (u ? 3 * 15 : 0) + 6;
      return '<svg viewBox="0 0 ' + Math.max(w, 40) + ' 122" role="img" aria-label="' + d + ' decenas y ' + u + ' unidades">' + s + '</svg>';
    },
    /* recta numérica */
    recta: function (o) {
      var desde = o.desde, hasta = o.hasta, paso = o.paso || 1, salto = o.saltos || 0;
      var n = Math.round((hasta - desde) / paso), W = 600, m = 30, dx = (W - 2 * m) / n, s = '';
      s += '<line x1="10" y1="80" x2="' + (W - 10) + '" y2="80" stroke="#2e3340" stroke-width="3"/>';
      s += '<path d="M' + (W - 10) + ' 80l-10-6v12z" fill="#2e3340"/>';
      for (var i = 0; i <= n; i++) {
        var x = m + i * dx, v = desde + i * paso;
        var oculto = o.ocultar && o.ocultar.indexOf(v) >= 0;
        s += '<line x1="' + x + '" y1="72" x2="' + x + '" y2="88" stroke="#2e3340" stroke-width="3"/>';
        s += '<text x="' + x + '" y="112" text-anchor="middle" font-family="Roboto,Arial" font-weight="700" font-size="20" fill="' + (oculto ? '#e07a2c' : '#2e3340') + '">' + (oculto ? '?' : v) + '</text>';
        if (salto && i < n && i % salto === 0 && i + salto <= n) {
          var x2 = m + (i + salto) * dx;
          s += '<path d="M' + (x + 3) + ' 70 Q ' + ((x + x2) / 2) + ' ' + (20) + ' ' + (x2 - 3) + ' 70" fill="none" stroke="#e07a2c" stroke-width="3"/>';
          s += '<path d="M' + (x2 - 3) + ' 70 l-9 -5 l2 9z" fill="#e07a2c"/>';
        }
      }
      return '<svg viewBox="0 0 ' + W + ' 122" role="img" aria-label="Recta numérica de ' + desde + ' a ' + hasta + '">' + s + '</svg>';
    },
    /* objetos para contar o sumar */
    objetos: function (o) {
      var n = o.n, tipo = o.tipo || 'manzana', por = o.porFila || 5, s = '', size = 40;
      var tachados = o.tachar || 0;
      for (var i = 0; i < n; i++) {
        var x = (i % por) * (size + 6) + 4, y = Math.floor(i / por) * (size + 6) + 4;
        s += '<g transform="translate(' + x + ',' + y + ')">' + FIG._obj(tipo) + (i >= n - tachados ? '<path d="M2 2L38 38M38 2L2 38" stroke="#ff4d4f" stroke-width="5" stroke-linecap="round"/>' : '') + '</g>';
      }
      var filas = Math.ceil(n / por), cols = Math.min(n, por);
      return '<svg viewBox="0 0 ' + (cols * (size + 6) + 4) + ' ' + (filas * (size + 6) + 4) + '" role="img" aria-label="' + n + ' objetos">' + s + '</svg>';
    },
    _obj: function (tipo) {
      if (tipo === 'estrella') return '<path d="M20 2l5.3 11.4 12.2 1.5-9 8.6 2.4 12.3L20 29.8 9.1 35.8l2.4-12.3-9-8.6 12.2-1.5z" fill="#ffcc00" stroke="#d9a300" stroke-width="2"/>';
      if (tipo === 'pelota') return '<circle cx="20" cy="20" r="17" fill="#2f8cff"/><path d="M3 20h34M20 3c-8 8-8 26 0 34" stroke="#fff" stroke-width="3" fill="none"/>';
      if (tipo === 'pez') return '<path d="M4 20c8-12 22-12 28 0-6 12-20 12-28 0z" fill="#ff7a1a"/><path d="M30 20l8-8v16z" fill="#ff7a1a"/><circle cx="12" cy="18" r="2.5" fill="#fff"/>';
      if (tipo === 'flor') return '<circle cx="20" cy="10" r="7" fill="#ff5fa2"/><circle cx="30" cy="20" r="7" fill="#ff5fa2"/><circle cx="20" cy="30" r="7" fill="#ff5fa2"/><circle cx="10" cy="20" r="7" fill="#ff5fa2"/><circle cx="20" cy="20" r="6" fill="#ffcc00"/>';
      /* manzana */
      return '<path d="M20 11c-6-5-16-2-16 9 0 9 7 18 12 18 2 0 3-1 4-1s2 1 4 1c5 0 12-9 12-18 0-11-10-14-16-9z" fill="#ff4d4f"/><path d="M20 11c0-4 2-7 5-9" stroke="#6b3e1f" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 7c4-3 8-2 9 0-3 3-7 3-9 0z" fill="#34c759"/>';
    },
    /* figura plana */
    figura: function (o) {
      var c = o.color || '#2f8cff', f = o.forma, s;
      var st = ' fill="' + c + '" stroke="#2e3340" stroke-width="4" stroke-linejoin="round"';
      if (f === 'triangulo') s = '<path d="M60 8L112 104H8z"' + st + '/>';
      else if (f === 'cuadrado') s = '<rect x="14" y="10" width="92" height="92"' + st + '/>';
      else if (f === 'rectangulo') s = '<rect x="4" y="28" width="112" height="60"' + st + '/>';
      else if (f === 'circulo') s = '<circle cx="60" cy="56" r="48"' + st + '/>';
      else if (f === 'rombo') s = '<path d="M60 4L112 56 60 108 8 56z"' + st + '/>';
      else if (f === 'ovalo') s = '<ellipse cx="60" cy="56" rx="54" ry="34"' + st + '/>';
      else s = '<path d="M60 6l50 36-19 60H29L10 42z"' + st + '/>'; /* pentágono */
      return '<svg viewBox="0 0 120 112" role="img" aria-label="' + esc(f) + '">' + s + '</svg>';
    },
    /* patrón de figuras con un espacio ? */
    patron: function (o) {
      var s = '', x = 0;
      o.items.forEach(function (it) {
        if (it === '?') {
          s += '<rect x="' + (x + 4) + '" y="4" width="52" height="52" rx="8" fill="#fff" stroke="#e07a2c" stroke-width="4" stroke-dasharray="7 5"/><text x="' + (x + 30) + '" y="42" text-anchor="middle" font-family="Roboto,Arial" font-weight="900" font-size="32" fill="#e07a2c">?</text>';
        } else {
          s += '<g transform="translate(' + (x + 4) + ',4) scale(.46)">' + FIG.figura(it).replace(/^<svg[^>]*>|<\/svg>$/g, '') + '</g>';
        }
        x += 62;
      });
      return '<svg viewBox="0 0 ' + x + ' 60" role="img" aria-label="Patrón de figuras">' + s + '</svg>';
    },
    /* objeto medido con clips */
    clips: function (o) {
      var n = o.n, W = n * 46 + 20, s = '';
      s += FIG._largo(o.objeto || 'lapiz', n * 46, 10);
      for (var i = 0; i < n; i++) {
        var x = 10 + i * 46;
        s += '<rect x="' + (x + 2) + '" y="64" width="42" height="16" rx="8" fill="none" stroke="#8e5cf7" stroke-width="4"/><rect x="' + (x + 9) + '" y="69" width="28" height="6" rx="3" fill="none" stroke="#8e5cf7" stroke-width="3"/>';
      }
      return '<svg viewBox="0 0 ' + W + ' 90" role="img" aria-label="Objeto medido con clips">' + s + '</svg>';
    },
    _largo: function (obj, L, x0) {
      if (obj === 'crayon') return '<rect x="' + (x0 + 20) + '" y="20" width="' + (L - 20) + '" height="26" rx="4" fill="#34c759"/><path d="M' + (x0 + 20) + ' 20L' + x0 + ' 33L' + (x0 + 20) + ' 46z" fill="#1f9d48"/>';
      if (obj === 'libro') return '<rect x="' + x0 + '" y="12" width="' + L + '" height="40" rx="4" fill="#2f8cff" stroke="#1c64c0" stroke-width="3"/><rect x="' + (x0 + 8) + '" y="20" width="' + (L - 16) + '" height="8" fill="#fff" opacity=".6"/>';
      return '<rect x="' + (x0 + 24) + '" y="20" width="' + (L - 40) + '" height="26" fill="#ffcc00" stroke="#d9a300" stroke-width="2"/><rect x="' + (x0 + L - 18) + '" y="20" width="18" height="26" rx="4" fill="#ff5fa2"/><path d="M' + (x0 + 24) + ' 20L' + x0 + ' 33L' + (x0 + 24) + ' 46z" fill="#f5d6a8"/><path d="M' + (x0 + 8) + ' 29L' + x0 + ' 33L' + (x0 + 8) + ' 37z" fill="#2e3340"/>';
    },
    /* dinero (diseño genérico, no reproduce billetes reales) */
    dinero: function (o) {
      var v = o.v;
      if (v === 0.5 || v === 0.25 || v === 1 && o.moneda) {
        var txt = v === 1 ? 'Q1' : (v * 100) + 'c', r = v === 1 ? 30 : (v === 0.5 ? 27 : 24);
        return '<svg viewBox="0 0 64 64" width="' + (r * 2.2) + '" height="' + (r * 2.2) + '" role="img" aria-label="Moneda de ' + txt + '"><circle cx="32" cy="32" r="' + r + '" fill="' + (v === 1 ? '#e8c35a' : '#c9ced8') + '" stroke="' + (v === 1 ? '#b8922c' : '#8f96a6') + '" stroke-width="4"/><circle cx="32" cy="32" r="' + (r - 7) + '" fill="none" stroke="' + (v === 1 ? '#b8922c' : '#8f96a6') + '" stroke-width="1.5" stroke-dasharray="3 3"/><text x="32" y="39" text-anchor="middle" font-family="Roboto,Arial" font-weight="900" font-size="' + (v === 1 ? 20 : 17) + '" fill="#2e3340">' + txt + '</text></svg>';
      }
      var col = { 1: '#7fbf6a', 5: '#b07fd6', 10: '#e0605f', 20: '#5b8fd9', 50: '#e8a33d', 100: '#c98a5b' }[v] || '#7fbf6a';
      return '<svg viewBox="0 0 120 60" width="' + (o.w || 110) + '" role="img" aria-label="Billete de ' + v + ' quetzales"><rect x="2" y="2" width="116" height="56" rx="6" fill="' + col + '" stroke="#2e3340" stroke-width="2.5"/><rect x="9" y="9" width="102" height="42" rx="4" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><circle cx="36" cy="30" r="13" fill="#fff" opacity=".55"/><text x="80" y="40" text-anchor="middle" font-family="Roboto,Arial" font-weight="900" font-size="26" fill="#fff" stroke="#2e3340" stroke-width=".8">Q' + v + '</text></svg>';
    },
    /* producto de la tienda */
    producto: function (o) {
      var p = o.p, s;
      if (p === 'lapiz') s = '<g transform="rotate(-35 60 60)"><rect x="20" y="48" width="70" height="24" fill="#ffcc00" stroke="#d9a300" stroke-width="3"/><rect x="88" y="48" width="16" height="24" rx="4" fill="#ff5fa2"/><path d="M20 48L2 60l18 12z" fill="#f5d6a8"/><path d="M8 56L2 60l6 4z" fill="#2e3340"/></g>';
      else if (p === 'pelota') s = '<circle cx="60" cy="60" r="44" fill="#ff4d4f"/><path d="M16 60h88" stroke="#fff" stroke-width="8"/><circle cx="60" cy="60" r="12" fill="#fff" stroke="#2e3340" stroke-width="3"/>';
      else if (p === 'cuaderno') s = '<rect x="26" y="14" width="68" height="92" rx="6" fill="#2f8cff" stroke="#1c64c0" stroke-width="3"/><rect x="40" y="30" width="44" height="16" rx="3" fill="#fff"/><path d="M26 24h-6M26 40h-6M26 56h-6M26 72h-6M26 88h-6" stroke="#2e3340" stroke-width="4" stroke-linecap="round"/>';
      else if (p === 'jugo') s = '<path d="M38 30h44l-6 80H44z" fill="#ff9f1a" stroke="#c46f00" stroke-width="3"/><rect x="34" y="22" width="52" height="10" rx="3" fill="#fff" stroke="#c46f00" stroke-width="3"/><path d="M68 22l8-18" stroke="#34c759" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="68" r="12" fill="#ffcc00"/>';
      else if (p === 'galleta') s = '<circle cx="60" cy="60" r="44" fill="#d9a066" stroke="#a8713a" stroke-width="4"/><circle cx="44" cy="46" r="6" fill="#5a3a1e"/><circle cx="72" cy="42" r="5" fill="#5a3a1e"/><circle cx="62" cy="70" r="6" fill="#5a3a1e"/><circle cx="40" cy="74" r="4" fill="#5a3a1e"/><circle cx="80" cy="72" r="5" fill="#5a3a1e"/>';
      else if (p === 'carro') s = '<path d="M14 74V58l14-4 12-18h36l16 18h14v20z" fill="#8e5cf7" stroke="#5f35c4" stroke-width="3"/><path d="M46 42h12v14H38zM64 42h10l10 14H64z" fill="#cfe8ff"/><circle cx="36" cy="78" r="11" fill="#2e3340"/><circle cx="88" cy="78" r="11" fill="#2e3340"/>';
      else if (p === 'mochila') s = '<rect x="26" y="28" width="68" height="80" rx="16" fill="#14c4c4" stroke="#0b8f8f" stroke-width="3"/><path d="M44 28v-8a16 16 0 0 1 32 0v8" fill="none" stroke="#0b8f8f" stroke-width="6"/><rect x="38" y="64" width="44" height="30" rx="6" fill="#0fa3a3"/>';
      else s = FIG._obj('manzana').replace(/<path/g, '<path transform="translate(14,10) scale(2.3)"');
      return '<svg viewBox="0 0 120 120" role="img" aria-label="' + esc(p) + '">' + s + '</svg>';
    },
    /* pictograma */
    picto: function (o) {
      var filas = o.datos, s = '', W = 120 + (o.max || 8) * 34;
      filas.forEach(function (f, i) {
        var y = 10 + i * 46;
        s += '<text x="8" y="' + (y + 26) + '" font-family="Roboto,Arial" font-weight="700" font-size="17" fill="#2e3340">' + esc(f[0]) + '</text>';
        for (var k = 0; k < f[1]; k++) s += '<g transform="translate(' + (112 + k * 34) + ',' + (y + 2) + ') scale(.75)">' + FIG._obj(o.icono || 'manzana') + '</g>';
        s += '<line x1="4" x2="' + (W - 4) + '" y1="' + (y + 40) + '" y2="' + (y + 40) + '" stroke="#e3e5e9"/>';
      });
      return '<svg viewBox="0 0 ' + W + ' ' + (filas.length * 46 + 14) + '" role="img" aria-label="Pictograma">' + s + '</svg>';
    },
    /* gráfica de barras */
    barras: function (o) {
      var d = o.datos, max = o.max || 10, s = '', W = 80 + d.length * 90, H = 260, base = 220, esc_ = 180 / max;
      for (var g = 0; g <= max; g += 2) {
        var yy = base - g * esc_;
        s += '<line x1="50" x2="' + (W - 10) + '" y1="' + yy + '" y2="' + yy + '" stroke="#e3e5e9"/><text x="40" y="' + (yy + 5) + '" text-anchor="end" font-size="14" font-family="Roboto,Arial" fill="#555">' + g + '</text>';
      }
      d.forEach(function (f, i) {
        var x = 70 + i * 90, h = f[1] * esc_;
        s += '<rect x="' + x + '" y="' + (base - h) + '" width="56" height="' + h + '" rx="4" fill="' + COLORES[i % COLORES.length] + '"/>';
        s += '<text x="' + (x + 28) + '" y="' + (base + 22) + '" text-anchor="middle" font-size="15" font-weight="700" font-family="Roboto,Arial" fill="#2e3340">' + esc(f[0]) + '</text>';
      });
      s += '<line x1="50" x2="' + (W - 10) + '" y1="' + base + '" y2="' + base + '" stroke="#2e3340" stroke-width="2"/>';
      return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Gráfica de barras">' + s + '</svg>';
    },
    /* tabla de valor posicional */
    valorPosicional: function (o) {
      var n = o.n, d = Math.floor(n / 10), u = n % 10;
      return '<svg viewBox="0 0 320 150" role="img" aria-label="' + n + ' es ' + d + ' decenas y ' + u + ' unidades">' +
        '<rect x="10" y="10" width="150" height="40" fill="#2e3340"/><rect x="160" y="10" width="150" height="40" fill="#e07a2c"/>' +
        '<text x="85" y="37" text-anchor="middle" fill="#fff" font-family="Roboto,Arial" font-weight="700" font-size="18">Decenas (D)</text>' +
        '<text x="235" y="37" text-anchor="middle" fill="#fff" font-family="Roboto,Arial" font-weight="700" font-size="18">Unidades (U)</text>' +
        '<rect x="10" y="50" width="150" height="90" fill="#fff" stroke="#2e3340" stroke-width="2"/><rect x="160" y="50" width="150" height="90" fill="#fff" stroke="#2e3340" stroke-width="2"/>' +
        '<text x="85" y="112" text-anchor="middle" fill="#2f8cff" font-family="Roboto,Arial" font-weight="900" font-size="54">' + d + '</text>' +
        '<text x="235" y="112" text-anchor="middle" fill="#e07a2c" font-family="Roboto,Arial" font-weight="900" font-size="54">' + u + '</text></svg>';
    }
  };
  function fig(o) { return o && FIG[o.fig] ? FIG[o.fig](o) : ''; }
  /* contenido de una opción: número, texto o figura */
  function opHtml(op) { return (op && typeof op === 'object') ? fig(op) : esc(op); }
  function opKey(op) { return (op && typeof op === 'object') ? JSON.stringify(op) : String(op); }

  /* ---------------- sonidos (Web Audio, sin archivos) ---------------- */
  var audioCtx = null, sonidoOn = store.get('sonido', true);
  function tono(freqs, dur, tipo) {
    if (!sonidoOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var t = audioCtx.currentTime;
      freqs.forEach(function (f, i) {
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = tipo || 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + i * dur);
        g.gain.exponentialRampToValueAtTime(0.18, t + i * dur + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (i + 1) * dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t + i * dur); o.stop(t + (i + 1) * dur + 0.05);
      });
    } catch (e) { /* sin audio */ }
  }
  var SON = {
    bien: function () { tono([660, 880], 0.12, 'triangle'); },
    mal: function () { tono([220, 180], 0.16, 'square'); },
    salto: function () { tono([400, 600, 800], 0.06, 'sine'); },
    pop: function () { tono([900], 0.08, 'triangle'); },
    fin: function () { tono([523, 659, 784, 1046], 0.14, 'triangle'); }
  };

  function confeti(cont, n) {
    for (var i = 0; i < (n || 24); i++) {
      var c = el('span', { class: 'confeti' });
      c.style.left = Math.random() * 100 + '%';
      c.style.background = COLORES[i % COLORES.length];
      c.style.animationDuration = (1.2 + Math.random() * 1.3) + 's';
      c.style.animationDelay = (Math.random() * 0.3) + 's';
      cont.appendChild(c);
      (function (c) { setTimeout(function () { c.remove(); }, 3000); })(c);
    }
  }

  var ANIMO_BIEN = ['¡Muy bien!', '¡Excelente!', '¡Lo lograste!', '¡Genial!', '¡Súper!', '¡Correcto!'];
  var ANIMO_MAL = ['¡Uy! Intenta otra vez', 'Casi... prueba de nuevo', 'Piensa un poquito más', '¡Tú puedes! Otra vez'];
  function azar(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ==========================================================
     MARCO COMÚN DE CADA JUEGO
     ========================================================== */
  function montarJuego(cont, cfg, idJuego) {
    var caja = el('div', { class: 'juego' });
    var head = el('div', { class: 'juego-head' });
    var record = store.get('juego:' + idJuego, 0);
    head.innerHTML = '<h3>' + esc(cfg.titulo) + '</h3>';
    var marc = el('div', { class: 'juego-marcador' });
    var pAciertos = el('span', { class: 'pill', title: 'Aciertos' }, I.estrellita + ' <b>0</b>');
    var bSon = el('button', { class: 'pill', type: 'button', 'aria-label': 'Activar o desactivar sonido', style: 'border:0;color:#fff;cursor:pointer' }, sonidoOn ? I.sonido : I.mudo);
    bSon.addEventListener('click', function () { sonidoOn = !sonidoOn; store.set('sonido', sonidoOn); bSon.innerHTML = sonidoOn ? I.sonido : I.mudo; });
    marc.appendChild(pAciertos); marc.appendChild(bSon);
    head.appendChild(marc);
    var body = el('div', { class: 'juego-body' });
    caja.appendChild(head); caja.appendChild(body);
    cont.appendChild(caja);

    var estado = { aciertos: 0, errores: 0 };
    var api = {
      body: body,
      acierto: function () { estado.aciertos++; pAciertos.querySelector('b').textContent = estado.aciertos; SON.bien(); },
      error: function () { estado.errores++; SON.mal(); },
      terminar: function (total) {
        var ratio = estado.aciertos / Math.max(1, estado.aciertos + estado.errores);
        if (total != null) ratio = Math.min(ratio, estado.aciertos / Math.max(1, total));
        var est = ratio >= 0.85 ? 3 : ratio >= 0.6 ? 2 : 1;
        if (est > record) { record = est; store.set('juego:' + idJuego, est); }
        SON.fin();
        body.innerHTML = '';
        var f = el('div', { class: 'final' });
        var msg = est === 3 ? '¡Eres una estrella de las matemáticas!' : est === 2 ? '¡Muy buen trabajo! Puedes intentarlo otra vez para ganar más estrellas.' : '¡Buen intento! Juega otra vez y verás cómo mejoras.';
        f.innerHTML = '<div class="estrellas">' + I.estrellaRelleno(est >= 1) + I.estrellaRelleno(est >= 2) + I.estrellaRelleno(est >= 3) + '</div>' +
          '<h4>¡Terminaste!</h4><p>' + msg + '</p><p>Aciertos: <b>' + estado.aciertos + '</b> &nbsp; Intentos fallidos: <b>' + estado.errores + '</b></p>';
        var b = el('button', { class: 'btn-j azul', type: 'button' }, 'Jugar otra vez');
        b.addEventListener('click', function () { iniciar(); });
        f.appendChild(b);
        body.appendChild(f);
        confeti(body, 40);
      }
    };

    function iniciar() {
      estado.aciertos = 0; estado.errores = 0;
      pAciertos.querySelector('b').textContent = '0';
      body.innerHTML = '';
      JUEGOS[cfg.tipo](api, cfg);
    }

    /* pantalla de instrucciones */
    var ins = el('div', { class: 'instrucciones' });
    var pasos = (cfg.instrucciones || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
    ins.innerHTML = '<strong>¿Cómo se juega?</strong><ol>' + pasos + '</ol>';
    body.appendChild(ins);
    var zona = el('div', { class: 'centro' });
    if (record) zona.innerHTML = '<p style="margin:0 0 10px;font-family:var(--f-texto)">Tu mejor resultado: ' + record + ' de 3 estrellas</p>';
    var bj = el('button', { class: 'btn-jugar', type: 'button' }, '¡A jugar!');
    bj.addEventListener('click', iniciar);
    zona.appendChild(bj);
    body.appendChild(zona);
  }

  /* barra de progreso + pregunta (compartido) */
  function cabeceraPregunta(api, total) {
    var prog = el('div', { class: 'progreso' }, '<div></div>');
    var preg = el('div', { class: 'pregunta', 'aria-live': 'polite' });
    api.body.appendChild(prog); api.body.appendChild(preg);
    return {
      prog: prog, preg: preg,
      poner: function (i, q) {
        prog.firstChild.style.width = (i / total * 100) + '%';
        preg.innerHTML = esc(q.q) + (q.fig ? '<span class="fig">' + fig(q.fig) + '</span>' : '');
      }
    };
  }
  function feedbackEl(api) { var f = el('div', { class: 'feedback', 'aria-live': 'polite' }); return f; }
  function decir(f, ok, txt) { f.className = 'feedback ' + (ok ? 'bien' : 'mal'); f.textContent = txt || (ok ? azar(ANIMO_BIEN) : azar(ANIMO_MAL)); }

  /* ==========================================================
     JUEGOS
     ========================================================== */
  var SVG_NENUFAR = '<svg viewBox="0 0 120 90" aria-hidden="true"><ellipse cx="60" cy="50" rx="56" ry="34" fill="#3aa635"/><ellipse cx="60" cy="46" rx="54" ry="32" fill="#5fd35a"/><path d="M60 46L118 30V50z" fill="#3fb3e8"/></svg>';
  var SVG_RANA = '<svg viewBox="0 0 120 100" aria-hidden="true"><ellipse cx="60" cy="66" rx="44" ry="30" fill="#34c759"/><ellipse cx="60" cy="74" rx="28" ry="16" fill="#b8f5a8"/><circle cx="38" cy="34" r="16" fill="#34c759"/><circle cx="82" cy="34" r="16" fill="#34c759"/><circle cx="38" cy="32" r="10" fill="#fff"/><circle cx="82" cy="32" r="10" fill="#fff"/><circle cx="40" cy="33" r="5" fill="#2e3340"/><circle cx="80" cy="33" r="5" fill="#2e3340"/><path d="M44 58q16 12 32 0" fill="none" stroke="#1f7a33" stroke-width="4" stroke-linecap="round"/><circle cx="34" cy="56" r="5" fill="#ff8fab"/><circle cx="86" cy="56" r="5" fill="#ff8fab"/><path d="M18 88q-14 4-12 10M102 88q14 4 12 10" stroke="#34c759" stroke-width="9" stroke-linecap="round" fill="none"/></svg>';
  var SVG_NUBE = '<svg viewBox="0 0 160 84" aria-hidden="true"><path d="M30 76a24 24 0 0 1-2-48 32 32 0 0 1 60-10 26 26 0 0 1 44 16 22 22 0 0 1-4 42z" fill="#fff" stroke="#bfe3ff" stroke-width="3"/></svg>';
  var SVG_AVION = '<svg viewBox="0 0 160 90" aria-hidden="true"><path d="M10 48q0-14 30-14h80q26 0 32 14-6 14-32 14H40q-30 0-30-14z" fill="#ff4d4f"/><path d="M60 34L90 4h14L88 34zM60 62l30 26h14L88 62z" fill="#ffcc00"/><path d="M14 46L4 22h14l14 16z" fill="#ffcc00"/><circle cx="104" cy="46" r="6" fill="#bfe3ff"/><circle cx="86" cy="46" r="6" fill="#bfe3ff"/><circle cx="68" cy="46" r="6" fill="#bfe3ff"/><path d="M136 40q12 2 16 8-4 6-16 8z" fill="#bfe3ff"/><circle cx="153" cy="48" r="4" fill="#2e3340"/></svg>';
  var SVG_SOL = '<svg viewBox="0 0 60 60" class="sol" aria-hidden="true"><circle cx="30" cy="30" r="14" fill="#ffcc00"/><g stroke="#ffcc00" stroke-width="4" stroke-linecap="round"><path d="M30 4v8M30 48v8M4 30h8M48 30h8M11 11l6 6M43 43l6 6M11 49l6-6M43 17l6-6"/></g></svg>';
  function svgGlobo(c) { return '<svg viewBox="0 0 96 140" aria-hidden="true"><path d="M48 96q4 14-4 24t2 20" fill="none" stroke="#7a7f8c" stroke-width="2"/><ellipse cx="48" cy="50" rx="42" ry="48" fill="' + c + '"/><path d="M42 97h12l-6 8z" fill="' + c + '"/><ellipse cx="32" cy="30" rx="8" ry="14" fill="#fff" opacity=".35"/></svg>'; }
  function svgCoco(signo) {
    /* cocodrilo cuya boca abierta forma el signo */
    if (signo === '=') return '<svg viewBox="0 0 120 70" aria-hidden="true"><rect x="10" y="16" width="100" height="14" rx="7" fill="#34c759"/><rect x="10" y="40" width="100" height="14" rx="7" fill="#34c759"/><circle cx="96" cy="12" r="7" fill="#fff" stroke="#1f7a33" stroke-width="2"/><circle cx="97" cy="12" r="3" fill="#2e3340"/></svg>';
    var g = '<path d="M108 30L14 6l-4 10 86 16z" fill="#34c759"/><path d="M108 40L14 64l-4-10 86-16z" fill="#34c759"/><path d="M20 12l4 8M34 16l4 8M48 19l4 8M62 23l3 7M20 58l4-8M34 54l4-8M48 51l4-8M62 47l3-7" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="96" cy="22" r="7" fill="#fff" stroke="#1f7a33" stroke-width="2"/><circle cx="95" cy="22" r="3" fill="#2e3340"/><rect x="100" y="28" width="16" height="14" rx="7" fill="#1f9d48"/>';
    /* dibujo base: cabeza a la derecha y boca abierta hacia la izquierda = ">" */
    if (signo === '<') return '<svg viewBox="0 0 120 70" aria-hidden="true"><g transform="translate(120,0) scale(-1,1)">' + g + '</g></svg>';
    return '<svg viewBox="0 0 120 70" aria-hidden="true">' + g + '</svg>';
  }

  var JUEGOS = {};

  /* ---------- Rana saltarina ---------- */
  JUEGOS.rana = function (api, cfg) {
    var qs = barajar(cfg.preguntas), i = 0;
    var cab = cabeceraPregunta(api, qs.length);
    var escena = el('div', { class: 'escena escena-rana' });
    escena.innerHTML = '<div class="orilla"></div>';
    var pads = el('div', { class: 'nenufares' });
    var rana = el('div', { class: 'rana' }, SVG_RANA);
    escena.appendChild(pads); escena.appendChild(rana);
    api.body.appendChild(escena);
    var fb = feedbackEl(); api.body.appendChild(fb);
    var bloqueo = false;

    function volver() { rana.style.left = ''; rana.style.bottom = ''; }
    function mostrar() {
      if (i >= qs.length) { cab.prog.firstChild.style.width = '100%'; return setTimeout(function () { api.terminar(); }, 500); }
      var q = qs[i]; cab.poner(i, q); fb.textContent = ''; fb.className = 'feedback';
      pads.innerHTML = ''; bloqueo = false;
      barajar(q.ops).forEach(function (op) {
        var b = el('button', { class: 'nenufar', type: 'button', 'aria-label': 'Saltar a ' + (typeof op === 'object' ? 'figura' : op) }, SVG_NENUFAR + '<span>' + opHtml(op) + '</span>');
        b.addEventListener('click', function () {
          if (bloqueo || b.disabled) return;
          bloqueo = true;
          var er = escena.getBoundingClientRect(), br = b.getBoundingClientRect();
          rana.style.left = (br.left - er.left + br.width / 2 - rana.offsetWidth / 2) + 'px';
          rana.style.bottom = (er.bottom - br.bottom + br.height * 0.35) + 'px';
          rana.classList.remove('salta'); void rana.offsetWidth; rana.classList.add('salta');
          SON.salto();
          setTimeout(function () {
            if (opKey(op) === opKey(q.r)) {
              b.classList.add('brilla'); api.acierto(); decir(fb, true); confeti(escena, 18);
              setTimeout(function () { volver(); i++; setTimeout(mostrar, 450); }, 900);
            } else {
              b.classList.add('hunde'); b.disabled = true; api.error(); decir(fb, false, q.pista ? azar(ANIMO_MAL) + '. Pista: ' + q.pista : null);
              rana.classList.add('sacude');
              setTimeout(function () { rana.classList.remove('sacude'); volver(); bloqueo = false; }, 700);
            }
          }, 620);
        });
        pads.appendChild(b);
      });
    }
    mostrar();
  };

  /* ---------- Avión de las sumas ---------- */
  JUEGOS.avion = function (api, cfg) {
    var qs = barajar(cfg.preguntas), i = 0;
    var cab = cabeceraPregunta(api, qs.length);
    var escena = el('div', { class: 'escena escena-avion' }, SVG_SOL);
    var avion = el('div', { class: 'avion' }, SVG_AVION);
    var nubes = el('div', { class: 'nubes' });
    escena.appendChild(avion); escena.appendChild(nubes);
    api.body.appendChild(escena);
    var fb = feedbackEl(); api.body.appendChild(fb);
    var bloqueo = false;
    function volver() { avion.style.left = ''; avion.style.top = ''; }
    function mostrar() {
      if (i >= qs.length) { cab.prog.firstChild.style.width = '100%'; return setTimeout(function () { api.terminar(); }, 500); }
      var q = qs[i]; cab.poner(i, q); fb.textContent = ''; fb.className = 'feedback';
      nubes.innerHTML = ''; bloqueo = false;
      barajar(q.ops).forEach(function (op) {
        var b = el('button', { class: 'nube', type: 'button', 'aria-label': 'Volar a ' + op }, SVG_NUBE + '<span>' + opHtml(op) + '</span>');
        b.addEventListener('click', function () {
          if (bloqueo || b.disabled) return;
          bloqueo = true;
          var er = escena.getBoundingClientRect(), br = b.getBoundingClientRect();
          avion.style.left = (br.left - er.left - avion.offsetWidth * 0.55) + 'px';
          avion.style.top = (br.top - er.top + br.height / 2 - avion.offsetHeight / 2) + 'px';
          setTimeout(function () {
            if (opKey(op) === opKey(q.r)) {
              b.classList.add('explota'); api.acierto(); decir(fb, true); confeti(escena, 20);
              setTimeout(function () { volver(); i++; setTimeout(mostrar, 500); }, 800);
            } else {
              b.classList.add('gris'); b.disabled = true; api.error(); decir(fb, false, q.pista ? azar(ANIMO_MAL) + '. Pista: ' + q.pista : null);
              escena.classList.add('sacude');
              setTimeout(function () { escena.classList.remove('sacude'); volver(); bloqueo = false; }, 600);
            }
          }, 720);
        });
        nubes.appendChild(b);
      });
    }
    mostrar();
  };

  /* ---------- Globos: revienta el globo correcto ---------- */
  JUEGOS.globos = function (api, cfg) {
    var qs = barajar(cfg.preguntas), i = 0, activa = 0;
    var cab = cabeceraPregunta(api, qs.length);
    var escena = el('div', { class: 'escena escena-globos' });
    api.body.appendChild(escena);
    var fb = feedbackEl(); api.body.appendChild(fb);
    var colores = ['#ff4d4f', '#2f8cff', '#34c759', '#ffb300', '#8e5cf7', '#ff5fa2'];

    function lanzar(op, q, token, retraso) {
      var b = el('button', { class: 'globo', type: 'button', 'aria-label': 'Globo ' + op }, svgGlobo(azar(colores)) + '<span>' + opHtml(op) + '</span>');
      b.style.left = (4 + Math.random() * 76) + '%';
      b.style.animationDuration = (7 + Math.random() * 3) + 's';
      b.style.animationDelay = retraso + 's';
      b.addEventListener('animationend', function (e) {
        if (e.animationName === 'subir') { b.remove(); if (token === activa) lanzar(op, q, token, 0); }
      });
      b.addEventListener('click', function () {
        if (token !== activa || b.classList.contains('pop')) return;
        SON.pop();
        b.classList.add('pop');
        setTimeout(function () { b.remove(); }, 300);
        if (opKey(op) === opKey(q.r)) {
          activa = -1; api.acierto(); decir(fb, true); confeti(escena, 24);
          setTimeout(function () { i++; mostrar(); }, 900);
        } else { api.error(); decir(fb, false, q.pista ? azar(ANIMO_MAL) + '. Pista: ' + q.pista : null); setTimeout(function () { if (token === activa) lanzar(op, q, token, 1); }, 300); }
      });
      escena.appendChild(b);
    }
    function mostrar() {
      escena.innerHTML = '';
      if (i >= qs.length) { cab.prog.firstChild.style.width = '100%'; return setTimeout(function () { api.terminar(); }, 300); }
      var q = qs[i]; cab.poner(i, q); fb.textContent = ''; fb.className = 'feedback';
      activa = i + 1;
      var token = activa;
      barajar(q.ops).forEach(function (op, k) { lanzar(op, q, token, k * 1.1); });
    }
    mostrar();
  };

  /* ---------- Cocodrilo comparador ---------- */
  JUEGOS.cocodrilo = function (api, cfg) {
    var qs = barajar(cfg.preguntas), i = 0;
    var prog = el('div', { class: 'progreso' }, '<div></div>');
    api.body.appendChild(prog);
    var escena = el('div', { class: 'escena escena-coco' });
    api.body.appendChild(escena);
    var fb = feedbackEl(); api.body.appendChild(fb);
    function val(x) { return typeof x === 'object' ? x.n : x; }
    function mostrar() {
      prog.firstChild.style.width = (i / qs.length * 100) + '%';
      if (i >= qs.length) return setTimeout(function () { api.terminar(); }, 400);
      var q = qs[i], a = val(q.a), b = val(q.b), r = a > b ? '>' : a < b ? '<' : '=';
      fb.textContent = ''; fb.className = 'feedback';
      escena.innerHTML = '<p style="text-align:center;margin:0 0 10px;font-weight:700;color:#2b6a20;font-size:19px">El cocodrilo siempre abre la boca hacia el número MAYOR</p>';
      var fila = el('div', { class: 'comparar' });
      var hueco = el('div', { class: 'hueco' }, '<span style="font-size:40px;color:#3c8d2f;font-weight:900">?</span>');
      fila.appendChild(el('div', { class: 'num-grande' }, typeof q.a === 'object' ? '<span class="fig">' + fig(q.a) + '</span>' : esc(q.a)));
      fila.appendChild(hueco);
      fila.appendChild(el('div', { class: 'num-grande' }, typeof q.b === 'object' ? '<span class="fig">' + fig(q.b) + '</span>' : esc(q.b)));
      escena.appendChild(fila);
      var ops = el('div', { class: 'opciones-coco' }), bloqueo = false;
      [['>', 'mayor que'], ['<', 'menor que'], ['=', 'igual a']].forEach(function (s) {
        var bt = el('button', { class: 'btn-coco', type: 'button', 'aria-label': s[1] }, svgCoco(s[0]) + '<b>' + esc(s[0]) + '</b>');
        bt.addEventListener('click', function () {
          if (bloqueo) return;
          if (s[0] === r) {
            bloqueo = true; hueco.innerHTML = svgCoco(s[0]); hueco.style.borderStyle = 'solid';
            api.acierto(); decir(fb, true, azar(ANIMO_BIEN) + ' ' + a + ' es ' + s[1] + ' ' + b + '.'); confeti(escena, 16);
            setTimeout(function () { i++; mostrar(); }, 1300);
          } else { bt.classList.add('sacude'); setTimeout(function () { bt.classList.remove('sacude'); }, 450); api.error(); decir(fb, false); }
        });
        ops.appendChild(bt);
      });
      escena.appendChild(ops);
    }
    mostrar();
  };

  /* ---------- Ruleta de preguntas ---------- */
  JUEGOS.ruleta = function (api, cfg) {
    var qs = cfg.preguntas.slice(0, 8), N = qs.length, hechas = [], giro = 0;
    var zona = el('div', { class: 'ruleta-zona' });
    var wrap = el('div', { class: 'ruleta-wrap' });
    function rueda() {
      var s = '', a = 360 / N;
      for (var k = 0; k < N; k++) {
        var a0 = (k * a - 90) * Math.PI / 180, a1 = ((k + 1) * a - 90) * Math.PI / 180, am = ((k + .5) * a - 90) * Math.PI / 180;
        var x0 = 100 + 96 * Math.cos(a0), y0 = 100 + 96 * Math.sin(a0), x1 = 100 + 96 * Math.cos(a1), y1 = 100 + 96 * Math.sin(a1);
        var col = hechas.indexOf(k) >= 0 ? '#d5d9e2' : COLORES[k % COLORES.length];
        s += '<path d="M100 100L' + x0 + ' ' + y0 + 'A96 96 0 ' + (a > 180 ? 1 : 0) + ' 1 ' + x1 + ' ' + y1 + 'z" fill="' + col + '" stroke="#fff" stroke-width="3"/>';
        s += '<text x="' + (100 + 62 * Math.cos(am)) + '" y="' + (100 + 62 * Math.sin(am) + 9) + '" text-anchor="middle" font-family="Roboto,Arial" font-weight="900" font-size="26" fill="#fff"">' + (k + 1) + '</text>';
      }
      s += '<circle cx="100" cy="100" r="16" fill="#2e3340" stroke="#fff" stroke-width="4"/>';
      return s;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200'); svg.setAttribute('class', 'rueda'); svg.innerHTML = rueda();
    wrap.innerHTML = '<svg class="flecha" viewBox="0 0 40 50" aria-hidden="true"><path d="M4 4h32L20 46z" fill="#2e3340" stroke="#fff" stroke-width="3"/></svg>';
    wrap.appendChild(svg);
    zona.appendChild(wrap);
    var bGirar = el('button', { class: 'btn-j naranja', type: 'button' }, 'Girar la ruleta');
    zona.appendChild(bGirar);
    var preg = el('div', { class: 'pregunta', style: 'display:none' });
    var ops = el('div', { class: 'opciones' });
    var fb = feedbackEl();
    zona.appendChild(preg); zona.appendChild(ops); zona.appendChild(fb);
    api.body.appendChild(zona);

    bGirar.addEventListener('click', function () {
      var libres = []; for (var k = 0; k < N; k++) if (hechas.indexOf(k) < 0) libres.push(k);
      var elegido = azar(libres), a = 360 / N, centro = (elegido + .5) * a;
      bGirar.disabled = true; bGirar.style.opacity = .5; preg.style.display = 'none'; ops.innerHTML = ''; fb.textContent = '';
      giro += 1440 + ((360 - centro) - (giro % 360) + 360) % 360;
      svg.style.transform = 'rotate(' + giro + 'deg)';
      tono([300, 350, 400, 450, 500, 550], 0.1, 'triangle');
      setTimeout(function () { preguntar(elegido); }, 3300);
    });
    function preguntar(k) {
      var q = qs[k];
      preg.style.display = ''; preg.innerHTML = '<span style="color:#e07a2c">Pregunta ' + (k + 1) + ':</span> ' + esc(q.q) + (q.fig ? '<span class="fig">' + fig(q.fig) + '</span>' : '');
      fb.textContent = ''; fb.className = 'feedback';
      var listo = false;
      barajar(q.ops).forEach(function (op, j) {
        var b = el('button', { class: 'btn-op', type: 'button', style: 'background:' + COLORES[(j + 2) % COLORES.length] }, opHtml(op));
        b.addEventListener('click', function () {
          if (listo || b.disabled) return;
          if (opKey(op) === opKey(q.r)) {
            listo = true; api.acierto(); decir(fb, true); confeti(api.body, 20);
            hechas.push(k); svg.innerHTML = rueda();
            setTimeout(function () {
              if (hechas.length === N) return api.terminar();
              bGirar.disabled = false; bGirar.style.opacity = 1; preg.style.display = 'none'; ops.innerHTML = ''; fb.textContent = 'Gira otra vez';
              fb.className = 'feedback';
            }, 1100);
          } else { b.disabled = true; b.style.opacity = .35; api.error(); decir(fb, false, q.pista ? azar(ANIMO_MAL) + '. Pista: ' + q.pista : null); }
        });
        ops.appendChild(b);
      });
    }
  };

  /* ---------- Emparejar ---------- */
  JUEGOS.emparejar = function (api, cfg) {
    var pares = barajar(cfg.pares).slice(0, cfg.max || 6), hechos = 0, sel = null, colorI = 0;
    var cont = el('div', { class: 'emparejar' });
    var izq = el('div', { class: 'col' }), der = el('div', { class: 'col' });
    cont.appendChild(izq); cont.appendChild(der);
    api.body.appendChild(cont);
    var fb = feedbackEl(); api.body.appendChild(fb);
    function ficha(contenido, id, lado) {
      var f = el('button', { class: 'ficha', type: 'button' }, opHtml(contenido));
      f.dataset.id = id; f.dataset.lado = lado;
      f.addEventListener('click', function () {
        if (f.classList.contains('hecha')) return;
        if (!sel || sel.dataset.lado === lado) {
          if (sel) sel.classList.remove('sel');
          sel = f; f.classList.add('sel'); tono([520], 0.06); return;
        }
        if (sel.dataset.id === id) {
          var c = COLORES[colorI++ % COLORES.length];
          [sel, f].forEach(function (x) { x.classList.remove('sel'); x.classList.add('hecha'); x.style.background = c; });
          sel = null; hechos++; api.acierto(); decir(fb, true);
          if (hechos === pares.length) setTimeout(function () { api.terminar(); }, 900);
        } else {
          var s = sel; s.classList.remove('sel'); sel = null;
          [s, f].forEach(function (x) { x.classList.add('error'); setTimeout(function () { x.classList.remove('error'); }, 450); });
          api.error(); decir(fb, false);
        }
      });
      return f;
    }
    var L = pares.map(function (p, k) { return ficha(p[0], 'p' + k, 'i'); });
    var R = pares.map(function (p, k) { return ficha(p[1], 'p' + k, 'd'); });
    barajar(L).forEach(function (f) { izq.appendChild(f); });
    barajar(R).forEach(function (f) { der.appendChild(f); });
  };

  /* ---------- Memoria (parejas) ---------- */
  JUEGOS.memoria = function (api, cfg) {
    var pares = barajar(cfg.pares).slice(0, cfg.max || 6), cartas = [], abiertas = [], hechos = 0, bloqueo = false;
    pares.forEach(function (p, k) { cartas.push({ id: k, c: p[0] }, { id: k, c: p[1] }); });
    var grid = el('div', { class: 'memoria' });
    api.body.appendChild(grid);
    var fb = feedbackEl(); api.body.appendChild(fb);
    barajar(cartas).forEach(function (c) {
      var b = el('button', { class: 'carta', type: 'button', 'aria-label': 'Carta' },
        '<div class="carta-in"><div class="cara atras">' + I.signo + '</div><div class="cara frente">' + opHtml(c.c) + '</div></div>');
      b.addEventListener('click', function () {
        if (bloqueo || b.classList.contains('volteada') || b.classList.contains('hecha')) return;
        b.classList.add('volteada'); tono([600], 0.05);
        abiertas.push({ b: b, id: c.id });
        if (abiertas.length === 2) {
          bloqueo = true;
          var a = abiertas[0], z = abiertas[1];
          if (a.id === z.id) {
            setTimeout(function () {
              a.b.classList.add('hecha'); z.b.classList.add('hecha'); abiertas = []; bloqueo = false; hechos++;
              api.acierto(); decir(fb, true);
              if (hechos === pares.length) setTimeout(function () { api.terminar(); }, 700);
            }, 350);
          } else {
            api.error(); decir(fb, false, 'No son pareja. ¡Recuerda dónde están!');
            setTimeout(function () { a.b.classList.remove('volteada'); z.b.classList.remove('volteada'); abiertas = []; bloqueo = false; }, 1100);
          }
        }
      });
      grid.appendChild(b);
    });
  };

  /* ---------- Clasificar rápido ---------- */
  JUEGOS.clasificar = function (api, cfg) {
    var items = barajar(cfg.items), i = 0, fin = false, cuentas = cfg.grupos.map(function () { return 0; });
    var reloj = null, timer = null;
    if (cfg.tiempo) { reloj = el('div', { class: 'reloj' }, '<div></div>'); api.body.appendChild(reloj); }
    var prog = el('div', { class: 'progreso' }, '<div></div>'); api.body.appendChild(prog);
    var tarjeta = el('div', { class: 'clasif-tarjeta' }); api.body.appendChild(tarjeta);
    var canastas = el('div', { class: 'canastas' }); api.body.appendChild(canastas);
    var fb = feedbackEl(); api.body.appendChild(fb);
    var colores = ['#2f8cff', '#ff5fa2', '#34c759', '#ff7a1a'];
    var bots = cfg.grupos.map(function (g, k) {
      var b = el('button', { class: 'canasta', type: 'button', style: 'background:' + colores[k % 4] }, I.canasta + '<span>' + esc(g) + '</span><span class="cuenta">0</span>');
      b.addEventListener('click', function () { elegir(k, b); });
      canastas.appendChild(b); return b;
    });
    function terminar() { if (fin) return; fin = true; clearInterval(timer); api.terminar(items.length); }
    function mostrar() {
      prog.firstChild.style.width = (i / items.length * 100) + '%';
      if (i >= items.length) return setTimeout(terminar, 400);
      var it = items[i];
      tarjeta.style.animation = 'none'; void tarjeta.offsetWidth; tarjeta.style.animation = '';
      tarjeta.innerHTML = it.fig ? fig(it.fig) : esc(it.x);
    }
    function elegir(k, b) {
      if (fin || i >= items.length) return;
      var it = items[i];
      if (it.g === k) { cuentas[k]++; b.querySelector('.cuenta').textContent = cuentas[k]; api.acierto(); decir(fb, true); }
      else { api.error(); b.classList.add('sacude'); setTimeout(function () { b.classList.remove('sacude'); }, 450); decir(fb, false, 'Va en: ' + cfg.grupos[it.g]); }
      i++; mostrar();
    }
    if (cfg.tiempo) {
      var t0 = Date.now(), T = cfg.tiempo * 1000;
      timer = setInterval(function () {
        var r = Math.max(0, 1 - (Date.now() - t0) / T);
        reloj.firstChild.style.width = (r * 100) + '%';
        if (r <= 0) terminar();
        if (!document.body.contains(reloj)) clearInterval(timer);
      }, 200);
    }
    mostrar();
  };

  /* ---------- Ordenar ---------- */
  JUEGOS.ordenar = function (api, cfg) {
    var rondas = cfg.rondas, r = 0;
    var titulo = el('div', { class: 'pregunta' }); api.body.appendChild(titulo);
    var slots = el('div', { class: 'ordenar-slots' }); api.body.appendChild(slots);
    var fichas = el('div', { class: 'ordenar-fichas' }); api.body.appendChild(fichas);
    var acc = el('div', { class: 'centro' }); api.body.appendChild(acc);
    var fb = feedbackEl(); api.body.appendChild(fb);
    function ronda() {
      if (r >= rondas.length) return api.terminar();
      var R = rondas[r], ancho = !!R.ancho, colocados = [];
      titulo.innerHTML = esc(R.q || cfg.q || 'Ordena') + ' <span style="font-size:.6em;color:#888">(' + (r + 1) + ' de ' + rondas.length + ')</span>';
      slots.innerHTML = ''; fichas.innerHTML = ''; acc.innerHTML = ''; fb.textContent = ''; fb.className = 'feedback';
      if (ancho) { slots.style.flexDirection = 'column'; slots.style.alignItems = 'center'; fichas.style.flexDirection = 'column'; fichas.style.alignItems = 'center'; }
      else { slots.style.flexDirection = ''; slots.style.alignItems = ''; fichas.style.flexDirection = ''; fichas.style.alignItems = ''; }
      var S = R.items.map(function (_, k) {
        var s = el('button', { class: 'slot' + (ancho ? ' ancho' : ''), type: 'button' }, ancho ? '<span class="n">' + (k + 1) + '.</span>' : '');
        s.addEventListener('click', function () {
          if (!s._f) return;
          s._f.classList.remove('usada'); s._f = null; s.classList.remove('lleno', 'bien', 'malo');
          s.innerHTML = ancho ? '<span class="n">' + (k + 1) + '.</span>' : '';
          bComp.style.display = 'none';
        });
        slots.appendChild(s); return s;
      });
      barajar(R.items.map(function (x, k) { return { x: x, k: k }; })).forEach(function (o, j) {
        var f = el('button', { class: 'ficha-o' + (ancho ? ' ancho' : ''), type: 'button', style: 'background:' + COLORES[j % COLORES.length] }, opHtml(o.x));
        f._k = o.k;
        f.addEventListener('click', function () {
          if (f.classList.contains('usada')) return;
          for (var k = 0; k < S.length; k++) if (!S[k]._f) {
            S[k]._f = f; S[k].classList.add('lleno'); S[k].innerHTML = (ancho ? '<span class="n">' + (k + 1) + '.</span>' : '') + opHtml(o.x);
            f.classList.add('usada'); tono([500 + k * 60], 0.06); break;
          }
          if (S.every(function (s) { return s._f; })) bComp.style.display = '';
        });
        fichas.appendChild(f);
      });
      var bComp = el('button', { class: 'btn-j', type: 'button', style: 'display:none' }, 'Comprobar');
      bComp.addEventListener('click', function () {
        var ok = true;
        S.forEach(function (s, k) {
          var bien = opKey(R.items[s._f._k]) === opKey(R.items[k]);
          s.classList.add(bien ? 'bien' : 'malo'); if (!bien) ok = false;
        });
        if (ok) { api.acierto(); decir(fb, true); confeti(api.body, 24); bComp.style.display = 'none'; setTimeout(function () { r++; ronda(); }, 1300); }
        else { api.error(); decir(fb, false, 'Las casillas en rojo no van ahí. Tócalas para quitarlas y vuelve a intentar.'); }
      });
      acc.appendChild(bComp);
    }
    ronda();
  };

  /* ---------- Bloques base 10 ---------- */
  JUEGOS.bloques = function (api, cfg) {
    var rondas = barajar(cfg.rondas), r = 0, D = 0, U = 0;
    var preg = el('div', { class: 'pregunta' }); api.body.appendChild(preg);
    var area = el('div', { class: 'bloques-area', 'aria-live': 'polite' }); api.body.appendChild(area);
    var ctr = el('div', { class: 'controles' });
    function control(nombre, set, get) {
      var c = el('div', { class: 'control' });
      c.innerHTML = '<b>' + nombre + '</b><div class="valor">0</div>';
      var m = el('button', { class: 'menos', type: 'button', 'aria-label': 'Quitar ' + nombre }, '-');
      var p = el('button', { class: 'mas', type: 'button', 'aria-label': 'Agregar ' + nombre }, '+');
      m.addEventListener('click', function () { if (get() > 0) { set(get() - 1); dibujar(); tono([420], .05); } });
      p.addEventListener('click', function () { if (get() < 9) { set(get() + 1); dibujar(); tono([620], .05); } });
      var row = el('div'); row.appendChild(m); row.appendChild(p); c.appendChild(row);
      ctr.appendChild(c); return c.querySelector('.valor');
    }
    var vD = control('Decenas (barras de 10)', function (v) { D = v; }, function () { return D; });
    var vU = control('Unidades (cubitos)', function (v) { U = v; }, function () { return U; });
    api.body.appendChild(ctr);
    var total = el('div', { class: 'total', style: 'margin-top:12px' }); api.body.appendChild(total);
    var acc = el('div', { class: 'centro', style: 'margin-top:10px' });
    var b = el('button', { class: 'btn-j', type: 'button' }, 'Comprobar'); acc.appendChild(b); api.body.appendChild(acc);
    var fb = feedbackEl(); api.body.appendChild(fb);
    function dibujar() {
      vD.textContent = D; vU.textContent = U;
      var h = '<div class="grupo">';
      for (var k = 0; k < D; k++) h += '<div class="barra-10">' + new Array(11).join('<i></i>') + '</div>';
      h += '</div><div class="unos">';
      for (var j = 0; j < U; j++) h += '<div class="cubo-1"></div>';
      area.innerHTML = h + '</div>';
      total.textContent = 'Formaste el número: ' + (D * 10 + U);
    }
    function ronda() {
      if (r >= rondas.length) return api.terminar();
      D = 0; U = 0; dibujar(); fb.textContent = ''; fb.className = 'feedback';
      preg.innerHTML = 'Forma el número <span style="color:#e07a2c">' + rondas[r] + '</span>';
    }
    b.addEventListener('click', function () {
      if (r >= rondas.length) return;
      var meta = rondas[r];
      if (D * 10 + U === meta) {
        api.acierto(); decir(fb, true, azar(ANIMO_BIEN) + ' ' + meta + ' = ' + Math.floor(meta / 10) + ' decenas y ' + (meta % 10) + ' unidades.'); confeti(api.body, 24);
        r++; setTimeout(ronda, 1600);
      } else {
        api.error();
        decir(fb, false, (D * 10 + U) < meta ? 'Te faltan bloques. ¡Agrega más!' : 'Tienes demasiados. ¡Quita algunos!');
      }
    });
    ronda();
  };

  /* ---------- Tienda: paga el precio exacto ---------- */
  JUEGOS.tienda = function (api, cfg) {
    var rondas = cfg.rondas, r = 0, bandejaV = [];
    var prod = el('div', { class: 'tienda-prod' }); api.body.appendChild(prod);
    var total = el('div', { class: 'total' }); api.body.appendChild(total);
    var bandeja = el('div', { class: 'bandeja', 'aria-label': 'Dinero que vas a pagar' }); api.body.appendChild(bandeja);
    var dinero = el('div', { class: 'dinero' }); api.body.appendChild(dinero);
    var acc = el('div', { class: 'centro', style: 'margin-top:14px' });
    var bPagar = el('button', { class: 'btn-j', type: 'button' }, 'Pagar'); acc.appendChild(bPagar); api.body.appendChild(acc);
    var fb = feedbackEl(); api.body.appendChild(fb);
    function suma() { return bandejaV.reduce(function (a, b) { return a + b.v; }, 0); }
    function dibujar() {
      bandeja.innerHTML = bandejaV.length ? '' : '<span class="vacia">Toca las monedas y billetes para ponerlos aquí</span>';
      bandejaV.forEach(function (m, k) {
        var b = el('button', { type: 'button', 'aria-label': 'Quitar Q' + m.v }, fig({ fig: 'dinero', v: m.v, moneda: m.moneda, w: 84 }));
        b.addEventListener('click', function () { bandejaV.splice(k, 1); dibujar(); tono([400], .05); });
        bandeja.appendChild(b);
      });
      total.innerHTML = 'Llevas: <span style="color:#1f9d48">Q' + suma() + '</span>';
    }
    (cfg.dinero || [{ v: 1, moneda: true }, { v: 5 }, { v: 10 }, { v: 20 }]).forEach(function (m) {
      var b = el('button', { type: 'button', 'aria-label': 'Agregar Q' + m.v }, fig({ fig: 'dinero', v: m.v, moneda: m.moneda, w: 110 }));
      b.addEventListener('click', function () { bandejaV.push(m); dibujar(); tono([700], .05); });
      dinero.appendChild(b);
    });
    function ronda() {
      if (r >= rondas.length) return api.terminar();
      var R = rondas[r]; bandejaV = []; fb.textContent = ''; fb.className = 'feedback';
      prod.innerHTML = '<div class="prod-img">' + fig({ fig: 'producto', p: R.prod }) + '</div><div><div style="font-size:22px;font-weight:900;color:#2e3340;margin-bottom:8px">' + esc(R.nombre) + '</div><div class="etiqueta-precio">Q' + R.precio + '</div></div>';
      dibujar();
    }
    bPagar.addEventListener('click', function () {
      if (r >= rondas.length) return;
      var p = rondas[r].precio, s = suma();
      if (s === p) { api.acierto(); decir(fb, true, '¡Pago exacto! Pagaste Q' + p + '.'); confeti(api.body, 26); r++; setTimeout(ronda, 1500); }
      else { api.error(); decir(fb, false, s < p ? 'Te faltan Q' + (p - s) + '.' : 'Te pasaste por Q' + (s - p) + '. Quita algo de la bandeja.'); }
    });
    ronda();
  };

  /* ---------- Gráfica: construye el pictograma ---------- */
  JUEGOS.grafica = function (api, cfg) {
    var cats = cfg.categorias, vals = cats.map(function () { return 0; });
    var preg = el('div', { class: 'pregunta', style: 'font-size:22px' }, esc(cfg.q || 'Construye la gráfica con los datos de la tabla'));
    api.body.appendChild(preg);
    var tabla = el('div', { class: 'tabla-wrap tabla-conteo' });
    tabla.innerHTML = '<table><thead><tr><th>' + esc(cfg.columna || 'Opción') + '</th><th>Votos</th></tr></thead><tbody>' +
      cats.map(function (c) { return '<tr><td>' + esc(c.nombre) + '</td><td><b>' + c.valor + '</b></td></tr>'; }).join('') + '</tbody></table>';
    api.body.appendChild(tabla);
    var graf = el('div', { class: 'grafica' }); api.body.appendChild(graf);
    var pilas = cats.map(function (c, k) {
      var col = el('div', { class: 'columna-g' });
      var pila = el('div', { class: 'pila' });
      var bt = el('div', { class: 'botones' });
      var m = el('button', { type: 'button', style: 'background:#ff4d4f', 'aria-label': 'Quitar en ' + c.nombre }, '-');
      var p = el('button', { type: 'button', style: 'background:#34c759', 'aria-label': 'Agregar en ' + c.nombre }, '+');
      m.addEventListener('click', function () { if (vals[k] > 0) { vals[k]--; dib(k); tono([420], .05); } });
      p.addEventListener('click', function () { if (vals[k] < 6) { vals[k]++; dib(k); tono([620], .05); } });
      bt.appendChild(m); bt.appendChild(p);
      col.appendChild(pila); col.appendChild(el('div', { class: 'nombre' }, esc(c.nombre))); col.appendChild(bt);
      graf.appendChild(col); return pila;
    });
    function dib(k) {
      var h = ''; for (var j = 0; j < vals[k]; j++) h += '<svg viewBox="0 0 40 40">' + FIG._obj(cats[k].icono || 'manzana') + '</svg>';
      pilas[k].innerHTML = h;
    }
    var acc = el('div', { class: 'centro', style: 'margin-top:12px' });
    var b = el('button', { class: 'btn-j', type: 'button' }, 'Comprobar'); acc.appendChild(b); api.body.appendChild(acc);
    var fb = feedbackEl(); api.body.appendChild(fb);
    var preguntasDespues = cfg.preguntas || [];
    b.addEventListener('click', function () {
      var malas = cats.filter(function (c, k) { return vals[k] !== c.valor; });
      if (!malas.length) {
        api.acierto(); decir(fb, true, '¡Tu gráfica está perfecta!'); confeti(api.body, 30);
        b.style.display = 'none';
        if (preguntasDespues.length) setTimeout(function () { preguntasGrafica(); }, 1200);
        else setTimeout(function () { api.terminar(); }, 1400);
      } else { api.error(); decir(fb, false, 'Revisa: ' + malas.map(function (c) { return c.nombre; }).join(', ') + '. Cuenta otra vez los votos de la tabla.'); }
    });
    function preguntasGrafica() {
      var i = 0, zona = el('div', { style: 'margin-top:18px' }); api.body.appendChild(zona);
      function una() {
        if (i >= preguntasDespues.length) return api.terminar();
        var q = preguntasDespues[i]; zona.innerHTML = '';
        zona.appendChild(el('div', { class: 'pregunta', style: 'font-size:22px' }, esc(q.q)));
        var ops = el('div', { class: 'opciones' }), listo = false;
        barajar(q.ops).forEach(function (op, j) {
          var bt = el('button', { class: 'btn-op', type: 'button', style: 'background:' + COLORES[(j + 1) % COLORES.length] + ';font-size:21px' }, esc(op));
          bt.addEventListener('click', function () {
            if (listo || bt.disabled) return;
            if (op === q.r) { listo = true; api.acierto(); decir(fb, true); i++; setTimeout(una, 1000); }
            else { bt.disabled = true; bt.style.opacity = .35; api.error(); decir(fb, false); }
          });
          ops.appendChild(bt);
        });
        zona.appendChild(ops);
        zona.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      una();
    }
  };

  /* ==========================================================
     BLOQUES DE CONTENIDO
     ========================================================== */
  function bloque(b) {
    switch (b.t) {
      case 'h3': return '<h3>' + esc(b.x) + '</h3>';
      case 'p': return '<p class="justificado">' + b.x + '</p>';
      case 'lista': return '<ul class="cuadradas">' + b.items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
      case 'ejemplo': return '<div class="tarjeta ejemplo">' + (b.titulo ? '<h4>' + esc(b.titulo) + '</h4>' : '') + (b.x ? '<p>' + b.x + '</p>' : '') + (b.fig ? '<div class="diagrama">' + fig(b.fig) + '</div>' : '') + '</div>';
      case 'tarjeta': return '<div class="tarjeta">' + (b.titulo ? '<h4>' + esc(b.titulo) + '</h4>' : '') + b.x + '</div>';
      case 'fig': return '<div class="diagrama">' + fig(b.fig) + (b.pie ? '<div class="pie-fig">' + esc(b.pie) + '</div>' : '') + '</div>';
      case 'figs': return '<div class="diagrama" style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center">' + b.figs.map(function (f) {
        return '<div style="width:' + (b.ancho || 130) + 'px;text-align:center">' + fig(f) + (f.nombre ? '<div class="pie-fig"><b>' + esc(f.nombre) + '</b>' + (f.nota ? '<br>' + esc(f.nota) : '') + '</div>' : '') + '</div>';
      }).join('') + '</div>';
      case 'tabla': return '<div class="tabla-wrap"><table><thead><tr>' + b.cab.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        b.filas.map(function (f) { return '<tr>' + f.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      case 'video': return videoHtml(b);
      default: return '';
    }
  }
  function videoHtml(b) {
    /* window.VIDEOS_OK lo genera build.mjs solo con los videos que YouTube confirmó como incrustables */
    if (b.id && (window.VIDEOS_OK || {})[b.id]) {
      return '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(b.id) + '" title="' + esc(b.titulo || 'Video') + '" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
    var url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(b.busqueda || '');
    return '<div class="video-busqueda">' + I.lupa + '<div><p><b>Video sugerido:</b> ' + esc(b.titulo || b.busqueda) + '</p><p style="font-size:15px;color:#555">Aún no hay un video verificado para esta semana. Busca uno, revísalo antes de la clase y agrégalo en el archivo de datos.</p><a href="' + url + '" target="_blank" rel="noopener">Buscar en YouTube</a></div></div>';
  }

  /* ==========================================================
     ESTRUCTURA DE PÁGINA
     ========================================================== */
  function header() {
    var h = el('header', { class: 'header' });
    var proyectosLinks = PROYECTOS.map(function (p) {
      return '<a href="' + href('proyecto', p.u) + '">Proyecto U' + p.u + '</a><a href="' + href('galeria', p.u) + '">Galería de Evidencias U' + p.u + '</a>';
    }).join('');
    var unidadesLinks = UNIDADES.map(function (u) { return '<a href="' + href('unidad', u.n) + '">Unidad ' + u.n + '</a>'; }).join('');
    h.innerHTML = '<div class="header-inner"><a class="brand" href="' + href('inicio') + '">' + esc(SITIO.nombreCorto || 'Mi clase') + '</a>' +
      '<button class="hamburger" type="button" aria-label="Abrir menú" aria-expanded="false">' + I.menu + '</button>' +
      '<nav class="nav" aria-label="Menú principal">' +
      '<div class="nav-item"><a class="nav-link" href="' + href('inicio') + '">Inicio</a></div>' +
      '<div class="nav-item"><button class="nav-link" type="button" aria-expanded="false">Contenidos ' + I.abajo + '</button><div class="dropdown"><a href="' + href('unidades') + '">Unidades de Trabajo</a>' + unidadesLinks + '</div></div>' +
      '<div class="nav-item"><button class="nav-link" type="button" aria-expanded="false">Proyectos ' + I.abajo + '</button><div class="dropdown"><a href="' + href('proyectos') + '">Unidades</a>' + proyectosLinks + '</div></div>' +
      '</nav></div>';
    var nav = h.querySelector('.nav'), ham = h.querySelector('.hamburger');
    ham.addEventListener('click', function () {
      var o = nav.classList.toggle('open'); ham.setAttribute('aria-expanded', o);
      if (o) h.classList.add('scrolled'); else onScroll();
    });
    h.querySelectorAll('button.nav-link').forEach(function (b) {
      b.addEventListener('click', function () {
        var it = b.parentNode, o = !it.classList.contains('open');
        h.querySelectorAll('.nav-item.open').forEach(function (x) { x.classList.remove('open'); });
        if (o) it.classList.add('open');
        b.setAttribute('aria-expanded', o);
      });
    });
    document.addEventListener('click', function (e) {
      if (!h.contains(e.target)) h.querySelectorAll('.nav-item.open').forEach(function (x) { x.classList.remove('open'); });
    });
    function onScroll() { if (!nav.classList.contains('open')) h.classList.toggle('scrolled', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return h;
  }
  function banner(titulo, opts) {
    opts = opts || {};
    return '<section class="banner"><h1 class="' + (opts.cursiva ? 'cursiva' : '') + '">' + esc(titulo) + '</h1>' +
      (opts.sub ? '<p class="sub">' + esc(opts.sub) + '</p>' : '') +
      (opts.frase ? '<p class="frase">' + esc(opts.frase) + '</p>' : '') +
      '<div class="barra"></div></section>';
  }
  function banda(html, cursiva) { return '<section class="banda">' + (cursiva ? '<p class="cursiva">' + html + '</p>' : '<h2>' + html + '</h2>') + '</section>'; }
  function pie() {
    return '<footer class="pie"><div class="pie-inner"><a class="btn-blanco" href="' + href('inicio') + '"' + TARGET + '>Página Principal</a><a class="btn-blanco" href="' + href('unidades') + '"' + TARGET + '>Unidades de Trabajo</a></div></footer>';
  }
  function logoHtml() {
    var src = SITIO.logo || 'assets/logo.png';
    if (EMBED && SITIO.urlBase) src = SITIO.urlBase + src;
    return '<img class="logo" src="' + esc(src) + '" alt="' + esc(SITIO.logoAlt || 'Logo del colegio') + '" onerror="this.outerHTML=\'<span class=&quot;logo-alt&quot;>' + esc(SITIO.logoAlt || 'LOGO').replace(/'/g, '') + '</span>\'">';
  }
  function desplegable(titulo, contenido, abierto) {
    var id = 'd' + Math.random().toString(36).slice(2, 8);
    return '<button class="desplegar-btn" type="button" aria-expanded="' + (abierto ? 'true' : 'false') + '" aria-controls="' + id + '"><span>' + titulo + '</span>' + I.abajo + '</button>' +
      '<div class="desplegable' + (abierto ? ' abierto' : '') + '" id="' + id + '">' + contenido + '</div>';
  }
  function activarDesplegables(root) {
    root.querySelectorAll('.desplegar-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = document.getElementById(b.getAttribute('aria-controls'));
        var o = d.classList.toggle('abierto'); b.setAttribute('aria-expanded', o);
      });
    });
  }

  /* ---------------- páginas ---------------- */
  var PAG = {};
  PAG.inicio = function () {
    var vis = '<div class="vm">' +
      '<div class="vm-item"><div class="circulo">' + I.telescopio + '</div><h3>Visión</h3><p>' + esc(SITIO.vision) + '</p></div>' +
      '<div class="vm-item"><div class="circulo">' + I.estrella + '</div><h3>Misión</h3><p>' + esc(SITIO.mision) + '</p></div></div>';
    var perfil = '<h2>Perfil del Estudiante</h2><div class="perfil"><ul class="cuadradas">' + (SITIO.perfil || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul><div class="icono-grande">' + I.personas + '</div></div>';
    var bienvenida = desplegable('¡Bienvenidos a nuestro espacio digital educativo!', (SITIO.bienvenida || []).map(function (p) { return '<p class="justificado">' + esc(p) + '</p>'; }).join(''), false);
    return {
      banner: banner(SITIO.titulo, { cursiva: true, sub: SITIO.subtitulo }),
      banda: '<section class="banda">' + logoHtml() + '</section>',
      contenido: bienvenida + '<h2 style="margin-top:40px">Visión y Misión</h2>' + vis + perfil
    };
  };
  PAG.unidades = function () {
    var c = '<div class="circulos">' + UNIDADES.map(function (u) {
      return '<a class="circulo-link" href="' + href('unidad', u.n) + '"' + TARGET + '><span class="circulo">' + u.n + '</span><span class="etiqueta">' + u.n + (u.n === 1 ? 'RA' : u.n === 2 ? 'DA' : 'RA') + ' UNIDAD</span></a>';
    }).join('') + '</div>';
    return { banner: banner('Unidades'), banda: banda('¡Haz click en los íconos para ingresar a la unidad correspondiente!', true), contenido: c };
  };
  PAG.unidad = function () {
    var u = unidad(PAGINA.u);
    var filas = u.semanas.map(function (s) {
      var det = '<p><b>' + esc(s.titulo) + '</b></p><p class="justificado">' + esc(s.resumen || '') + '</p><a class="btn-ir" href="' + href('semana', u.n, s.n) + '"' + TARGET + '>Ingresar a la semana ' + s.n + '</a>';
      return '<div class="semana-fila"><a class="circulo-link" href="' + href('semana', u.n, s.n) + '"' + TARGET + ' aria-label="Semana ' + s.n + '"><span class="circulo">' + s.n + '</span></a><div class="linea">' + desplegable('Semana ' + s.n, det, false) + '</div></div>';
    }).join('');
    var intro = u.competencia ? '<div class="tarjeta"><h4>Competencia de la unidad</h4><p>' + esc(u.competencia) + '</p></div>' : '';
    return { banner: banner('Semanas de Trabajo'), banda: banda('Unidad ' + u.n + ': ' + esc(u.titulo)), contenido: intro + filas };
  };
  PAG.semana = function () {
    var u = unidad(PAGINA.u), s = u.semanas.filter(function (x) { return x.n === PAGINA.s; })[0];
    var html = '<section class="seccion" style="margin-top:0"><h2>Contenido</h2>' + (s.contenido || []).map(bloque).join('') + '</section>';
    html += '<section class="seccion"><h2>Actividad Interactiva (Minijuegos)</h2><p>Lee las instrucciones de cada juego y presiona <b>¡A jugar!</b>. Puedes jugar las veces que quieras.</p><div id="zona-juegos"></div></section>';
    if (s.clase) {
      var c = s.clase;
      html += '<section class="seccion"><h2>Actividad en clase</h2><h3>' + esc(c.titulo) + '</h3><p class="justificado">' + esc(c.descripcion) + '</p>' +
        (c.materiales ? '<p><b>Materiales:</b></p><ul class="cuadradas">' + c.materiales.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' : '') +
        (c.pasos ? '<p><b>Pasos:</b></p><ol>' + c.pasos.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ol>' : '') +
        (c.cierre ? '<div class="tarjeta ejemplo"><h4>Para cerrar</h4><p>' + esc(c.cierre) + '</p></div>' : '') + '</section>';
    }
    return {
      banner: banner('Semana ' + s.n), banda: banda(esc(s.titulo)), contenido: html,
      despues: function (root) {
        var z = root.querySelector('#zona-juegos');
        (s.juegos || []).forEach(function (j, k) { montarJuego(z, j, 'u' + u.n + 's' + s.n + 'j' + k); });
      }
    };
  };
  PAG.proyectos = function () {
    var c = '<div class="circulos">' + PROYECTOS.map(function (p) {
      return '<a class="circulo-link" href="' + href('proyecto', p.u) + '"' + TARGET + '><span class="circulo">' + p.u + '</span><span class="etiqueta">Proyecto U' + p.u + '</span></a>';
    }).join('') + '</div>';
    return { banner: banner('Unidades'), banda: banda('¡Haz click en los íconos para ingresar al proyecto correspondiente!', true), contenido: c };
  };
  PAG.proyecto = function () {
    var p = PROYECTOS.filter(function (x) { return x.u === PAGINA.u; })[0];
    var clave = 'avance:u' + p.u, marcados = store.get(clave, []);
    var secciones = '<section class="banda"><div class="banda-icono">' + I.bombilla + '<h2>Objetivo</h2></div></section>' +
      '<div class="fase-contenido"><div class="obj">Objetivo General del Proyecto</div><p class="justificado">' + esc(p.objetivo) + '</p></div>';
    p.fases.forEach(function (f) {
      secciones += '<section class="banda"><h2>' + esc(f.nombre) + '</h2></section><div class="fase-contenido">' +
        '<div class="obj">Objetivo:</div><p class="justificado">' + esc(f.objetivo) + '</p>' + (f.parrafo ? '<p class="justificado">' + esc(f.parrafo) + '</p>' : '') +
        '<div class="instr">Instrucciones</div><ul class="cuadradas">' + f.instrucciones.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        (f.extra || []).map(function (b) {
          if (b.t === 'avance') return '<div class="instr">' + esc(b.titulo) + '</div><ul class="checklist" data-avance>' + p.avance.map(function (a, k) {
            return '<li><label><input type="checkbox" data-k="' + k + '"' + (marcados.indexOf(k) >= 0 ? ' checked' : '') + '> <span>' + esc(a) + '</span></label></li>';
          }).join('') + '</ul>';
          if (b.t === 'rubrica') {
            var tot = p.rubrica.reduce(function (a, r) { return a + r[2]; }, 0);
            return '<div class="instr">' + esc(b.titulo) + '</div><div class="tabla-wrap"><table><thead><tr><th>Criterio</th><th>Qué se observa</th><th>Puntos</th></tr></thead><tbody>' +
              p.rubrica.map(function (r) { return '<tr><td><b>' + esc(r[0]) + '</b></td><td>' + esc(r[1]) + '</td><td>' + r[2] + '</td></tr>'; }).join('') +
              '<tr><td colspan="2"><b>Total</b></td><td><b>' + tot + '</b></td></tr></tbody></table></div>';
          }
          if (b.t === 'cronograma') return '<div class="instr">' + esc(b.titulo) + '</div><div class="tabla-wrap"><table><thead><tr><th>Semana</th><th>Fase</th><th>Actividad</th></tr></thead><tbody>' +
            p.cronograma.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
          if (b.t === 'entregables') return '<div class="instr">' + esc(b.titulo) + '</div><ul class="cuadradas">' + p.entregables.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
          return bloque(b);
        }).join('') + '</div>';
    });
    secciones += '<section class="banda"><h2>GALERÍA DE EVIDENCIAS</h2><div style="margin-top:16px"><a class="btn-blanco" href="' + href('galeria', p.u) + '"' + TARGET + '>Ir a la Galería</a></div></section>';
    return {
      banner: banner(p.titulo, { cursiva: true, frase: '«' + p.frase + '»' }),
      completo: secciones,
      despues: function (root) {
        root.querySelectorAll('[data-avance] input').forEach(function (c) {
          c.addEventListener('change', function () {
            var arr = []; root.querySelectorAll('[data-avance] input').forEach(function (x) { if (x.checked) arr.push(+x.dataset.k); });
            store.set(clave, arr);
          });
        });
      }
    };
  };
  PAG.galeria = function () {
    var p = PROYECTOS.filter(function (x) { return x.u === PAGINA.u; })[0];
    var slots = (p.galeria || []).map(function (g) { return '<div class="galeria-slot">' + I.imagen + '<b>' + esc(g) + '</b><span>Espacio para foto</span></div>'; }).join('');
    return {
      banner: banner('Galería de Evidencias U' + p.u, { cursiva: true }),
      banda: banda(esc(p.titulo)),
      contenido: '<p class="justificado">' + esc(p.galeriaTexto || 'Aquí se publican las fotografías del trabajo de los estudiantes.') + '</p><div class="galeria-grid">' + slots + '</div>'
    };
  };

  function unidad(n) { return UNIDADES.filter(function (u) { return u.n === n; })[0]; }

  /* ---------------- render ---------------- */
  function render() {
    var root = document.getElementById('app');
    var p = PAG[PAGINA.tipo]();
    root.innerHTML = '';
    if (EMBED) {
      document.body.classList.add('embed');
      var c = el('main', { class: 'contenido' });
      c.innerHTML = p.completo || p.contenido;
      if (p.completo) { root.innerHTML = p.completo; }
      else root.appendChild(c);
    } else {
      document.body.insertBefore(header(), root);
      root.innerHTML = p.banner + (p.completo ? p.completo : (p.banda || '') + '<main class="contenido">' + p.contenido + '</main>') + pie();
    }
    activarDesplegables(root);
    if (p.despues) p.despues(root);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();

  /* expuesto para pruebas */
  window.__clase = { FIG: FIG, JUEGOS: JUEGOS, store: store };
})();
