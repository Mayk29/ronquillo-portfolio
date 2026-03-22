import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare const AOS: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  skills = [
    { name: 'HTML', level: 85 },
    { name: 'CSS', level: 80 },
    { name: 'JS', level: 70 },
    { name: 'Tailwind', level: 65 },
    { name: 'Bootstrap', level: 60 },
    { name: 'WordPress', level: 55 },
    { name: 'Angular', level: 50 },
    { name: 'SEO', level: 60 },
  ];

  certificates = [
    'AWS Academy Graduate - AWS Academy Cloud Foundations',
    'Google Analytics Certification',
    'CompTIA IT Fundamentals (ITF+) Certification (CompTIA)',
    'SEO II (HubSpot Academy)',
    'SEO I (HubSpot Academy)',
    'Responsive Web Design (freeCodeCamp)',
    'Legacy JavaScript Algorithms and Data Structures (freeCodeCamp)',
    'Work with Components in Figma (Coursera)',
    'Cyber Threat Management (Cisco)',
  ];

  animatedBars = false;

  ngOnInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ offset: 0 });
    }
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animatedBars = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const skillsEl = document.querySelector('.skills-chart');
    if (skillsEl) observer.observe(skillsEl);
  }
}
