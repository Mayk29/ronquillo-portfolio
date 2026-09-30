import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

/**
 * Emits swipeLeft / swipeRight for horizontal touch swipes on the host element.
 * Touch-only, so mouse users are unaffected. A gesture counts only when it is clearly
 * horizontal, which leaves vertical page scrolling and taps on buttons untouched.
 */
@Directive({ selector: '[appSwipe]', standalone: true })
export class SwipeDirective implements OnInit, OnDestroy {
  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();

  private static readonly MIN_DISTANCE = 50;
  private static readonly MAX_DURATION_MS = 700;
  // Elements that need horizontal gestures for themselves
  private static readonly IGNORE = 'video, input, textarea, select, [data-no-swipe]';
  // Swipes starting on the far-left edge belong to the nav drawer (and the OS back gesture)
  static readonly EDGE_GUARD_PX = 28;

  private startX = 0;
  private startY = 0;
  private startTime = 0;
  private tracking = false;

  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit() {
    const el = this.host.nativeElement;
    this.zone.runOutsideAngular(() => {
      el.addEventListener('touchstart', this.onStart, { passive: true });
      el.addEventListener('touchend', this.onEnd, { passive: true });
      el.addEventListener('touchcancel', this.onCancel, { passive: true });
    });
  }

  ngOnDestroy() {
    const el = this.host.nativeElement;
    el.removeEventListener('touchstart', this.onStart);
    el.removeEventListener('touchend', this.onEnd);
    el.removeEventListener('touchcancel', this.onCancel);
  }

  private onStart = (e: TouchEvent) => {
    const target = e.target as Element | null;
    if (e.touches.length !== 1 || target?.closest(SwipeDirective.IGNORE) || e.touches[0].clientX < SwipeDirective.EDGE_GUARD_PX) {
      this.tracking = false;
      return;
    }
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    this.startTime = Date.now();
    this.tracking = true;
  };

  private onEnd = (e: TouchEvent) => {
    if (!this.tracking) return;
    this.tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - this.startX;
    const dy = t.clientY - this.startY;
    if (Date.now() - this.startTime > SwipeDirective.MAX_DURATION_MS) return;
    if (Math.abs(dx) < SwipeDirective.MIN_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    this.zone.run(() => (dx < 0 ? this.swipeLeft : this.swipeRight).emit());
  };

  private onCancel = () => {
    this.tracking = false;
  };
}
