/* Kubelo, kubelo.app (landing page B, round 22): the cube in a box (the app's cube, cube.js), the twist with a finger, Help's next move as a row
   of arrows and as an arrow drawn on the cube itself, the one celebration, a running clock and a few small helpers. No framework, nothing from
   the net, nothing stored. window.KubeloKit. From the round 22 prototypes (docs/design/landing/r22/felles/kit.js on los-kuben), without what
   the page does not use. The cube script loads after the first paint (KubeloKit.cubeReady), so nothing here blocks the first screen. */
(function (G) {
  'use strict';
  var PI = Math.PI, K = null, D = document;
  var base = ((D.currentScript && D.currentScript.src) || '').replace(/[^/]*$/, '');
  var q = (function () { try { return new URLSearchParams(location.search); } catch (e) { return { has: function () { return false; }, get: function () { return null; } }; } })();
  var mq = G.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  var kit = {
    /** True when the visitor asks for less motion (or ?reduced in the address, for testing). Then nothing moves on its own. */
    reduced: !!(mq && mq.matches) || q.has('reduced'),
    /** ?skarp=2|3 draws the cube at that pixel ratio also without a GPU (for the captures). */
    dprCap: q.has('skarp') ? Math.max(1, parseFloat(q.get('skarp')) || 2) : 0,
    /** ?hold keeps what plays by itself at its first frame (for the captures). */
    hold: q.has('hold'),
    q: q
  };

  // ---------- loading ----------
  var waiting = [], loading = false;
  kit.cubeReady = function (cb) {
    if (K) return cb(K);
    waiting.push(cb); if (loading) return; loading = true;
    var s = D.createElement('script'); s.src = base + 'cube.js'; s.async = true;
    s.onload = function () { K = G.KubeloCube; waiting.splice(0).forEach(function (f) { try { f(K); } catch (e) { if (G.console) console.error('[kubelo]', e); } }); };
    D.head.appendChild(s);
  };
  /** After the first paint, when the browser is idle. */
  kit.afterPaint = function (cb) {
    var idle = function () { if (G.requestIdleCallback) requestIdleCallback(cb, { timeout: 700 }); else setTimeout(cb, 60); };
    if (D.readyState === 'complete') idle(); else G.addEventListener('load', idle, { once: true });
  };
  /**
   * A margin for an IntersectionObserver in the page's own pixels. On a phone in «Desktop site» the page is zoomed (window.kubeloZoom, from the bit in
   * <head>), and the observer measures its margin in the window's pixels, so 250 px would be under a hundred of the page's own.
   */
  function margin(m) { var k = G.kubeloZoom || 1; return k === 1 ? m : m.replace(/(-?\d*\.?\d+)px/g, function (_, n) { return (parseFloat(n) * k) + 'px'; }); }
  /** cb(true|false) when el comes into or leaves the screen. */
  kit.inView = function (el, cb, m) {
    if (!G.IntersectionObserver) { cb(true); return null; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { cb(e.isIntersecting, e); }); }, { rootMargin: margin(m || '0px') });
    io.observe(el); return io;
  };
  /**
   * What stands below the first screen comes in quietly when it is reached: each element matching sel starts a little lower and clear, and settles once.
   * The page needs a rule for it: .r{opacity:0;transform:translateY(16px)} .r.in{opacity:1;transform:none;transition:…}. Without script, and with
   * reduced motion, nothing is hidden and nothing moves.
   */
  kit.reveal = function (sel) {
    if (kit.reduced || !G.IntersectionObserver) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    [].forEach.call(D.querySelectorAll(sel), function (el) { el.classList.add('r'); io.observe(el); });
  };
  /**
   * Pictures below the first screen wait until they come near: <img data-src="…" data-wide="…">, where data-wide is the file for the wide layout.
   * wide: whether the page is laid out wide (the page knows: its own width, not the window's, which a phone in «Desktop site» makes 980 px).
   * They are fetched 250 px before they are reached, so the first screen never pays for them.
   */
  kit.lazy = function (wide) {
    var set = function (im) { var src = (wide && im.getAttribute('data-wide')) || im.getAttribute('data-src'); if (src) { im.src = src; im.removeAttribute('data-src'); } };
    var all = [].slice.call(D.querySelectorAll('img[data-src]'));
    if (!G.IntersectionObserver) { all.forEach(set); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { set(e.target); io.unobserve(e.target); } }); }, { rootMargin: margin('250px') });
    all.forEach(function (im) { io.observe(im); });
  };
  // ---------- small maths ----------
  var clamp01 = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  kit.clamp01 = clamp01; kit.ease = easeInOut;
  var TL0 = { scan: { help: [0, 1] }, play: { sweep: [9, 9.1], back: 9.2 } };
  var CENTRES = {};
  function centre(md, face) {
    var k = md.N + face; if (CENTRES[k] !== undefined) return CENTRES[k];
    for (var i = 0; i < md.n; i++) { var s = md.slots[i]; if (s.face === face && s.p.filter(function (v) { return v === 0; }).length === 2) return (CENTRES[k] = i); }
    return (CENTRES[k] = 0);
  }

  // ---------- a cube in a box ----------
  /**
   * box: an element with a <canvas> that fills it. The cube stands in the middle, as large as the box's short side times o.fill.
   * o: { alg, mood, fill, reduced, lay(): {W,H,cx,cy,S}, beat, timeline, onChange(cube), onFrame(cube, scene, lay, info) }
   */
  function Cube(box, o) {
    o = o || {}; var self = this;
    this.box = box; this.canvas = box.querySelector('canvas'); this.md = K.model(3); this.o = o;
    this.reduced = o.reduced === undefined ? kit.reduced : !!o.reduced; this.mood = o.mood || { blue: 1 }; this.fill = o.fill || 1;
    this.R = new K.Renderer(this.canvas, {});
    this.story = new K.Story({ timeline: o.timeline || TL0, reduced: this.reduced });
    this.turn = o.turn || 0; this.cele = null; this.celeDone = null; this.auto = null; this.tw = null; this.raf = 0; this.last = 0; this.on = true; this.live = false; this.taking = false;
    this.drawn = null; this.lay = null; this.beat = o.beat || 'hero'; this.p = 0; this.quiet = false; this.gripKey = '';
    this.onChange = o.onChange || null; this.onFrame = o.onFrame || null; this.layFn = o.lay || null;
    var apply = this.story.applyTwist;
    this.story.applyTwist = function (mv) {
      apply.call(this, mv);
      // A cube that looks solved is solved, whatever road led there.
      if (isSolved(this.free.cols, self.md)) this.free.history.length = 0;
      if (self.onChange && !self.quiet) self.onChange(self, mv);
    };
    this._frame = function (now) { self.frame(now); };
    if (o.alg !== undefined) this.setState(o.alg);
  }
  function isSolved(cols, md) {
    var first = {};
    for (var i = 0; i < md.n; i++) { var f = md.slots[i].face; if (first[f] === undefined) first[f] = cols[i]; else if (first[f] !== cols[i]) return false; }
    return true;
  }
  /** The cube as it is after alg from solved (white up, green in front). */
  Cube.prototype.setState = function (alg) {
    var st = this.story, md = this.md; this.quiet = true;
    st.free.cols = md.solved(K.COLORS); st.free.history = [];
    K.parseAlg(alg || "R R'", md).forEach(function (m) { st.applyTwist(m); });
    st.twists = 0; this.quiet = false; this.tickSoon();
  };
  Cube.prototype.measure = function () {
    if (this.layFn) return (this.lay = this.layFn());
    var r = this.box.getBoundingClientRect();
    return (this.lay = { W: r.width, H: r.height, cx: r.width / 2, cy: r.height / 2, S: Math.min(r.width, r.height) * this.fill });
  };
  Cube.prototype.tickSoon = function () { if (!this.raf && this.on) this.raf = requestAnimationFrame(this._frame); };
  Cube.prototype.show = function (on) { if (on && !this.on) this.last = 0; this.on = on; if (on) this.tickSoon(); };
  Cube.prototype.resize = function () { this.lay = null; this.gripKey = ''; this.tickSoon(); };
  Cube.prototype.frame = function (now) {
    this.raf = 0;
    var dt = Math.min(0.05, Math.max(0, (now - (this.last || now)) / 1000)); this.last = now;
    var L = this.layFn ? this.measure() : (this.lay || this.measure()); if (!L || !(L.S > 1)) return;
    if (this.auto) this.autoStep(now);
    var st = this.story, r = st.update(this.p, dt, this.beat, this.mood), scene = r.scene, busy = !!r.info.busy;
    if (this.cele !== null) {
      var t = now - this.cele;
      if (t >= 3300) { if (!this.o.keepView) this.turn = (this.turn - PI / 2) % (2 * PI); this.cele = null; var cb = this.celeDone; this.celeDone = null; if (cb) cb(this); }
      else { var s = st.still('scan', this.mood, { help: 1, celebrate: t }).scene; s.yaw = scene.yaw; s.bob = scene.bob; s.cubeTurn = (this.o.keepView ? 0 : s.cubeTurn || 0) + this.turn; scene = s; busy = true; }
    }
    if (this.cele === null && this.turn && this.beat === 'hero') scene.cubeTurn = this.turn;
    var dpr = Math.min(G.devicePixelRatio || 1, kit.dprCap || (this.R.software ? 1 : 2), kit.dprCap || (L.W > 900 ? 1.5 : 2));
    this.R.draw({ W: L.W, H: L.H, dpr: dpr, cubes: [{ scene: scene, cx: L.cx, cy: L.cy, S: L.S }] });
    this.drawn = { scene: scene, lay: L };
    if (!this.live) { this.live = true; this.box.classList.add('live'); }
    if (this.grip) this.placeGrip(scene, L);
    if (this.onFrame) this.onFrame(this, scene, L, r.info);
    if (busy || !this.reduced || this.tw || this.auto || this.cele !== null) this.tickSoon();
  };

  // ---------- Help: the way back, one move at a time ----------
  /** What Help shows next on this cube: the moves that undo what was done, last move first. */
  Cube.prototype.next = function (n) {
    var h = this.story.free.history, out = [];
    for (var i = h.length - 1; i >= 0 && out.length < (n || 5); i--) out.push(K.moveOf(h[i].axis, h[i].layers, -h[i].turns, this.md));
    return out;
  };
  Cube.prototype.left = function () { return this.story.free.history.length; };
  /** The row under the cube, as the app draws it: the arrow as the turn looks from here, and the colour of the side that turns. */
  Cube.prototype.cells = function (n) {
    var self = this, cols = this.story.free.cols, sc = { yaw: -36, pitch: 24, bob: 0, scale: 1, model: this.md, cubeTurn: this.turn || null };
    return this.next(n).map(function (mv) { return { mv: mv, sym: K.symbolFor(sc, mv), color: cols[centre(self.md, mv.face)] }; });
  };
  /** Plays one move by itself over ms (eased), as Help's own hand. done() when it has landed. */
  Cube.prototype.play = function (mv, ms, done, linear) {
    if (this.story.tw || this.auto || this.cele !== null) return false;
    if (this.reduced || !(ms > 0)) { this.story.applyTwist(K.moveOf(mv.axis, mv.layers, mv.turns, this.md)); this.tickSoon(); if (done) done(this); return true; }
    this.story.tw = { hit: null, axis: mv.axis, sign: 1, layers: mv.layers.slice(), angle: 0, target: null, on: true, samples: [] };
    this.auto = { mv: mv, t0: 0, ms: ms, done: done, linear: !!linear };
    this.tickSoon(); return true;
  };
  Cube.prototype.autoStep = function (now) {
    var a = this.auto, tw = this.story.tw; if (!a) return;
    if (!tw) { this.auto = null; return; }
    if (!a.t0) a.t0 = now;
    var k = clamp01((now - a.t0) / a.ms), goal = a.mv.turns * PI / 2;
    tw.angle = goal * (a.linear ? k : easeInOut(k));
    if (k >= 1) this.finishAuto();
  };
  /** Lands the move that is playing, at once (a finger takes the cube, or the time is up). */
  Cube.prototype.finishAuto = function () {
    var a = this.auto, tw = this.story.tw; if (!a) return;
    this.auto = null;
    if (tw) { tw.target = a.mv.turns * PI / 2; tw.angle = tw.target; tw.on = false; this.story.twistTick(1); }
    if (a.done) a.done(this);
  };
  /** The app's one celebration, for a cube that is solved. done() when it is over. */
  Cube.prototype.celebrate = function (done) {
    if (this.reduced) { if (done) done(this); return; }
    this.cele = performance.now(); this.celeDone = done || null; this.tickSoon();
  };

  // ---------- the arrow on the cube: the layer that turns, and which way ----------
  /**
   * The next move drawn on the cube as it stands on the screen: a line along the layer over the two sides you see, with a head where it ends.
   * f (0 … 1) is how far the arrow has come along its way, so it can grow in the direction of the turn. lay may be any square the cube is laid in
   * (the page uses 1000 × 1000, the viewBox of an <svg> that lies where the cube is drawn). Gives path data, or '' when there is nothing to draw.
   */
  kit.arrowPath = function (scene, lay, mv, f) {
    if (!mv || mv.layers.length !== 1) return '';
    var sc = {}, k; for (k in scene) sc[k] = scene[k]; sc.turn = null;
    var a = mv.axis, b = (a + 1) % 3, c = (a + 2) % 3, L = mv.layers[0] / 2, E = 1.5, i;
    // The corner of the cube nearest the eye: the three sides that meet there are the ones you see.
    var corners = [];
    for (i = 0; i < 8; i++) corners.push([(i & 1 ? E : -E), (i & 2 ? E : -E), (i & 4 ? E : -E)]);
    var P = K.toScreen(sc, lay, corners), near = K.outline(sc, lay).near, best = 0, bd = 1e9;
    for (i = 0; i < 8; i++) { var d = Math.hypot(P[i][0] - near[0], P[i][1] - near[1]); if (d < bd) { bd = d; best = i; } }
    var sign = [best & 1 ? 1 : -1, best & 2 ? 1 : -1, best & 4 ? 1 : -1];
    // Around the axis a positive turn carries a sticker over the sides +b, +c, −b, −c. at(t): the point t along that way on each side (−1.5 … 1.5).
    var pt = function (pb, pc) { var v = [0, 0, 0]; v[a] = L; v[b] = pb; v[c] = pc; return v; };
    var ring = [
      { see: sign[b] > 0, at: function (t) { return pt(E, t); } },
      { see: sign[c] > 0, at: function (t) { return pt(-t, E); } },
      { see: sign[b] < 0, at: function (t) { return pt(-E, -t); } },
      { see: sign[c] < 0, at: function (t) { return pt(t, -E); } }
    ];
    var f1 = -1; for (i = 0; i < 4; i++) if (ring[i].see && ring[(i + 1) % 4].see) f1 = i;
    if (f1 < 0) return '';
    var A = ring[f1], B = ring[(f1 + 1) % 4], far = 0.94, half = E + far, total = 2 * half, r = 0.4, hw = 0.3, hl = 0.46, dir = mv.turns > 0 ? 1 : -1;
    // u: the way along the layer over the two sides (0 … total) in the direction of a positive turn. The edge between the sides is at half.
    var pos = function (u) { u = u < 0 ? 0 : u > total ? total : u; return u <= half ? A.at(-far + u) : B.at(-E + (u - half)); };
    f = f === undefined ? 1 : f < 0 ? 0 : f > 1 ? 1 : f;
    var u0 = dir > 0 ? 0 : total, u1 = u0 + dir * total * f, lo = Math.min(u0, u1), hi = Math.max(u0, u1);
    var pts = [pos(u0)], shape = 'L';
    if (lo < half - r && hi > half + r) { pts.push(pos(half - dir * r), pos(half), pos(half + dir * r)); shape = 'Q'; }
    else if (lo < half - 0.02 && hi > half + 0.02) { pts.push(pos(half)); shape = 'E'; }
    pts.push(pos(u1));
    var w0 = pos(u1 - dir * hl), w1 = w0.slice(), w2 = w0.slice(); w1[a] += hw; w2[a] -= hw;
    var S = K.toScreen(sc, lay, pts.concat([w1, pos(u1), w2])), n = pts.length;
    var s = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); };
    var d2 = 'M' + s(S[0]);
    if (shape === 'Q') d2 += 'L' + s(S[1]) + 'Q' + s(S[2]) + ' ' + s(S[3]) + 'L' + s(S[4]);
    else if (shape === 'E') d2 += 'L' + s(S[1]) + 'L' + s(S[2]);
    else d2 += 'L' + s(S[1]);
    return d2 + 'M' + s(S[n]) + 'L' + s(S[n + 1]) + 'L' + s(S[n + 2]);
  };

  // ---------- the twist: a finger (or the mouse) on the cube turns the layer it holds ----------
  /**
   * grab: the element that takes the finger (touch-action: pan-y, so an up-and-down drag scrolls the page and a sideways one turns a layer).
   * grip (may be left out): an element laid over the cube itself (touch-action: none), where every direction turns a layer, as on kubelo.app today.
   * Without a grip a finger can always scroll the page from the cube; a mouse turns any layer either way.
   */
  Cube.prototype.enableTwist = function (grab, grip) {
    var self = this, st = this.story, tw = null;
    this.grab = grab; this.grip = grip || null;
    function at(e) { var r = self.canvas.getBoundingClientRect(), L = self.drawn.lay, kx = r.width ? L.W / r.width : 1; return { x: (e.clientX - r.left) * kx, y: (e.clientY - r.top) * kx }; }
    function end(e) {
      if (!tw) return;
      if (e && e.type === 'pointerup' && tw.on) st.twistEnd(e.timeStamp || performance.now()); else st.twistCancel();
      try { grab.releasePointerCapture(tw.id); } catch (err) { /* already released */ }
      tw = null; self.tw = null; grab.classList.remove('held'); if (self.onHold) self.onHold(false); self.tickSoon();
    }
    grab.addEventListener('pointerdown', function (e) {
      if (tw || e.button || !self.drawn || self.cele !== null || self.beat !== 'hero') return;
      var p = at(e), mouse = e.pointerType === 'mouse', took = false;
      if (self.auto) {
        // Help is in the middle of a move: if the finger lands on the cube, the move lands at once and the cube is the visitor's.
        if (!K.pick(self.drawn.scene, self.drawn.lay, p.x, p.y, mouse ? 4 : 14)) return;
        self.taking = true; self.finishAuto(); self.taking = false; took = true;
      }
      if (!st.twistBegin(self.drawn.scene, self.drawn.lay, p.x, p.y, mouse ? 4 : 14)) { if (took && self.onHold) { self.onHold(true); self.onHold(false); } return; }
      tw = { id: e.pointerId, mouse: mouse, grip: !!(e.target && e.target.closest && e.target.closest('.grip')), x0: p.x, y0: p.y, on: false }; self.tw = tw;
      try { grab.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
      grab.classList.add('held'); if (self.onHold) self.onHold(true); self.tickSoon();
    });
    grab.addEventListener('pointermove', function (e) {
      if (!tw || e.pointerId !== tw.id) return;
      var p = at(e);
      if (!tw.on) {
        var dx = p.x - tw.x0, dy = p.y - tw.y0;
        if (Math.hypot(dx, dy) < (tw.mouse ? 4 : 8)) return;
        // Up and down beside the cube is the page's: the finger scrolls and the cube is left alone. On the grip it is the cube's.
        if (!tw.mouse && !tw.grip && Math.abs(dy) > Math.abs(dx)) { end(null); return; }
        tw.on = true; st.twistStart(p.x, p.y);
      } else st.twistMove(p.x, p.y, e.timeStamp || performance.now());
      if (e.cancelable) e.preventDefault();
      self.tickSoon();
    });
    grab.addEventListener('pointerup', function (e) { if (tw && e.pointerId === tw.id) end(e); });
    grab.addEventListener('pointercancel', function (e) { if (tw && e.pointerId === tw.id) end(null); });
    grab.addEventListener('lostpointercapture', function (e) { if (tw && e.pointerId === tw.id) end(null); });
    grab.addEventListener('dragstart', function (e) { e.preventDefault(); });
    // The arrow keys: left and right turn the top, up and down turn the side you see on the right.
    grab.addEventListener('keydown', function (e) {
      var k = e.key; if (k !== 'ArrowLeft' && k !== 'ArrowRight' && k !== 'ArrowUp' && k !== 'ArrowDown') return;
      if (!self.drawn || self.cele !== null || self.beat !== 'hero') return;
      if (self.auto) { self.taking = true; self.finishAuto(); self.taking = false; }
      var face = 'U';
      if (k === 'ArrowUp' || k === 'ArrowDown') {
        var sc = { yaw: -36, pitch: 24, bob: 0, scale: 1, model: self.md, cubeTurn: self.turn || null }, L = self.drawn.lay;
        var P = K.toScreen(sc, L, [[0, 0, 0], [1.5, 0, 0], [-1.5, 0, 0], [0, 0, 1.5], [0, 0, -1.5]]), names = ['R', 'L', 'F', 'B'], bx = -1e9;
        for (var i = 0; i < 4; i++) if (P[i + 1][0] - P[0][0] > bx) { bx = P[i + 1][0] - P[0][0]; face = names[i]; }
      }
      if (st.turnKey(face, k === 'ArrowRight' || k === 'ArrowDown')) { e.preventDefault(); if (self.onHold) { self.onHold(true); self.onHold(false); } self.tickSoon(); }
    });
  };
  /** The grip lies over the cube as it is drawn: an oval at 90 % of the cube's outline box (or o.grip of it), so the rim and the sky beside it still scroll the page. */
  Cube.prototype.placeGrip = function (scene, L) {
    var key = Math.round(L.cx) + ' ' + Math.round(L.cy) + ' ' + Math.round(L.S) + ' ' + Math.round(L.W); if (key === this.gripKey) return; this.gripKey = key;
    var sc = {}; for (var k in scene) sc[k] = scene[k]; sc.turn = null; sc.cubeTurn = null; sc.yaw = -36; sc.bob = 0;
    var hull = K.outline(sc, L).hull, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    hull.forEach(function (p) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
    var cr = this.canvas.getBoundingClientRect(), gr = this.grab.getBoundingClientRect(), kx = L.W ? cr.width / L.W : 1, g = this.o.grip || 0.9, w = (x1 - x0) * g, h = (y1 - y0) * g;
    this.grip.style.cssText = 'left:' + (cr.left - gr.left + ((x0 + x1) / 2 - w / 2) * kx).toFixed(1) + 'px;top:' + (cr.top - gr.top + ((y0 + y1) / 2 - h / 2) * kx).toFixed(1) + 'px;width:' + (w * kx).toFixed(1) + 'px;height:' + (h * kx).toFixed(1) + 'px';
  };

  // ---------- Help's row in the page ----------
  var ROT = { up: -90, down: 90, left: 180, right: 0 };
  /** Fills the cells of a .help row (each: <svg><use/></svg><i></i>) from cube.cells(). Symbols #i-arrow, #i-cw and #i-ccw must stand in the page. */
  kit.fillHelp = function (row, cells) {
    var key = cells.map(function (c) { return c.sym + c.color; }).join('|'); if (row._k === key) return; row._k = key;
    [].forEach.call(row.children, function (el, i) {
      var h = cells[i]; if (!h) { el.style.visibility = 'hidden'; return; }
      el.style.visibility = 'visible';
      var use = el.querySelector('use'), svg = el.querySelector('svg'), round = h.sym === 'cw' || h.sym === 'ccw';
      use.setAttribute('href', round ? '#i-' + h.sym : '#i-arrow');
      svg.setAttribute('viewBox', round ? '-2 -2 28 28' : '0 0 24 24');
      svg.style.transform = ROT[h.sym] !== undefined ? 'rotate(' + ROT[h.sym] + 'deg)' : '';
      el.querySelector('i').style.background = h.color;
    });
  };

  // ---------- Help plays the cube by itself ----------
  /**
   * The arrow for the next move grows on the cube, the layer turns, and so on until the cube is solved. Then the one celebration, a rest,
   * the cube is mixed again as it was, and Help starts over. A finger on the cube stops it: Help shows the way back from wherever the cube is,
   * and goes on by itself when the cube has been left alone for a while. With reduced motion nothing moves by itself; the arrow still follows your own turns.
   * o: { cube, svg (the .mv overlay), row (the .help row, or none), mix (the moves that mix it), box (what must be on the screen), view (the svg's viewBox as a lay), T (timings in ms) }
   */
  kit.helpLoop = function (o) {
    var cube = o.cube, svg = o.svg || null, paths = svg ? svg.querySelectorAll('path') : [], row = o.row || null;
    var V = o.view || { W: 1000, H: 1000, cx: 500, cy: 500, S: 1000 };
    var T = { first: 1500, show: 760, turn: 440, gap: 170, rest: 3200, mix: 85, idle: 2600, grow: 380 }, k; for (k in (o.T || {})) T[k] = o.T[k];
    var timer = 0, held = false, seen = false, idle = false, state = 'wait', arrow = { mv: null, from: 0 };
    function later(ms, fn) { clearTimeout(timer); timer = setTimeout(fn, ms); }
    function setArrow(m, grow) { arrow.mv = m || null; arrow.from = grow ? performance.now() : -1e6; if (svg) svg.classList.toggle('off', !m); cube.tickSoon(); }
    function refresh() { if (row) kit.fillHelp(row, cube.cells(row.children.length)); }
    cube.onFrame = function (c, scene) {
      if (!svg) return;
      var m = arrow.mv, d = '';
      if (m && c.cele === null) d = kit.arrowPath(scene, V, m, c.reduced ? 1 : 0.28 + 0.72 * easeInOut(clamp01((performance.now() - arrow.from) / T.grow)));
      if (svg._d !== d) { svg._d = d; paths[0].setAttribute('d', d); paths[1].setAttribute('d', d); }
    };
    function done() { state = 'done'; setArrow(null); cube.celebrate(function () { later(T.rest, mix); }); }
    function free() { return !cube.story.tw && !cube.auto && cube.cele === null; }
    function turnNow(m) {
      if (!free()) { later(300, step); return; }
      state = 'turn'; idle = false; if (svg) svg.classList.add('off');
      cube.play(m, m.half ? T.turn * 1.35 : T.turn, function () { setArrow(null); if (!cube.taking) later(T.gap, step); });
    }
    function step() {
      if (held || cube.reduced || !seen) return;
      idle = false;
      var next = cube.next(1)[0]; if (!next) return done();
      state = 'show'; setArrow(next, true); later(T.show, function () { if (!held) turnNow(next); });
    }
    function mix() {
      if (held || cube.reduced || !seen) return;
      state = 'mix'; idle = false; var moves = K.parseAlg(o.mix, cube.md), i = 0; cube.quiet = true;
      (function one() {
        if (cube.taking || held) { cube.quiet = false; refresh(); return; }
        if (i >= moves.length) { cube.quiet = false; refresh(); later(900, step); return; }
        if (!free()) { later(60, one); return; }
        var m = moves[i++]; cube.play(m, m.half ? T.mix * 1.5 : T.mix, one, true);
      })();
    }
    // Your own turn has landed: the row and the arrow show the way back from here.
    cube.onChange = function () { refresh(); if (idle && !held) setArrow(cube.next(1)[0], true); };
    cube.onHold = function (on) {
      held = on; clearTimeout(timer);
      if (on) { cube.quiet = false; idle = false; setArrow(null); return; }
      // After your own turn Help shows the way back at once, and plays on when you leave the cube alone.
      idle = true; refresh(); setArrow(cube.next(1)[0], true);
      if (!cube.reduced) later(T.idle, function () { idle = false; if (cube.left()) step(); else done(); });
    };
    refresh();
    setArrow(cube.next(1)[0], false);
    kit.inView(o.box || cube.box, function (see) {
      seen = see; cube.show(see);
      if (!see) { clearTimeout(timer); return; }
      if (held || cube.reduced || kit.hold || cube.cele !== null || cube.auto) return;
      if (state === 'wait') { state = 'show'; var first = cube.next(1)[0]; later(T.first, function () { if (!held && first) turnNow(first); }); return; }
      later(700, cube.left() ? step : mix);
    });
    return { step: step, mix: mix, refresh: refresh };
  };

  // ---------- a clock that runs while you look at it ----------
  /** el shows seconds with hundredths, from 0.00, while it is on the screen. It measures the time you have looked: no made-up result. */
  kit.clock = function (el) {
    var t0 = 0, raf = 0, on = false, shown = '';
    function put(t) { var s = t.toFixed(2); if (s === shown) return; shown = s; el.innerHTML = s.replace('.', '<span class="sep">.</span>'); }
    function tick(now) { raf = 0; if (!on) return; if (!t0) t0 = now; var t = (now - t0) / 1000; if (t >= 60) { t0 = now; t = 0; } put(t); raf = requestAnimationFrame(tick); }
    kit.inView(el, function (see) { on = see && !kit.reduced; if (on) { t0 = 0; if (!raf) raf = requestAnimationFrame(tick); } else put(0); });
  };

  // ---------- still cubes: drawn once into an ordinary 2D canvas ----------
  var shared = null;
  /**
   * Cubes that stand still (the steps of Learn, the two cubes of a duel, the scanned cube): items [{ alg, cx, cy, S, yaw, mood }],
   * cx and cy in fractions of the box, S in fractions of its short side (by: 'w' or 'h' for the width or the height). The box holds a <canvas>.
   * All stills on a page share one WebGL context off screen; each is copied into its own 2D canvas, so a page never holds more than two contexts.
   */
  kit.stills = function (box, items, mood) {
    var canvas = box.querySelector('canvas'), ctx = canvas.getContext('2d'), md = K.model(3);
    if (!shared) { var gc = D.createElement('canvas'); shared = { canvas: gc, R: new K.Renderer(gc, { preserve: true }) }; }
    var scenes = items.map(function (it) {
      var st = new K.Story({ timeline: TL0, reduced: true }); st.free.cols = md.solved(K.COLORS); st.free.history = [];
      K.parseAlg(it.alg || "R R'", md).forEach(function (m) { st.applyTwist(m); });
      var s = st.still('hero', it.mood || mood || { blue: 1 }).scene; if (it.yaw !== undefined) s.yaw = it.yaw; if (it.pitch !== undefined) s.pitch = it.pitch; return s;
    });
    var last = '';
    function draw() {
      var r = box.getBoundingClientRect(), W = Math.round(r.width), H = Math.round(r.height), m = Math.min(W, H); if (!(m > 1)) return;
      var dpr = Math.min(G.devicePixelRatio || 1, kit.dprCap || (shared.R.software ? 1.5 : 2), 3), key = W + 'x' + H + '@' + dpr; if (key === last) return; last = key;
      shared.R.draw({ W: W, H: H, dpr: dpr, cubes: items.map(function (it, i) { return { scene: scenes[i], cx: it.cx * W, cy: it.cy * H, S: it.S * (it.by === 'w' ? W : it.by === 'h' ? H : m) }; }) });
      canvas.width = shared.canvas.width; canvas.height = shared.canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(shared.canvas, 0, 0);
      box.classList.add('live');
    }
    draw();
    if (G.ResizeObserver) new ResizeObserver(draw).observe(box); else G.addEventListener('resize', draw);
    return { draw: draw, scenes: scenes };
  };

  kit.Cube = Cube;
  G.KubeloKit = kit;
})(window);
