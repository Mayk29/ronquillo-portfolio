import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements AfterViewInit {

  ngAfterViewInit() {
    // ── 1. Skill bar animation (re-triggers every time chart enters viewport) ──
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const bars = entry.target.querySelectorAll<HTMLElement>('.bar');
        if (entry.isIntersecting) {
          // Animate bars up to their data-level
          bars.forEach(bar => {
            const level = bar.getAttribute('data-level') || '0';
            bar.style.height = level + '%';
          });
        } else {
          // Reset bars to 0 so they animate again next time
          bars.forEach(bar => {
            bar.style.height = '0%';
          });
        }
      });
    }, { threshold: 0.3 });

    const chartEl = document.getElementById('skillsChart');
    if (chartEl) barObserver.observe(chartEl);

    // ── 2. Scroll-reveal: add is-visible on enter, remove on leave ────────
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Observe all elements that should reveal on scroll
    document.querySelectorAll('[data-reveal]').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ── Smooth scroll helper ────────────────────────────────────────────────
  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}