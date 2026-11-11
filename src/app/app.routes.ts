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
      title: 'Michael Ronquillo | Web Developer in Pampanga, Philippines',
      description:
        'Michael Ronquillo: Frontend, Full Stack, Web & SEO Developer in Pampanga, Philippines. Junior Frontend Developer at Cellwego PH, open to freelance and part-time work.',
      path: '/',
    }),
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: seo({
      title: 'Hire Michael Ronquillo | Freelance Web Developer, Philippines',
      description:
        'Hire Michael Ronquillo, a web developer in Pampanga, Philippines, for part-time, freelance and full-time frontend, full-stack, WordPress and SEO work.',
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
      title: 'References | Michael Ronquillo, Web Developer in Pampanga',
      description:
        'Professional and academic references for Michael Ronquillo from Holy Angel University, IT Squarehub and past clients.',
      path: '/references',
    }),
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: seo({
      title: 'Projects | Michael Ronquillo, Frontend & Full Stack Developer',
      description:
        "Projects by Michael Ronquillo: Velo by Velox, Velox, Maroev Cyber Systems website redesign, MedFind pharmacy system, Bamacom's 100/100 SEO redesign and more.",
      path: '/projects',
    }),
  },
  {
    path: 'about',
    component: AboutComponent,
    data: seo({
      title: 'About Michael Ronquillo | Frontend & Full Stack Developer, Pampanga',
      description:
        'Michael Ronquillo is a Junior Frontend Developer at Cellwego PH (Velo by Velox) from Porac, Pampanga, with full-stack, WordPress and SEO skills: React, TypeScript, Angular, Node.js, MySQL.',
      path: '/about',
    }),
  },
  { path: '**', redirectTo: '' },
];
