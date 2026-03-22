import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;

  private hoverSound = new Audio('hover.mp3');
  private clickSound = new Audio('click.mp3');

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  playHoverSound() {
    this.hoverSound.currentTime = 0;
    this.hoverSound.play().catch(() => {});
  }

  playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(() => {});
  }
}