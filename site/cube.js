/* Kubelo site cube, round 19 («One evening»).
   A small WebGL1 port of the app's cube for kubelo.app. Values come from the app's own engine
   (engine/cubeView.ts classic finish, engine/engine.ts DEFAULT_COLORS, VIEW_TILT, BOB, world/places.ts,
   engine/celebrate.ts), so it looks and moves like the app, without three.js.
   Round 19: any size from 2x2 to 7x7, several cubes in one draw (the flowing page), four light moods
   (blue hour, night, sunrise, morning) and the cube's outline on screen (the scan frame locks to it).
   window.KubeloCube = { Renderer, Story, model, outline, ... } */
(function (G) {
  'use strict';
  var PI = Math.PI, D2R = PI / 180;
  var clamp01 = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var span = function (t, a, b) { return clamp01((t - a) / (b - a)); };
  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    return function (x) {
      if (!(x > 0)) return 0; if (x >= 1) return 1;
      var t = x, i;
      for (i = 0; i < 8; i++) { var e = ((ax * t + bx) * t + cx) * t - x; if (Math.abs(e) < 1e-6) break; var d = (3 * ax * t + 2 * bx) * t + cx; if (Math.abs(d) < 1e-6) break; t -= e / d; }
      return ((ay * t + by) * t + cy) * t;
    };
  }
  var EASE_OUT = bezier(0.16, 1, 0.3, 1), EASE_IN_OUT = bezier(0.65, 0, 0.35, 1), EASE_LAND = bezier(0.3, 0, 0.1, 1);
  var QUARTER = EASE_IN_OUT;

  // ---------- colour ----------
  function hexRgb(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]; }
  function toLin(v) { return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
  function lin(h) { return hexRgb(h).map(toLin); }
  // engine.ts DEFAULT_COLORS
  var COLORS = { U: '#F4F3EC', D: '#FFD000', F: '#009B48', B: '#0046AD', R: '#B71234', L: '#FF5800' };
  // What you see on each side. Free cube: white up, green front. The app's own scan (11-scan-result.png): yellow up, red front, green right.
  var PALETTES = {
    free: { U: COLORS.U, D: COLORS.D, F: COLORS.F, B: COLORS.B, R: COLORS.R, L: COLORS.L },
    scan: { U: COLORS.D, D: COLORS.U, F: COLORS.R, B: COLORS.L, R: COLORS.F, L: COLORS.B }
  };

  // ---------- model: an N×N×N cube, doubled coordinates (3x3: −2, 0, 2) as in core/cube.ts ----------
  function faceOf(n) { return n[0] === 1 ? 'R' : n[0] === -1 ? 'L' : n[1] === 1 ? 'U' : n[1] === -1 ? 'D' : n[2] === 1 ? 'F' : 'B'; }
  var COS = [1, 0, -1, 0], SIN = [0, 1, 0, -1];
  function quarterTurn(axis, turns) {
    var t = ((turns % 4) + 4) % 4, c = COS[t], s = SIN[t];
    if (axis === 0) return [1, 0, 0, 0, c, -s, 0, s, c];
    if (axis === 1) return [c, 0, s, 0, 1, 0, -s, 0, c];
    return [c, -s, 0, s, c, 0, 0, 0, 1];
  }
  function mulVec(a, v) { return [a[0] * v[0] + a[1] * v[1] + a[2] * v[2] || 0, a[3] * v[0] + a[4] * v[1] + a[5] * v[2] || 0, a[6] * v[0] + a[7] * v[1] + a[8] * v[2] || 0]; }
  var BODY = 0.985, HALF = BODY / 2;
  function Model(N) {
    var o = N - 1, cubies = [], slots = [], key = {}, i, j, k, a;
    for (i = -o; i <= o; i += 2) for (j = -o; j <= o; j += 2) for (k = -o; k <= o; k += 2) {
      if (Math.abs(i) !== o && Math.abs(j) !== o && Math.abs(k) !== o) continue;
      var p = [i, j, k], ci = cubies.length; cubies.push(p);
      for (a = 0; a < 3; a++) if (Math.abs(p[a]) === o) { var n = [0, 0, 0]; n[a] = p[a] > 0 ? 1 : -1; key[p.join(',') + '|' + n.join(',')] = slots.length; slots.push({ p: p, n: n, c: ci, face: faceOf(n) }); }
    }
    this.N = N; this.outer = o; this.cubies = cubies; this.slots = slots; this.key = key; this.n = slots.length; this.perms = {};
    this.layersAll = []; for (i = -o; i <= o; i += 2) this.layersAll.push(i);
    // Each sticker's frame on its piece: z along the face normal, at the face.
    this.local = slots.map(function (s) {
      var nn = s.n, m = m4(), z = nn, x = Math.abs(nn[1]) === 1 ? [1, 0, 0] : [-nn[2], 0, nn[0]];
      if (Math.abs(nn[0]) === 1) x = [0, 0, -nn[0]];
      var y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
      m[0] = x[0]; m[1] = x[1]; m[2] = x[2]; m[4] = y[0]; m[5] = y[1]; m[6] = y[2]; m[8] = z[0]; m[9] = z[1]; m[10] = z[2];
      m[12] = nn[0] * HALF; m[13] = nn[1] * HALF; m[14] = nn[2] * HALF; return m;
    });
  }
  Model.prototype.permOf = function (mv) {
    var k = mv.axis + ':' + mv.layers.join(',') + ':' + (((mv.turns % 4) + 4) % 4);
    if (this.perms[k]) return this.perms[k];
    var R = quarterTurn(mv.axis, mv.turns), out = new Int16Array(this.n), S = this.slots, K = this.key;
    for (var i = 0; i < this.n; i++) { var s = S[i]; out[i] = mv.layers.indexOf(s.p[mv.axis]) < 0 ? i : K[mulVec(R, s.p).join(',') + '|' + mulVec(R, s.n).join(',')]; }
    return (this.perms[k] = out);
  };
  Model.prototype.solved = function (palette) { return this.slots.map(function (s) { return palette[s.face]; }); };
  var MODELS = {};
  function model(N) { return MODELS[N] || (MODELS[N] = new Model(N)); }

  // notation.ts: R/L axis 0, U/D axis 1, F/B axis 2; clockwise = −sign about +axis. x y z turn the whole cube like R U F.
  var FACE = { R: [0, 1], L: [0, -1], U: [1, 1], D: [1, -1], F: [2, 1], B: [2, -1] };
  function parseMove(tok, md) {
    tok = tok.replace(/[’′‘`´]/g, "'");
    var m = /^([RLUDFBxyz])(2?)('?)$/.exec(tok); if (!m) throw new Error('Unknown move ' + tok);
    var L = m[1], axis, layers, cw;
    if ('xyz'.indexOf(L) >= 0) { axis = 'xyz'.indexOf(L); layers = md.layersAll.slice(); cw = -1; }
    else { axis = FACE[L][0]; layers = [md.outer * FACE[L][1]]; cw = -FACE[L][1]; }
    var turns = cw * (m[2] ? 2 : 1); if (m[3]) turns = -turns;
    return { axis: axis, layers: layers, turns: turns, name: tok, face: L, prime: !!m[3], half: !!m[2] };
  }
  function parseAlg(s, md) { return s.trim().split(/\s+/).filter(Boolean).map(function (t) { return parseMove(t, md); }); }
  function invertMove(mv) { var name = mv.half ? mv.name : mv.prime ? mv.face : mv.face + "'"; return { axis: mv.axis, layers: mv.layers.slice(), turns: -mv.turns, name: name, face: mv.face, prime: mv.half ? mv.prime : !mv.prime, half: mv.half }; }
  function invertAlg(a) { return a.slice().reverse().map(invertMove); }
  function permute(md, arr, mv) { var p = md.permOf(mv), out = new Array(md.n); for (var i = 0; i < md.n; i++) out[p[i]] = arr[i]; return out; }
  function permute3(md, f, mv, tmp) { var p = md.permOf(mv); for (var i = 0; i < md.n; i++) { var j = p[i]; tmp[j * 3] = f[i * 3]; tmp[j * 3 + 1] = f[i * 3 + 1]; tmp[j * 3 + 2] = f[i * 3 + 2]; } f.set(tmp.subarray(0, md.n * 3)); }
  function applyAlg(md, cols, alg) { alg.forEach(function (mv) { cols = permute(md, cols, mv); }); return cols; }

  /** A base state and a list of moves on one model. */
  function Track(md, cols, moves) {
    this.md = md; this.moves = moves; this.states = [cols];
    for (var i = 0; i < moves.length; i++) this.states.push(permute(md, this.states[i], moves[i]));
    this.n = moves.length; this._t = [];
  }
  Track.prototype.target = function (k) {
    if (this._t[k]) return this._t[k];
    var st = this.states[k], n = this.md.n, out = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) { var c = lin(st[i]); out[i * 3] = c[0]; out[i * 3 + 1] = c[1]; out[i * 3 + 2] = c[2]; }
    return (this._t[k] = out);
  };
  /** The same track after the whole cube is turned (the celebration's quarter turn). */
  Track.prototype.turned = function (axis, turns) {
    var md = this.md, w = { axis: axis, layers: md.layersAll, turns: turns };
    return new Track(md, permute(md, this.states[0], w), this.moves.map(function (m) {
      var e = [0, 0, 0]; e[m.axis] = 1; var v = mulVec(quarterTurn(axis, turns), e), b = v[0] ? 0 : v[1] ? 1 : 2, s = v[b];
      return { axis: b, layers: m.layers.map(function (l) { return l * s; }), turns: m.turns * s, name: m.name, face: m.face, prime: m.prime, half: m.half };
    }));
  };

  /** What is shown: colours per sticker that follow the moves. */
  function View() { this.track = null; this.k = 0; this.shown = null; this.goal = null; this._tmp = null; }
  View.prototype.use = function (track, m, instant) {
    var k = Math.max(0, Math.min(track.n, Math.floor(m + 1e-6)));
    if (track !== this.track) {
      var fresh = !this.track || this.track.md !== track.md;
      this.track = track; this.k = k; this.goal = track.target(k);
      if (fresh || instant || !this.shown || this.shown.length !== this.goal.length) { this.shown = new Float32Array(this.goal); this._tmp = new Float32Array(this.goal.length); }
      return;
    }
    while (this.k < k) { permute3(track.md, this.shown, track.moves[this.k], this._tmp); this.k++; }
    while (this.k > k) { this.k--; permute3(track.md, this.shown, invertMove(track.moves[this.k]), this._tmp); }
    this.goal = track.target(this.k);
    if (instant) this.shown.set(this.goal);
  };
  View.prototype.step = function (dt, tau) {
    var a = tau <= 0 ? 1 : 1 - Math.exp(-dt / tau), s = this.shown, g = this.goal, moving = false;
    for (var i = 0; i < g.length; i++) { var d = g[i] - s[i]; if (Math.abs(d) > 1e-4) { s[i] += d * a; moving = true; } else s[i] = g[i]; }
    return moving;
  };
  View.prototype.turnAt = function (m, reduced) {
    var t = this.track; if (!t) return null;
    var k = Math.floor(m + 1e-6); if (k >= t.n || k < 0) return null;
    var f = m - k; if (f < 1e-4 || reduced) return null;
    var mv = t.moves[k];
    return { axis: mv.axis, layers: mv.layers, angle: QUARTER(f) * mv.turns * PI / 2 };
  };

  // ---------- the celebration (celebrate.ts) ----------
  var TL = { lit: [0, 360], burst: [400, 820], turn: [400, 1640], assemble: [1120, 1640], glass: [400, 3200], glow: 2700, pill: 3400, end: 3300 };
  function litAt(t) { return EASE_OUT(span(t, TL.lit[0], TL.lit[1])) * (1 - 0.35 * EASE_IN_OUT(span(t, TL.glow, TL.pill))); }
  function spreadAt(t) { if (t <= TL.burst[0] || t >= TL.assemble[1]) return 0; return EASE_OUT(span(t, TL.burst[0], TL.burst[1])) * (1 - EASE_LAND(span(t, TL.assemble[0], TL.assemble[1]))); }
  function turnAt(t) { return EASE_IN_OUT(span(t, TL.turn[0], TL.turn[1])); }
  function seeded(seed) { var a = seed >>> 0; return function () { a = (a + 0x6d2b79f5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function tiltOf(i, seed) { var r = seeded(seed * 7919 + i * 104729 + 17), a = r() * PI * 2, z = r() * 2 - 1, q = Math.sqrt(1 - z * z); return { axis: [q * Math.cos(a), q * Math.sin(a), z], angle: (0.35 + 0.65 * r()) * 10 * D2R }; }
  var GLASS_SIDES = [[[0, 1, 0], [0, 0, -1], [1, 0, 0]], [[0, -1, 0], [0, 0, 1], [1, 0, 0]], [[0, 0, 1], [0, 1, 0], [1, 0, 0]], [[0, 0, -1], [0, 1, 0], [-1, 0, 0]], [[1, 0, 0], [0, 1, 0], [0, 0, -1]], [[-1, 0, 0], [0, 1, 0], [0, 0, 1]]];
  var GLASS_FACES = ['U', 'D', 'F', 'B', 'R', 'L'];
  var GP = { gravity: 0.9, drag: 1.6, speed: [1.8, 3.2], side: 0.8, spin: [2, 6], life: [2.4, 3.0], fade: 0.6, size: [0.05, 0.12], alpha: [0.75, 0.9], wobble: 0.04 };
  function glassPieces(seed, count) {
    var r = seeded(seed * 2654435761 + 12345), out = [], rg = function (a) { return a[0] + r() * (a[1] - a[0]); };
    for (var i = 0; i < count; i++) {
      var side = i % 6, S = GLASS_SIDES[side], u = (r() * 2 - 1) * 1.45, v = (r() * 2 - 1) * 1.45, sp = rg(GP.speed), sa = (r() * 2 - 1) * GP.side, sb = (r() * 2 - 1) * GP.side;
      var start = [0, 1, 2].map(function (k) { return S[0][k] * 1.5 + S[2][k] * u + S[1][k] * v; });
      var vel = [0, 1, 2].map(function (k) { return S[0][k] * sp + S[2][k] * sa + S[1][k] * sb; });
      var a = r() * PI * 2, z = r() * 2 - 1, q = Math.sqrt(1 - z * z);
      out.push({ start: start, side: side, vel: vel, axis: [q * Math.cos(a), q * Math.sin(a), z], spin: rg(GP.spin), born: (400 + r() * 80) / 1000, life: rg(GP.life), size: rg(GP.size), alpha: rg(GP.alpha), phase: r() * PI * 2 });
    }
    return out;
  }
  function glassAt(p, t) {
    var k = GP.drag, g = GP.gravity, s = Math.max(0, t - p.born), e = (1 - Math.exp(-k * s)) / k;
    var pos = [p.start[0] + p.vel[0] * e, p.start[1] + (p.vel[1] + g / k) * e - (g / k) * s, p.start[2] + p.vel[2] * e];
    pos[0] += Math.sin(s * 3 + p.phase) * GP.wobble * Math.min(1, s);
    return { pos: pos, angle: (p.spin * (1 - Math.exp(-0.8 * s))) / 0.8, fade: s <= 0 || s >= p.life ? 0 : clamp01((p.life - s) / GP.fade) };
  }

  // ---------- the story of the page: one cube, one evening ----------
  // The page tells the Story where it is (scroll position p in viewport heights and the timeline);
  // the Story answers with the cube to draw and what the page shows around it (the next move, the clock).
  var ALG = {
    // Your cube: the same mixed cube in the hero and in the scan. It is the cube in Tore's photo: white up, green in front, and
    // this scramble gives exactly the 24 stickers the photo shows from the corner U-L-F (orange on the left, green on the right).
    yours: "R2 B U F' B U' L R2 F2 R2 U L2 D B2 L2 F2 D",
    duel: "L F' U R2 F L' U2 R' F' L U' R",
    clock: "F2 U' L R2 B' D L2 F' U2 R B2 D'",
    clockTurns: "R U R' U' F' L",
    // The app's own scan example (10-scan-found.png and 11-scan-result.png): yellow up, red in front, one front turn from solved.
    reserve: 'F'
  };
  // The page's arrow for each move, as the app's Help shows it with white up and green in front.
  var SYMBOL = { R: 'up', "R'": 'down', L: 'down', "L'": 'up', U: 'left', "U'": 'right', D: 'right', "D'": 'left', F: 'cw', "F'": 'ccw', B: 'ccw', "B'": 'cw' };
  var CLOCK = { scramble: 0.09, rest: 0.55, first: 0.5, every: 0.62, turn: 0.2 };
  function clockPlan(t, nScr, nTurns) {
    // The scramble runs fast (the app's Scramble), then the cube waits, then the person turns at their pace.
    var tS = nScr * CLOCK.scramble;
    if (t < tS) { var k = Math.floor(t / CLOCK.scramble); return { phase: 'scramble', m: k + clamp01((t - k * CLOCK.scramble) / (CLOCK.scramble * 0.92)), clock: 0, running: false }; }
    var t2 = t - tS - CLOCK.rest - CLOCK.first;
    if (t2 < 0) return { phase: 'wait', m: nScr, clock: 0, running: false };
    var j = Math.floor(t2 / CLOCK.every), m = j >= nTurns ? nTurns : j + clamp01((t2 - j * CLOCK.every) / CLOCK.turn);
    return { phase: 'turns', m: nScr + m, clock: t2, running: true };
  }
  function follow(cur, target, dt, vmax) {
    if (!isFinite(vmax)) return target;
    var want = cur + (target - cur) * (1 - Math.exp(-dt / 0.06)), step = want - cur, lim = vmax * dt;
    if (step > lim) step = lim; if (step < -lim) step = -lim;
    var next = cur + step; return Math.abs(target - next) < 1e-3 ? target : next;
  }
  var SIZES = [2, 3, 4, 5, 6, 7];
  // The camera. The page's cube is seen from the corner F-R (green on the left, red on the right). Tore's photo shows the corner U-L-F
  // (orange on the left, green on the right), so in the hero and the scan (with the photo) the cube is seen from that corner: one quarter turn of the view.
  var YAW = { front: -36, photo: -36 + 90 };
  Story.prototype.yawFor = function (beat) { return this.variant === 'photo' && (beat === 'hero' || beat === 'scan') ? YAW.photo : YAW.front; };

  function Story(o) {
    o = o || {};
    this.T = o.timeline; this.reduced = !!o.reduced; this.variant = o.variant || 'photo';
    var m3 = model(3), free = m3.solved(PALETTES.free);
    var yours = parseAlg(ALG.yours, m3), yoursCols = applyAlg(m3, free, yours);
    var res = parseAlg(ALG.reserve, m3), resCols = applyAlg(m3, m3.solved(PALETTES.scan), res);
    var clk = parseAlg(ALG.clock, m3), turns = parseAlg(ALG.clockTurns, m3);
    this.tracks = {
      yours: new Track(m3, yoursCols, invertAlg(yours)),
      reserve: new Track(m3, resCols, invertAlg(res)),
      clock: new Track(m3, free, clk.concat(turns)),
      duel: new Track(m3, applyAlg(m3, free, parseAlg(ALG.duel, m3)), []),
      solved: new Track(m3, free, [])
    };
    this.tracks.yoursTurned = this.tracks.yours.turned(1, -1);
    this.tracks.reserveTurned = this.tracks.reserve.turned(1, -1);
    this.sizes = {}; var self = this;
    SIZES.forEach(function (N) { var md = model(N); self.sizes[N] = new Track(md, md.solved(PALETTES.free), []); });
    this.nScr = clk.length; this.nTurns = turns.length;
    this.view = new View(); this.time = 0; this.helpM = 0; this.cele = null; this.turned = false; this.clockT0 = null; this.size = 3; this.sizeAt = -9;
    this.glassCount = o.glass || 240; this.seed = o.seed || 7; this.yawNow = null;
  }
  Story.prototype.help = function () { return this.variant === 'reserve' ? (this.turned ? this.tracks.reserveTurned : this.tracks.reserve) : (this.turned ? this.tracks.yoursTurned : this.tracks.yours); };
  Story.prototype.sizeFor = function (p) {
    var T = this.T, a = T.sizes.sweep[0], b = T.sizes.sweep[1];
    if (p < a) return 3;
    if (p < b) { var i = Math.min(5, Math.floor(span(p, a, b) * 6)); return SIZES[i]; }
    return p < T.sizes.back ? 7 : 3;
  };
  /** One frame of the flowing story. p: scroll position, beat: the beat id, mood: light weights. */
  Story.prototype.update = function (p, dt, beat, mood) {
    var T = this.T, R = this.reduced, v = this.view; this.time += dt;
    var scene = { yaw: -36, pitch: 24, bob: 0, scale: 1, turn: null, spread: 0, lit: 0, glass: null, sweep: null, cubeTurn: null, mood: mood, hidden: false };
    var info = { beat: beat, busy: false };
    var celeT = this.cele === null ? null : (this.time - this.cele) * 1000;
    // Help: one move per scroll step, until it is solved; then the one celebration.
    var helpGoal = clamp01((p - T.scan.help[0]) / (T.scan.help[1] - T.scan.help[0])) * this.help().n;
    if (R) helpGoal = Math.floor(helpGoal + 1e-6);
    if (!(celeT !== null && celeT < TL.turn[1] && !R)) this.helpM = follow(this.helpM, helpGoal, dt, R ? Infinity : 5);
    if (beat === 'hero') {
      // The hero is always your cube (the same as the poster, whatever the scan shows).
      v.use(this.tracks.yours, 0, v.track && v.track.md.N !== 3);
    } else if (beat === 'scan') {
      var tr = this.help();
      if (!this.cele && this.helpM >= tr.n - 1e-3 && p >= T.scan.help[1] - 0.02) { this.cele = this.time; celeT = 0; }
      v.use(tr, this.helpM);
      scene.turn = v.turnAt(this.helpM, R);
      info.move = Math.min(tr.n, Math.floor(this.helpM + 1e-6)); info.moves = tr.moves; info.solved = this.helpM >= tr.n - 1e-3;
    } else if (beat === 'sizes') {
      var N = this.sizeFor(p);
      if (N !== this.size) { this.size = N; this.sizeAt = this.time; }
      if (p < T.sizes.back || N !== 3) { v.use(this.sizes[N], 0, true); info.size = N; }
      else {
        if (this.clockT0 === null || this.lastBeat !== 'sizes' || this.lastN !== 3) this.clockT0 = this.time;
        var cp = clockPlan(this.time - this.clockT0, this.nScr, this.nTurns), m = R ? Math.floor(cp.m + 1e-6) : cp.m;
        v.use(this.tracks.clock, m); scene.turn = v.turnAt(m, R);
        info.size = 3; info.clock = cp.clock; info.clockRunning = cp.running; info.phase = cp.phase; info.busy = true;
      }
      this.lastN = N;
      if (!R) { var pop = span(this.time - this.sizeAt, 0, 0.32); scene.scale = 0.9 + 0.1 * EASE_OUT(pop); if (pop < 1) info.busy = true; }
    } else if (beat === 'duel') {
      v.use(this.tracks.duel, 0, v.track && v.track.md.N !== 3);
    } else {
      v.use(this.tracks.solved, 0, v.track && v.track.md.N !== 3);
    }
    this.lastBeat = beat;
    // The celebration runs once, in the scan beat; leaving it ends the burst at once.
    if (celeT !== null && beat !== 'scan' && !this.turned) this.finishTurn();
    if (celeT !== null && celeT < TL.end && beat === 'scan') {
      if (R) scene.lit = litAt(Math.min(celeT, 2000));
      else {
        scene.lit = litAt(celeT); scene.spread = spreadAt(celeT); scene.seed = this.seed;
        if (celeT < TL.turn[1] && !this.turned) scene.cubeTurn = -PI / 2 * turnAt(celeT);
        if (celeT >= TL.turn[1] && !this.turned) this.finishTurn();
        scene.glassT = celeT / 1000; scene.glass = this.glass || (this.glass = glassPieces(this.seed, this.glassCount));
        if (celeT < 1200) scene.sweep = celeT / 1200;
      }
      info.celebrating = true; info.busy = true;
    }
    var fading = v.step(dt, R ? 0.03 : 0.11);
    scene.model = v.track.md; scene.cols = v.shown;
    var yawTo = this.yawFor(beat);
    this.yawNow = this.yawNow === null || R ? yawTo : this.yawNow + (yawTo - this.yawNow) * (1 - Math.exp(-dt / 0.3));
    scene.yaw = this.yawNow + (R ? 0 : 12 * Math.sin((2 * PI * this.time) / 16));
    scene.bob = R ? 0 : 0.05 * Math.sin(this.time * 0.9);
    info.busy = info.busy || fading || scene.turn !== null || Math.abs(this.helpM - helpGoal) > 1e-3;
    return { scene: scene, info: info };
  };
  Story.prototype.finishTurn = function () {
    var v = this.view, tr = this.help(), md = tr.md, w = { axis: 1, layers: md.layersAll, turns: -1 };
    if (v.track && v.track.md === md && v.shown) permute3(md, v.shown, w, v._tmp);
    this.turned = true; var t2 = this.help(); v.track = t2; v.k = Math.min(t2.n, Math.round(this.helpM)); v.goal = t2.target(v.k);
  };
  /** A still for one beat (the flowing page, reduced motion and the storyboard). o: { help: 0..1, size, clock } */
  Story.prototype.still = function (beat, mood, o) {
    o = o || {};
    var scene = { yaw: -36, pitch: 24, bob: 0, scale: 1, turn: null, spread: 0, lit: 0, glass: null, sweep: null, cubeTurn: null, mood: mood, hidden: false }, info = { beat: beat }, tr, k;
    if (beat === 'scan') {
      tr = this.variant === 'reserve' ? this.tracks.reserve : this.tracks.yours;
      k = Math.round((o.help === undefined ? 0 : o.help) * tr.n);
      scene.model = tr.md; scene.cols = new Float32Array(tr.target(k)); info.move = Math.min(tr.n, k); info.moves = tr.moves; info.solved = k >= tr.n;
      if (o.celebrate !== undefined) { var t = o.celebrate; scene.lit = litAt(t); if (!this.reduced) { scene.spread = spreadAt(t); scene.seed = this.seed; scene.cubeTurn = -PI / 2 * turnAt(t); scene.glassT = t / 1000; scene.glass = glassPieces(this.seed, this.glassCount); if (t < 1200) scene.sweep = t / 1200; } }
    } else if (beat === 'sizes') {
      var N = o.size || 3;
      if (N !== 3 || o.clock === undefined) { tr = this.sizes[N]; scene.model = tr.md; scene.cols = new Float32Array(tr.target(0)); info.size = N; }
      else {
        var cp = clockPlan(o.clock, this.nScr, this.nTurns), mm = this.reduced ? Math.floor(cp.m + 1e-6) : cp.m;
        tr = this.tracks.clock; k = Math.floor(mm + 1e-6); scene.model = tr.md; scene.cols = new Float32Array(tr.target(k));
        var view = new View(); view.use(tr, mm, true); scene.turn = view.turnAt(mm, this.reduced);
        info.size = 3; info.clock = cp.clock; info.clockRunning = cp.running;
      }
    } else {
      tr = beat === 'hero' ? this.tracks.yours : beat === 'duel' ? this.tracks.duel : this.tracks.solved;
      scene.model = tr.md; scene.cols = new Float32Array(tr.target(0));
    }
    scene.yaw = this.yawFor(beat);
    return { scene: scene, info: info };
  };

  // ---------- geometry ----------
  function roundedBox(h, r, k) {
    var u = [], i, j;
    for (i = k; i >= 0; i--) u.push(-(h - r) - r * Math.tan((i / k) * PI / 4));
    for (i = 0; i <= k; i++) u.push(h - r + r * Math.tan((i / k) * PI / 4));
    var n = u.length, pos = [], nor = [], idx = [], AXES = [[0, 1, 2], [1, 2, 0], [2, 0, 1]];
    for (var f = 0; f < 6; f++) {
      var ax = AXES[f >> 1], s = f & 1 ? -1 : 1, a = ax[0], b = ax[1], c = ax[2], base = pos.length / 3;
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
        var P = [0, 0, 0]; P[a] = s * h; P[b] = u[i]; P[c] = u[j];
        var inner = P.map(function (x) { return Math.max(-(h - r), Math.min(h - r, x)); });
        var d = [P[0] - inner[0], P[1] - inner[1], P[2] - inner[2]], L = Math.hypot(d[0], d[1], d[2]) || 1;
        var N = [d[0] / L, d[1] / L, d[2] / L];
        pos.push(inner[0] + r * N[0], inner[1] + r * N[1], inner[2] + r * N[2]); nor.push(N[0], N[1], N[2]);
      }
      for (i = 0; i < n - 1; i++) for (j = 0; j < n - 1; j++) {
        var q0 = base + i * n + j, q1 = q0 + 1, q2 = q0 + n, q3 = q2 + 1;
        if (s > 0) idx.push(q0, q2, q1, q1, q2, q3); else idx.push(q0, q1, q2, q1, q3, q2);
      }
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), idx: new Uint16Array(idx) };
  }
  // cubeView.ts stickerGeometry: rounded rect 0.8 − 2·0.006, radius 0.1, depth 0.003, bevel 0.006 in 3 steps, lifted 0.0012.
  function stickerMesh() {
    var size = 0.8, bevel = 0.006, half = size / 2 - bevel, rad = 0.1, zt = 0.003 + bevel + bevel * 0.2, seg = 7, outline = [];
    var corners = [[1, 1, 0], [-1, 1, 90], [-1, -1, 180], [1, -1, 270]];
    corners.forEach(function (cn) {
      var cx = cn[0] * (half - rad), cy = cn[1] * (half - rad);
      for (var i = 0; i <= seg; i++) { var a = (cn[2] + (i / seg) * 90) * D2R; outline.push([cx, cy, Math.cos(a), Math.sin(a)]); }
    });
    var pos = [0, 0, zt], nor = [0, 0, 1], idx = [], N = outline.length;
    var rings = [[0, 0], [30, 0], [60, 0], [90, 0], [90, 1]];
    rings.forEach(function (rg) {
      var phi = rg[0] * D2R, off = bevel * Math.sin(phi) + rad, z = rg[1] ? 0.0004 : zt - bevel + bevel * Math.cos(phi), nz = Math.cos(phi), nr = Math.sin(phi);
      outline.forEach(function (o) { pos.push(o[0] + o[2] * off, o[1] + o[3] * off, z); nor.push(o[2] * nr, o[3] * nr, nz); });
    });
    for (var i = 0; i < N; i++) idx.push(0, 1 + i, 1 + ((i + 1) % N));
    for (var r = 0; r < rings.length - 1; r++) for (i = 0; i < N; i++) {
      var a = 1 + r * N + i, b2 = 1 + r * N + ((i + 1) % N), c = a + N, d = b2 + N;
      idx.push(a, c, b2, b2, c, d);
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), idx: new Uint16Array(idx) };
  }

  // ---------- small matrix kit (column-major) ----------
  function m4() { var m = new Float32Array(16); m[0] = m[5] = m[10] = m[15] = 1; return m; }
  function mul(a, b, o) { o = o || new Float32Array(16); for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o; }
  function rot(axis, ang) {
    var x = axis[0], y = axis[1], z = axis[2], L = Math.hypot(x, y, z) || 1; x /= L; y /= L; z /= L;
    var c = Math.cos(ang), s = Math.sin(ang), t = 1 - c, m = m4();
    m[0] = t * x * x + c; m[1] = t * x * y + s * z; m[2] = t * x * z - s * y;
    m[4] = t * x * y - s * z; m[5] = t * y * y + c; m[6] = t * y * z + s * x;
    m[8] = t * x * z + s * y; m[9] = t * y * z - s * x; m[10] = t * z * z + c; return m;
  }
  function trans(x, y, z) { var m = m4(); m[12] = x; m[13] = y; m[14] = z; return m; }
  function scal(s) { var m = m4(); m[0] = m[5] = m[10] = s; return m; }
  function persp(fovy, asp, n, f) { var t = 1 / Math.tan(fovy / 2), m = new Float32Array(16); m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = (2 * f * n) / (n - f); return m; }
  function lookAt(e, c, up) {
    var z = [e[0] - c[0], e[1] - c[1], e[2] - c[2]], L = Math.hypot(z[0], z[1], z[2]); z = z.map(function (v) { return v / L; });
    var x = [up[1] * z[2] - up[2] * z[1], up[2] * z[0] - up[0] * z[2], up[0] * z[1] - up[1] * z[0]]; L = Math.hypot(x[0], x[1], x[2]); x = x.map(function (v) { return v / L; });
    var y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]], m = m4();
    m[0] = x[0]; m[4] = x[1]; m[8] = x[2]; m[1] = y[0]; m[5] = y[1]; m[9] = y[2]; m[2] = z[0]; m[6] = z[1]; m[10] = z[2];
    m[12] = -(x[0] * e[0] + x[1] * e[1] + x[2] * e[2]); m[13] = -(y[0] * e[0] + y[1] * e[1] + y[2] * e[2]); m[14] = -(z[0] * e[0] + z[1] * e[1] + z[2] * e[2]); return m;
  }
  function apply3(m, v) { return [m[0] * v[0] + m[4] * v[1] + m[8] * v[2], m[1] * v[0] + m[5] * v[1] + m[9] * v[2], m[2] * v[0] + m[6] * v[1] + m[10] * v[2]]; }
  function applyP(m, v) { var r = apply3(m, v); return [r[0] + m[12], r[1] + m[13], r[2] + m[14]]; }
  function nmat(m) { return new Float32Array([m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]); }
  function norm(v) { var L = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / L, v[1] / L, v[2] / L]; }

  // ---------- light: four moods over one evening ----------
  function dirFrom(el, az) { el *= D2R; az *= D2R; return [Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el)]; }
  var PITCH = 4 * D2R;
  // world/places.ts «bluehour»: the moon's cool key, a soft front light and a blue rim.
  var MOODS = (function () {
    var moon = [0.62, 0.72, 1.0], key = moon.map(function (c) { return c + (1 - c) * 0.65; });
    var keyDir = dirFrom(9, 118), side = -Math.sign(keyDir[0]) * 0.45, front = norm([side, Math.sin(PITCH) + 0.5, Math.cos(PITCH)]);
    return {
      blue: { keyDir: keyDir, keyCol: key.map(function (c) { return c * 1.4; }), frontDir: front, frontCol: [0.9, 0.9, 0.9], rimDir: norm([0.4, 0.6, -1]), rimCol: lin('#bfd2ff').map(function (c) { return c * 0.45; }), hemiSky: lin('#e2e7f2'), hemiGround: lin('#77716b'), fill: 1.15, env: 0.8, exposure: 1.45, tint: [1, 1, 1] },
      // Night: the same moon, lower and dimmer; the reflections take the night's blue.
      night: { keyDir: dirFrom(18, 128), keyCol: [0.78, 0.86, 1.18], frontDir: front, frontCol: [0.74, 0.76, 0.82], rimDir: norm([0.4, 0.6, -1]), rimCol: lin('#9fb6ff').map(function (c) { return c * 0.5; }), hemiSky: lin('#c9d0e6'), hemiGround: lin('#3e3f4a'), fill: 1.0, env: 0.55, exposure: 1.36, tint: [0.62, 0.68, 0.86] },
      // Sunrise over the Earth's edge: a warm key low behind the cube, a warm rim and cool space around.
      rise: { keyDir: dirFrom(4, 152), keyCol: [1.75, 1.18, 0.72], frontDir: front, frontCol: [0.86, 0.84, 0.86], rimDir: norm([0.55, 0.25, -1]), rimCol: [0.95, 0.52, 0.24], hemiSky: lin('#d8dbe8'), hemiGround: lin('#5a4a40'), fill: 1.05, env: 0.62, exposure: 1.42, tint: [1.08, 0.86, 0.72] },
      // Morning: the sun up, neutral and calm.
      day: { keyDir: dirFrom(32, 140), keyCol: [1.85, 1.8, 1.7], frontDir: front, frontCol: [1.0, 1.0, 1.0], rimDir: norm([0.4, 0.6, -1]), rimCol: [0.35, 0.4, 0.5], hemiSky: lin('#eef2f8'), hemiGround: lin('#8a8780'), fill: 1.3, env: 0.75, exposure: 1.5, tint: [1.05, 1.06, 1.1] }
    };
  })();
  var MOOD_KEYS = ['blue', 'night', 'rise', 'day'];
  function mixMood(w) {
    w = w || { blue: 1 }; var sum = 0, out = null;
    MOOD_KEYS.forEach(function (k) { sum += w[k] || 0; });
    if (!(sum > 0)) { w = { blue: 1 }; sum = 1; }
    MOOD_KEYS.forEach(function (k) {
      var a = (w[k] || 0) / sum; if (!(a > 0)) return; var M = MOODS[k];
      if (!out) out = { keyDir: [0, 0, 0], keyCol: [0, 0, 0], frontDir: [0, 0, 0], frontCol: [0, 0, 0], rimDir: [0, 0, 0], rimCol: [0, 0, 0], hemiSky: [0, 0, 0], hemiGround: [0, 0, 0], fill: 0, env: 0, exposure: 0, tint: [0, 0, 0] };
      ['keyDir', 'keyCol', 'frontDir', 'frontCol', 'rimDir', 'rimCol', 'hemiSky', 'hemiGround', 'tint'].forEach(function (n) { for (var i = 0; i < 3; i++) out[n][i] += M[n][i] * a; });
      out.fill += M.fill * a; out.env += M.env * a; out.exposure += Math.log(M.exposure) * a;
    });
    out.keyDir = norm(out.keyDir); out.frontDir = norm(out.frontDir); out.rimDir = norm(out.rimDir); out.exposure = Math.exp(out.exposure);
    return out;
  }

  // The blue-hour sky over the ocean, in linear light. It lights the reflections on the cube (the tint gives the other moods).
  var SKY_GLSL = [
    'const vec3 SKY_ZEN = vec3(0.0042, 0.0105, 0.0480);',
    'const vec3 SKY_MID = vec3(0.0240, 0.0560, 0.2050);',
    'const vec3 SKY_LOW = vec3(0.1650, 0.1700, 0.3900);',
    'const vec3 SKY_GLOW = vec3(1.0000, 0.5000, 0.2700);',
    'const vec3 SKY_BELT = vec3(0.5000, 0.3000, 0.4300);',
    'const vec3 SEA_DEEP = vec3(0.0022, 0.0055, 0.0160);',
    'const float GLOW_AZ = -0.35;',
    'vec3 skyAbove(vec3 d) {',
    '  float h = max(d.y, 0.0);',
    '  float az = atan(d.x, -d.z);',
    '  vec3 c = mix(SKY_LOW, SKY_MID, smoothstep(0.0, 0.24, h));',
    '  c = mix(c, SKY_ZEN, smoothstep(0.12, 0.72, h));',
    '  float da = (az - GLOW_AZ) / 0.95;',
    '  float g = exp(-da * da);',
    '  c += SKY_GLOW * (0.80 * g + 0.10) * exp(-h / 0.05);',
    '  c += SKY_BELT * 0.32 * exp(-h / 0.15) * (1.0 - 0.5 * g);',
    '  return c;',
    '}',
    'vec3 sky(vec3 d) {',
    '  if (d.y >= 0.0) return skyAbove(d);',
    '  float f = 0.02 + 0.98 * pow(1.0 - min(-d.y * 5.0, 1.0), 5.0);',
    '  return mix(SEA_DEEP, skyAbove(vec3(d.x, -d.y, d.z)), f * 0.6);',
    '}',
    'vec3 neutralTone(vec3 color) {',
    '  float x = min(color.r, min(color.g, color.b));',
    '  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;',
    '  color -= offset;',
    '  float peak = max(color.r, max(color.g, color.b));',
    '  if (peak < 0.76) return color;',
    '  float d = 0.24;',
    '  float newPeak = 1.0 - d * d / (peak + d - 0.76);',
    '  color *= newPeak / peak;',
    '  float g = 1.0 - 1.0 / (0.15 * (peak - newPeak) + 1.0);',
    '  return mix(color, vec3(newPeak), g);',
    '}',
    'vec3 toSRGB(vec3 c) { c = clamp(c, 0.0, 1.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }'
  ].join('\n');

  var VS = [
    'attribute vec3 aPos; attribute vec3 aNor;',
    'uniform mat4 uModel; uniform mat4 uVP; uniform mat3 uNM;',
    'varying vec3 vN; varying vec3 vW;',
    'void main() { vec4 w = uModel * vec4(aPos, 1.0); vW = w.xyz; vN = uNM * aNor; gl_Position = uVP * w; }'
  ].join('\n');
  var FS = [
    'precision highp float;',
    'varying vec3 vN; varying vec3 vW;',
    'uniform vec3 uCam; uniform vec3 uAlbedo; uniform float uRough; uniform float uF0; uniform float uCoat; uniform float uCoatRough; uniform float uGain;',
    'uniform vec3 uKeyDir; uniform vec3 uKeyCol; uniform vec3 uFrontDir; uniform vec3 uFrontCol; uniform vec3 uRimDir; uniform vec3 uRimCol;',
    'uniform vec3 uHemiSky; uniform vec3 uHemiGround; uniform float uFill; uniform float uEnv; uniform float uExposure; uniform vec3 uTint;',
    'uniform vec4 uSweep; uniform vec3 uBox;',
    SKY_GLSL,
    'float dGGX(float NoH, float a) { float a2 = a * a; float d = NoH * NoH * (a2 - 1.0) + 1.0; return a2 / (3.14159 * d * d); }',
    'float vis(float NoV, float NoL, float a) { float k = a * 0.5; return 0.25 / ((NoL * (1.0 - k) + k) * (NoV * (1.0 - k) + k)); }',
    'vec2 envBRDF(float NoV, float r) { vec4 c0 = vec4(-1.0, -0.0275, -0.572, 0.022); vec4 c1 = vec4(1.0, 0.0425, 1.04, -0.04); vec4 rr = r * c0 + c1; float a004 = min(rr.x * rr.x, exp2(-9.28 * NoV)) * rr.x + rr.y; return vec2(-1.04, 1.04) * a004 + rr.zw; }',
    'vec3 lobe(vec3 N, vec3 V, vec3 L, vec3 col, vec3 alb, float a, float f0, float ac) {',
    '  float NoL = dot(N, L); if (NoL <= 0.0) return vec3(0.0);',
    '  vec3 H = normalize(V + L); float NoH = max(dot(N, H), 0.0); float NoV = max(dot(N, V), 0.001); float VoH = max(dot(V, H), 0.0);',
    '  float fw = pow(1.0 - VoH, 5.0); float F = f0 + (1.0 - f0) * fw;',
    '  float spec = F * dGGX(NoH, a) * vis(NoV, NoL, a);',
    '  vec3 diff = (1.0 - F) * alb / 3.14159;',
    '  float Fc = 0.04 + 0.96 * fw;',
    '  float coat = uCoat * Fc * dGGX(NoH, ac) * vis(NoV, NoL, ac);',
    '  return ((diff + spec) * (1.0 - uCoat * Fc) + coat) * col * NoL;',
    '}',
    'void main() {',
    '  vec3 N = normalize(vN); vec3 V = normalize(uCam - vW);',
    '  float a = max(uRough * uRough, 0.003); float ac = max(uCoatRough * uCoatRough, 0.003);',
    '  vec3 alb = uAlbedo * uGain;',
    '  vec3 c = lobe(N, V, uKeyDir, uKeyCol, alb, a, uF0, ac) + lobe(N, V, uFrontDir, uFrontCol, alb, a, uF0, ac) + lobe(N, V, uRimDir, uRimCol, alb, a, uF0, ac);',
    '  c += mix(uHemiGround, uHemiSky, 0.5 * N.y + 0.5) * uFill * alb / 3.14159;',
    '  float NoV = max(dot(N, V), 0.001); vec3 R = reflect(-V, N);',
    '  vec2 ab = envBRDF(NoV, uRough);',
    '  vec3 irr = 0.5 * (sky(normalize(N + vec3(0.0, 0.45, 0.0))) + mix(SEA_DEEP * 4.0, SKY_MID * 1.2, 0.5 * N.y + 0.5));',
    '  float Fc = 0.04 + 0.96 * pow(1.0 - NoV, 5.0);',
    '  vec3 env = (irr * alb + sky(normalize(mix(R, N, a))) * (uF0 * ab.x + ab.y)) * (1.0 - uCoat * Fc) + sky(normalize(mix(R, N, ac))) * Fc * uCoat;',
    '  c += env * uEnv * uTint;',
    '  if (uSweep.y > 0.0) {',
    '    vec2 q = (gl_FragCoord.xy - uBox.xy) / uBox.z;',
    '    float s = dot(q, uSweep.zw) - uSweep.x;',
    '    float soft = exp(-s * s / (2.0 * 0.11 * 0.11)); float core = exp(-s * s / (2.0 * 0.03 * 0.03));',
    '    float rim = (1.0 - NoV) * (1.0 - NoV) * 0.55 + 0.8;',
    '    c += ((alb * 0.55 + 0.06) * soft + vec3(0.32) * core * rim) * uSweep.y / uExposure;',
    '  }',
    '  gl_FragColor = vec4(toSRGB(neutralTone(c * uExposure)), 1.0);',
    '}'
  ].join('\n');
  var GVS = 'attribute vec3 aPos; attribute vec4 aCol; uniform mat4 uVP; varying vec4 vCol; void main() { vCol = aCol; gl_Position = uVP * vec4(aPos, 1.0); }';
  var GFS = 'precision mediump float; varying vec4 vCol; void main() { gl_FragColor = vCol; }';

  var FINISH = {
    body: { albedo: lin('#0c0c0e'), rough: 0.42, f0: 0.04, coat: 0.2, coatRough: 0.45 },
    tile: { rough: 0.36, f0: 0.0337 * 0.55, coat: 0.45, coatRough: 0.2 }
  };
  var FOV = 30 * D2R, REACH = (Math.sqrt(3) / 2) * 3, DIST = REACH / Math.sin(FOV / 2);
  var EYE = [0, DIST * Math.sin(PITCH), DIST * Math.cos(PITCH)];
  var VIEWM = lookAt(EYE, [0, 0, 0], [0, 1, 0]), PROJ = persp(FOV, 1, 0.5, 60);

  /** The whole cube's matrix: lift (bob), tilt toward you, turned (engine.ts VIEW_TILT), the celebration's quarter turn, size. */
  function cubeMatrix(scene) {
    var md = scene.model || model(3), s = (3 / md.N) * (scene.scale || 1);
    var m = mul(trans(0, scene.bob || 0, 0), mul(rot([1, 0, 0], (scene.pitch === undefined ? 24 : scene.pitch) * D2R), rot([0, 1, 0], (scene.yaw === undefined ? -36 : scene.yaw) * D2R)));
    if (scene.cubeTurn) m = mul(m, rot([0, 1, 0], scene.cubeTurn));
    return mul(m, scal(s));
  }
  /** The view-projection for one cube placed in the stage: lay = { W, H, cx, cy, S } in CSS px (S: the square the reach sphere fills). */
  function viewProj(lay) {
    var off = m4(); off[0] = lay.S / lay.W; off[5] = lay.S / lay.H; off[12] = (2 * lay.cx) / lay.W - 1; off[13] = 1 - (2 * lay.cy) / lay.H;
    return mul(off, mul(PROJ, VIEWM));
  }
  /** The cube's outline on screen (CSS px): the six-sided hull and the three edges from the near corner, for the scan frame. */
  function outline(scene, lay) {
    var M = mul(viewProj(lay), cubeMatrix(scene)), md = scene.model || model(3), e = md.N / 2 * 1.0, pts = [], i;
    for (i = 0; i < 8; i++) {
      var v = [(i & 1 ? 1 : -1) * e, (i & 2 ? 1 : -1) * e, (i & 4 ? 1 : -1) * e];
      var x = M[0] * v[0] + M[4] * v[1] + M[8] * v[2] + M[12], y = M[1] * v[0] + M[5] * v[1] + M[9] * v[2] + M[13], z = M[2] * v[0] + M[6] * v[1] + M[10] * v[2] + M[14], w = M[3] * v[0] + M[7] * v[1] + M[11] * v[2] + M[15];
      pts.push({ x: (x / w * 0.5 + 0.5) * lay.W, y: (0.5 - y / w * 0.5) * lay.H, z: z / w, i: i });
    }
    var near = pts.slice().sort(function (a, b) { return a.z - b.z; })[0];
    var hull = convexHull(pts.map(function (p) { return [p.x, p.y]; }));
    var edges = [1, 2, 4].map(function (b) { var q = pts[near.i ^ b]; return [q.x, q.y]; });
    return { hull: hull, near: [near.x, near.y], edges: edges };
  }
  function convexHull(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var cross = function (o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }, lo = [], up = [], i;
    for (i = 0; i < P.length; i++) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], P[i]) <= 0) lo.pop(); lo.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], P[i]) <= 0) up.pop(); up.push(P[i]); }
    up.pop(); lo.pop(); return lo.concat(up);
  }

  function Renderer(canvas, o) {
    o = o || {};
    var gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: !!o.preserve, depth: true, powerPreference: 'high-performance' });
    if (!gl) throw new Error('no webgl');
    this.gl = gl; this.canvas = canvas;
    // A software renderer (no GPU) gets a smaller buffer and fewer frames from the page.
    var dbg = gl.getExtension('WEBGL_debug_renderer_info'), name = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    this.software = /swiftshader|llvmpipe|software|basic render/i.test(name);
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
    function prog(vs, fs) { var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p; }
    this.p = prog(VS, FS); this.gp = prog(GVS, GFS);
    var self = this; this.u = {}; this.gu = {};
    ['uModel', 'uVP', 'uNM', 'uCam', 'uAlbedo', 'uRough', 'uF0', 'uCoat', 'uCoatRough', 'uGain', 'uKeyDir', 'uKeyCol', 'uFrontDir', 'uFrontCol', 'uRimDir', 'uRimCol', 'uHemiSky', 'uHemiGround', 'uFill', 'uEnv', 'uExposure', 'uTint', 'uSweep', 'uBox'].forEach(function (n) { self.u[n] = gl.getUniformLocation(self.p, n); });
    this.gu.uVP = gl.getUniformLocation(this.gp, 'uVP');
    this.aPos = gl.getAttribLocation(this.p, 'aPos'); this.aNor = gl.getAttribLocation(this.p, 'aNor');
    this.gaPos = gl.getAttribLocation(this.gp, 'aPos'); this.gaCol = gl.getAttribLocation(this.gp, 'aCol');
    function mesh(g) { var b = { pos: gl.createBuffer(), nor: gl.createBuffer(), idx: gl.createBuffer(), n: g.idx.length }; gl.bindBuffer(gl.ARRAY_BUFFER, b.pos); gl.bufferData(gl.ARRAY_BUFFER, g.pos, gl.STATIC_DRAW); gl.bindBuffer(gl.ARRAY_BUFFER, b.nor); gl.bufferData(gl.ARRAY_BUFFER, g.nor, gl.STATIC_DRAW); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.idx); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, g.idx, gl.STATIC_DRAW); return b; }
    this.body = mesh(roundedBox(HALF, 0.085, 4)); this.tile = mesh(stickerMesh());
    this.glassBuf = gl.createBuffer(); this.glassData = new Float32Array(0);
    this.tilts = {};
  }
  Renderer.prototype.bind = function (b) {
    var gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, b.pos); gl.enableVertexAttribArray(this.aPos); gl.vertexAttribPointer(this.aPos, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, b.nor); gl.enableVertexAttribArray(this.aNor); gl.vertexAttribPointer(this.aNor, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.idx);
  };
  /** frame: { W, H, dpr, cubes: [{ scene, cx, cy, S }] } in CSS px. Clears once and draws every cube. */
  Renderer.prototype.draw = function (frame) {
    var gl = this.gl, cw = Math.max(1, Math.round(frame.W * frame.dpr)), ch = Math.max(1, Math.round(frame.H * frame.dpr));
    if (this.canvas.width !== cw || this.canvas.height !== ch) { this.canvas.width = cw; this.canvas.height = ch; }
    gl.viewport(0, 0, cw, ch); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for (var i = 0; i < frame.cubes.length; i++) {
      var c = frame.cubes[i]; if (!c || !c.scene || c.scene.hidden || !(c.S > 1)) continue;
      if (i > 0) gl.clear(gl.DEPTH_BUFFER_BIT);
      this.drawCube(c.scene, { W: frame.W, H: frame.H, dpr: frame.dpr, cx: c.cx, cy: c.cy, S: c.S });
    }
  };
  Renderer.prototype.drawCube = function (scene, lay) {
    var gl = this.gl, u = this.u, md = scene.model || model(3), self = this;
    gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND); gl.enable(gl.CULL_FACE); gl.cullFace(gl.BACK);
    var LT = mixMood(scene.mood), VP = viewProj(lay);
    gl.useProgram(this.p);
    gl.uniformMatrix4fv(u.uVP, false, VP); gl.uniform3fv(u.uCam, EYE);
    gl.uniform3fv(u.uKeyDir, LT.keyDir); gl.uniform3fv(u.uKeyCol, LT.keyCol); gl.uniform3fv(u.uFrontDir, LT.frontDir); gl.uniform3fv(u.uFrontCol, LT.frontCol);
    gl.uniform3fv(u.uRimDir, LT.rimDir); gl.uniform3fv(u.uRimCol, LT.rimCol); gl.uniform3fv(u.uHemiSky, LT.hemiSky); gl.uniform3fv(u.uHemiGround, LT.hemiGround);
    gl.uniform1f(u.uFill, LT.fill); gl.uniform1f(u.uEnv, LT.env); gl.uniform1f(u.uExposure, LT.exposure); gl.uniform3fv(u.uTint, LT.tint);
    var sw = scene.sweep;
    if (sw !== null && sw !== undefined) {
      var pp = sw, pos = 1.25 * (2 * (0.35 * pp + 0.65 * pp * pp * (3 - 2 * pp)) - 1), win = (function (x) { var a = clamp01(x / 0.1), b = clamp01((1 - x) / 0.1); return a * a * (3 - 2 * a) * b * b * (3 - 2 * b); })(pp);
      gl.uniform4f(u.uSweep, pos, 0.9 * win, Math.cos(-0.56), Math.sin(-0.56));
    } else gl.uniform4f(u.uSweep, 0, 0, 1, 0);
    gl.uniform3f(u.uBox, lay.cx * lay.dpr, (lay.H - lay.cy) * lay.dpr, (lay.S / 2) * lay.dpr);
    var cube = cubeMatrix(scene);
    var t = scene.turn, spread = scene.spread || 0, gain = 1 + 0.25 * (scene.lit || 0), cols = scene.cols;
    var tilts = this.tilts[md.N] || (this.tilts[md.N] = md.cubies.map(function (_, i) { return tiltOf(i, 7); }));
    var models = md.cubies.map(function (p, ci) {
      var m = cube;
      if (t && t.layers.indexOf(p[t.axis]) >= 0) { var ax = [0, 0, 0]; ax[t.axis] = 1; m = mul(m, rot(ax, t.angle)); }
      var sx = p[0] / 2, sy = p[1] / 2, sz = p[2] / 2;
      if (spread) { sx += Math.sign(p[0]) * 0.22 * spread; sy += Math.sign(p[1]) * 0.22 * spread; sz += Math.sign(p[2]) * 0.22 * spread; }
      m = mul(m, trans(sx, sy, sz));
      if (spread) { var tl = tilts[ci]; m = mul(m, rot(tl.axis, tl.angle * spread)); }
      return m;
    });
    var B = FINISH.body, Tt = FINISH.tile;
    this.bind(this.body);
    gl.uniform3fv(u.uAlbedo, B.albedo); gl.uniform1f(u.uRough, B.rough); gl.uniform1f(u.uF0, B.f0); gl.uniform1f(u.uCoat, B.coat); gl.uniform1f(u.uCoatRough, B.coatRough); gl.uniform1f(u.uGain, 1);
    models.forEach(function (m) { gl.uniformMatrix4fv(u.uModel, false, m); gl.uniformMatrix3fv(u.uNM, false, nmat(m)); gl.drawElements(gl.TRIANGLES, self.body.n, gl.UNSIGNED_SHORT, 0); });
    this.bind(this.tile);
    gl.uniform1f(u.uRough, Tt.rough); gl.uniform1f(u.uF0, Tt.f0); gl.uniform1f(u.uCoat, Tt.coat); gl.uniform1f(u.uCoatRough, Tt.coatRough); gl.uniform1f(u.uGain, gain);
    for (var i = 0; i < md.n; i++) {
      var m = mul(models[md.slots[i].c], md.local[i]);
      gl.uniform3f(u.uAlbedo, cols[i * 3], cols[i * 3 + 1], cols[i * 3 + 2]);
      gl.uniformMatrix4fv(u.uModel, false, m); gl.uniformMatrix3fv(u.uNM, false, nmat(m)); gl.drawElements(gl.TRIANGLES, this.tile.n, gl.UNSIGNED_SHORT, 0);
    }
    gl.disableVertexAttribArray(this.aNor);
    if (scene.glass) this.drawGlass(scene, cube, VP, LT);
  };
  Renderer.prototype.drawGlass = function (scene, cube, VP, LT) {
    var gl = this.gl, ps = scene.glass, t = scene.glassT, n = ps.length, data = this.glassData;
    if (data.length !== n * 42) data = this.glassData = new Float32Array(n * 42);
    var cnt = 0, keyDir = LT.keyDir;
    for (var i = 0; i < n; i++) {
      var p = ps[i], g = glassAt(p, t); if (g.fade <= 0) continue;
      var S = GLASS_SIDES[p.side], r = rot(p.axis, g.angle), uu = apply3(cube, apply3(r, S[2])), vv = apply3(cube, apply3(r, S[1])), nn = norm(apply3(cube, apply3(r, S[0])));
      var c = applyP(cube, g.pos), hs = p.size / 2;
      var view = norm([EYE[0] - c[0], EYE[1] - c[1], EYE[2] - c[2]]), facing = Math.abs(nn[0] * view[0] + nn[1] * view[1] + nn[2] * view[2]);
      var refl = Math.max(0, 2 * (nn[0] * keyDir[0] + nn[1] * keyDir[1] + nn[2] * keyDir[2]) * (nn[0] * view[0] + nn[1] * view[1] + nn[2] * view[2]) - (keyDir[0] * view[0] + keyDir[1] * view[1] + keyDir[2] * view[2]));
      var col = hexRgb(COLORS[GLASS_FACES[p.side]]), shd = 0.55 + 0.45 * facing, gl2 = Math.pow(refl, 24) * 0.6, a = p.alpha * g.fade;
      var rr = Math.min(1, col[0] * shd + gl2) * a, gg = Math.min(1, col[1] * shd + gl2) * a, bb = Math.min(1, col[2] * shd + gl2) * a;
      var corners = [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]];
      for (var k = 0; k < 6; k++) {
        var o = cnt * 7, a1 = corners[k][0] * hs, b1 = corners[k][1] * hs;
        data[o] = c[0] + uu[0] * a1 + vv[0] * b1; data[o + 1] = c[1] + uu[1] * a1 + vv[1] * b1; data[o + 2] = c[2] + uu[2] * a1 + vv[2] * b1;
        data[o + 3] = rr; data[o + 4] = gg; data[o + 5] = bb; data[o + 6] = a; cnt++;
      }
    }
    if (!cnt) return;
    gl.useProgram(this.gp); gl.uniformMatrix4fv(this.gu.uVP, false, VP);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glassBuf); gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, cnt * 7), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.gaPos); gl.vertexAttribPointer(this.gaPos, 3, gl.FLOAT, false, 28, 0);
    gl.enableVertexAttribArray(this.gaCol); gl.vertexAttribPointer(this.gaCol, 4, gl.FLOAT, false, 28, 12);
    gl.disable(gl.CULL_FACE); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
    gl.drawArrays(gl.TRIANGLES, 0, cnt);
    gl.depthMask(true); gl.disable(gl.BLEND); gl.disableVertexAttribArray(this.gaCol);
  };

  G.KubeloCube = {
    Renderer: Renderer, Story: Story, model: model, outline: outline, ALG: ALG, SYMBOL: SYMBOL, COLORS: COLORS, SIZES: SIZES,
    MOODS: MOODS, parseAlg: parseAlg, version: 'r19'
  };
})(typeof window !== 'undefined' ? window : self);
