import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const AOS: any;

interface Certificate {
  title: string;
  image: string;
  link: string;
  btnLabel: string;
  imageRight?: boolean;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [
    {
      title: 'CompTIA IT Fundamentals (ITF+) Certification',
      image: 'comptia.png',
      link: 'https://www.credly.com/badges/71b22054-e966-4137-bff6-c424ca3819a3/linked_in_profile',
      btnLabel: 'View Certificate',
    },
    {
      title: 'IT Squarehub Outstanding Intern Award',
      image: 'leadership.png',
      link: 'https://media.licdn.com/dms/image/v2/D4E2DAQGY2Ik-5qINxg/profile-treasury-image-shrink_800_800/B4EZneHv_GKwAY-/0/1760368198714?e=1774792800&v=beta&t=3EGeNvFHHn5p7gf52u-xnkzZu7c0o6YOFKcqe1kFMvM',
      btnLabel: 'View Certificate',
    },
    {
      title: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
      image: 'cloud-foundation.png',
      link: 'https://www.credly.com/badges/82167f2c-369b-4d41-b360-2ecc0779d874/linked_in_profile',
      btnLabel: 'View Badge',
    },
    {
      title: 'Google Analytics Certification',
      image: 'google_analytics_cert.PNG',
      link: 'https://skillshop.credential.net/b85e8bcb-5dde-4571-b331-fb2ba06f7cbf',
      btnLabel: 'View Certificate',
      imageRight: true,
    },
    {
      title: 'HubSpot Academy SEO II',
      image: 'seo2.png',
      link: 'https://app.hubspot.com/academy/achievements/2x2gvh60/en/1/michael-arnold-ronquillo/seo-ii',
      btnLabel: 'View Certificate',
    },
    {
      title: 'HubSpot Academy SEO I',
      image: 'seo1.png',
      link: 'https://app.hubspot.com/academy/achievements/jnzyp4ll/en/1/michael-ronquillo/seo',
      btnLabel: 'View Certificate',
      imageRight: true,
    },
    {
      title: 'Responsive Web Design - freeCodeCamp',
      image: 'responsive_freecodecamp.PNG',
      link: 'https://freecodecamp.org/certification/MichaelArnoldRonquillo/responsive-web-design',
      btnLabel: 'View Certificate',
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures - freeCodeCamp',
      image: 'javascript_freecodecamp.PNG',
      link: 'https://freecodecamp.org/certification/MichaelArnoldRonquillo/javascript-algorithms-and-data-structures',
      btnLabel: 'View Certificate',
      imageRight: true,
    },
    {
      title: 'Work with Components in Figma - Coursera',
      image: 'coursera-figma.png',
      link: 'https://www.coursera.org/account/accomplishments/records/3QZB49LEZJJ5',
      btnLabel: 'View Certificate',
    },
    {
      title: 'Cyber Threat Management - Cisco',
      image: 'https://images.credly.com/size/340x340/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
      link: 'https://www.credly.com/badges/3fd5f24d-d11f-4a66-90ac-ada1076bfc40/linked_in_profile',
      btnLabel: 'View Badge',
      imageRight: true,
    },
  ];

  ngOnInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ offset: 0 });
    }
  }
}
