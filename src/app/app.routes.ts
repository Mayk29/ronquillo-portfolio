import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ReferencesComponent } from './references/references.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { PageSeo } from './shared/seo.service';

const seo = (s: PageSeo) => ({ seo: s });

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: seo({
      title: 'Michael Ronquillo | Frontend & Full Stack Developer',
      description:
        'Michael Arnold Ronquillo is a Frontend, Full Stack, Web and SEO Developer in the Philippines building fast, accessible web apps with React, TypeScript, Angular, Node.js and WordPress.',
      path: '/',
    }),
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: seo({
      title: 'Hire Michael Ronquillo | Contact',
      description:
        'Get in touch with Michael Ronquillo for full-time roles, freelance web development, WordPress and SEO projects. Send an inquiry or email directly.',
      path: '/contact',
    }),
  },
  {
    path: 'certificates',
    component: CertificatesComponent,
    data: seo({
      title: 'Certificates & Awards | Michael Ronquillo',
      description:
        "Michael Ronquillo's credentials: CompTIA ITF+, AWS Academy Cloud Foundations, Google Analytics, HubSpot SEO, freeCodeCamp and IT Squarehub internship awards.",
      path: '/certificates',
    }),
  },
  {
    path: 'references',
    component: ReferencesComponent,
    data: seo({
      title: 'References | Michael Ronquillo, Web Developer',
      description:
        'Professional and academic references for Michael Ronquillo from Holy Angel University, IT Squarehub and past clients.',
      path: '/references',
    }),
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: seo({
      title: 'Projects | Michael Ronquillo, Web Developer',
      description:
        "Projects by Michael Ronquillo: Velo by Velox, Velox, MedFind pharmacy system, IT Squarehub certificate generator, Bamacom's 100/100 SEO website redesign and more.",
      path: '/projects',
    }),
  },
  {
    path: 'about',
    component: AboutComponent,
    data: seo({
      title: 'About Michael Ronquillo | Web & SEO Developer',
      description:
        'Junior Frontend Developer at Cellwego PH with freelance full-stack, WordPress and SEO experience. Skills in React, TypeScript, Angular, Node.js, MySQL, Figma and AI-assisted coding.',
      path: '/about',
    }),
  },
  { path: '**', redirectTo: '' },
];
