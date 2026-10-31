/**
 * Web Audio API synthesizer for offline educational use in school LAN.
 * Generates an Andean ambient melody (pentatonic scale) and educational sound effects
 * without requiring any external audio files or internet access.
 */

class EducationalAudioSystem {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private timerId: any = null;
  private volume: number = 0.25;

  // Andean Pentatonic scale in D: D4, F4, G4, A4, C5, D5
  private notes: number[] = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
  private step: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.musicGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.musicGain.gain.value = this.volume * 0.05;
        this.sfxGain.gain.value = 0.15;

        this.musicGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volPercent: number) {
    this.volume = Math.max(0, Math.min(1, volPercent / 100));
    if (this.musicGain) {
      this.musicGain.gain.value = this.volume * 0.05;
    }
  }

  public getVolume(): number {
    return Math.round(this.volume * 100);
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public toggleMusic(): boolean {
    this.initContext();
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  private startMusic() {
    if (!this.ctx || !this.musicGain) return;
    this.isMusicPlaying = true;
    this.playNextMusicNote();
  }

  private playNextMusicNote() {
    if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

    // Pick notes according to a gentle Andean melodic pattern
    const melodyPattern = [0, 2, 3, 4, 3, 2, 1, 0, 3, 4, 5, 4, 3, 2, 0];
    const noteFreq = this.notes[melodyPattern[this.step % melodyPattern.length]];
    this.step++;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'triangle'; // Warm flute/harp timbre
    osc.frequency.setValueAtTime(noteFreq, now);

    // Envelope
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 0.7);

    // Schedule next note every 450-600ms
    const delay = (this.step % 4 === 0) ? 800 : 450;
    this.timerId = setTimeout(() => this.playNextMusicNote(), delay);
  }

  private stopMusic() {
    this.isMusicPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public playSuccess() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      // Arpeggiated cheerful major chord
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        g.gain.setValueAtTime(0.12, now + idx * 0.09);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
        osc.connect(g);
        g.connect(this.sfxGain!);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.4);
      });
    } catch {
      // Audio not permitted yet
    }
  }

  public playHint() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(554.37, now + 0.15);
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  public playError() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.2);
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  public playCelebration() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      // Andean celebratory chime fanfare
      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        g.gain.setValueAtTime(0.14, now + idx * 0.12);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
        osc.connect(g);
        g.connect(this.sfxGain!);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.65);
      });
    } catch {}
  }
}

export const educationalAudio = new EducationalAudioSystem();
