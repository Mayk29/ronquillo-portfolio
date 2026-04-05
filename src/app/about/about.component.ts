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
    // Animate skill bars when the chart scrolls into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll<HTMLElement>('.bar');
          bars.forEach(bar => {
            const level = bar.getAttribute('data-level') || '0';
            bar.style.height = level + '%';
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const chartEl = document.getElementById('skillsChart');
    if (chartEl) observer.observe(chartEl);
  }

  // Scroll Button
  scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // adjust
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
}
