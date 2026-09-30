import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { SwipeDirective } from '../shared/swipe.directive';
import { SoundService } from '../shared/sound.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;

  // Touch gestures for the mobile drawer: swipe right from the left edge opens it, swipe left closes it
  private drawerGesture: { mode: 'open' | 'close'; x: number; y: number; t: number } | null = null;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('touchstart', this.onTouchStart, { passive: true });
      document.addEventListener('touchend', this.onTouchEnd, { passive: true });
    });
  }

  ngOnDestroy() {
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
  }

  private onTouchStart = (e: TouchEvent) => {
    this.drawerGesture = null;
    if (window.innerWidth > 820 || e.touches.length !== 1) return;
    const { clientX: x, clientY: y } = e.touches[0];
    if (this.menuOpen) this.drawerGesture = { mode: 'close', x, y, t: Date.now() };
    else if (x < SwipeDirective.EDGE_GUARD_PX) this.drawerGesture = { mode: 'open', x, y, t: Date.now() };
  };

  private onTouchEnd = (e: TouchEvent) => {
    const g = this.drawerGesture;
    this.drawerGesture = null;
    if (!g || Date.now() - g.t > 700) return;
    const dx = e.changedTouches[0].clientX - g.x;
    const dy = e.changedTouches[0].clientY - g.y;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (g.mode === 'open' && dx > 0) this.zone.run(() => (this.menuOpen = true));
    if (g.mode === 'close' && dx < 0) this.zone.run(() => (this.menuOpen = false));
  };

  private sound = inject(SoundService);

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  playHoverSound() {
    this.sound.playHover();
  }

  playClickSound() {
    this.sound.playClick();
  }
}