// Main entry point for Debugg and Slay Week
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { days, closing } from './data/days.js';

gsap.registerPlugin(ScrollTrigger);

// State
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentSlide = 0;
let zoomSticker = null;

// DOM elements
const navBar = document.querySelector('.nav-bar');
const slidesContainer = document.querySelector('.slides-container');
const zoomBackdrop = document.querySelector('.zoom-backdrop');
const zoomContent = document.querySelector('.zoom-content');
const zoomClose = document.querySelector('.zoom-close');

// Initialize
function init() {
  buildNav();
  buildSlides();
  setupScrollTriggers();
  setupZoom();
  setupKeyboardNav();
  updateNavHighlight();
}

// Build navigation tabs
function buildNav() {
  const tabs = days.map((day, i) => `
    <button class="nav-tab" data-slide="${i}" aria-label="${day.label} ${day.date || ''}" aria-current="${i === 0 ? 'true' : 'false'}">
      <span class="day-num">${i + 1}</span>
      <span class="day-name">${day.label}</span>
    </button>
  `).join('');
  navBar.innerHTML = tabs;

  navBar.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.dataset.slide, 10);
      scrollToSlide(index);
    });
  });
}

// Build all slides
function buildSlides() {
  slidesContainer.innerHTML = days.map((day, i) => buildSlide(day, i)).join('') +
    buildClosing();

  // Set aspect ratios for stickers after they load
  document.querySelectorAll('.sticker').forEach(sticker => {
    const setAspectRatio = () => {
      if (sticker.naturalWidth && sticker.naturalHeight) {
        const ar = sticker.naturalWidth / sticker.naturalHeight;
        sticker.style.setProperty('--sticker-ar', ar.toFixed(3));
      }
    };
    if (sticker.complete) {
      setAspectRatio();
    } else {
      sticker.addEventListener('load', setAspectRatio, { once: true });
    }
    
    sticker.addEventListener('click', () => openZoom(sticker));
    sticker.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openZoom(sticker);
      }
    });
  });
}

