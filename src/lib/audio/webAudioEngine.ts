// Browser-native Web Audio API Engine for Sādhana

export class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Solfeggio & Binaural Beat nodes
  private oscLeft: OscillatorNode | null = null;
  private oscRight: OscillatorNode | null = null;
  private pannerLeft: StereoPannerNode | null = null;
  private pannerRight: StereoPannerNode | null = null;
  private freqGain: GainNode | null = null;

  // Tanpura Drone nodes
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  // Ambient Nature Filtered Noise node
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseGain: GainNode | null = null;

  private isInitialized = false;
  private activeFrequency: number | null = null;

  public init(): boolean {
    if (this.isInitialized && this.ctx) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.isInitialized = true;
      return true;
    } catch (e) {
      console.error("WebAudioEngine init failed:", e);
      return false;
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public startSolfeggio(frequencyHz: number, binauralBeatHz: number = 0, volume: number = 0.3) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.stopSolfeggio();

    this.activeFrequency = frequencyHz;
    this.freqGain = this.ctx.createGain();
    this.freqGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.freqGain.connect(this.masterGain);

    if (binauralBeatHz > 0 && typeof this.ctx.createStereoPanner === "function") {
      // Stereo Binaural Beat
      this.oscLeft = this.ctx.createOscillator();
      this.oscRight = this.ctx.createOscillator();

      this.pannerLeft = this.ctx.createStereoPanner();
      this.pannerRight = this.ctx.createStereoPanner();

      this.pannerLeft.pan.setValueAtTime(-0.8, this.ctx.currentTime);
      this.pannerRight.pan.setValueAtTime(0.8, this.ctx.currentTime);

      this.oscLeft.type = "sine";
      this.oscRight.type = "sine";

      this.oscLeft.frequency.setValueAtTime(frequencyHz, this.ctx.currentTime);
      this.oscRight.frequency.setValueAtTime(frequencyHz + binauralBeatHz, this.ctx.currentTime);

      this.oscLeft.connect(this.pannerLeft);
      this.pannerLeft.connect(this.freqGain);

      this.oscRight.connect(this.pannerRight);
      this.pannerRight.connect(this.freqGain);

      this.oscLeft.start();
      this.oscRight.start();
    } else {
      // Single Pure Frequency Sine
      this.oscLeft = this.ctx.createOscillator();
      this.oscLeft.type = "sine";
      this.oscLeft.frequency.setValueAtTime(frequencyHz, this.ctx.currentTime);
      this.oscLeft.connect(this.freqGain);
      this.oscLeft.start();
    }
  }

  public setSolfeggioVolume(vol: number) {
    if (this.freqGain && this.ctx) {
      this.freqGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
    }
  }

  public stopSolfeggio() {
    if (this.oscLeft) {
      try { this.oscLeft.stop(); } catch {}
      this.oscLeft.disconnect();
      this.oscLeft = null;
    }
    if (this.oscRight) {
      try { this.oscRight.stop(); } catch {}
      this.oscRight.disconnect();
      this.oscRight = null;
    }
    this.activeFrequency = null;
  }

  // Synthesize Tibetan Singing Bowl Bell Chime for Breath Phase Transitions
  public playPhaseBell(frequency: number = 432, durationSec: number = 2.5) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const bellOsc1 = this.ctx.createOscillator();
    const bellOsc2 = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    // Harmonic bell overtones
    bellOsc1.type = "sine";
    bellOsc2.type = "sine";

    bellOsc1.frequency.setValueAtTime(frequency, now);
    bellOsc2.frequency.setValueAtTime(frequency * 2.76, now); // Overtone ratio

    bellGain.gain.setValueAtTime(0.001, now);
    bellGain.gain.exponentialRampToValueAtTime(0.25, now + 0.03); // Fast attack
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec); // Exponential decay

    bellOsc1.connect(bellGain);
    bellOsc2.connect(bellGain);
    bellGain.connect(this.masterGain);

    bellOsc1.start(now);
    bellOsc2.start(now);
    bellOsc1.stop(now + durationSec);
    bellOsc2.stop(now + durationSec);
  }

  // Tanpura Acoustic Drone Generator
  public startTanpuraDrone(rootFreqHz: number = 136.1, volume: number = 0.25) { // 136.1Hz is OM tuning (C#)
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.stopTanpuraDrone();

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    // Fundamental (Sa)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = "triangle";
    this.droneOsc1.frequency.setValueAtTime(rootFreqHz, this.ctx.currentTime);

    // Fifth Overtone (Pa)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = "sine";
    this.droneOsc2.frequency.setValueAtTime(rootFreqHz * 1.5, this.ctx.currentTime);

    this.droneOsc1.connect(this.droneGain);
    this.droneOsc2.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  public stopTanpuraDrone() {
    if (this.droneOsc1) {
      try { this.droneOsc1.stop(); } catch {}
      this.droneOsc1.disconnect();
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try { this.droneOsc2.stop(); } catch {}
      this.droneOsc2.disconnect();
      this.droneOsc2 = null;
    }
  }

  public setMasterVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
    }
  }

  public stopAll() {
    this.stopSolfeggio();
    this.stopTanpuraDrone();
    if (this.ctx && this.ctx.state !== "closed") {
      try {
        this.ctx.suspend();
      } catch {}
    }
  }

  public getActiveFrequency(): number | null {
    return this.activeFrequency;
  }
}

export const audioSingleton = new WebAudioEngine();
