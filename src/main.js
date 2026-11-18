import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DAYS } from "./data/days.js";

gsap.registerPlugin(ScrollTrigger);

const $ = (s, r) => (r || document).querySelector(s);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/* Headline chips */
(function buildHeadline() {
  const h = $("#headline");
  if (!h) return;
  const r = seeded(7);
  const cols = [
    ["#ee6a14", "#fff"],
    ["#19b3a0", "#10201e"],
    ["#f6b81c", "#1a1612"],
    ["#d8322b", "#fff"],
    ["#1a1612", "#f7f1e3"]
  ];
  let n = 0;

  ["Debugg and", "Slay Week"].forEach((line) => {
    const l = document.createElement("span");
    l.className = "line";
    l.setAttribute("aria-hidden", "true");
    line.split(" ").forEach((w) => {
      const wd = document.createElement("span");
      wd.className = "word";
      w.split("").forEach((ch) => {
        const c = cols[n++ % cols.length];
        const s = document.createElement("span");
        s.className = "chip c" + (1 + Math.floor(r() * 3));
        s.textContent = ch;
        s.style.setProperty("--bg", c[0]);
        s.style.setProperty("--fg", c[1]);
        s.style.setProperty("--r", (r() * 10 - 5).toFixed(1) + "deg");
        s.style.setProperty("--y", (r() * 8 - 4).toFixed(1) + "px");
        wd.appendChild(s);
      });
      l.appendChild(wd);
    });
    h.appendChild(l);
  });
})();

/* Nav & Day Slides */
const nav = $("#nav");
const main = $("#main");

function addTab(id, label) {
  const a = document.createElement("a");
  a.href = "#" + id;
  a.textContent = label;
  a.dataset.id = id;
  nav.appendChild(a);
}

addTab("intro", "INTRO");

DAYS.filter((d) => d.ready).forEach((d) => {
  addTab(d.id, d.tab);
  const sec = document.createElement("section");
  sec.className = "day";
  sec.id = d.id;
  sec.dataset.side = d.side;

  const ids = Array.from(new Set(d.rows.wide.flat()));
  const imgs = ids
    .map((n, idx) => {
      const url = `${d.dir}/${n}.webp`;
      return `<div class="stk" data-n="${n}" style="--img:url(&quot;${url}&quot;)"><div class="stk-drag"><img src="${url}" alt="${d.tab} outfit inspiration sticker ${idx + 1} of ${ids.length}" draggable="false"><i class="shine"></i></div></div>`;
    })
    .join("");

  sec.innerHTML =
    `<div class="stage">` +
    `<div class="note" style="--tilt:${d.tilt}deg"><img src="/note.png" alt="" width="818" height="607"><div class="note-text">` +
    `<p class="day-kicker">${d.kicker}</p><h2 class="title ${d.font}">${d.title}</h2><p class="day-desc">${d.text}</p></div></div>` +
    `<div class="board">${imgs}</div></div>`;
  main.appendChild(sec);
});

/* Active nav pill tracking */
const links = Array.from(nav.querySelectorAll("a"));
function setActive(id) {
  links.forEach((a) => a.setAttribute("aria-current", a.dataset.id === id ? "true" : "false"));
}
setActive("intro");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("main > section").forEach((s) => io.observe(s));
}

