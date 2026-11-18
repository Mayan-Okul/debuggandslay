// Day data for Debugg and Slay Week
// Edit this file to change copy without touching layout code

export const days = [
  {
    id: 'intro',
    label: 'Intro',
    className: 'slide--intro',
    fontDisplay: 'var(--font-block-bomb)',
    // Intro is fully static - no stickers, no pinning, no animation
    pin: false,
    // Welcome note text (exact, with line breaks)
    welcomeNote: `WELCOME
This is your Debug & Slay Week fashion mood board! Think of it as inspo, not instructions. The themes are here to set the vibe and spark ideas, but how you interpret them is entirely up to you. Mix it up, add your personal flavour and most importantly, have fun with it!
STYLE AWAY! ✌🏽`,
    // Intro details
    date: '30th November – 4th December 2026',
    location: 'LakeHub, Zone01 Kisumu',
    perks: [
      'Best-dressed awards'
    ],
    mandatory: true,
    logo: true,
    stickers: [],
    decor: [],
    pinLength: {
      mobile: '0%',
      desktop: '0%'
    }
  },
  {
    id: 'mon',
    label: 'Mon',
    date: '30 Nov',
    className: 'slide--mon',
    fontDisplay: 'var(--font-thorm-floxy)',
    // Board on RIGHT, note on LEFT
    boardSide: 'right',
    // Note text - exact copy
    noteDayline: '💼 Monday — Career Wear',
    noteTitle: 'THE PROFESSIONAL ERA',
    noteDesc: 'Clock in and dress for the dream role. Corporate baddie, future CEO, or doctor on duty—what\'s your career alter ego?',
    // Sticker positions - scrapbook layout, tight overlap
    // Each position: { x%, y%, scale, rot, z }
    stickers: [
      // Top row - increased left margin for board on right
      { mobile: { x: 32, y: 16, scale: 0.95, rot: -3.5, z: 10 }, tablet: { x: 30, y: 14, scale: 1.0, rot: -2.5, z: 10 }, desktop: { x: 28, y: 12, scale: 1.05, rot: -1.5, z: 10 } },
      { mobile: { x: 52, y: 14, scale: 0.9, rot: 4.5, z: 11 }, tablet: { x: 50, y: 12, scale: 0.95, rot: 3.5, z: 11 }, desktop: { x: 48, y: 10, scale: 1.0, rot: 2.5, z: 11 } },
      { mobile: { x: 80, y: 22, scale: 0.85, rot: 7.5, z: 12 }, tablet: { x: 78, y: 18, scale: 0.9, rot: 5.5, z: 12 }, desktop: { x: 76, y: 16, scale: 0.95, rot: 4.5, z: 12 } },
      // Middle row - centerpiece at index 4 (5th)
      { mobile: { x: 28, y: 38, scale: 0.9, rot: -4.5, z: 13 }, tablet: { x: 26, y: 34, scale: 0.95, rot: -2.5, z: 13 }, desktop: { x: 24, y: 30, scale: 1.0, rot: -1.5, z: 13 } },
      { mobile: { x: 46, y: 32, scale: 1.1, rot: 1.5, z: 25 }, tablet: { x: 42, y: 28, scale: 1.15, rot: 1.5, z: 25 }, desktop: { x: 39, y: 26, scale: 1.2, rot: 1.5, z: 25 } }, // centerpiece
      { mobile: { x: 72, y: 44, scale: 0.9, rot: 5.5, z: 14 }, tablet: { x: 68, y: 40, scale: 0.95, rot: 4.5, z: 14 }, desktop: { x: 64, y: 36, scale: 1.0, rot: 3.5, z: 14 } },
      // Bottom row - keep within board height
      { mobile: { x: 28, y: 64, scale: 0.85, rot: -2.5, z: 15 }, tablet: { x: 26, y: 60, scale: 0.9, rot: -0.5, z: 15 }, desktop: { x: 24, y: 56, scale: 0.95, rot: 0.5, z: 15 } },
      { mobile: { x: 60, y: 70, scale: 0.85, rot: 6.5, z: 16 }, tablet: { x: 57, y: 66, scale: 0.9, rot: 4.5, z: 16 }, desktop: { x: 53, y: 62, scale: 0.95, rot: 3.5, z: 16 } },
      { mobile: { x: 82, y: 74, scale: 0.85, rot: -3.5, z: 17 }, tablet: { x: 79, y: 70, scale: 0.9, rot: -1.5, z: 17 }, desktop: { x: 76, y: 67, scale: 0.95, rot: -0.5, z: 17 } }
    ],
    decor: [], // No extra decor - only stickers and note
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'tue',
    label: 'Tue',
    date: '1 Dec',
    className: 'slide--tue',
    fontDisplay: 'var(--font-hype)',
    boardSide: 'left',
    noteDayline: '🛹 Tuesday — Streetwear / Y2K',
    noteTitle: 'THE STREET STYLE TAKEOVER',
    noteDesc: 'Baggy fits, bold vibes, and unapologetic drip. Throw it back to Y2K or pull up as your favourite meme.',
    stickers: [
      { mobile: { x: 20, y: 12, scale: 0.95, rot: -6.5, z: 10 }, tablet: { x: 18, y: 10, scale: 1.0, rot: -5.5, z: 10 }, desktop: { x: 16, y: 8, scale: 1.05, rot: -4.5, z: 10 } },
      { mobile: { x: 48, y: 10, scale: 0.9, rot: 1.5, z: 11 }, tablet: { x: 46, y: 8, scale: 0.95, rot: 0.5, z: 11 }, desktop: { x: 44, y: 6, scale: 1.0, rot: -0.5, z: 11 } },
      { mobile: { x: 76, y: 18, scale: 0.85, rot: 4.5, z: 12 }, tablet: { x: 74, y: 14, scale: 0.9, rot: 2.5, z: 12 }, desktop: { x: 72, y: 12, scale: 0.95, rot: 1.5, z: 12 } },
      { mobile: { x: 13, y: 35, scale: 0.9, rot: -7.5, z: 13 }, tablet: { x: 11, y: 30, scale: 0.95, rot: -5.5, z: 13 }, desktop: { x: 9, y: 26, scale: 1.0, rot: -4.5, z: 13 } },
      { mobile: { x: 40, y: 28, scale: 1.1, rot: -0.5, z: 25 }, tablet: { x: 36, y: 24, scale: 1.15, rot: -1.5, z: 25 }, desktop: { x: 32, y: 22, scale: 1.2, rot: -1.5, z: 25 } }, // centerpiece
      { mobile: { x: 68, y: 42, scale: 0.9, rot: 2.5, z: 14 }, tablet: { x: 64, y: 38, scale: 0.95, rot: 1.5, z: 14 }, desktop: { x: 60, y: 34, scale: 1.0, rot: 0.5, z: 14 } },
      { mobile: { x: 18, y: 62, scale: 0.85, rot: -5.5, z: 15 }, tablet: { x: 16, y: 58, scale: 0.9, rot: -3.5, z: 15 }, desktop: { x: 13, y: 54, scale: 0.95, rot: -2.5, z: 15 } },
      { mobile: { x: 52, y: 68, scale: 0.85, rot: 3.5, z: 16 }, tablet: { x: 50, y: 64, scale: 0.9, rot: 1.5, z: 16 }, desktop: { x: 46, y: 60, scale: 0.95, rot: 0.5, z: 16 } },
      { mobile: { x: 78, y: 72, scale: 0.85, rot: -6.5, z: 17 }, tablet: { x: 75, y: 68, scale: 0.9, rot: -4.5, z: 17 }, desktop: { x: 72, y: 65, scale: 0.95, rot: -3.5, z: 17 } }
    ],
    decor: [],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'wed',
    label: 'Wed',
    date: '2 Dec',
    className: 'slide--wed',
    fontDisplay: 'var(--font-forever-young)',
    boardSide: 'right',
    noteDayline: '⚽ Wednesday — Sportswear (Jersey Edition)',
    noteTitle: 'REP YOUR TEAM',
    noteDesc: 'Game face on, jersey out! Football, basketball, rugby—rep whatever team has your heart.',
    stickers: [
      { mobile: { x: 20, y: 12, scale: 0.95, rot: -3.5, z: 10 }, tablet: { x: 18, y: 10, scale: 1.0, rot: -2.5, z: 10 }, desktop: { x: 16, y: 8, scale: 1.05, rot: -1.5, z: 10 } },
      { mobile: { x: 48, y: 10, scale: 0.9, rot: 4.5, z: 11 }, tablet: { x: 46, y: 8, scale: 0.95, rot: 3.5, z: 11 }, desktop: { x: 44, y: 6, scale: 1.0, rot: 2.5, z: 11 } },
      { mobile: { x: 76, y: 18, scale: 0.85, rot: 7.5, z: 12 }, tablet: { x: 74, y: 14, scale: 0.9, rot: 5.5, z: 12 }, desktop: { x: 72, y: 12, scale: 0.95, rot: 4.5, z: 12 } },
      { mobile: { x: 13, y: 35, scale: 0.9, rot: -4.5, z: 13 }, tablet: { x: 11, y: 30, scale: 0.95, rot: -2.5, z: 13 }, desktop: { x: 9, y: 26, scale: 1.0, rot: -1.5, z: 13 } },
      { mobile: { x: 42, y: 28, scale: 1.1, rot: 0.5, z: 25 }, tablet: { x: 38, y: 24, scale: 1.15, rot: 1.5, z: 25 }, desktop: { x: 35, y: 22, scale: 1.2, rot: 1.5, z: 25 } }, // centerpiece
      { mobile: { x: 68, y: 42, scale: 0.9, rot: 5.5, z: 14 }, tablet: { x: 64, y: 38, scale: 0.95, rot: 4.5, z: 14 }, desktop: { x: 60, y: 34, scale: 1.0, rot: 3.5, z: 14 } },
      { mobile: { x: 18, y: 62, scale: 0.85, rot: -2.5, z: 15 }, tablet: { x: 16, y: 58, scale: 0.9, rot: -0.5, z: 15 }, desktop: { x: 13, y: 54, scale: 0.95, rot: 0.5, z: 15 } },
      { mobile: { x: 52, y: 68, scale: 0.85, rot: 6.5, z: 16 }, tablet: { x: 50, y: 64, scale: 0.9, rot: 4.5, z: 16 }, desktop: { x: 46, y: 60, scale: 0.95, rot: 3.5, z: 16 } },
      { mobile: { x: 78, y: 72, scale: 0.85, rot: -3.5, z: 17 }, tablet: { x: 75, y: 68, scale: 0.9, rot: -1.5, z: 17 }, desktop: { x: 72, y: 65, scale: 0.95, rot: -0.5, z: 17 } }
    ],
    decor: [],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'thu',
    label: 'Thu',
    date: '3 Dec',
    className: 'slide--thu',
    fontDisplay: 'var(--font-brown-wager)',
    boardSide: 'left',
    noteDayline: '🎒 Thursday — Schoolwear',
    noteTitle: 'BACK TO THE CLASSROOM',
    noteDesc: 'Homework, break time, and school bells! Dust off the nostalgia and revisit your primary or high school uniform days.',
    stickers: [
      { mobile: { x: 18, y: 12, scale: 0.95, rot: -5.5, z: 10 }, tablet: { x: 16, y: 10, scale: 1.0, rot: -4.5, z: 10 }, desktop: { x: 14, y: 8, scale: 1.05, rot: -3.5, z: 10 } },
      { mobile: { x: 50, y: 10, scale: 0.9, rot: 0.5, z: 11 }, tablet: { x: 48, y: 8, scale: 0.95, rot: -0.5, z: 11 }, desktop: { x: 46, y: 6, scale: 1.0, rot: -0.5, z: 11 } },
      { mobile: { x: 78, y: 18, scale: 0.85, rot: 3.5, z: 12 }, tablet: { x: 76, y: 14, scale: 0.9, rot: 1.5, z: 12 }, desktop: { x: 74, y: 12, scale: 0.95, rot: 0.5, z: 12 } },
      { mobile: { x: 11, y: 35, scale: 0.9, rot: -6.5, z: 13 }, tablet: { x: 9, y: 30, scale: 0.95, rot: -4.5, z: 13 }, desktop: { x: 7, y: 26, scale: 1.0, rot: -3.5, z: 13 } },
      { mobile: { x: 42, y: 28, scale: 1.1, rot: -0.5, z: 25 }, tablet: { x: 38, y: 24, scale: 1.15, rot: -1.5, z: 25 }, desktop: { x: 34, y: 22, scale: 1.2, rot: -1.5, z: 25 } }, // centerpiece
      { mobile: { x: 66, y: 42, scale: 0.9, rot: 1.5, z: 14 }, tablet: { x: 62, y: 38, scale: 0.95, rot: 0.5, z: 14 }, desktop: { x: 58, y: 34, scale: 1.0, rot: -0.5, z: 14 } },
      { mobile: { x: 16, y: 62, scale: 0.85, rot: -4.5, z: 15 }, tablet: { x: 14, y: 58, scale: 0.9, rot: -2.5, z: 15 }, desktop: { x: 11, y: 54, scale: 0.95, rot: -1.5, z: 15 } },
      { mobile: { x: 54, y: 68, scale: 0.85, rot: 2.5, z: 16 }, tablet: { x: 50, y: 64, scale: 0.9, rot: 0.5, z: 16 }, desktop: { x: 46, y: 60, scale: 0.95, rot: -0.5, z: 16 } },
      { mobile: { x: 76, y: 72, scale: 0.85, rot: -3.5, z: 17 }, tablet: { x: 73, y: 68, scale: 0.9, rot: -2.5, z: 17 }, desktop: { x: 70, y: 65, scale: 0.95, rot: -1.5, z: 17 } }
    ],
    decor: [],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'fri',
    label: 'Fri',
    date: '4 Dec',
    className: 'slide--fri',
    fontDisplay: 'var(--font-tribal-broots)',
    boardSide: 'right',
    noteDayline: '👑 Friday — Grand Finale',
    noteTitle: 'THE ULTIMATE SLAY FINALE',
    noteDesc: 'Close out the week with culture, colour, and talent. Represent your roots and let\'s make some memories!',
    stickers: [
      { mobile: { x: 16, y: 12, scale: 0.95, rot: -1.5, z: 10 }, tablet: { x: 14, y: 10, scale: 1.0, rot: -0.5, z: 10 }, desktop: { x: 12, y: 8, scale: 1.05, rot: 0.5, z: 10 } },
      { mobile: { x: 48, y: 10, scale: 0.9, rot: 3.5, z: 11 }, tablet: { x: 46, y: 8, scale: 0.95, rot: 2.5, z: 11 }, desktop: { x: 44, y: 6, scale: 1.0, rot: 2.5, z: 11 } },
      { mobile: { x: 78, y: 18, scale: 0.85, rot: 5.5, z: 12 }, tablet: { x: 76, y: 14, scale: 0.9, rot: 3.5, z: 12 }, desktop: { x: 74, y: 12, scale: 0.95, rot: 2.5, z: 12 } },
      { mobile: { x: 10, y: 35, scale: 0.9, rot: -2.5, z: 13 }, tablet: { x: 8, y: 30, scale: 0.95, rot: -0.5, z: 13 }, desktop: { x: 6, y: 26, scale: 1.0, rot: 0.5, z: 13 } },
      { mobile: { x: 42, y: 28, scale: 1.1, rot: 1.5, z: 25 }, tablet: { x: 38, y: 24, scale: 1.15, rot: 1.5, z: 25 }, desktop: { x: 34, y: 22, scale: 1.2, rot: 1.5, z: 25 } }, // centerpiece
      { mobile: { x: 68, y: 42, scale: 0.9, rot: 4.5, z: 14 }, tablet: { x: 64, y: 38, scale: 0.95, rot: 3.5, z: 14 }, desktop: { x: 60, y: 34, scale: 1.0, rot: 2.5, z: 14 } },
      { mobile: { x: 14, y: 62, scale: 0.85, rot: -0.5, z: 15 }, tablet: { x: 12, y: 58, scale: 0.9, rot: 1.5, z: 15 }, desktop: { x: 10, y: 54, scale: 0.95, rot: 1.5, z: 15 } },
      { mobile: { x: 52, y: 68, scale: 0.85, rot: 5.5, z: 16 }, tablet: { x: 50, y: 64, scale: 0.9, rot: 3.5, z: 16 }, desktop: { x: 46, y: 60, scale: 0.95, rot: 2.5, z: 16 } },
      { mobile: { x: 76, y: 72, scale: 0.85, rot: 0.5, z: 17 }, tablet: { x: 73, y: 68, scale: 0.9, rot: 1.5, z: 17 }, desktop: { x: 70, y: 65, scale: 0.95, rot: 1.5, z: 17 } }
    ],
    decor: [],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  }
];

export const closing = {
  text: 'See you at LakeHub.',
  dates: '30 Nov – 4 Dec 2026',
  dress: 'Dress to impress',
  logo: true
};