// Build a single slide
function buildSlide(day, index) {
  const isMobile = window.innerWidth <= 640;
  const isTablet = window.innerWidth <= 1024;
  const breakpoint = isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop');

  // Theme folder mapping
  const themeFolders = {
    intro: '',
    mon: 'careerwear',
    tue: 'streetwear-y2k',
    wed: 'sportwear-jersey',
    thu: 'schoolwear',
    fri: 'culturalwear'
  };

  const stickersHtml = day.stickers.map((pos, i) => {
    const p = pos[breakpoint];
    const stickerNum = i + 1;
    const theme = themeFolders[day.id] || '';
    const src = theme ? `/stickers/${theme}/s${stickerNum.toString().padStart(2, '0')}.webp` : '';
    const alt = `Outfit inspiration, sticker ${stickerNum} of 9`;
    const isCenterpiece = i === 4; // 5th sticker (index 4) is centerpiece
    const centerpieceClass = isCenterpiece ? ' sticker--centerpiece' : '';
    // Aspect ratio will be set via inline style from the image's natural dimensions
    // We'll set it after the image loads, but for now use a default

    return `
      <img
        class="sticker${centerpieceClass}"
        src="${src}"
        alt="${alt}"
        loading="${index === 0 ? 'eager' : 'lazy'}"
        data-index="${i}"
        data-slide="${index}"
        style="
          --x: ${p.x}%;
          --y: ${p.y}%;
          --scale: ${p.scale};
          --rot: ${p.rot}deg;
          --z: ${p.z};
          --s: ${isCenterpiece ? '34%' : '22%'};
          left: var(--x);
          top: var(--y);
          transform: translate(-50%, -50%) scale(var(--scale)) rotate(var(--rot));
          z-index: var(--z);
          opacity: 0;
        "
      >
    `;
  }).join('');

  const decorHtml = day.decor.map((d, i) => buildDecor(d, breakpoint, i)).join('');

  const headlineHtml = buildHeadline(day, index);

  const detailsHtml = day.details ? day.details.map((d, i) =>
    `<div class="detail-label paper-strip" style="--delay: ${i * 0.1}s; opacity: 0;">${d}</div>`
  ).join('') : '';

  const perksHtml = day.perks ? day.perks.map((p, i) =>
    `<div class="perk-tag tag-label" style="--delay: ${i * 0.1}s; opacity: 0;">${p}</div>`
  ).join('') : '';

  const tagHtml = day.tag ? `<div class="detail-label paper-strip" style="opacity: 0;">${day.tag}</div>` : '';
  const tagsHtml = day.tags ? day.tags.map((t, i) =>
    `<div class="detail-label tag-label" style="--delay: ${i * 0.1}s; opacity: 0;">${t}</div>`
  ).join('') : '';

  const stampHtml = day.mandatory ? `<div class="stamp" style="opacity: 0;">MANDATORY</div>` : '';

  const hintHtml = day.hint ? `<div class="detail-label paper-strip" style="opacity: 0;">${day.hint}</div>` : '';

  const logoHtml = day.logo ? `
    <img class="sticker logo-sticker" src="/logo/zone01-kisumu-sticker.webp" alt="Zone01 Kisumu logo" loading="eager" style="opacity: 0;">
  ` : '';

  const subHeadlineHtml = day.subHeadline ? `<div class="headline__strip paper-strip">${day.subHeadline}</div>` : '';

  // Intro slide special structure
  let contentHtml = '';
  if (day.id === 'intro') {
    const mottoHtml = day.motto ? `<div class="motto-strip paper-strip cursor-blink" style="opacity: 0;">${day.motto}</div>` : '';
    const purposeHtml = day.purpose ? `<div class="detail-label paper-strip" style="opacity: 0;">${day.purpose}</div>` : '';
    const detailsGroupHtml = `
      <div class="details-group">
        ${detailsHtml}
        ${purposeHtml}
        ${perksHtml}
        ${stampHtml}
      </div>
    `;
    const hintStripHtml = day.hint ? `<div class="hint-strip paper-strip" style="opacity: 0;">${day.hint}</div>` : '';
    const afroStripsHtml = `
      <div class="afro-strip afro-strip--top" aria-hidden="true"></div>
      <div class="afro-strip afro-strip--bottom" aria-hidden="true"></div>
    `;
    contentHtml = `
      ${afroStripsHtml}
      ${headlineHtml}
      ${mottoHtml}
      ${detailsGroupHtml}
      ${hintStripHtml}
      ${logoHtml}
    `;
  } else {
    contentHtml = `
      ${decorHtml}
      ${headlineHtml}
      ${detailsHtml}
      ${perksHtml}
      ${tagHtml}
      ${tagsHtml}
      ${stampHtml}
      ${hintHtml}
      ${logoHtml}
      ${subHeadlineHtml}
    `;
  }

  return `
    <section class="slide ${day.className}" id="slide-${index}" data-slide="${index}" style="--font-display: ${day.fontDisplay};">
      <div class="slide__board">
        <div class="slide__cluster">
          ${stickersHtml}
        </div>
        ${contentHtml}
      </div>
    </section>
  `;
}