/* Tight scrapbook overlap layout (zero spacing gaps) */
function layout(sec, d, mode) {
  const board = $(".board", sec);
  const stks = {};
  const nat = {};
  board.querySelectorAll(".stk").forEach((el) => {
    stks[el.dataset.n] = el;
    const im = el.querySelector("img");
    nat[el.dataset.n] = im.naturalWidth && im.naturalHeight ? im.naturalWidth / im.naturalHeight : 0.65;
  });

  const aspect = mode === "wide" ? 1.4 : 0.8;
  const rows = d.rows[mode];
  const R = rows.length;
  const rowH = mode === "wide" ? [60, 66] : [48, 48, 48];
  const rnd = seeded(d.id.charCodeAt(0) * 31 + d.id.charCodeAt(1));
  const boxes = [];

  rows.forEach((row, ri) => {
    const H = rowH[ri];
    const hs = row.map((n) => H * (n === d.center ? 1.08 : 1));
    const ws = row.map((n, i) => (nat[n] * hs[i]) / aspect);
    const sum = ws.reduce((a, b) => a + b, 0);
    const avgW = sum / Math.max(1, row.length);
    const minOverlap = avgW * 0.22;
    const fitOverlap = row.length > 1 ? (sum - 100) / (row.length - 1) : 0;
    const o = row.length > 1 ? Math.max(minOverlap, fitOverlap) : 0;
    const totalSpan = Math.min(100, sum - o * Math.max(0, row.length - 1));
    const rowTop = (ri * (100 - rowH[R - 1])) / Math.max(1, R - 1);
    let x = Math.max(0, (100 - totalSpan) / 2);

    row.forEach((n, i) => {
      const el = stks[n];
      if (!el) return;
      const h = hs[i];
      const w = ws[i];
      const left = Math.max(0, Math.min(100 - w, x));
      x += w - o;
      const yJitter = n === d.center ? 0 : rnd() * 3.6 - 1.8;
      const top = Math.max(0, Math.min(100 - h, rowTop + (H - h) / 2 + yJitter));
      const rot = n === d.center ? rnd() * 3 - 1.5 : rnd() * 9 - 4.5;

      el.style.left = left.toFixed(2) + "%";
      el.style.top = top.toFixed(2) + "%";
      el.style.height = h.toFixed(2) + "%";
      el.style.zIndex = String(ri * 10 + (n === d.center ? 6 : i % 5));
      el.dataset.rot = rot.toFixed(2);
      el.style.transform = `rotate(${rot.toFixed(2)}deg)`;
      boxes.push({ n, el, l: left, t: top, w, h });
    });
  });

  return boxes;
}

