import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  activeIndex = 0;
  isMobile = false;
  visibleCards: any[] = [];

  // Loading screen 
  isLoading = !sessionStorage.getItem('portfolioBootPlayed');

  loadingProgress = 0;
  loadingStatusText = 'INITIALIZING SYSTEM...';
  loadingLines: string[] = [];

  private readonly BOOT_SESSION_KEY = 'portfolioBootPlayed';

  private readonly bootSequence = [
    { pct: 5,  text: 'INITIALIZING SYSTEM...',         line: '[ OK ] Core modules initialized' },
    { pct: 12, text: 'LOADING ASSETS...',               line: '[ OK ] Asset manifests loaded' },
    { pct: 22, text: 'DECRYPTING DATA...',              line: '[ OK ] Encryption keys verified' },
    { pct: 33, text: 'AUTHENTICATING USER...',          line: '[ OK ] Identity confirmed: M.RONQUILLO' },
    { pct: 44, text: 'COMPILING PORTFOLIO...',          line: '[ OK ] Projects indexed — 6 entries found' },
    { pct: 55, text: 'ESTABLISHING CONNECTION...',      line: '[ OK ] Secure channel established' },
    { pct: 66, text: 'LOADING CERTIFICATES...',         line: '[ OK ] Credentials validated' },
    { pct: 75, text: 'CALIBRATING INTERFACE...',        line: '[ OK ] UI components registered' },
    { pct: 85, text: 'SYNCING REFERENCES...',           line: '[ OK ] Reference nodes linked' },
    { pct: 94, text: 'FINALIZING...',                   line: '[ OK ] All systems nominal' },
    { pct: 100, text: 'LAUNCH READY',                   line: '[ OK ] Welcome, Operator.' },
  ];

  //  Audio
  private audioContext: AudioContext | null = null;
  private bgmBuffer: AudioBuffer | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private bgmGainNode: GainNode | null = null;
  private bgmIsPlaying = false;
  private bgmFallback = new Audio('game-loading.mp3');
  private usingFallback = false;

  // SFX — pool hover sounds to prevent rapid-fire audio choke
  private clickSound = new Audio('click.mp3');
  private hoverPool: HTMLAudioElement[] = [];
  private hoverPoolIndex = 0;
  private readonly HOVER_POOL_SIZE = 4;

  private loadingTimer: any;
  private stepIndex = 0;
  // pendingBgmPlay now means "buffer is ready, play as soon as context is running"
  private pendingBgmPlay = false;
  private userHasInteracted = false;
  private unlockHandler!: () => void;

  // Cards 
  private readonly VISIBLE = 3;

  cards = [
    {
      label: 'Home',
      icon: 'fa-solid fa-house',
      bg: 'bg.PNG',
      title: 'Michael Ronquillo',
      desc: 'A flexible developer working as a Frontend Developer, Full Stack Developer, Web Developer, or SEO Developer depending on the project. Currently a Junior Frontend Developer at Cellwego PH, with freelance experience for direct clients.',
      link: null,
      external: false,
    },
    {
      label: 'About',
      icon: 'fa-solid fa-user',
      bg: 'about-card.png',
      title: 'About Me',
      desc: 'I am a passionate, flexible developer — Frontend, Full Stack, Web Development, or SEO — who loves building aesthetic and functional web experiences. I am always eager to learn new technologies and grow as a developer.',
      link: 'about',
      external: false,
    },
    {
      label: 'Projects',
      icon: 'fa-solid fa-folder-open',
      bg: 'projects.png',
      title: 'My Projects',
      desc: 'Explore my best works from responsive websites to interactive web apps built through my experiences as a student, OJT intern and real-world project with clients.',
      link: '/projects',
      external: false,
    },
    {
      label: 'References',
      icon: 'fa-solid fa-users',
      bg: 'references.png',
      title: 'References',
      desc: 'Testimonials and references from professors, mentors, and clients who have worked with me.',
      link: '/references',
      external: false,
    },
    {
      label: 'Certificates',
      icon: 'fa-solid fa-certificate',
      bg: 'certs.png',
      title: 'My Certificates',
      desc: 'Verified credentials and certifications I have earned, including CompTia ITF+, Google Analytics, FreeCodeCamp Responsive Web Design, and JavaScript Algorithms.',
      link: '/certificates',
      external: false,
    },
    {
      label: 'Contact',
      icon: 'fa-solid fa-envelope',
      bg: 'contact.png',
      title: "Let's Connect",
      desc: 'Have a project in mind or want to hire me? Reach out and I will get back to you as soon as possible.',
      link: '/contact',
      external: false,
    },
  ];

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
    this.updateVisibleCards();
    this.initAudio();

    if (sessionStorage.getItem(this.BOOT_SESSION_KEY)) {
      // Return visit — skip boot, BGM will play on first interaction
      this.pendingBgmPlay = true;
    } else {
      // First visit — full boot sequence
      this.startLoadingSequence();
    }
  }

  // Audio init 
  private initAudio() {
    // Hover pool
    for (let i = 0; i < this.HOVER_POOL_SIZE; i++) {
      const a = new Audio('hover.mp3');
      a.volume = 0.4;
      this.hoverPool.push(a);
    }
    this.clickSound.volume = 0.5;
    this.bgmFallback.loop = true;
    this.bgmFallback.volume = 0.2;
    this.preloadBgmBuffer();

    // Unlock handler — fires on the very first user gesture
    this.unlockHandler = () => {
      if (this.userHasInteracted) return;
      this.userHasInteracted = true;

      if (this.audioContext && this.audioContext.state === 'suspended') {
        // Resume the context (satisfies autoplay policy) then play immediately
        this.audioContext.resume().then(() => {
          if (this.pendingBgmPlay && !this.bgmIsPlaying) {
            if (this.bgmBuffer) {
              // Buffer already decoded — start instantly, no extra fetch/decode lag
              this.startBgmBuffer();
            } else {
              // Buffer still loading (slow network) — fall through to fallback
              this.activateFallback();
            }
          }
        });
      } else if (this.pendingBgmPlay && !this.bgmIsPlaying) {
        // Context already running (some browsers allow immediate play)
        if (this.bgmBuffer) {
          this.startBgmBuffer();
        } else {
          this.activateFallback();
        }
      }
    };

    document.addEventListener('click', this.unlockHandler);
    document.addEventListener('keydown', this.unlockHandler);
    document.addEventListener('touchstart', this.unlockHandler);
  }

  // Pre-fetch + decode audio BEFORE any gesture 
  private async preloadBgmBuffer() {
    try {
      // Create AudioContext 
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const res = await fetch('game-loading.mp3');
      const arrayBuf = await res.arrayBuffer();
      this.bgmBuffer = await this.audioContext.decodeAudioData(arrayBuf);

      // If the context happened to start in 'running' state (some browsers / localhost) and BGM is already pending, play immediately.
      if (this.pendingBgmPlay && !this.bgmIsPlaying && this.audioContext.state === 'running') {
        this.startBgmBuffer();
      }
    } catch {
      // Preload failed — unlockHandler will fall back to HTMLAudioElement
    }
  }

  // BGM playback 
  private startBgmBuffer() {
    if (!this.audioContext || !this.bgmBuffer) return;

    try { this.bgmSource?.stop(); } catch {}

    this.bgmGainNode = this.audioContext.createGain();
    this.bgmGainNode.gain.value = 0.2;
    this.bgmGainNode.connect(this.audioContext.destination);

    this.bgmSource = this.audioContext.createBufferSource();
    this.bgmSource.buffer = this.bgmBuffer;
    this.bgmSource.loop = true;
    this.bgmSource.connect(this.bgmGainNode);
    this.bgmSource.start(0);
    this.bgmIsPlaying = true;
    this.pendingBgmPlay = false;
  }

  private activateFallback() {
    this.usingFallback = true;
    this.bgmFallback.currentTime = 0;
    this.bgmFallback.play().catch(() => {});
  }

  private stopBgm() {
    if (this.usingFallback) {
      this.bgmFallback.pause();
      this.bgmFallback.currentTime = 0;
    } else {
      try { this.bgmSource?.stop(); } catch {}
      this.bgmIsPlaying = false;
    }
  }

  // Loading sequence 
  private startLoadingSequence() {
    // Signal that BGM should start on first interaction
    this.pendingBgmPlay = true;
    this.runStep();
  }

  private runStep() {
    if (this.stepIndex >= this.bootSequence.length) return;

    const step = this.bootSequence[this.stepIndex];
    const delay = this.stepIndex === this.bootSequence.length - 1 ? 400 : 320;

    this.loadingTimer = setTimeout(() => {
      this.loadingProgress = step.pct;
      this.loadingStatusText = step.text;
      this.loadingLines = [...this.loadingLines, step.line];
      this.stepIndex++;

      if (this.stepIndex < this.bootSequence.length) {
        this.runStep();
      } else {
        setTimeout(() => {
          this.isLoading = false;
          sessionStorage.setItem(this.BOOT_SESSION_KEY, 'true');
        }, 900);
      }
    }, delay);
  }

  //  BGM mute toggle
  isMuted = false;

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.usingFallback) {
      this.bgmFallback.muted = this.isMuted;
    } else if (this.bgmGainNode) {
      this.bgmGainNode.gain.value = this.isMuted ? 0 : 0.2;
    }
  }

  // Card nav 
  private updateVisibleCards() {
    const total = this.cards.length;
    const half = Math.floor(this.VISIBLE / 2);
    const result = [];
    for (let offset = -half; offset <= half; offset++) {
      const idx = (this.activeIndex + offset + total) % total;
      result.push({ ...this.cards[idx], originalIndex: idx });
    }
    this.visibleCards = result;
  }

  carouselNext() {
    this.activeIndex = (this.activeIndex + 1) % this.cards.length;
    this.updateVisibleCards();
    this.playClickSound();
  }

  carouselPrev() {
    this.activeIndex = (this.activeIndex - 1 + this.cards.length) % this.cards.length;
    this.updateVisibleCards();
    this.playClickSound();
  }

  setActive(index: number) {
    this.activeIndex = index;
    this.updateVisibleCards();
    this.playClickSound();
  }

  playHoverSound() {
    const audio = this.hoverPool[this.hoverPoolIndex];
    this.hoverPoolIndex = (this.hoverPoolIndex + 1) % this.HOVER_POOL_SIZE;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(() => {});
  }

  ngOnDestroy() {
    clearTimeout(this.loadingTimer);
    this.stopBgm();
    this.audioContext?.close();
    document.removeEventListener('click', this.unlockHandler);
    document.removeEventListener('keydown', this.unlockHandler);
    document.removeEventListener('touchstart', this.unlockHandler);
  }
}