// Build decorative element
function buildDecor(decor, breakpoint, index) {
  const pos = decor[breakpoint];
  const style = `
    left: ${pos.x}%;
    top: ${pos.y}%;
    width: ${pos.w}%;
    height: ${pos.h}%;
    transform: translate(-50%, -50%) rotate(${pos.rot || 0}deg);
    opacity: 0;
  `;

  switch (decor.type) {
    case 'tape':
      return `<div class="decor decor--tape" style="${style}" aria-hidden="true">${decor.text || ''}</div>`;
    case 'star':
      return `<div class="decor decor--star" style="${style}" aria-hidden="true"></div>`;
    case 'flash':
      return `<div class="decor" style="${style}; background: radial-gradient(circle, #fff 0%, transparent 70%);" aria-hidden="true"></div>`;
    case 'vinyl':
      return `<div class="decor" style="${style}; background: conic-gradient(from 0deg, #111, #333, #111); border-radius: 50%;" aria-hidden="true"></div>`;
    case 'stamp':
      return `<div class="decor stamp" style="${style}">${decor.text}</div>`;
    case 'clip':
      return `<div class="decor" style="${style}; background: #C0C0C0; clip-path: polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%);" aria-hidden="true"></div>`;
    case 'note':
      return `<div class="decor" style="${style}; background: #F9F871; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); font-size: 8px; display: flex; align-items: center; justify-content: center; color: #111; font-weight: bold;">${decor.text}</div>`;
    case 'staple':
      return `<div class="decor" style="${style}; background: #111; clip-path: polygon(10% 0, 90% 0, 90% 100%, 50% 60%, 10% 100%);" aria-hidden="true"></div>`;
    case 'number':
      return `<div class="decor" style="${style}; background: var(--palette-4); color: #fff; font-family: var(--font-display); font-size: clamp(1rem, 3vw, 2rem); font-weight: bold; display: flex; align-items: center; justify-content: center; clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);">${decor.text}</div>`;
    case 'stripe':
      return `<div class="decor" style="${style}; background: repeating-linear-gradient(90deg, var(--palette-1), var(--palette-1) 8px, transparent 8px, transparent 16px);" aria-hidden="true"></div>`;
    case 'pennant':
      return `<div class="decor" style="${style}; background: var(--palette-2); clip-path: polygon(50% 0, 100% 100%, 0 100%);" aria-hidden="true"></div>`;
    case 'light':
      return `<div class="decor" style="${style}; background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);" aria-hidden="true"></div>`;
    case 'ticket':
      return `<div class="decor" style="${style}; background: var(--palette-4); color: #fff; font-size: 6px; display: flex; align-items: center; justify-content: center; clip-path: polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%);">${decor.text || 'ADMIT ONE'}</div>`;
    case 'speed':
      return `<div class="decor" style="${style}; background: repeating-linear-gradient(90deg, var(--palette-4), var(--palette-4) 4px, transparent 4px, transparent 8px); clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 70%);" aria-hidden="true"></div>`;
    case 'ruled':
      return `<div class="decor" style="${style}; background: repeating-linear-gradient(to bottom, transparent, transparent 90%, var(--palette-4) 90%, var(--palette-4) 100%); background-size: 100% 12px;" aria-hidden="true"></div>`;
    case 'plaid':
      return `<div class="decor" style="${style}; background: repeating-linear-gradient(0deg, transparent, transparent 6px, var(--palette-3) 6px, var(--palette-3) 12px), repeating-linear-gradient(90deg, transparent, transparent 6px, var(--palette-3) 6px, var(--palette-3) 12px);" aria-hidden="true"></div>`;
    case 'pencil':
      return `<div class="decor" style="${style}; background: linear-gradient(to bottom, #F2C230 0%, #F2C230 80%, #D2691E 80%, #D2691E 90%, #111 90%); clip-path: polygon(50% 0, 100% 10%, 100% 90%, 50% 100%, 0 90%, 0 10%);" aria-hidden="true"></div>`;
    case 'label':
      return `<div class="decor" style="${style}; background: var(--palette-1); color: #fff; font-size: 6px; display: flex; align-items: center; justify-content: center; clip-path: polygon(0 15%, 10% 0, 90% 0, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0 85%);">${decor.text}</div>`;
    case 'afro-strip':
      return `<div class="decor" style="${style}; background-image: url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z' fill='%23EE6A14' fill-opacity='0.5'/%3E%3Cpath d='M15 15h30v30H15V15zm15 15h15v15H30V30z' fill='%2319B3A0' fill-opacity='0.5'/%3E%3C/svg%3E\");" aria-hidden="true"></div>`;
    case 'drum':
      return `<div class="decor" style="${style}; background: var(--palette-1); border: 3px solid var(--palette-2); border-radius: 50% 50% 10% 10%; box-shadow: inset 0 -4px 0 var(--palette-2);" aria-hidden="true"></div>`;
    case 'spotlight':
      return `<div class="decor" style="${style}; background: radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%);" aria-hidden="true"></div>`;
    case 'confetti':
      return `<div class="decor" style="${style}; background: conic-gradient(from 0deg, var(--palette-4), var(--palette-2), var(--palette-5), var(--palette-1), var(--palette-3)); clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);" aria-hidden="true"></div>`;
    case 'snack':
      return `<div class="decor" style="${style}; background: var(--palette-2); border-radius: 50%; box-shadow: inset 0 -2px 0 var(--palette-1);" aria-hidden="true"></div>`;
    case 'tag':
      return `<div class="decor tag-label" style="${style}">${decor.text}</div>`;
    default:
      return '';
  }
}