/* Interactive drag, hover lift, shine & z-index focus */
function wireInteractions(sec) {
  const board = $(".board", sec);
  let topZ = 50;
  let active = null;

  board.querySelectorAll(".stk").forEach((el, idx) => {
    const wrap = $(".stk-drag", el);
    const shine = $(".shine", el);
    const pos = { x: 0, y: 0 };

    el.addEventListener("pointerenter", () => {
      if (active) return;
      gsap.to(wrap, { scale: 1.07, rotation: idx % 2 === 0 ? -3.2 : 3.2, duration: 0.2, ease: "back.out(2.2)", overwrite: "auto" });
      gsap.to(el, { "--sh": 14, duration: 0.2, ease: "power2.out" });
      gsap.fromTo(shine, { "--sx": 130 }, { "--sx": -30, duration: 0.55, ease: "power1.inOut", overwrite: "auto" });
    });

    el.addEventListener("pointerleave", () => {
      if (active && active.el === el) return;
      gsap.to(wrap, { scale: 1, rotation: 0, duration: 0.24, ease: "power2.out", overwrite: "auto" });
      gsap.to(el, { "--sh": 5, duration: 0.24, ease: "power2.out" });
    });

    el.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      el.setPointerCapture(e.pointerId);
      el.style.zIndex = String(++topZ);
      el.classList.add("is-dragging");
      active = { el, id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, lx: e.clientX };
      gsap.to(wrap, { scale: 1.1, duration: 0.16, ease: "back.out(2)", overwrite: "auto" });
      gsap.to(el, { "--sh": 22, duration: 0.16, ease: "power2.out" });
    });

    el.addEventListener("pointermove", (e) => {
      if (!active || active.el !== el || active.id !== e.pointerId) return;
      const mx = board.offsetWidth * 0.45;
      const my = board.offsetHeight * 0.45;
      pos.x = Math.max(-mx, Math.min(mx, active.ox + (e.clientX - active.sx)));
      pos.y = Math.max(-my, Math.min(my, active.oy + (e.clientY - active.sy)));
      const vx = Math.max(-10, Math.min(10, (e.clientX - active.lx) * 0.45));
      active.lx = e.clientX;
      gsap.set(wrap, { x: pos.x, y: pos.y });
      gsap.to(wrap, { rotation: vx, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    });

    const endDrag = (e) => {
      if (!active || active.el !== el || active.id !== e.pointerId) return;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.classList.remove("is-dragging");
      active = null;
      gsap.to(wrap, { scale: 1, rotation: 0, duration: 0.35, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
      gsap.to(el, { "--sh": 5, duration: 0.25, ease: "power2.out" });
    };

    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
  });
}

function buildTimeline(sec, d, boxes) {
  const side = d.side === "right" ? 1 : -1;
  const board = $(".board", sec);
  const note = $(".note", sec);
  const tl = gsap.timeline({ paused: true, defaults: { overwrite: false } });

  tl.fromTo(
    note,
    { x: () => -side * Math.min(window.innerWidth * 0.45, 520), rotation: d.tilt + side * -14, autoAlpha: 0 },
    { x: 0, rotation: d.tilt, autoAlpha: 1, duration: 0.8, ease: "elastic.out(1,0.65)" },
    0
  );

  const order = boxes.slice().sort((a, b) => (a.n === d.center) - (b.n === d.center) || Number(a.el.style.zIndex) - Number(b.el.style.zIndex));
  order.forEach((b, i) => {
    const t = 0.25 + i * 0.1;
    const el = b.el;
    const rot = parseFloat(el.dataset.rot || "0");
    const big = b.n === d.center;
    const shine = $(".shine", el);

    tl.fromTo(
      el,
      {
        x: () => side * board.offsetWidth * 0.95,
        y: () => (i % 2 ? -1 : 1) * board.offsetHeight * 0.18,
        rotation: rot + side * (28 + (i % 3) * 6),
        scale: 1.45,
        autoAlpha: 0
      },
      { x: 0, y: 0, rotation: rot, scale: 1, autoAlpha: 1, duration: 0.55, ease: big ? "back.out(2.4)" : "back.out(1.6)", immediateRender: true },
      t
    );
    tl.fromTo(el, { "--sh": 28 }, { "--sh": 5, duration: 0.5, ease: "power2.in", immediateRender: false }, t + 0.1);
    tl.to(el, { scaleX: 1.04, scaleY: 0.93, transformOrigin: "50% 100%", duration: 0.07, ease: "power1.out" }, t + 0.52);
    tl.to(el, { scaleX: 1, scaleY: 1, duration: 0.18, ease: "elastic.out(1,0.5)" }, t + 0.59);
    tl.fromTo(shine, { "--sx": 130 }, { "--sx": -30, duration: 0.55, ease: "power1.inOut", immediateRender: false }, t + 0.55);

    order
      .slice(0, i)
      .filter((p) => p.l < b.l + b.w && p.l + p.w > b.l && p.t < b.t + b.h && p.t + p.h > b.t)
      .slice(-2)
      .forEach((p) => {
        tl.fromTo(p.el, { xPercent: 0 }, { xPercent: side * 2.2, duration: 0.07, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t + 0.54);
      });
  });

  return tl;
}

function init() {
  const mm = gsap.matchMedia();
  DAYS.filter((d) => d.ready).forEach((d) => {
    const sec = document.getElementById(d.id);
    if (!sec) return;
    wireInteractions(sec);

    function run(mode) {
      const boxes = layout(sec, d, mode);
      if (reduce) return;
      const tl = buildTimeline(sec, d, boxes);
      let played = false;
      const playOnce = () => {
        if (played) return;
        played = true;
        tl.play();
      };
      const st = ScrollTrigger.create({ trigger: sec, start: "top 68%", once: true, onEnter: playOnce });
      if (sec.getBoundingClientRect().top < window.innerHeight * 0.72) playOnce();
      links.forEach((a) => {
        if (a.dataset.id === d.id) a.addEventListener("click", playOnce);
      });
      return () => {
        st.kill();
        tl.kill();
      };
    }

    mm.add("(min-width: 900px)", () => run("wide"));
    mm.add("(max-width: 899px)", () => run("tall"));
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

const pending = Array.from(document.images).filter((i) => !i.complete);
Promise.all(pending.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))).then(init);