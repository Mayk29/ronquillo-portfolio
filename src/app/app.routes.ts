import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ReferencesComponent } from './references/references.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'references', component: ReferencesComponent },
  { path: '**', redirectTo: '' }
];
