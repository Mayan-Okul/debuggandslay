(function () {
  var DAYS = window.DAYS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function seeded(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; }

  /* headline chips */
  (function () {
    var h = $("#headline"), r = seeded(7);
    var cols = [["#ee6a14", "#fff"], ["#19b3a0", "#10201e"], ["#f6b81c", "#1a1612"], ["#d8322b", "#fff"], ["#1a1612", "#f7f1e3"]];
    var n = 0;
    ["Debugg and", "Slay Week"].forEach(function (line) {
      var l = document.createElement("span"); l.className = "line"; l.setAttribute("aria-hidden", "true");
      line.split(" ").forEach(function (w) {
        var wd = document.createElement("span"); wd.className = "word";
        w.split("").forEach(function (ch) {
          var c = cols[n++ % cols.length], s = document.createElement("span");
          s.className = "chip c" + (1 + Math.floor(r() * 3)); s.textContent = ch;
          s.style.setProperty("--bg", c[0]); s.style.setProperty("--fg", c[1]);
          s.style.setProperty("--r", (r() * 10 - 5).toFixed(1) + "deg");
          s.style.setProperty("--y", (r() * 8 - 4).toFixed(1) + "px");
          wd.appendChild(s);
        });
        l.appendChild(wd);
      });
      h.appendChild(l);
    });
  })();

  /* nav */
  var nav = $("#nav");
  function tab(id, label) {
    var a = document.createElement("a");
    a.href = "#" + id; a.textContent = label; a.dataset.id = id;
    nav.appendChild(a);
  }
  tab("intro", "INTRO");

  /* day slides */
  var main = $("#main");
  DAYS.filter(function (d) { return d.ready; }).forEach(function (d) {
    tab(d.id, d.tab);
    var sec = document.createElement("section");
    sec.className = "day"; sec.id = d.id; sec.dataset.side = d.side;

    var ids = [];
    d.rows.wide.forEach(function (row) {
      row.forEach(function (id) { if (ids.indexOf(id) === -1) ids.push(id); });
    });

    var imgs = "";
    ids.forEach(function (n, idx) {
      var url = d.dir + "/" + n + ".webp";
      imgs += '<div class="stk" data-n="' + n + '" style="--img:url(&quot;' + new URL(url, document.baseURI).href + '&quot;)"><div class="stk-drag"><img src="' + url + '" alt="' + d.tab + ' outfit inspiration sticker ' + (idx + 1) + ' of ' + ids.length + '" draggable="false"><i class="shine"></i></div></div>';
    });

    sec.innerHTML =
      '<div class="stage">' +
      '<div class="note" style="--tilt:' + d.tilt + 'deg"><img src="img/note.png" alt="" width="818" height="607"><div class="note-text">' +
      '<p class="kicker">' + d.kicker + '</p><h2 class="title ' + d.font + '">' + d.title + '</h2><p class="day-desc">' + d.text + '</p></div></div>' +
      '<div class="board">' + imgs + '</div></div>';
    main.insertBefore(sec, null);
  });

  /* active tab */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  function setActive(id) { links.forEach(function (a) { a.setAttribute("aria-current", a.dataset.id === id ? "true" : "false"); }); }
  setActive("intro");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.5 });
    document.querySelectorAll("main > section").forEach(function (s) { io.observe(s); });
  }

  /* scrapbook board layout: overlapping collage cluster, zero spacing gaps */
  function layout(sec, d, mode) {
    var board = $(".board", sec), stks = {}, nat = {};
    board.querySelectorAll(".stk").forEach(function (el) {
      stks[el.dataset.n] = el;
      var im = el.querySelector("img");
      nat[el.dataset.n] = (im.naturalWidth && im.naturalHeight) ? im.naturalWidth / im.naturalHeight : 0.65;
    });
    var aspect = mode === "wide" ? 1.4 : 0.8, rows = d.rows[mode], R = rows.length;
    var rowH = mode === "wide" ? [60, 66] : [48, 48, 48];
    var rnd = seeded(d.id.charCodeAt(0) * 31 + d.id.charCodeAt(1)), boxes = [];

    rows.forEach(function (row, ri) {
      var H = rowH[ri];
      var hs = row.map(function (n) { return H * (n === d.center ? 1.08 : 1); });
      var ws = row.map(function (n, i) { return nat[n] * hs[i] / aspect; });
      var sum = ws.reduce(function (a, b) { return a + b; }, 0);
      var avgW = sum / Math.max(1, row.length);
      var minOverlap = avgW * 0.22;
      var fitOverlap = row.length > 1 ? (sum - 100) / (row.length - 1) : 0;
      var o = row.length > 1 ? Math.max(minOverlap, fitOverlap) : 0;
      var totalSpan = Math.min(100, sum - o * Math.max(0, row.length - 1));
      var rowTop = ri * (100 - rowH[R - 1]) / Math.max(1, R - 1);
      var x = Math.max(0, (100 - totalSpan) / 2);

      row.forEach(function (n, i) {
        var h = hs[i], w = ws[i];
        var left = Math.max(0, Math.min(100 - w, x));
        x += w - o;
        var yJitter = n === d.center ? 0 : (rnd() * 3.6 - 1.8);
        var top = Math.max(0, Math.min(100 - h, rowTop + (H - h) / 2 + yJitter));
        var rot = n === d.center ? (rnd() * 3 - 1.5) : (rnd() * 9 - 4.5);
        var el = stks[n];
        el.style.left = left.toFixed(2) + "%"; el.style.top = top.toFixed(2) + "%"; el.style.height = h.toFixed(2) + "%";
        el.style.zIndex = ri * 10 + (n === d.center ? 6 : i % 5);
        el.dataset.rot = rot.toFixed(2);
        el.style.transform = "rotate(" + rot.toFixed(2) + "deg)";
        boxes.push({ n: n, el: el, l: left, t: top, w: w, h: h });
      });
    });
    return boxes;
  }

  /* interactive drag, hover lift, shine & z-index focus */
  function wireInteractions(sec) {
    var board = $(".board", sec), topZ = 50, active = null;
    board.querySelectorAll(".stk").forEach(function (el, idx) {
      var wrap = $(".stk-drag", el), shine = $(".shine", el), pos = { x: 0, y: 0 };
      el.addEventListener("pointerenter", function () {
        if (active) return;
        gsap.to(wrap, { scale: 1.07, rotation: idx % 2 === 0 ? -3.2 : 3.2, duration: 0.2, ease: "back.out(2.2)", overwrite: "auto" });
        gsap.to(el, { "--sh": 14, duration: 0.2, ease: "power2.out" });
        gsap.fromTo(shine, { "--sx": 130 }, { "--sx": -30, duration: 0.55, ease: "power1.inOut", overwrite: "auto" });
      });
      el.addEventListener("pointerleave", function () {
        if (active && active.el === el) return;
        gsap.to(wrap, { scale: 1, rotation: 0, duration: 0.24, ease: "power2.out", overwrite: "auto" });
        gsap.to(el, { "--sh": 5, duration: 0.24, ease: "power2.out" });
      });
      el.addEventListener("pointerdown", function (e) {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = ++topZ;
        el.classList.add("is-dragging");
        active = { el: el, wrap: wrap, id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, lx: e.clientX, pos: pos };
        gsap.to(wrap, { scale: 1.1, duration: 0.16, ease: "back.out(2)", overwrite: "auto" });
        gsap.to(el, { "--sh": 22, duration: 0.16, ease: "power2.out" });
      });
      el.addEventListener("pointermove", function (e) {
        if (!active || active.el !== el || active.id !== e.pointerId) return;
        var mx = board.offsetWidth * 0.45, my = board.offsetHeight * 0.45;
        pos.x = Math.max(-mx, Math.min(mx, active.ox + (e.clientX - active.sx)));
        pos.y = Math.max(-my, Math.min(my, active.oy + (e.clientY - active.sy)));
        var vx = Math.max(-10, Math.min(10, (e.clientX - active.lx) * 0.45));
        active.lx = e.clientX;
        gsap.set(wrap, { x: pos.x, y: pos.y });
        gsap.to(wrap, { rotation: vx, duration: 0.15, ease: "power2.out", overwrite: "auto" });
      });
      function end(e) {
        if (!active || active.el !== el || active.id !== e.pointerId) return;
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        el.classList.remove("is-dragging");
        active = null;
        gsap.to(wrap, { scale: 1, rotation: 0, duration: 0.35, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
        gsap.to(el, { "--sh": 5, duration: 0.25, ease: "power2.out" });
      }
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    });
  }

  function buildTimeline(sec, d, boxes) {
    var side = d.side === "right" ? 1 : -1, board = $(".board", sec), note = $(".note", sec);
    var tl = gsap.timeline({ paused: true, defaults: { overwrite: false } });
    tl.fromTo(note, { x: function () { return -side * Math.min(window.innerWidth * 0.45, 520); }, rotation: d.tilt + side * -14, autoAlpha: 0 },
      { x: 0, rotation: d.tilt, autoAlpha: 1, duration: 0.8, ease: "elastic.out(1,0.65)" }, 0);
    var order = boxes.slice().sort(function (a, b) { return (a.n === d.center) - (b.n === d.center) || a.el.style.zIndex - b.el.style.zIndex; });
    order.forEach(function (b, i) {
      var t = 0.25 + i * 0.1, el = b.el, rot = parseFloat(el.dataset.rot), big = b.n === d.center, shine = $(".shine", el);
      tl.fromTo(el,
        { x: function () { return side * board.offsetWidth * 0.95; }, y: function () { return (i % 2 ? -1 : 1) * board.offsetHeight * 0.18; }, rotation: rot + side * (28 + (i % 3) * 6), scale: 1.45, autoAlpha: 0 },
        { x: 0, y: 0, rotation: rot, scale: 1, autoAlpha: 1, duration: 0.55, ease: big ? "back.out(2.4)" : "back.out(1.6)", immediateRender: true }, t);
      tl.fromTo(el, { "--sh": 28 }, { "--sh": 5, duration: 0.5, ease: "power2.in", immediateRender: false }, t + 0.1);
      tl.to(el, { scaleX: 1.04, scaleY: 0.93, transformOrigin: "50% 100%", duration: 0.07, ease: "power1.out" }, t + 0.52);
      tl.to(el, { scaleX: 1, scaleY: 1, duration: 0.18, ease: "elastic.out(1,0.5)" }, t + 0.59);
      tl.fromTo(shine, { "--sx": 130 }, { "--sx": -30, duration: 0.55, ease: "power1.inOut", immediateRender: false }, t + 0.55);
      order.slice(0, i).filter(function (p) { return p.l < b.l + b.w && p.l + p.w > b.l && p.t < b.t + b.h && p.t + p.h > b.t; }).slice(-2).forEach(function (p) {
        tl.fromTo(p.el, { xPercent: 0 }, { xPercent: side * 2.2, duration: 0.07, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t + 0.54);
      });
    });
    return tl;
  }

  function init() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    var mm = gsap.matchMedia();
    DAYS.filter(function (d) { return d.ready; }).forEach(function (d) {
      var sec = document.getElementById(d.id);
      wireInteractions(sec);
      function run(mode) {
        var boxes = layout(sec, d, mode);
        if (reduce) return;
        var tl = buildTimeline(sec, d, boxes);
        var st = ScrollTrigger.create({
          trigger: sec, start: "top 68%", once: true,
          onEnter: function () { tl.play(); }
        });
        if (sec.getBoundingClientRect().top < window.innerHeight * 0.72) tl.play();
        return function () { st.kill(); tl.kill(); };
      }
      mm.add("(min-width: 900px)", function () { return run("wide"); });
      mm.add("(max-width: 899px)", function () { return run("tall"); });
    });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }

  var pending = Array.prototype.slice.call(document.images).filter(function (i) { return !i.complete; });
  Promise.all(pending.map(function (i) { return new Promise(function (r) { i.onload = i.onerror = r; }); })).then(init);
})();
