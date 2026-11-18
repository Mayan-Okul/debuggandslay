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
          z-index: var(--z);
          opacity: ${prefersReducedMotion ? 1 : 0};
        "
      >
    `;
  }).join('');

  // Intro slide - fully static
  if (day.id === 'intro') {
    const chips = day.headline ? day.headline.split(' ').map(word => 
      `<span class="chip">${word}</span>`
    ).join(' ') : '';
    
    const detailsHtml = `
      <div class="intro-details">
        <div class="intro-detail">
          <span>📅</span>
          <span>${day.date}</span>
        </div>
        <div class="intro-detail">
          <span>📍</span>
          <span>${day.location}</span>
        </div>
        ${day.perks ? day.perks.map(p => `
          <div class="intro-detail">
            <span>🏆</span>
            <span>${p}</span>
          </div>
        `).join('') : ''}
        ${day.mandatory ? '<div class="intro-stamp">MANDATORY</div>' : ''}
      </div>
    `;

    const welcomeHtml = day.welcomeNote ? `
      <div class="welcome-note" style="white-space: pre-wrap;">${day.welcomeNote}</div>
    ` : '';

    const logoHtml = day.logo ? `
      <img class="intro-logo" src="/logo/zone01-kisumu-sticker.webp" alt="Zone01 Kisumu logo" loading="eager">
    ` : '';

    const afroBandsHtml = `
      <div class="afro-band afro-band--top" aria-hidden="true"></div>
      <div class="afro-band afro-band--bottom" aria-hidden="true"></div>
    `;

    return `
      <section class="slide ${day.className}" id="slide-${index}" data-slide="${index}" style="--font-display: ${day.fontDisplay};">
        ${afroBandsHtml}
        <div class="slide__board">
          <div class="intro-content">
            <h1 class="intro-headline">${chips}</h1>
            ${logoHtml}
            ${welcomeHtml}
            ${detailsHtml}
          </div>
        </div>
      </section>
    `;
  }

  // Day slides - alternating layout with board and note
  const boardHtml = `
    <div class="board" data-side="${day.boardSide}">
      <div class="board__cluster">
        ${stickersHtml}
      </div>
    </div>
  `;

  const noteHtml = `
    <div class="day-note" data-side="${day.boardSide === 'right' ? 'left' : 'right'}">
      <div class="note-content">
        <div class="note-dayline">${day.noteDayline}</div>
        <div class="note-title">${day.noteTitle}</div>
        <div class="note-desc">${day.noteDesc}</div>
      </div>
    </div>
  `;

  // Order: board first if on right, note first if on left (CSS handles visual order via flex-direction)
  const contentOrder = day.boardSide === 'right' ? boardHtml + noteHtml : noteHtml + boardHtml;

  return `
    <section class="slide ${day.className}" id="slide-${index}" data-slide="${index}" style="--font-display: ${day.fontDisplay};">
      <div class="slide__board">
        ${contentOrder}
      </div>
    </section>
  `;
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
    document.querySelectorAll('.sticker, .board, .day-note').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  days.forEach((day, index) => {
    const slideEl = document.getElementById(`slide-${index}`);
    if (!slideEl) return;

    // Skip pinning for intro slide
    if (day.id === 'intro') return;

    const board = slideEl.querySelector('.board');
    const note = slideEl.querySelector('.day-note');
    const pinLength = day.pinLength || { mobile: '140%', desktop: '220%' };

    // Create timeline for this slide - pin the slide itself
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slideEl,
        start: 'top top',
        end: `+=${window.innerWidth <= 640 ? pinLength.mobile : pinLength.desktop}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress is handled by the timeline
        }
      }
    });

    // Note animation - drops in first from opposite side
    const noteSide = day.boardSide === 'right' ? 'left' : 'right';
    const noteStartX = noteSide === 'left' ? -100 : 100;
    const noteStartRot = noteSide === 'left' ? -5 : 5;

    tl.fromTo(note, 
      { 
        opacity: 0, 
        x: noteStartX, 
        rotation: noteStartRot,
        scale: 0.95
      },
      { 
        opacity: 1, 
        x: 0, 
        rotation: day.boardSide === 'right' ? 2 : -2,
        scale: 1,
        ease: 'back.out(1.2)',
        duration: 0.3
      }, 0)
    .fromTo(note.querySelector('.note-dayline'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.1)
    .fromTo(note.querySelector('.note-title'),
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.5)', duration: 0.3 }, 0.15)
    .fromTo(note.querySelector('.note-desc'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.25);

    // Sticker animations - one by one with shine effect
    const stickers = slideEl.querySelectorAll('.sticker:not(.logo-sticker)');
    const centerpieceIndex = 4; // 5th sticker
    
    stickers.forEach((sticker, i) => {
      const isCenterpiece = i === centerpieceIndex;
      const staggerDelay = i * 0.12;
      
      // Determine entry side based on board position
      const boardSide = day.boardSide;
      const entrySide = boardSide === 'right' ? 'left' : 'right'; // Enter from opposite side of board
      const startX = entrySide === 'left' ? -180 : 180;
      const startY = (Math.random() - 0.5) * 60;
      const startRot = (Math.random() - 0.5) * 70;
      const startScale = 1.4;
      
      // Create shine element
      const shine = document.createElement('div');
      shine.className = 'sticker-shine';
      shine.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
        transform: translateX(-150%) skewX(-20deg);
        opacity: 0;
        pointer-events: none;
        border-radius: inherit;
      `;
      sticker.style.position = 'relative';
      sticker.appendChild(shine);

      // Main sticker animation - preserve centering with xPercent/yPercent
      const finalRot = parseFloat(sticker.style.getPropertyValue('--rot')) || 0;
      const finalScale = parseFloat(sticker.style.getPropertyValue('--scale')) || 1;
      tl.fromTo(sticker,
        {
          opacity: 0,
          x: startX,
          y: startY,
          rotation: startRot,
          scale: startScale,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: 'center center'
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: finalRot,
          scale: finalScale,
          xPercent: -50,
          yPercent: -50,
          ease: 'back.out(1.7)',
          duration: isCenterpiece ? 0.6 : 0.5,
          onComplete: () => {
            // Squash and press
            gsap.to(sticker, {
              scaleY: 0.94,
              duration: 0.08,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                gsap.to(sticker, { scaleY: 1, duration: 0.1, ease: 'power2.out' });
              }
            });
            
            // Shine sweep
            gsap.to(shine, {
              opacity: 1,
              transform: 'translateX(150%) skewX(-20deg)',
              duration: 0.4,
              ease: 'power2.out'
            });
            
            // Nudge neighbors
            const neighborIndices = [i - 1, i + 1].filter(idx => idx >= 0 && idx < stickers.length);
            neighborIndices.forEach((ni, nIdx) => {
              const neighbor = stickers[ni];
              const nudgeX = (Math.random() - 0.5) * 8;
              const nudgeY = (Math.random() - 0.5) * 8;
              gsap.to(neighbor, {
                x: `+=${nudgeX}`,
                y: `+=${nudgeY}`,
                duration: 0.1,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
              });
            });
          }
        }, staggerDelay + 0.3); // Start after note begins
    });

    // Store timeline for cleanup
    slideEl._scrollTimeline = tl;
  });
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