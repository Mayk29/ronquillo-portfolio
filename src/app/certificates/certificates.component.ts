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
      title: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
      image: 'https://images.credly.com/size/340x340/images/73e4a58b-a8ef-41a3-a7db-9183dd269882/image.png',
      link: 'https://www.credly.com/badges/82167f2c-369b-4d41-b360-2ecc0779d874/linked_in_profile',
      btnLabel: 'View Badge',
    },
    {
      title: 'Google Analytics Certification',
      image: 'google_analytics_cert.PNG',
      link: 'https://skillshop.credential.net/b85e8bcb-5dde-4571-b331-fb2ba06f7cbf#acc.qxhbiz8U',
      btnLabel: 'View Certificate',
      imageRight: true,
    },
    {
      title: 'HubSpot Academy SEO II',
      image: 'https://hubspot-credentials-na1.s3.amazonaws.com/prod/certificates/user/fece5d1bcfdc4b43aefff8de3a26082f.png?onAchievementsPage=true',
      link: 'https://www.credly.com/badges/82167f2c-369b-4d41-b360-2ecc0779d874/linked_in_profile',
      btnLabel: 'View Certificate',
    },
    {
      title: 'HubSpot Academy SEO I',
      image: 'https://hubspot-credentials-na1.s3.amazonaws.com/prod/certificates/user/32cc77614ef94d9b878858c3ac28e8bb.png?onAchievementsPage=true',
      link: 'https://skillshop.credential.net/b85e8bcb-5dde-4571-b331-fb2ba06f7cbf#acc.qxhbiz8U',
      btnLabel: 'View Certificate',
      imageRight: true,
    },
    {
      title: 'Responsive Web Design - freeCodeCamp',
      image: 'responsive_freecodecamp.PNG',
      link: 'https://www.credly.com/badges/82167f2c-369b-4d41-b360-2ecc0779d874/linked_in_profile',
      btnLabel: 'View Certificate',
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures - freeCodeCamp',
      image: 'javascript_freecodecamp.PNG',
      link: 'https://skillshop.credential.net/b85e8bcb-5dde-4571-b331-fb2ba06f7cbf#acc.qxhbiz8U',
      btnLabel: 'View Certificate',
      imageRight: true,
    },
    {
      title: 'Work with Components in Figma - Coursera',
      image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~3QZB49LEZJJ5/CERTIFICATE_LANDING_PAGE~3QZB49LEZJJ5.jpeg',
      link: 'https://www.credly.com/badges/82167f2c-369b-4d41-b360-2ecc0779d874/linked_in_profile',
      btnLabel: 'View Certificate',
    },
    {
      title: 'Cyber Threat Management - Cisco',
      image: 'https://images.credly.com/size/340x340/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
      link: 'https://skillshop.credential.net/b85e8bcb-5dde-4571-b331-fb2ba06f7cbf#acc.qxhbiz8U',
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
