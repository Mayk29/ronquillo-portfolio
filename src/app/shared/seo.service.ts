import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://devmayk.com';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Tells search engines not to index the page (used for the not-found page). */
  noindex?: boolean;
}

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1';

/**
 * Per-page SEO. The router sets the document title; this service keeps the description,
 * canonical URL and Open Graph/Twitter tags in step with the current route. Googlebot renders
 * JavaScript, so these are picked up for each page of the single-page app.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  update(seo: PageSeo) {
    const url = SITE_URL + seo.path;
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    // Set on every navigation so leaving the not-found page restores normal indexing
    this.meta.updateTag({ name: 'robots', content: seo.noindex ? 'noindex, follow' : ROBOTS_INDEX });
    if (seo.noindex) {
      // A noindex page must not claim the home page as its canonical
      this.doc.querySelector('link[rel="canonical"]')?.remove();
    } else {
      this.setCanonical(url);
    }
  }

  private setCanonical(url: string) {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
