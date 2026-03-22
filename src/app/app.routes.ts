import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CertificatesComponent } from './certificates/certificates.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: '**', redirectTo: '' }
];
