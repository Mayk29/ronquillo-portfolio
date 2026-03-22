import { Component, OnInit } from '@angular/core';

declare const AOS: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  ngOnInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ offset: 0 });
    }
  }
}
