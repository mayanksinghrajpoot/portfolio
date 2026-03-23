/**
 * Elite Audio Engine
 * Generates synthesized UI sounds using the Web Audio API.
 * Call playHoverSound() on element hover, playClickSound() on click.
 * Set window.isMuted = true to suppress all sounds.
 */

let ctx = null;

function getCtx() {
  if (!ctx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone({ freq = 400, endFreq = 100, gain = 0.04, duration = 0.12, type = 'sine', pan = 0 }) {
  if (typeof window === 'undefined' || window.isMuted) return;
  const ac = getCtx();
  if (!ac) return;
  try {
    const osc = ac.createOscillator();
    const gainNode = ac.createGain();
    const panner = ac.createStereoPanner();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 20), ac.currentTime + duration);

    gainNode.gain.setValueAtTime(gain, ac.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

    panner.pan.value = pan;

    osc.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration + 0.02);
  } catch (e) { /* ignore policy errors */ }
}

// ---- Public API ----

export function playHoverSound() {
  playTone({ freq: 480, endFreq: 260, gain: 0.03, duration: 0.09 });
}

export function playClickSound() {
  playTone({ freq: 600, endFreq: 120, gain: 0.05, duration: 0.08, type: 'triangle' });
}

export function playSuccessSound() {
  // Two-note chord: C5 + E5
  playTone({ freq: 523, endFreq: 523, gain: 0.04, duration: 0.3, type: 'sine', pan: -0.2 });
  setTimeout(() => playTone({ freq: 659, endFreq: 659, gain: 0.04, duration: 0.3, type: 'sine', pan: 0.2 }), 80);
}

export function playErrorSound() {
  playTone({ freq: 200, endFreq: 100, gain: 0.05, duration: 0.2, type: 'sawtooth' });
}
