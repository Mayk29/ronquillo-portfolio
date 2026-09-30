import { Injectable } from '@angular/core';

type Sfx = 'click' | 'hover';

/**
 * Low-latency UI sound effects.
 *
 * Plain <audio> elements add decode/seek latency on every play() (worst on phones) and were being
 * re-created whenever a component was. Instead, each effect is fetched and decoded once into an
 * AudioBuffer and started through the Web Audio API, which begins playback immediately and lets
 * rapid triggers overlap instead of cutting each other off.
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private static readonly FILES: Record<Sfx, { url: string; volume: number }> = {
    click: { url: 'click.mp3', volume: 0.5 },
    hover: { url: 'hover.mp3', volume: 0.4 },
  };

  private ctx: AudioContext | null = null;
  private buffers: Partial<Record<Sfx, AudioBuffer>> = {};
  // Touch screens fire a synthetic mouseenter on tap, which would stack a hover sound on the click sound
  private readonly hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  constructor() {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new Ctx();
    } catch {
      return;
    }
    (Object.keys(SoundService.FILES) as Sfx[]).forEach(name => this.load(name));
    // Browsers keep the context suspended until the first user gesture
    const unlock = () => {
      this.ctx?.resume();
      ['pointerdown', 'touchstart', 'keydown'].forEach(ev => document.removeEventListener(ev, unlock));
    };
    ['pointerdown', 'touchstart', 'keydown'].forEach(ev => document.addEventListener(ev, unlock, { passive: true }));
  }

  private async load(name: Sfx) {
    try {
      const res = await fetch(SoundService.FILES[name].url);
      this.buffers[name] = await this.ctx!.decodeAudioData(await res.arrayBuffer());
    } catch {
      // Sounds are decorative; the site works without them
    }
  }

  playClick() {
    this.play('click');
  }

  playHover() {
    if (this.hasHover) this.play('hover');
  }

  private play(name: Sfx) {
    const ctx = this.ctx;
    const buffer = this.buffers[name];
    if (!ctx || !buffer) return;
    if (ctx.state === 'suspended') ctx.resume();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = SoundService.FILES[name].volume;
    source.connect(gain).connect(ctx.destination);
    source.start(0);
  }
}
