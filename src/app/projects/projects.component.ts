import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  category: string;
  description: string;
  videoType: 'local' | 'placeholder' | 'image';
  videoFile: string;
  imageFile?: string;
  websiteUrl?: string;
  githubUrl?: string;
  accentColor: string;
  accentLight: string;
  bgText: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  activeIndex = 0;
  isPlaying = true;
  private placeholderTimer: any;

  projects: Project[] = [
    {
      title: 'Valiant E-Sports Page',
      category: 'Web & Dynamic Web Applications',
      description:
        "This project is create for final output in Basic Programming in Web and Dynamic Web Applications and Development Tools. In basic programming I used html, css. JavaScript for my final output. Valiant Esports is an ogranization in Holy Angel University and I ask for their permission to create website for them. For Dynamic Web Applications, it was a group setup and I experienced using php and mySQL for database. I am the project leader and my best experience in this project is creating the cart and login page to work properly with backend.",
      videoType: 'local',
      videoFile: 'valiant-showcase.mp4',
      websiteUrl: 'http://valiant-esports.atwebpages.com/login_form.php',
      accentColor: '#ffee00',
      accentLight: '#c3b600',
      bgText: 'VALIANT',
    },
    {
      title: 'Bamacom Inc. — WordPress SEO Project',
      category: 'Web Search Engine Optimization & Analytics',
      description:
        'This project is a part of requirements for Web Search Engine Optimization and Analytics. This project is full of learning and experience. It is my first time to do a project with an actual client which is Bamacom Inc. based in Pasig City. We recreate and redesign their business website and improve its SEO and Google Analytics. I was assigned as the Project leader for this requirement. We used Wordpress as our tool to create the website and elementor to enhance the design of the website. Yoast is used for the improvement of the SEO. Where in most part of the project is a first hand experience which makes it a valuable and memorable project.',
      videoType: 'local',
      videoFile: 'bamacom-showcase.mp4',
      websiteUrl: 'https://bamacomserv.com/',
      accentColor: '#ff0000',
      accentLight: '#ff4238',
      bgText: 'WSEA',
    },
    {
      title: 'Mother & Child Pharmacy',
      category: 'Web Development Capstone 1 & 2',
      description:
        'A web-based medicine finder and pharmacy management system developed for Mother and Child Pharmacy in Porac, Pampanga. This capstone project was created to address the lack of accessible, real-time medicine information and the inefficiencies of manual inventory systems in small community pharmacies, which often result in unnecessary pharmacy visits and delays in accessing essential medicines. As project lead, we built features including real-time medicine search, inventory management, pre-order processing, POS transactions, demand forecasting, offline sync via IndexedDB, and report generation—helping local residents efficiently locate available medicines while enabling the pharmacy to streamline operations and improve inventory accuracy. Built with Angular 18, Node.js, Express.js, MySQL, Socket.IO, Chart.js, jsPDF, and XLSX. Deployed on Vercel and Railway.',
      videoType: 'local',
      videoFile: 'mother-and-child-showcase.mp4',
      websiteUrl: 'https://www.motherandchildpharmacy.com/',
      accentColor: '#f7565697',
      accentLight: '#fa4040e6',
      bgText: 'MOTHERCHILD',
    },
    {
      title: 'IT Squarehub — Certificate Generator System',
      category: 'Full Stack Development Internship',
      description:
        'A full-stack certificate generator system built during my internship at IT Squarehub Global Services Corporation in Clark, Pampanga. As team lead of 4 interns, I designed and delivered the project on time, earning the Innovative Project Excellence Award. The system handles certificate generation, preview, and data management to streamline internal document processing. Built with Angular 18, Node.js, and MySQL, with Cloudinary integrated for image storage and optimized asset delivery. Deployed on Vercel and Render for a stable production environment. I also received the Leadership and Outstanding Intern Awards for delivering a complete, production-ready end-to-end solution.',
      videoType: 'image',
      videoFile: '',
      imageFile: 'cert-gen.PNG',
      accentColor: '#036afa',
      accentLight: '#0112ff',
      bgText: 'ITSQUAREHUB',
    },
    {
      title: 'Mind Matters',
      category: 'Web & Dynamic Web Applications',
      description:
        'A mental health awareness web platform developed in partnership with the Holy Angel University Guidance Office to promote student mental wellness. As project lead, we built features covering mental health guides, coping strategies, student support resources, and a blog. Built with Angular 18, Angular Material, TailwindCSS, TypeScript, Resend for email, and netlify for deployment. The purpose of this project is helping students recognize issues early and seek help without stigma.',
      videoType: 'local',
      videoFile: 'mind-matters-showcase.mp4',
      websiteUrl: 'https://mind-matters-group-1.netlify.app/',
      accentColor: '#01ffe1',
      accentLight: '#72ffef',
      bgText: 'MINDMATTERS',
    },
    {
      title: 'Analyze like Mayk',
      category: 'Web & Dynamic Web Applications',
      description:
        'This project is created as a part of requirements for Dynamic Web Applications and Development Tools. It is about creating wordpress website and producing blogs based on own topic. I showcase here my passion for sports, e-sports and anime. It also display my skill for analyzing contents and gameplays in the said genres. We used the wordpress for editing pages for landing page, about, blogs, and contact page. This page also shows my own design preference in which I used images to improve the visuals of the website from color scheme which focused on darker colors.',
      videoType: 'local',
      videoFile: 'analyze-showcase.mp4',
      websiteUrl: 'https://mind-matters-group-1.netlify.app/',
      accentColor: '#ffee00',
      accentLight: '#c3b600',
      bgText: 'MINDMATTERS',
    },
    {
      title: "Papa J's Samgy Page",
      category: 'Web & Advertising Publishing',
      description:
        'This project is create for final output in Web and Advertising Publishing Concepts . In this deliverable it was composed of four members per group. I am the project leader and I manage most of the website component in finalization and modification. My main part in this project is product page and is connected to data for product using RESTful API. For the customers list I integrate it using firebase database for it to access the backend of the website.',
      videoType: 'image',
      videoFile: '',
      imageFile: 'papaj.PNG',
      accentColor: '#ff3300',
      accentLight: '#ff3103',
      bgText: 'PAPAJ',
    },
    
    
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Start the first slide after a short delay to let DOM render
    setTimeout(() => this.activateSlide(this.activeIndex), 300);
  }

  ngOnDestroy() {
    this.clearPlaceholderTimer();
    this.pauseAllVideos();
  }

  /** Called by (ended) on the video element — advance to next slide */
  onVideoEnded() {
    if (this.isPlaying) {
      this.next();
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      // Resume: replay current video from start
      this.activateSlide(this.activeIndex);
    } else {
      // Pause: stop current video and clear placeholder timer
      this.clearPlaceholderTimer();
      const video = this.getVideoAt(this.activeIndex);
      if (video) video.pause();
    }
  }

  goTo(index: number) {
    this.stopCurrentSlide();
    this.activeIndex = index;
    setTimeout(() => this.activateSlide(index), 50);
  }

  next() {
    this.goTo((this.activeIndex + 1) % this.projects.length);
  }

  prev() {
    this.goTo((this.activeIndex - 1 + this.projects.length) % this.projects.length);
  }

  // ── Private helpers ──────────────────────────────────────

  private activateSlide(index: number) {
    const proj = this.projects[index];

    if (proj.videoType === 'local') {
      const video = this.getVideoAt(index);
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {
          // Autoplay blocked by browser — user will click play manually
        });
      }
    } else {
      // Placeholder or image slide: auto-advance after 6 seconds if playing
      if (this.isPlaying) {
        this.placeholderTimer = setTimeout(() => this.next(), 6000);
      }
    }
  }

  private stopCurrentSlide() {
    this.clearPlaceholderTimer();
    const video = this.getVideoAt(this.activeIndex);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  private pauseAllVideos() {
    const videos = this.el.nativeElement.querySelectorAll('video');
    videos.forEach((v: HTMLVideoElement) => {
      v.pause();
      v.currentTime = 0;
    });
  }

  private getVideoAt(index: number): HTMLVideoElement | null {
    return this.el.nativeElement.querySelector(`video[data-index="${index}"]`) ?? null;
  }

  private clearPlaceholderTimer() {
    if (this.placeholderTimer) {
      clearTimeout(this.placeholderTimer);
      this.placeholderTimer = null;
    }
  }
}