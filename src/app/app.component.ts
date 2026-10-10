import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { filter } from 'rxjs/operators';
import { SeoService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ronquillo-portfolio';
  showNavbar = false;

  constructor(private router: Router, private seo: SeoService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const page = this.router.routerState.snapshot.root.firstChild?.data['seo'];
        if (page) this.seo.update(page);

        // Show navbar on all pages EXCEPT the home page (ignore ?query and #hash, e.g. ?fbclid=)
        this.showNavbar = event.urlAfterRedirects.split(/[?#]/)[0] !== '/';
      });
  }
}