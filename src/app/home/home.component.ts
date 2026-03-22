import { Component, OnInit, OnDestroy } from '@angular/core';
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

  cards = [
    {
      label: 'Home',
      icon: 'fa-solid fa-house',
      bg: 'bg.PNG',
      title: 'Michael Ronquillo',
      desc: 'An Information Technology Web-development student who recently graduated at Holy Angel University in Batch 2025-2026. Proven skills in HTML, CSS, JavaScript, NodeJS, MySQL and AngularJS. Seeking a Full-stack Developer role.',
      link: null,
      external: false,
    },
    {
      label: 'About',
      icon: 'fa-solid fa-user',
      bg: 'about-card.png',
      title: 'About Me',
      desc: 'I am a passionate Full-Stack developer who loves building beautiful and functional web experiences. I am always eager to learn new technologies and grow as a developer.',
      link: 'https://about-ronquillo.carrd.co/',
      external: true,
    },
    {
      label: 'Projects',
      icon: 'fa-solid fa-folder-open',
      bg: 'projects.png',
      title: 'My Projects',
      desc: 'Explore my best works from responsive websites to interactive web apps built through my exoeriences as a student, OJT intern and real-world project with clients.',
      link: 'https://ronquillo-best-artefacts.carrd.co/',
      external: true,
    },
    {
      label: 'References',
      icon: 'fa-solid fa-users',
      bg: 'references.png',
      title: 'References',
      desc: 'Testimonials and references from professors, mentors, and clients who have worked with me.',
      link: 'https://ronquillo-references-testimonial.carrd.co/',
      external: true,
    },
    {
      label: 'Certificates',
      icon: 'fa-solid fa-certificate',
      bg: 'bg.PNG',
      title: 'My Certificates',
      desc: 'Verified credentials and certifications I have earned, including Google Analytics, FreeCodeCamp Responsive Web Design, and JavaScript Algorithms.',
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

  private hoverSound = new Audio('hover.mp3');
  private clickSound = new Audio('click.mp3');

  setActive(index: number) {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(() => {});
    this.activeIndex = index;
  }

  playHoverSound() {
    this.hoverSound.currentTime = 0;
    this.hoverSound.play().catch(() => {});
  }

  playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(() => {});
  }

  ngOnInit() {}
  ngOnDestroy() {}
}