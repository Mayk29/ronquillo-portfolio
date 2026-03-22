import { Component, OnInit, OnDestroy } from '@angular/core';

declare const AOS: any;

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  typewriterText = '';
  private texts = [
    'FRONT-END DEVELOPER',
    'WEB DESIGNER',
    'LEADER',
    'TEAM PLAYER',
    'PROBLEM SOLVER',
    'LISTENER',
  ];
  private speed = 100;
  private textIndex = 0;
  private charIndex = 0;
  private timer: any;

  ngOnInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ offset: 0 });
    }
    this.timer = setTimeout(() => this.typeWriter(), 500);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  typeWriter() {
    if (this.charIndex < this.texts[this.textIndex].length) {
      this.typewriterText += this.texts[this.textIndex].charAt(this.charIndex);
      this.charIndex++;
      this.timer = setTimeout(() => this.typeWriter(), this.speed);
    } else {
      this.timer = setTimeout(() => this.eraseText(), 1000);
    }
  }

  eraseText() {
    if (this.typewriterText.length > 0) {
      this.typewriterText = this.typewriterText.slice(0, -1);
      this.timer = setTimeout(() => this.eraseText(), 50);
    } else {
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      this.charIndex = 0;
      this.timer = setTimeout(() => this.typeWriter(), 500);
    }
  }
}