// Build headline with letter chips
function buildHeadline(day, index) {
  const words = day.headline.split('\n');
  let html = '<div class="headline" style="opacity: 0;">';

  words.forEach((word, wi) => {
    const letters = word.split('');
    html += '<div class="headline__word" style="display: inline-block; margin: 2px;">';
    letters.forEach((letter, li) => {
      const chipClass = (wi * word.length + li) % 3 === 0 ? 'tape' : '';
      const colorIndex = (wi * word.length + li) % 5 + 1;
      html += `<span class="paper-chip headline__chip ${chipClass}" style="--delay: ${(wi * word.length + li) * 0.05}s; opacity: 0; background: var(--palette-${colorIndex}); color: ${colorIndex === 2 || colorIndex === 4 ? 'var(--color-ink)' : '#fff'};">${letter === ' ' ? '&nbsp;' : letter}</span>`;
    });
    html += '</div>';
    if (wi < words.length - 1) html += '<br>';
  });

  html += '</div>';
  return html;
}

// Build closing strip
function buildClosing() {
  return `
    <footer class="closing slide--fri">
      <div class="closing__text">${closing.text}</div>
      <div class="closing__dates">${closing.dates}</div>
      <div class="closing__dress">${closing.dress}</div>
      ${closing.logo ? '<img class="closing__logo" src="/logo/zone01-kisumu-sticker.webp" alt="Zone01 Kisumu logo" loading="lazy">' : ''}
    </footer>
  `;
}

// Setup ScrollTrigger animations
function setupScrollTriggers() {
  if (prefersReducedMotion) {
    // Show everything immediately
    document.querySelectorAll('.sticker, .decor, .headline__chip, .detail-label, .perk-tag, .stamp, .logo-sticker, .headline__strip').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = el.style.transform.replace('scale(0)', 'scale(1)');
    });
    return;
  }

  days.forEach((day, index) => {
    const slideEl = document.getElementById(`slide-${index}`);
    if (!slideEl) return;

    const board = slideEl.querySelector('.slide__board');
    const pinLength = day.pinLength || { mobile: '140%', desktop: '220%' };

    ScrollTrigger.create({
      trigger: slideEl,
      start: 'top top',
      end: `+=${window.innerWidth <= 640 ? pinLength.mobile : pinLength.desktop}`,
      pin: board,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        animateSlideElements(slideEl, self.progress);
      }
    });
  });
}

