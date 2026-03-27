import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const AOS: any;

interface Certificate {
  title: string;
  issuer: string;
  image: string;
  link: string;
  btnLabel: string;
  accentColor: string;
  accentLight: string;
  bgText: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css',
})
export class CertificatesComponent implements OnInit, OnDestroy {
  activeIndex = 0;
  isPlaying = true;
  private autoTimer: any;

  certificates: Certificate[] = [
    {
      title: 'CompTIA IT Fundamentals (ITF+) Certification',
      issuer: 'CompTIA',
      image: 'comptia.png',
      link: 'https://www.credly.com/badges/71b22054-e966-4137-bff6-c424ca3819a3/linked_in_profile',
      btnLabel: 'View Certificate',
      accentColor: '#ff0000',
      accentLight: '#ff6b6b',
      bgText: 'COMPTIA',
    },
    {
      title: 'IT Squarehub Outstanding Intern Award',
      issuer: 'IT Squarehub',
      image: 'outstanding.png',
      link: 'https://media.licdn.com/dms/image/v2/D4E2DAQGY2Ik-5qINxg/profile-treasury-image-shrink_800_800/B4EZneHv_GKwAY-/0/1760368198714?e=1775232000&v=beta&t=5cEL2IsC-znLadxjbUMY9rIbro17WMYIh3FYX__isUg',
      btnLabel: 'View Certificate',
      accentColor: '#00b7dc',
      accentLight: '#128dcb',
      bgText: 'AWARD',
    },
    {
      title: 'IT Squarehub Leadership Intern Award',
      issuer: 'IT Squarehub',
      image: 'leadership.png',
      link: 'https://media.licdn.com/dms/image/v2/D4E2DAQGY2Ik-5qINxg/profile-treasury-image-shrink_800_800/B4EZneHv_GKwAY-/0/1760368198714?e=1774792800&v=beta&t=3EGeNvFHHn5p7gf52u-xnkzZu7c0o6YOFKcqe1kFMvM',
      btnLabel: 'View Certificate',
      accentColor: '#7100dc',
      accentLight: '#6504bf',
      bgText: 'AWARD',
    },
    {
      title: 'IT Squarehub Innovative Project Excellence Award',
      issuer: 'IT Squarehub',
      image: 'innovative.png',
      link: 'https://media.licdn.com/dms/image/v2/D4E2DAQGotcIvJia_AQ/profile-treasury-image-shrink_800_800/B4EZneIpISIUAY-/0/1760368432673?e=1775232000&v=beta&t=qdk8nd1yt8Avqrvhk54q480VJsERv0meblIRvJu6ykQ',
      btnLabel: 'View Certificate',
      accentColor: '#00b7dc',
      accentLight: '#128dcb',
      bgText: 'AWARD',
    },
    {
      title: 'AWS Academy Graduate — Cloud Foundations',
      issuer: 'Amazon Web Services',
      image: 'cloud-foundation.png',
      link: 'https://www.credly.com/badges/82167f2c-369b-4d41-b360-2ecc0779d874/linked_in_profile',
      btnLabel: 'View Badge',
      accentColor: '#ff9900',
      accentLight: '#ffcc66',
      bgText: 'AWS',
    },
    {
      title: 'Google Analytics Certification',
      issuer: 'Google',
      image: 'google_analytics_cert.PNG',
      link: 'https://skillshop.credential.net/b85e8bcb-5dde-4571-b331-fb2ba06f7cbf',
      btnLabel: 'View Certificate',
      accentColor: '#4285F4',
      accentLight: '#7baef7',
      bgText: 'GOOGLE',
    },
    {
      title: 'HubSpot Academy SEO II',
      issuer: 'HubSpot',
      image: 'seo2.png',
      link: 'https://app.hubspot.com/academy/achievements/2x2gvh60/en/1/michael-arnold-ronquillo/seo-ii',
      btnLabel: 'View Certificate',
      accentColor: '#ff7a59',
      accentLight: '#ff9f87',
      bgText: 'HUBSPOT',
    },
    {
      title: 'HubSpot Academy SEO I',
      issuer: 'HubSpot',
      image: 'seo1.png',
      link: 'https://app.hubspot.com/academy/achievements/jnzyp4ll/en/1/michael-ronquillo/seo',
      btnLabel: 'View Certificate',
      accentColor: '#ff7a59',
      accentLight: '#ff9f87',
      bgText: 'HUBSPOT',
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      image: 'responsive_freecodecamp.PNG',
      link: 'https://freecodecamp.org/certification/MichaelArnoldRonquillo/responsive-web-design',
      btnLabel: 'View Certificate',
      accentColor: '#8a8a8a',
      accentLight: '#8a8a8a',
      bgText: 'FREECODECAMP',
    },
    {
      title: 'Legacy JS Algorithms & Data Structures',
      issuer: 'freeCodeCamp',
      image: 'javascript_freecodecamp.PNG',
      link: 'https://freecodecamp.org/certification/MichaelArnoldRonquillo/javascript-algorithms-and-data-structures',
      btnLabel: 'View Certificate',
      accentColor: '#f7df1e',
      accentLight: '#fbef6f',
      bgText: 'JAVASCRIPT',
    },
    {
      title: 'Work with Components in Figma',
      issuer: 'Coursera',
      image: 'coursera-figma.png',
      link: 'https://www.coursera.org/account/accomplishments/records/3QZB49LEZJJ5',
      btnLabel: 'View Certificate',
      accentColor: '#0056d2',
      accentLight: '#4d8fec',
      bgText: 'FIGMA',
    },
    {
      title: 'Cyber Threat Management',
      issuer: 'Cisco',
      image: 'https://images.credly.com/size/340x340/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
      link: 'https://www.credly.com/badges/3fd5f24d-d11f-4a66-90ac-ada1076bfc40/linked_in_profile',
      btnLabel: 'View Badge',
      accentColor: '#1ba0d7',
      accentLight: '#5cc1e8',
      bgText: 'CISCO',
    },
  ];

  ngOnInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ offset: 0 });
    }
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
    this.goTo((this.activeIndex + 1) % this.certificates.length);
  }

  prev() {
    this.goTo((this.activeIndex - 1 + this.certificates.length) % this.certificates.length);
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