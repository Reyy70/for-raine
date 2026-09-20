// =====================================
// BIRTHDAY CONFIGURATION
// Edit these values to customize the gift
// =====================================

const CORRECT_NAME = "Raine";
const CORRECT_CODE = "2003";
const BIRTH_YEAR = "2003";

const BIRTHDAY_MESSAGE = `
To Raine, under this quiet canopy of pixel stars and infinite night—

Words have always felt fragile when trying to hold something as immense as what you mean. How does one measure a person whose laughter can dismantle the heaviest storms? How do you describe someone who walks through the world with such gentle grace, turning cold, ordinary days into chapters of pure gold? You are the kind of person poets spend lifetimes trying to capture in verse, yet every sentence falls short of the living poetry of your heart.

And above all the wonders of this day, there is a truth that lives in the deepest, most tender part of my chest: I want to thank you from the bottom of my soul.

Thank you for existing. Thank you for gracing this world with your presence, for your quiet loyalty, your rare gentleness, and the effortless way you bring peace wherever you go. Thank you for the countless little kindnesses you offer without ever asking for recognition—the soft words when someone is weary, the patient understanding you give so freely, and the light you carry into spaces that had forgotten what warmth felt like.

I have thought so often about how to tell you this, and every time I realize the same undeniable truth: no matter how many times I say thank you, it will never feel like enough. If gratitude could be counted in stars, the entire universe would not be wide enough to hold them all. If I gathered every ocean, every sunrise, and every drop of morning rain to symbolize how thankful I am that you were born, it would still fail to measure what you deserve. I could spend every single day of my life thanking you, and when the years grew old, I would still feel as though I had only just begun. No amount of words or gratitude could ever truly repay the sheer goodness you have brought into my life and into this world.

Having you in the world is a blessing that makes life feel like a sacred gift. You turn routine hours into cherished memories. You give people reasons to believe that genuine goodness is not a fairy tale, but a living, breathing reality walking among us. You are rare, Raine. You are irreplaceable in a way that cannot be overstated—a soul crafted with unmatched care, kindness, and celestial magic.

On this milestone day, as the universe marks another orbit of your wondrous existence, these are my deepest wishes for you:
✨ Mornings that greet you with deep peace, soft light, and the aroma of warmth and comfort
✨ Days brimming with unexpected joy, belly-aching laughter, and serendipitous miracles
✨ The fierce courage to pursue every secret dream your heart has ever whispered in the dark
✨ Unwavering strength through every season, knowing you are stronger than any passing shadow
✨ Friendships and love as loyal, steady, and pure as the light you give to everyone around you
✨ And the quiet, unshakable certainty that you are treasured beyond what words can ever measure

Never forget how profoundly you matter. Never forget that the world is undeniably brighter, softer, and more beautiful because you are here.

Happy Birthday, Raine.
May this new chapter be as gentle, radiant, and beautiful to you as your heart has always been to mine.

I could never describe how much I love you.

Forever thankful, forever celebrating you. ❤️
`;

// ==========================================================================
// 1. RETRO WEB AUDIO API CHIPTUNE ENGINE & SOUND EFFECTS
// 100% Native, self-contained, zero external audio asset dependencies!
// ==========================================================================

class RetroAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMusicPlaying = false;
    this.isSfxEnabled = true;
    this.musicTimer = null;
    this.noteStep = 0;
    
    // Cozy 8-Bit Melody Notes (Frequencies in Hz)
    // A heartwarming, nostalgic retro RPG theme (Key of F major / D minor)
    this.melody = [
      // Bar 1
      { note: 261.63, dur: 0.28 }, // C4
      { note: 329.63, dur: 0.28 }, // E4
      { note: 392.00, dur: 0.28 }, // G4
      { note: 523.25, dur: 0.55 }, // C5
      // Bar 2
      { note: 440.00, dur: 0.28 }, // A4
      { note: 523.25, dur: 0.28 }, // C5
      { note: 659.25, dur: 0.55 }, // E5
      // Bar 3
      { note: 392.00, dur: 0.28 }, // G4
      { note: 493.88, dur: 0.28 }, // B4
      { note: 587.33, dur: 0.55 }, // D5
      // Bar 4
      { note: 523.25, dur: 0.80 }, // C5
      { note: 0,      dur: 0.25 }, // Rest
      // Bar 5
      { note: 349.23, dur: 0.28 }, // F4
      { note: 440.00, dur: 0.28 }, // A4
      { note: 523.25, dur: 0.55 }, // C5
      // Bar 6
      { note: 392.00, dur: 0.28 }, // G4
      { note: 440.00, dur: 0.28 }, // A4
      { note: 493.88, dur: 0.55 }, // B4
      // Bar 7 (Climax)
      { note: 523.25, dur: 0.28 }, // C5
      { note: 659.25, dur: 0.28 }, // E5
      { note: 783.99, dur: 0.65 }, // G5
      // Bar 8 (Resolution)
      { note: 659.25, dur: 0.35 }, // E5
      { note: 523.25, dur: 0.85 }, // C5
      { note: 0,      dur: 0.40 }  // Rest
    ];

    // Bassline accompaniment for warmth
    this.bassline = [
      130.81, 130.81, 174.61, 174.61, 196.00, 196.00, 130.81, 130.81,
      174.61, 174.61, 196.00, 196.00, 130.81, 164.81, 130.81, 130.81
    ];
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      // Master Gains
      this.musicGain = this.audioCtx.createGain();
      this.musicGain.gain.value = 0.18; // gentle, non-fatiguing volume
      this.musicGain.connect(this.audioCtx.destination);

      this.sfxGain = this.audioCtx.createGain();
      this.sfxGain.gain.value = 0.25;
      this.sfxGain.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // --- Chiptune Music Box Loop ---
  startMusic() {
    this.init();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.noteStep = 0;
    this.playNextMusicNote();
  }

  stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playNextMusicNote() {
    if (!this.isMusicPlaying || !this.audioCtx) return;

    const current = this.melody[this.noteStep % this.melody.length];
    const bassFreq = this.bassline[Math.floor(this.noteStep / 2) % this.bassline.length];

    const now = this.audioCtx.currentTime;

    // Melody Chime (Warm filtered pulse wave)
    if (current.note > 0) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'triangle'; // Smooth chime-like retro tone
      osc.frequency.setValueAtTime(current.note, now);

      // Lowpass filter for cozy warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + current.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + current.dur + 0.05);

      // Secondary retro harmony oscillator (subtle octave arpeggio)
      const harmonyOsc = this.audioCtx.createOscillator();
      const harmonyGain = this.audioCtx.createGain();
      harmonyOsc.type = 'sine';
      harmonyOsc.frequency.setValueAtTime(current.note * 0.5, now);
      harmonyGain.gain.setValueAtTime(0, now);
      harmonyGain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      harmonyGain.gain.exponentialRampToValueAtTime(0.001, now + current.dur * 0.8);

      harmonyOsc.connect(harmonyGain);
      harmonyGain.connect(this.musicGain);
      harmonyOsc.start(now);
      harmonyOsc.stop(now + current.dur);
    }

    // Soft Bass Note
    if (this.noteStep % 2 === 0 && bassFreq > 0) {
      const bassOsc = this.audioCtx.createOscillator();
      const bassGain = this.audioCtx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.12, now + 0.06);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      bassOsc.connect(bassGain);
      bassGain.connect(this.musicGain);
      bassOsc.start(now);
      bassOsc.stop(now + 0.55);
    }

    this.noteStep = (this.noteStep + 1) % this.melody.length;
    this.musicTimer = setTimeout(() => {
      this.playNextMusicNote();
    }, current.dur * 1000);
  }

  // --- Sound Effects ---
  playClick() {
    if (!this.isSfxEnabled) return;
    this.init();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playSuccessFanfare() {
    if (!this.isSfxEnabled) return;
    this.init();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const noteTime = now + (idx * 0.07);

      osc.type = idx === notes.length - 1 ? 'triangle' : 'square';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.25, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + (idx === notes.length - 1 ? 0.8 : 0.2));

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(noteTime);
      osc.stop(noteTime + (idx === notes.length - 1 ? 0.85 : 0.22));
    });
  }

  playErrorSound() {
    if (!this.isSfxEnabled) return;
    this.init();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  playCandleBlow() {
    if (!this.isSfxEnabled) return;
    this.init();
    const now = this.audioCtx.currentTime;

    // Breath / Puff sound (gentle filtered white noise)
    const bufferSize = this.audioCtx.sampleRate * 0.4;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(150, now + 0.35);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);

    // Magical Star Shimmer
    setTimeout(() => {
      if (!this.audioCtx) return;
      const t = this.audioCtx.currentTime;
      [880, 1174.66, 1318.51, 1760].forEach((f, i) => {
        const chime = this.audioCtx.createOscillator();
        const chimeGain = this.audioCtx.createGain();
        chime.type = 'triangle';
        chime.frequency.setValueAtTime(f, t + i * 0.08);

        chimeGain.gain.setValueAtTime(0.18, t + i * 0.08);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.4);

        chime.connect(chimeGain);
        chimeGain.connect(this.sfxGain);
        chime.start(t + i * 0.08);
        chime.stop(t + i * 0.08 + 0.45);
      });
    }, 150);
  }

  playSparklePop() {
    if (!this.isSfxEnabled) return;
    this.init();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playStarCatch() {
    if (!this.isSfxEnabled) return;
    this.init();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

// Instantiate audio engine
const audioEngine = new RetroAudioEngine();


// ==========================================================================
// 2. RETRO PIXEL SKY & CELESTIAL CANVAS
// Canvas rendering pixel stars, drifting clouds, and shooting comets
// ==========================================================================

class PixelSkyRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.clouds = [];
    this.floatingHearts = [];
    this.comets = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.generateStars(130);
    this.generateClouds(8);
    this.generateFloatingHearts(12);
    this.startShootingStarLoop();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  generateStars(count) {
    this.stars = [];
    const colors = ['#ffffff', '#fde047', '#ffd166', '#c084fc', '#38bdf8', '#fda4af'];
    for (let i = 0; i < count; i++) {
      const typeRoll = Math.random();
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: typeRoll < 0.2 ? 5 : (typeRoll < 0.5 ? 3 : (typeRoll < 0.8 ? 2 : 1)),
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: typeRoll < 0.22 ? 'cross' : (typeRoll < 0.45 ? 'diamond' : 'dot'),
        pulse: Math.random() * Math.PI
      });
    }
  }

  generateClouds(count) {
    this.clouds = [];
    for (let i = 0; i < count; i++) {
      const isForeground = i % 2 === 0;
      this.clouds.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height * 0.65),
        speed: (Math.random() * 0.18 + 0.08) * (isForeground ? 1.3 : 0.7),
        width: Math.floor(Math.random() * 90 + 70),
        height: Math.floor(Math.random() * 24 + 18),
        color: isForeground ? 'rgba(168, 85, 247, 0.16)' : 'rgba(88, 28, 135, 0.12)'
      });
    }
  }

  generateFloatingHearts(count) {
    this.floatingHearts = [];
    for (let i = 0; i < count; i++) {
      this.floatingHearts.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vy: Math.random() * 0.4 + 0.2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayDist: Math.random() * 20 + 10,
        baseX: Math.random() * this.width,
        color: ['#f472b6', '#ec4899', '#ffd166', '#c084fc'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.6 + 0.25,
        scale: Math.random() * 0.6 + 0.8,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  startShootingStarLoop() {
    const spawnComet = () => {
      if (Math.random() < 0.9) {
        this.comets.push({
          x: Math.random() * (this.width * 0.85),
          y: Math.random() * (this.height * 0.35),
          length: Math.random() * 80 + 60,
          speed: Math.random() * 6 + 7,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          decay: 0.018
        });
      }
      setTimeout(spawnComet, Math.random() * 3500 + 2500);
    };
    setTimeout(spawnComet, 1500);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Deep Romantic Retro Night Sky Gradient
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    skyGrad.addColorStop(0, '#060314');
    skyGrad.addColorStop(0.35, '#0f082e');
    skyGrad.addColorStop(0.7, '#1b0f44');
    skyGrad.addColorStop(1, '#2a1354');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw Pixel Crescent Moon
    this.drawMoon(Math.min(this.width - 80, this.width * 0.88), 85);

    // Draw Twinkling Stars
    this.stars.forEach(star => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0.18) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      star.pulse += 0.03;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.12, Math.min(1, star.alpha));
      this.ctx.fillStyle = star.color;

      if (star.type === 'cross' && star.size >= 4) {
        // Stepped 4-point pixel cross (+)
        const s = 2;
        this.ctx.fillRect(star.x - s, star.y, s * 3, s);
        this.ctx.fillRect(star.x, star.y - s, s, s * 3);
        // Center glow dot
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(star.x, star.y, s, s);
      } else if (star.type === 'diamond') {
        // Pixel diamond
        const s = star.size;
        this.ctx.fillRect(star.x - 1, star.y, s, s);
        this.ctx.fillRect(star.x, star.y - 1, s, s);
      } else {
        // Pixel Dot
        this.ctx.fillRect(star.x, star.y, star.size, star.size);
      }
      this.ctx.restore();
    });

    // Draw Drifting Pixel Clouds
    this.clouds.forEach(cloud => {
      cloud.x += cloud.speed;
      if (cloud.x > this.width + 120) {
        cloud.x = -cloud.width - 30;
        cloud.y = Math.random() * (this.height * 0.65);
      }

      this.ctx.save();
      this.ctx.fillStyle = cloud.color;
      // Multi-stepped pixel cloud
      this.ctx.fillRect(cloud.x, cloud.y + 6, cloud.width, cloud.height - 6);
      this.ctx.fillRect(cloud.x + 12, cloud.y, cloud.width - 24, cloud.height);
      this.ctx.fillRect(cloud.x + 28, cloud.y - 6, cloud.width - 56, cloud.height + 6);
      this.ctx.fillRect(cloud.x + 40, cloud.y - 10, cloud.width - 80, cloud.height + 10);
      this.ctx.restore();
    });

    // Draw Floating Pixel Hearts & Magic Fireflies
    this.floatingHearts.forEach(heart => {
      heart.y -= heart.vy;
      heart.phase += heart.swaySpeed;
      heart.x = heart.baseX + Math.sin(heart.phase) * heart.swayDist;

      if (heart.y < -20) {
        heart.y = this.height + 20;
        heart.baseX = Math.random() * this.width;
      }

      this.ctx.save();
      this.ctx.globalAlpha = heart.alpha;
      this.ctx.fillStyle = heart.color;

      // Draw Tiny Pixel Heart (7x6 pixels)
      const hx = heart.x;
      const hy = heart.y;
      const s = 2;
      // Heart silhouette:
      // Row 0:  XX   XX
      // Row 1: XXXXXXXX
      // Row 2: XXXXXXXX
      // Row 3:  XXXXXX
      // Row 4:   XXXX
      // Row 5:    XX
      this.ctx.fillRect(hx + 1 * s, hy, 2 * s, s);
      this.ctx.fillRect(hx + 4 * s, hy, 2 * s, s);
      this.ctx.fillRect(hx, hy + 1 * s, 7 * s, 2 * s);
      this.ctx.fillRect(hx + 1 * s, hy + 3 * s, 5 * s, s);
      this.ctx.fillRect(hx + 2 * s, hy + 4 * s, 3 * s, s);
      this.ctx.fillRect(hx + 3 * s, hy + 5 * s, 1 * s, s);

      this.ctx.restore();
    });

    // Draw Shooting Comets
    for (let i = this.comets.length - 1; i >= 0; i--) {
      const c = this.comets[i];
      c.x += Math.cos(c.angle) * c.speed;
      c.y += Math.sin(c.angle) * c.speed;
      c.alpha -= c.decay;

      if (c.alpha <= 0 || c.x > this.width || c.y > this.height) {
        this.comets.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.strokeStyle = `rgba(254, 240, 138, ${c.alpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(c.x, c.y);
      this.ctx.lineTo(
        c.x - Math.cos(c.angle) * c.length,
        c.y - Math.sin(c.angle) * c.length
      );
      this.ctx.stroke();

      // Sparkle Head
      this.ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
      this.ctx.fillRect(c.x - 2, c.y - 2, 4, 4);
      this.ctx.restore();
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  drawMoon(cx, cy) {
    this.ctx.save();
    // Ambient Moon Glow Rings
    const glow = this.ctx.createRadialGradient(cx, cy, 15, cx, cy, 75);
    glow.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
    glow.addColorStop(0.5, 'rgba(253, 224, 71, 0.15)');
    glow.addColorStop(1, 'rgba(254, 240, 138, 0)');
    this.ctx.fillStyle = glow;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 75, 0, Math.PI * 2);
    this.ctx.fill();

    // Pixelated Moon Silhouette (Stepped Pixel Rectangles)
    this.ctx.fillStyle = '#fef08a';
    const moonPixels = [
      [-1, -4, 4, 1],
      [-3, -3, 7, 1],
      [-4, -2, 8, 1],
      [-5, -1, 8, 1],
      [-5,  0, 8, 1],
      [-5,  1, 7, 1],
      [-4,  2, 6, 1],
      [-3,  3, 5, 1],
      [-1,  4, 3, 1]
    ];
    const s = 5;
    moonPixels.forEach(([px, py, w, h]) => {
      this.ctx.fillRect(cx + px * s, cy + py * s, w * s, h * s);
    });

    // Dark side cutout (Inner shadow of crescent)
    this.ctx.fillStyle = '#170f3c';
    const cutoutPixels = [
      [ 0, -3, 4, 1],
      [ 0, -2, 5, 1],
      [-1, -1, 5, 1],
      [-1,  0, 5, 1],
      [-1,  1, 4, 1],
      [ 0,  2, 3, 1]
    ];
    cutoutPixels.forEach(([px, py, w, h]) => {
      this.ctx.fillRect(cx + px * s, cy + py * s, w * s, h * s);
    });

    // Highlight crater dots on moon
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.fillRect(cx - 3 * s, cy - 1 * s, 1 * s, 1 * s);
    this.ctx.fillRect(cx - 2 * s, cy + 1 * s, 1 * s, 1 * s);

    this.ctx.restore();
  }
}


// ==========================================================================
// 3. RETRO PIXEL CONFETTI & SPARKLE ENGINE
// Dynamic particle physics for party celebrations and click bursts
// ==========================================================================

class PixelPartyEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isActive = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.colors = ['#f472b6', '#c084fc', '#ffd166', '#38bdf8', '#a7f3d0', '#ffffff'];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  startContinuousConfetti() {
    this.isActive = true;
  }

  stopConfetti() {
    this.isActive = false;
  }

  burst(originX, originY, count = 90) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 4;
      this.particles.push({
        x: originX || this.width / 2,
        y: originY || this.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.floor(Math.random() * 5 + 4),
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008,
        isBurst: true
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Continuous celebration fall if active
    if (this.isActive && this.particles.length < 130) {
      this.particles.push({
        x: Math.random() * this.width,
        y: -15,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2.2 + 1.2,
        size: Math.floor(Math.random() * 4 + 4),
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 6,
        alpha: 1,
        decay: 0.002,
        isBurst: false
      });
    }

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      // Gravity effect
      if (p.isBurst) {
        p.vy += 0.22;
        p.vx *= 0.98;
      } else {
        p.vx += Math.sin(p.y * 0.02) * 0.08; // fluttering sway
      }

      if (p.alpha <= 0 || p.y > this.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      // Draw Pixel Particle
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}


// ==========================================================================
// 4. APPLICATION ORCHESTRATOR & INTERACTIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Stage 1 (Unlock)
  const unlockStage = document.getElementById('unlockStage');
  const unlockCard = document.getElementById('unlockCard');
  const unlockForm = document.getElementById('unlockForm');
  const nameInput = document.getElementById('nameInput');
  const codeInput = document.getElementById('codeInput');
  const toggleCodeVisibility = document.getElementById('toggleCodeVisibility');
  const toggleIcon = document.getElementById('toggleIcon');
  const errorMsg = document.getElementById('errorMsg');
  const errorText = document.getElementById('errorText');
  const hintModalBtn = document.getElementById('hintModalBtn');
  const typewriterText = document.getElementById('typewriterText');

  // DOM Elements - Hint Modal & Star Catcher Mini-Game
  const hintBackdrop = document.getElementById('hintBackdrop');
  const hintDialog = document.getElementById('hintDialog');
  const closeHintBtn = document.getElementById('closeHintBtn');
  const closeHintTopBtn = document.getElementById('closeHintTopBtn');
  const miniGameCanvas = document.getElementById('miniGameCanvas');
  const gameScore = document.getElementById('gameScore');
  const gameHighScore = document.getElementById('gameHighScore');
  const gameBtnLeft = document.getElementById('gameBtnLeft');
  const gameBtnRight = document.getElementById('gameBtnRight');
  const hintLockedBox = document.getElementById('hintLockedBox');
  const hintUnlockedBox = document.getElementById('hintUnlockedBox');
  const lockProgressFill = document.getElementById('lockProgressFill');
  const starsNeededText = document.getElementById('starsNeededText');

  // DOM Elements - Stage 2 (Celebration)
  const celebrationStage = document.getElementById('celebrationStage');
  const celebrationName = document.getElementById('celebrationName');
  const pixelCake = document.getElementById('pixelCake');
  const cakeFlames = document.getElementById('cakeFlames');
  const cakeSmoke = document.getElementById('cakeSmoke');
  const cakePromptText = document.getElementById('cakePromptText');
  const wishBanner = document.getElementById('wishBanner');
  const letterScrollWrapper = document.getElementById('letterScrollWrapper');
  const birthdayMessageContainer = document.getElementById('birthdayMessageContainer');
  const letterScrollHint = document.getElementById('letterScrollHint');
  const pixelGiftBox = document.getElementById('pixelGiftBox');
  const giftSurpriseModal = document.getElementById('giftSurpriseModal');
  const replayBtn = document.getElementById('replayBtn');
  const extraConfettiBtn = document.getElementById('extraConfettiBtn');
  const relightCandlesBtn = document.getElementById('relightCandlesBtn');
  const screenFlash = document.getElementById('screenFlash');

  // Internal Scroll Listener for Letter Scroll Hint
  if (letterScrollWrapper && letterScrollHint) {
    letterScrollWrapper.addEventListener('scroll', () => {
      if (letterScrollWrapper.scrollTop > 20) {
        letterScrollHint.classList.add('scrolled');
      } else {
        letterScrollHint.classList.remove('scrolled');
      }
    });
  }

  // Audio Controls & Favorite Song Elements
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const favSongBarBtn = document.getElementById('favSongBarBtn');
  const playFavoriteSongBtn = document.getElementById('playFavoriteSongBtn');
  const favoriteSongBackdrop = document.getElementById('favoriteSongBackdrop');
  const favoriteSongDialog = document.getElementById('favoriteSongDialog');
  const favSongIframe = document.getElementById('favSongIframe');
  const closeFavSongTopBtn = document.getElementById('closeFavSongTopBtn');
  const minimizeFavSongBtn = document.getElementById('minimizeFavSongBtn');
  const closeFavSongBtn = document.getElementById('closeFavSongBtn');
  const floatingMusicBar = document.getElementById('floatingMusicBar');
  const expandFavSongBtn = document.getElementById('expandFavSongBtn');
  const stopFloatingFavSongBtn = document.getElementById('stopFloatingFavSongBtn');

  // Canvases
  const skyCanvas = document.getElementById('skyCanvas');
  const partyCanvas = document.getElementById('partyCanvas');

  // Init Canvas Renderers
  const skyRenderer = new PixelSkyRenderer(skyCanvas);
  const partyEngine = new PixelPartyEngine(partyCanvas);

  // Set configured name in stage 2 heading
  if (celebrationName) {
    celebrationName.textContent = CORRECT_NAME.toUpperCase();
  }

  // --- Typewriter Reveal for Stage 1 Heading ---
  const headingPrompt = "A magical surprise is locked away...";
  let typewriterIdx = 0;
  typewriterText.textContent = "";

  function typeWriter() {
    if (typewriterIdx < headingPrompt.length) {
      typewriterText.textContent += headingPrompt.charAt(typewriterIdx);
      typewriterIdx++;
      setTimeout(typeWriter, 55);
    }
  }
  setTimeout(typeWriter, 350);

  // --- Audio Control Listeners ---
  musicToggleBtn.addEventListener('click', () => {
    audioEngine.playClick();
    if (audioEngine.isMusicPlaying) {
      audioEngine.stopMusic();
      musicToggleBtn.querySelector('.music-text').textContent = 'Music: OFF';
      musicToggleBtn.classList.remove('music-playing');
    } else {
      // If favorite song is currently playing, stop it so tracks don't clash
      if (favSongIframe && favSongIframe.src && favSongIframe.src !== 'about:blank' && !favSongIframe.src.endsWith('#stopped')) {
        stopFavoriteSong();
      }
      audioEngine.startMusic();
      musicToggleBtn.querySelector('.music-text').textContent = 'Music: ON';
      musicToggleBtn.classList.add('music-playing');
    }
  });

  soundToggleBtn.addEventListener('click', () => {
    audioEngine.isSfxEnabled = !audioEngine.isSfxEnabled;
    const sfxText = soundToggleBtn.querySelector('.sfx-text');
    const sfxIcon = soundToggleBtn.querySelector('.sfx-icon');
    if (audioEngine.isSfxEnabled) {
      sfxText.textContent = 'SFX: ON';
      sfxIcon.textContent = '🔊';
      audioEngine.playClick();
    } else {
      sfxText.textContent = 'SFX: OFF';
      sfxIcon.textContent = '🔇';
    }
  });

  // --- Show / Hide Secret Code Toggle ---
  toggleCodeVisibility.addEventListener('click', () => {
    audioEngine.playClick();
    const isPassword = codeInput.type === 'password';
    codeInput.type = isPassword ? 'text' : 'password';
    toggleIcon.textContent = isPassword ? '🙈' : '👁️';
    toggleCodeVisibility.setAttribute(
      'aria-label',
      isPassword ? 'Hide secret code' : 'Show secret code'
    );
  });

  // --- Star Catcher Arcade Mini-Game Implementation ---
  class StarCatcherMiniGame {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas ? canvas.getContext('2d') : null;
      this.width = 320;
      this.height = 180;
      this.isRunning = false;
      this.animId = null;

      this.score = 0;
      this.targetScore = 23;
      this.highScore = 0;
      try {
        this.highScore = parseInt(localStorage.getItem('raine_star_highscore') || '0', 10);
      } catch (e) {
        this.highScore = 0;
      }
      this.isUnlocked = false;
      this.isCompleted = false;

      this.catcher = {
        x: 132,
        y: 152,
        w: 56,
        h: 18,
        speed: 6.8
      };

      this.items = [];
      this.particles = [];
      this.bgStars = [];
      this.spawnTimer = 0;

      this.keys = { left: false, right: false };
      this.isPointerDown = false;

      this.initBgStars();
      this.bindEvents();
      this.updateHud();
    }

    initBgStars() {
      this.bgStars = [];
      for (let i = 0; i < 28; i++) {
        this.bgStars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() < 0.25 ? 2 : 1,
          speed: 0.15 + Math.random() * 0.35,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    }

    bindEvents() {
      if (!this.canvas) return;

      const handlePointer = (clientX) => {
        const rect = this.canvas.getBoundingClientRect();
        if (!rect.width) return;
        const scaleX = this.width / rect.width;
        const canvasX = (clientX - rect.left) * scaleX;
        this.catcher.x = Math.max(4, Math.min(this.width - this.catcher.w - 4, canvasX - this.catcher.w / 2));
      };

      this.canvas.addEventListener('pointerdown', (e) => {
        this.isPointerDown = true;
        try { this.canvas.setPointerCapture(e.pointerId); } catch(err){}
        handlePointer(e.clientX);
      });

      this.canvas.addEventListener('pointermove', (e) => {
        if (this.isPointerDown || e.pointerType === 'mouse') {
          handlePointer(e.clientX);
        }
      });

      window.addEventListener('pointerup', (e) => {
        this.isPointerDown = false;
        try { this.canvas.releasePointerCapture(e.pointerId); } catch(err){}
      });

      // Mobile Touch Buttons (Both step and hold)
      if (gameBtnLeft) {
        gameBtnLeft.addEventListener('click', () => {
          this.catcher.x = Math.max(4, this.catcher.x - 16);
        });
        gameBtnLeft.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys.left = true; });
        gameBtnLeft.addEventListener('pointerup', (e) => { e.preventDefault(); this.keys.left = false; });
        gameBtnLeft.addEventListener('pointerleave', (e) => { e.preventDefault(); this.keys.left = false; });
      }

      if (gameBtnRight) {
        gameBtnRight.addEventListener('click', () => {
          this.catcher.x = Math.min(this.width - this.catcher.w - 4, this.catcher.x + 16);
        });
        gameBtnRight.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys.right = true; });
        gameBtnRight.addEventListener('pointerup', (e) => { e.preventDefault(); this.keys.right = false; });
        gameBtnRight.addEventListener('pointerleave', (e) => { e.preventDefault(); this.keys.right = false; });
      }

      // Keyboard Controls
      window.addEventListener('keydown', (e) => {
        if (hintBackdrop.classList.contains('hidden')) return;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          this.keys.left = true;
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          this.keys.right = true;
        }
      });

      window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          this.keys.left = false;
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          this.keys.right = false;
        }
      });
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.loop = () => {
        if (!this.isRunning) return;
        this.update();
        this.render();
        this.animId = requestAnimationFrame(this.loop);
      };
      this.animId = requestAnimationFrame(this.loop);
    }

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      this.keys.left = false;
      this.keys.right = false;
      this.isPointerDown = false;
    }

    reset() {
      this.score = 0;
      this.isUnlocked = false;
      this.isCompleted = false;
      this.items = [];
      this.particles = [];
      this.catcher.x = (this.width - this.catcher.w) / 2;
      if (hintLockedBox) hintLockedBox.classList.remove('hidden');
      if (hintUnlockedBox) hintUnlockedBox.classList.add('hidden');
      if (closeHintBtn) {
        const textSpan = closeHintBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = "Back to Secret Code";
      }
      this.updateHud();
    }

    update() {
      // When 23 stars are reached, end the game (freeze items, drift stars)
      if (this.isCompleted) {
        for (const s of this.bgStars) {
          s.y += s.speed * 0.4;
          s.twinkle += 0.05;
          if (s.y > this.height) {
            s.y = 0;
            s.x = Math.random() * this.width;
          }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.1;
          p.life++;
          if (p.life >= p.maxLife) {
            this.particles.splice(i, 1);
          }
        }
        return;
      }

      // Button/Keyboard movement
      if (this.keys.left) {
        this.catcher.x = Math.max(4, this.catcher.x - this.catcher.speed);
      }
      if (this.keys.right) {
        this.catcher.x = Math.min(this.width - this.catcher.w - 4, this.catcher.x + this.catcher.speed);
      }

      // Background stars
      for (const s of this.bgStars) {
        s.y += s.speed;
        s.twinkle += 0.05;
        if (s.y > this.height) {
          s.y = 0;
          s.x = Math.random() * this.width;
        }
      }

      // Spawn items (stars and rare hearts)
      this.spawnTimer++;
      if (this.spawnTimer > 28) {
        this.spawnTimer = 0;
        const isHeart = Math.random() < 0.25;
        this.items.push({
          x: 15 + Math.random() * (this.width - 30),
          y: -14,
          w: 14,
          h: 14,
          speed: 1.5 + Math.random() * 0.9,
          type: isHeart ? 'heart' : 'star'
        });
      }

      // Update falling items
      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        item.y += item.speed;

        // Collision detection with catcher
        if (
          item.y + item.h >= this.catcher.y &&
          item.y <= this.catcher.y + this.catcher.h &&
          item.x + item.w >= this.catcher.x &&
          item.x <= this.catcher.x + this.catcher.w
        ) {
          const pts = item.type === 'heart' ? 2 : 1;
          this.score += pts;
          if (this.score > this.targetScore) {
            this.score = this.targetScore;
          }
          audioEngine.playStarCatch();
          this.createCatchSparkles(item.x + item.w / 2, item.y + item.h / 2, item.type);

          if (this.score > this.highScore) {
            this.highScore = this.score;
            try { localStorage.setItem('raine_star_highscore', this.highScore); } catch(e){}
          }

          this.updateHud();

          if (this.score >= this.targetScore && !this.isCompleted) {
            this.unlockHint();
            break;
          }

          this.items.splice(i, 1);
          continue;
        }

        if (item.y > this.height + 10) {
          this.items.splice(i, 1);
        }
      }

      // Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life++;
        if (p.life >= p.maxLife) {
          this.particles.splice(i, 1);
        }
      }
    }

    createCatchSparkles(x, y, type) {
      const color = type === 'heart' ? '#ec4899' : '#fbbf24';
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 1.2 + Math.random() * 2.2;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          size: Math.random() < 0.5 ? 3 : 2,
          color,
          life: 0,
          maxLife: 18 + Math.floor(Math.random() * 8)
        });
      }
    }

    unlockHint() {
      this.isUnlocked = true;
      this.isCompleted = true;
      this.score = this.targetScore;
      this.items = [];
      this.updateHud();
      audioEngine.playSuccessFanfare();

      for (let i = 0; i < 40; i++) {
        const colors = ['#fbbf24', '#f472b6', '#a78bfa', '#38bdf8', '#4ade80', '#ffffff'];
        this.particles.push({
          x: this.width / 2,
          y: this.height / 2,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6 - 2,
          size: 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 35 + Math.floor(Math.random() * 15)
        });
      }

      if (hintLockedBox && hintUnlockedBox) {
        hintLockedBox.classList.add('hidden');
        hintUnlockedBox.classList.remove('hidden');
        setTimeout(() => {
          try {
            hintUnlockedBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } catch(err){}
        }, 150);
      }

      if (closeHintBtn) {
        const textSpan = closeHintBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = "Got the Hint! ✨";
      }
    }

    updateHud() {
      if (gameScore) gameScore.textContent = this.score;
      if (gameHighScore) gameHighScore.textContent = this.highScore;

      const progress = Math.min(100, Math.round((this.score / this.targetScore) * 100));
      if (lockProgressFill) lockProgressFill.style.width = progress + '%';

      const remaining = Math.max(0, this.targetScore - this.score);
      if (starsNeededText) starsNeededText.textContent = remaining;
    }

    render() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      ctx.imageSmoothingEnabled = false;

      ctx.fillStyle = '#070318';
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.strokeStyle = 'rgba(76, 29, 149, 0.22)';
      ctx.lineWidth = 1;
      for (let x = 0; x < this.width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.height);
        ctx.stroke();
      }

      for (const s of this.bgStars) {
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      }

      ctx.fillStyle = '#1e1145';
      ctx.fillRect(0, 172, this.width, 8);
      ctx.fillStyle = '#3b1d75';
      ctx.fillRect(0, 170, this.width, 2);

      // Render Falling Items
      for (const item of this.items) {
        const ix = Math.floor(item.x);
        const iy = Math.floor(item.y);
        if (item.type === 'heart') {
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(ix + 2, iy, 3, 2);
          ctx.fillRect(ix + 7, iy, 3, 2);
          ctx.fillRect(ix, iy + 2, 12, 4);
          ctx.fillRect(ix + 2, iy + 6, 8, 2);
          ctx.fillRect(ix + 4, iy + 8, 4, 2);
          ctx.fillRect(ix + 5, iy + 10, 2, 1);
          ctx.fillStyle = '#fda4af';
          ctx.fillRect(ix + 2, iy + 2, 2, 2);
        } else {
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(ix + 4, iy, 4, 12);
          ctx.fillRect(ix, iy + 4, 12, 4);
          ctx.fillRect(ix + 2, iy + 2, 8, 8);
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(ix + 4, iy + 4, 4, 4);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(ix + 5, iy + 5, 2, 2);
        }
      }

      for (const p of this.particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      // Catcher Basket
      const cx = Math.floor(this.catcher.x);
      const cy = Math.floor(this.catcher.y);
      const cw = this.catcher.w;
      const ch = this.catcher.h;

      ctx.fillStyle = '#78350f';
      ctx.fillRect(cx + 4, cy + 2, cw - 8, ch - 2);

      ctx.fillStyle = '#b45309';
      for (let bx = cx + 6; bx < cx + cw - 6; bx += 6) {
        ctx.fillRect(bx, cy + 4, 3, ch - 6);
      }

      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(cx + 2, cy, cw - 4, 3);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(cx + 4, cy, cw - 8, 1);

      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(cx, cy + 2, 3, 5);
      ctx.fillRect(cx + cw - 3, cy + 2, 3, 5);

      ctx.fillStyle = '#ec4899';
      ctx.fillRect(cx + cw / 2 - 2, cy + 5, 4, 4);
      ctx.fillStyle = '#fbcfe8';
      ctx.fillRect(cx + cw / 2 - 1, cy + 6, 2, 2);

      // Victory overlay when game ends at 23 stars
      if (this.isCompleted) {
        ctx.fillStyle = 'rgba(7, 3, 24, 0.82)';
        ctx.fillRect(16, 46, this.width - 32, 62);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(16, 46, this.width - 32, 62);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('★ 23 / 23 STARS COLLECTED! ★', this.width / 2, 70);

        ctx.fillStyle = '#f472b6';
        ctx.font = '10px monospace';
        ctx.fillText('SECRET HINT UNLOCKED BELOW ↓', this.width / 2, 90);
        ctx.textAlign = 'left';
      }
    }
  }

  const starGame = miniGameCanvas ? new StarCatcherMiniGame(miniGameCanvas) : null;

  // --- Modals, Scroll Locking & Favorite Song Controls ---
  let isBodyScrollLocked = false;
  let savedBodyScrollY = 0;

  function lockBodyScroll() {
    if (!isBodyScrollLocked) {
      savedBodyScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedBodyScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
      isBodyScrollLocked = true;
    }
  }

  function unlockBodyScroll() {
    if (isBodyScrollLocked) {
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('left');
      document.body.style.removeProperty('right');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('overflow');
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      isBodyScrollLocked = false;
      window.scrollTo(0, savedBodyScrollY);
    }
  }

  // --- Hint Modal Interactions ---
  function openHintModal() {
    audioEngine.playClick();
    lockBodyScroll();
    hintBackdrop.classList.remove('hidden');
    hintBackdrop.setAttribute('aria-hidden', 'false');
    if (hintDialog) hintDialog.scrollTop = 0;
    if (closeHintBtn) closeHintBtn.focus();
    if (starGame) {
      if (!starGame.isUnlocked) {
        starGame.reset();
      }
      starGame.start();
    }
  }

  function closeHintModal() {
    audioEngine.playClick();
    unlockBodyScroll();
    if (starGame) starGame.stop();
    hintBackdrop.classList.add('hidden');
    hintBackdrop.setAttribute('aria-hidden', 'true');
    if (codeInput) {
      codeInput.focus();
    }
  }

  if (hintModalBtn) hintModalBtn.addEventListener('click', openHintModal);
  if (closeHintBtn) closeHintBtn.addEventListener('click', closeHintModal);
  if (closeHintTopBtn) closeHintTopBtn.addEventListener('click', closeHintModal);

  if (hintBackdrop) {
    let pointerDownTarget = null;
    let pointerDownY = 0;

    hintBackdrop.addEventListener('pointerdown', (e) => {
      pointerDownTarget = e.target;
      pointerDownY = e.clientY;
    });

    hintBackdrop.addEventListener('click', (e) => {
      if (e.target === hintBackdrop && pointerDownTarget === hintBackdrop) {
        const moved = Math.abs(e.clientY - pointerDownY);
        if (moved < 8) {
          closeHintModal();
        }
      }
    });

    // Prevent iOS background drag when touching the backdrop overlay
    hintBackdrop.addEventListener('touchmove', (e) => {
      if (e.target === hintBackdrop) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // --- Favorite Song ("UNETHICAL" by Faouzia) Handlers ---
  const FAV_SONG_EMBED_URL = 'https://www.youtube-nocookie.com/embed/I1zqCX3Dvxo?autoplay=1&playsinline=1&enablejsapi=1';

  function playFavoriteSong() {
    audioEngine.playSparklePop();

    // Pause 8-bit chiptune background music to prevent audio clash
    if (audioEngine.isMusicPlaying) {
      audioEngine.stopMusic();
      if (musicToggleBtn) {
        const txt = musicToggleBtn.querySelector('.music-text');
        if (txt) txt.textContent = 'Music: OFF';
        musicToggleBtn.classList.remove('music-playing');
      }
    }

    // Set YouTube embed src if not already loaded
    if (favSongIframe && (!favSongIframe.src || favSongIframe.src === 'about:blank' || !favSongIframe.src.includes('I1zqCX3Dvxo'))) {
      favSongIframe.src = FAV_SONG_EMBED_URL;
    }

    // Hide floating jukebox bar if open
    if (floatingMusicBar) {
      floatingMusicBar.classList.add('hidden');
    }

    // Show modal dialog and lock background scroll
    if (favoriteSongBackdrop) {
      favoriteSongBackdrop.classList.remove('hidden');
      favoriteSongBackdrop.setAttribute('aria-hidden', 'false');
    }
    if (favoriteSongDialog) {
      favoriteSongDialog.scrollTop = 0;
    }
    lockBodyScroll();

    // Sparkle burst
    partyEngine.burst(window.innerWidth / 2, window.innerHeight * 0.45, 60);
  }

  function minimizeFavoriteSong() {
    audioEngine.playClick();

    // Hide modal backdrop and restore body scroll
    if (favoriteSongBackdrop) {
      favoriteSongBackdrop.classList.add('hidden');
      favoriteSongBackdrop.setAttribute('aria-hidden', 'true');
    }
    unlockBodyScroll();

    // Reveal floating bottom bar so track keeps playing while reading letter
    if (floatingMusicBar) {
      floatingMusicBar.classList.remove('hidden');
    }
  }

  function expandFavoriteSong() {
    audioEngine.playClick();

    // Hide floating bottom bar
    if (floatingMusicBar) {
      floatingMusicBar.classList.add('hidden');
    }

    // Show modal dialog
    if (favoriteSongBackdrop) {
      favoriteSongBackdrop.classList.remove('hidden');
      favoriteSongBackdrop.setAttribute('aria-hidden', 'false');
    }
    if (favoriteSongDialog) {
      favoriteSongDialog.scrollTop = 0;
    }
    lockBodyScroll();
  }

  function stopFavoriteSong() {
    audioEngine.playClick();

    // Terminate playback immediately by wiping src
    if (favSongIframe) {
      favSongIframe.src = '';
    }

    // Hide floating bar and modal backdrop
    if (floatingMusicBar) {
      floatingMusicBar.classList.add('hidden');
    }
    if (favoriteSongBackdrop) {
      favoriteSongBackdrop.classList.add('hidden');
      favoriteSongBackdrop.setAttribute('aria-hidden', 'true');
    }

    unlockBodyScroll();
  }

  // Favorite Song Event Listeners
  if (favSongBarBtn) favSongBarBtn.addEventListener('click', playFavoriteSong);
  if (playFavoriteSongBtn) playFavoriteSongBtn.addEventListener('click', playFavoriteSong);
  if (closeFavSongTopBtn) closeFavSongTopBtn.addEventListener('click', minimizeFavoriteSong);
  if (minimizeFavSongBtn) minimizeFavSongBtn.addEventListener('click', minimizeFavoriteSong);
  if (closeFavSongBtn) closeFavSongBtn.addEventListener('click', stopFavoriteSong);
  if (expandFavSongBtn) expandFavSongBtn.addEventListener('click', expandFavoriteSong);
  if (stopFloatingFavSongBtn) stopFloatingFavSongBtn.addEventListener('click', stopFavoriteSong);

  // Favorite Song Backdrop interactions
  if (favoriteSongBackdrop) {
    let songPointerTarget = null;
    let songPointerY = 0;

    favoriteSongBackdrop.addEventListener('pointerdown', (e) => {
      songPointerTarget = e.target;
      songPointerY = e.clientY;
    });

    favoriteSongBackdrop.addEventListener('click', (e) => {
      if (e.target === favoriteSongBackdrop && songPointerTarget === favoriteSongBackdrop) {
        const moved = Math.abs(e.clientY - songPointerY);
        if (moved < 8) {
          // Minimizing to floating jukebox ensures song is not accidentally cut off
          minimizeFavoriteSong();
        }
      }
    });

    favoriteSongBackdrop.addEventListener('touchmove', (e) => {
      if (e.target === favoriteSongBackdrop) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Global Escape Key Listener for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (favoriteSongBackdrop && !favoriteSongBackdrop.classList.contains('hidden')) {
        minimizeFavoriteSong();
      } else if (hintBackdrop && !hintBackdrop.classList.contains('hidden')) {
        closeHintModal();
      }
    }
  });

  // --- Form Submission & Validation ---
  if (unlockForm) {
    unlockForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredName = (nameInput.value || '').trim();
    const enteredCode = (codeInput.value || '').trim();

    // Check Name (Case-insensitive, whitespace-trimmed) & Secret Code
    const isNameCorrect = enteredName.toLowerCase() === CORRECT_NAME.toLowerCase();
    const isCodeCorrect = enteredCode === CORRECT_CODE;

    if (isNameCorrect && isCodeCorrect) {
      // SUCCESS!
      handleSuccessfulUnlock();
    } else {
      // INCORRECT!
      handleIncorrectAttempt(isNameCorrect);
    }
  });
}

  function handleIncorrectAttempt(isNameCorrect) {
    audioEngine.playErrorSound();

    // Shake unlock card
    unlockCard.classList.remove('shake-card');
    // Trigger reflow to restart animation
    void unlockCard.offsetWidth;
    unlockCard.classList.add('shake-card');

    // Friendly, playful feedback
    const friendlyMessages = [
      "Hmm... the magic words don't seem right ✨",
      "Not quite! Try again, birthday adventurer. 🌙",
      "The stars whisper that the code is waiting to be solved... 📜",
      "Almost there! Click the HINT button if you need a clue. 💡"
    ];
    const pickedMsg = friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];
    errorText.textContent = pickedMsg;
    errorMsg.classList.remove('hidden');

    // Clear incorrect code, preserve name, focus code
    codeInput.value = '';
    codeInput.focus();
  }

  function handleSuccessfulUnlock() {
    errorMsg.classList.add('hidden');
    audioEngine.playSuccessFanfare();

    // Dynamically reveal celebratory tab title now that surprise is unlocked!
    document.title = `Happy Birthday, ${CORRECT_NAME}! 🎂✨`;

    // Screen Flash Effect
    screenFlash.classList.add('active');
    setTimeout(() => {
      screenFlash.classList.remove('active');
    }, 350);

    // Initial Confetti & Particle Shower
    partyEngine.burst(window.innerWidth / 2, window.innerHeight * 0.4, 140);
    partyEngine.startContinuousConfetti();

    // Auto-start cozy chiptune music upon unlock!
    audioEngine.startMusic();
    musicToggleBtn.querySelector('.music-text').textContent = 'Music: ON';
    musicToggleBtn.classList.add('music-playing');

    // Transition stages smoothly
    unlockStage.classList.remove('active');
    unlockStage.classList.add('hidden');

    celebrationStage.classList.remove('hidden');
    celebrationStage.classList.add('active');

    // Scroll to top of celebration stage smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render Heartfelt Birthday Letter
    renderBirthdayLetter();
  }

  // --- Render Heartfelt Birthday Letter ---
  function renderBirthdayLetter() {
    birthdayMessageContainer.innerHTML = '';

    // Reset scroll wrapper position and restore hint
    if (letterScrollWrapper) {
      letterScrollWrapper.scrollTop = 0;
    }
    if (letterScrollHint) {
      letterScrollHint.classList.remove('scrolled');
    }

    // Split paragraphs
    const rawParagraphs = BIRTHDAY_MESSAGE
      .trim()
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    rawParagraphs.forEach((para, index) => {
      const pElem = document.createElement('p');
      pElem.className = 'letter-paragraph';
      pElem.style.animationDelay = `${0.6 + index * 0.35}s`;

      // Check if paragraph contains list items (starts with ✨)
      if (para.includes('✨')) {
        const lines = para.split('\n');
        const listWrapper = document.createElement('ul');
        listWrapper.className = 'letter-wish-list';

        lines.forEach(line => {
          const cleanLine = line.replace(/^[✨\s*-]+/, '').trim();
          if (cleanLine.length > 0) {
            const li = document.createElement('li');
            li.textContent = cleanLine;
            listWrapper.appendChild(li);
          }
        });
        pElem.appendChild(listWrapper);
      } else {
        // Highlight custom names and celebratory phrases
        let formatted = para
          .replace(new RegExp(`\\b${CORRECT_NAME}\\b`, 'gi'), `<span class="highlight-gold">${CORRECT_NAME}</span>`)
          .replace(/Happy Birthday/gi, '<span class="highlight-pink">Happy Birthday</span>')
          .replace(/(no matter how many times I say thank you, it will never feel like enough|thank you from the bottom of my soul|thank you for existing|No amount of words or gratitude could ever truly repay|I could never describe how much I love you)/gi, '<span class="highlight-quote">$1</span>');

        pElem.innerHTML = formatted;
      }

      birthdayMessageContainer.appendChild(pElem);
    });
  }

  // --- Interactive Birthday Cake & Make a Wish ---
  let isCandleLit = true;

  function blowOutCandles() {
    if (!isCandleLit) return;
    isCandleLit = false;

    audioEngine.playCandleBlow();

    // Hide flames, show pixel smoke trails
    cakeFlames.classList.add('blown-out');
    cakeSmoke.classList.remove('hidden');

    // Sparkle burst from cake position
    const rect = pixelCake.getBoundingClientRect();
    partyEngine.burst(rect.left + rect.width / 2, rect.top + 30, 80);

    // Update Prompt & Reveal Wish Banner
    cakePromptText.textContent = "Wish Made! ✨";
    wishBanner.classList.remove('hidden');
    relightCandlesBtn.classList.remove('hidden');
  }

  function relightCandles() {
    if (isCandleLit) return;
    isCandleLit = true;

    audioEngine.playSparklePop();
    cakeFlames.classList.remove('blown-out');
    cakeSmoke.classList.add('hidden');
    cakePromptText.textContent = "Click the candles to make a wish!";
    wishBanner.classList.add('hidden');
    relightCandlesBtn.classList.add('hidden');
  }

  pixelCake.addEventListener('click', blowOutCandles);
  pixelCake.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      blowOutCandles();
    }
  });
  relightCandlesBtn.addEventListener('click', relightCandles);

  // --- Interactive Gift Box ---
  let isGiftOpened = false;
  pixelGiftBox.addEventListener('click', () => {
    isGiftOpened = !isGiftOpened;
    audioEngine.playSparklePop();

    if (isGiftOpened) {
      pixelGiftBox.classList.add('opened');
      giftSurpriseModal.classList.remove('hidden');
      const rect = pixelGiftBox.getBoundingClientRect();
      partyEngine.burst(rect.left + rect.width / 2, rect.top, 50);
    } else {
      pixelGiftBox.classList.remove('opened');
      giftSurpriseModal.classList.add('hidden');
    }
  });

  pixelGiftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pixelGiftBox.click();
    }
  });

  // --- Extra Confetti & Sparkles Button ---
  extraConfettiBtn.addEventListener('click', () => {
    audioEngine.playSparklePop();
    partyEngine.burst(window.innerWidth / 2, window.innerHeight * 0.4, 90);
  });

  // --- Replay Button Interaction ---
  replayBtn.addEventListener('click', () => {
    audioEngine.playClick();
    audioEngine.playSuccessFanfare();

    // Screen flash
    screenFlash.classList.add('active');
    setTimeout(() => {
      screenFlash.classList.remove('active');
    }, 300);

    // Scroll top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Restart cake candles if blown out
    relightCandles();

    // Re-burst confetti
    partyEngine.burst(window.innerWidth / 2, window.innerHeight * 0.35, 120);

    // Replay message animation
    renderBirthdayLetter();
  });

  // --- Direct Link Handling (URL Query Params & Hash) ---
  // Works on GitHub Pages, custom domains, or local files:
  // - https://USERNAME.github.io/REPOSITORY-NAME/?unlock=true
  // - https://USERNAME.github.io/REPOSITORY-NAME/?name=Raine&code=2003
  // - https://USERNAME.github.io/REPOSITORY-NAME/#unlock
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramName = urlParams.get('name');
    const paramCode = urlParams.get('code');
    const isDirectUnlock = urlParams.get('unlock') === 'true' || window.location.hash === '#unlock';

    if (paramName) {
      nameInput.value = paramName;
    }
    if (paramCode) {
      codeInput.value = paramCode;
    }

    if (isDirectUnlock || (paramName && paramCode && paramName.toLowerCase() === CORRECT_NAME.toLowerCase() && paramCode === CORRECT_CODE)) {
      if (!nameInput.value) nameInput.value = CORRECT_NAME;
      if (!codeInput.value) codeInput.value = CORRECT_CODE;

      // Ensure audio context starts on first touch/click anywhere if auto-unlocked
      const triggerAudioOnFirstTap = () => {
        if (!audioEngine.isMusicPlaying) {
          audioEngine.startMusic();
          musicToggleBtn.querySelector('.music-text').textContent = 'Music: ON';
          musicToggleBtn.classList.add('music-playing');
        }
        window.removeEventListener('click', triggerAudioOnFirstTap);
        window.removeEventListener('touchstart', triggerAudioOnFirstTap);
      };
      window.addEventListener('click', triggerAudioOnFirstTap);
      window.addEventListener('touchstart', triggerAudioOnFirstTap);

      // Perform unlock transition smoothly
      setTimeout(() => {
        handleSuccessfulUnlock();
      }, 400);
    }
  } catch (err) {
    console.warn('URL param check skipped:', err);
  }
});