// Animate slide elements based on scroll progress
function animateSlideElements(slideEl, progress) {
  const stickers = slideEl.querySelectorAll('.sticker:not(.logo-sticker)');
  const decor = slideEl.querySelectorAll('.decor');
  const chips = slideEl.querySelectorAll('.headline__chip');
  const strips = slideEl.querySelectorAll('.headline__strip');
  const labels = slideEl.querySelectorAll('.detail-label, .perk-tag, .stamp, .logo-sticker');

  // Phase 1: Headline chips drop in (0 - 0.25)
  const chipPhase = Math.min(progress / 0.25, 1);
  chips.forEach((chip, i) => {
    const delay = parseFloat(chip.style.getPropertyValue('--delay')) || i * 0.05;
    const localProgress = Math.max(0, Math.min(1, (chipPhase - delay) / (1 - delay)));
    if (localProgress > 0) {
      const eased = easeOutBack(localProgress);
      chip.style.opacity = eased;
      chip.style.transform = `translateY(${(1 - eased) * -100}px) rotate(${chip.style.getPropertyValue('--rot') || '0deg'})`;
    }
  });

  // Phase 2: Stickers fly in (0.2 - 0.8)
  const stickerPhase = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));
  stickers.forEach((sticker, i) => {
    const staggerDelay = i * 0.06;
    const localProgress = Math.max(0, Math.min(1, (stickerPhase - staggerDelay) / (1 - staggerDelay)));
    if (localProgress > 0) {
      const eased = easeOutBack(localProgress);
      const startX = i % 2 === 0 ? -150 : 150;
      const startY = -100;
      const startRot = (Math.random() - 0.5) * 80;
      const startScale = 1.5;
      const targetX = 0;
      const targetY = 0;
      const targetRot = 0;
      const targetScale = 1;

      const tx = startX + (targetX - startX) * eased;
      const ty = startY + (targetY - startY) * eased;
      const tr = startRot + (targetRot - startRot) * eased;
      const ts = startScale + (targetScale - startScale) * eased;

      sticker.style.opacity = eased;
      sticker.style.transform = `translate(calc(var(--x) - 50% + ${tx}%), calc(var(--y) - 50% + ${ty}%)) scale(${ts}) rotate(${tr}deg)`;

      // Shadow tightens
      const shadowBlur = 24 - eased * 16;
      const shadowY = 16 - eased * 12;
      sticker.style.filter = `drop-shadow(0 ${shadowY}px ${shadowBlur}px var(--color-shadow)) drop-shadow(0 ${shadowY / 2}px ${shadowBlur / 2}px var(--color-shadow))`;
    }
  });

  // Phase 3: Decor lands (0.5 - 1)
  const decorPhase = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));
  decor.forEach((d, i) => {
    const staggerDelay = i * 0.03;
    const localProgress = Math.max(0, Math.min(1, (decorPhase - staggerDelay) / (1 - staggerDelay)));
    if (localProgress > 0) {
      const eased = easeOutBack(localProgress);
      d.style.opacity = eased;
      d.style.transform = `translate(-50%, -50%) rotate(${d.style.getPropertyValue('--rot') || '0deg'}) scale(${eased})`;
    }
  });

  // Phase 4: Labels/tags (0.6 - 1)
  const labelPhase = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));
  labels.forEach((label, i) => {
    const delay = parseFloat(label.style.getPropertyValue('--delay')) || i * 0.05;
    const localProgress = Math.max(0, Math.min(1, (labelPhase - delay) / (1 - delay)));
    if (localProgress > 0) {
      const eased = easeOut(localProgress);
      label.style.opacity = eased;
      label.style.transform = `translateY(${(1 - eased) * 30}px)`;
    }
  });

  // Strips
  strips.forEach((strip, i) => {
    const delay = i * 0.05;
    const localProgress = Math.max(0, Math.min(1, (labelPhase - delay) / (1 - delay)));
    if (localProgress > 0) {
      const eased = easeOut(localProgress);
      strip.style.opacity = eased;
      strip.style.transform = `translateY(${(1 - eased) * 30}px)`;
    }
  });
}

// Easing functions
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// Scroll to slide
function scrollToSlide(index) {
  const slideEl = document.getElementById(`slide-${index}`);
  if (slideEl) {
    slideEl.scrollIntoView({ behavior: 'smooth' });
  }
  currentSlide = index;
  updateNavHighlight();
}

// Update nav highlight
function updateNavHighlight() {
  navBar.querySelectorAll('.nav-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === currentSlide);
    tab.setAttribute('aria-current', i === currentSlide ? 'true' : 'false');
  });
}

// Zoom functionality
function setupZoom() {
  zoomClose.addEventListener('click', closeZoom);
  zoomBackdrop.addEventListener('click', (e) => {
    if (e.target === zoomBackdrop) closeZoom();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomBackdrop.classList.contains('open')) {
      closeZoom();
    }
  });
}

function openZoom(sticker) {
  zoomSticker = sticker;
  const img = zoomContent.querySelector('img') || document.createElement('img');
  img.src = sticker.src;
  img.alt = sticker.alt;
  zoomContent.innerHTML = '';
  zoomContent.appendChild(img);

  zoomBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  sticker.classList.add('is-zoomed');
}

function closeZoom() {
  zoomBackdrop.classList.remove('open');
  document.body.style.overflow = '';
  if (zoomSticker) {
    zoomSticker.classList.remove('is-zoomed');
    zoomSticker.focus();
    zoomSticker = null;
  }
}

// Keyboard navigation between slides
function setupKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (zoomBackdrop.classList.contains('open')) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSlide(Math.min(currentSlide + 1, days.length - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSlide(Math.max(currentSlide - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToSlide(days.length - 1);
    }
  });
}

// Handle resize - rebuild slides for responsive positions
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const scrollY = window.scrollY;
    buildSlides();
    setupScrollTriggers();
    window.scrollTo(0, scrollY);
  }, 250);
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for debugging
window.__DEBUGG_AND_SLAY__ = {
  days,
  scrollToSlide,
  gsap,
  ScrollTrigger
};