import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Reference {
  name: string;
  role: string;
  organization: string;
  type: string;
  image: string;
  phone?: string;
  email?: string;
  link?: string;
  testimonial?: string;
  accentColor: string;
  accentLight: string;
  bgText: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [],
  templateUrl: './references.component.html',
  styleUrl: './references.component.css'
})
export class ReferencesComponent implements OnInit, OnDestroy  {
activeIndex = 0;
  isPlaying = true;
  private autoTimer: any;

  references: Reference[] = [
    {
      name: 'Mr. Chris Almocera, MIT',
      role: 'Practicum Coordinator, School of Computing',
      organization: 'Holy Angel University',
      type: 'Academic Reference',
      image: 'hau.png',
      phone: '09695763960',
      email: 'calmocera@hau.edu.ph',
      accentColor: '#8b0000',
      accentLight: '#c0392b',
      bgText: 'REFERENCE',
    },
    {
      name: 'Mr. Michael Angelo Quiros',
      role: 'Recruitment & Client Operations Officer',
      organization: 'IT Squarehub Global Services Corp.',
      type: 'OJT Internship Reference',
      image: 'its.png',
      phone: '09633285214',
      email: 'magq0704@gmail.com',
      accentColor: '#8100f1',
      accentLight: '#6f00cf',
      bgText: 'REFERENCE',
    },
    {
      name: 'Gillianne Jorge',
      role: 'Marketing Consultant And Marketing Operations',
      organization: 'Fibercom Telecom Phils. Inc.',
      type: 'Client Testimonial',
      image: 'fibercom.jpeg',
      phone: '09397018960',
      email: 'gilliannejorge2021@gmail.com',
      accentColor: '#00b7dc',
      accentLight: '#128dcb',
      bgText: 'REFERENCE',
    },
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  goTo(index: number) {
    this.activeIndex = index;
    this.stopAutoPlay();
    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  next() {
    this.goTo((this.activeIndex + 1) % this.references.length);
  }

  prev() {
    this.goTo((this.activeIndex - 1 + this.references.length) % this.references.length);
  }

  private startAutoPlay() {
    this.autoTimer = setInterval(() => this.next(), 5000);
  }

  private stopAutoPlay() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
    }
  }
}
