import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://ronquillo-michael-personal.vercel.app';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
}

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
    this.setCanonical(url);
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
