import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  currentUser = this.authService.currentUser;
  profileImage = this.authService.profileImage;

  mobileMenuOpen = signal(false);
  userMenuOpen = signal(false);

  constructor() {
    console.log(this.profileImage());
  }


  toggleMenu() { this.mobileMenuOpen.update(v => !v); }
  toggleUserMenu() { this.userMenuOpen.update(v => !v); }

  logout() {
    this.authService.logout();
    this.userMenuOpen.set(false);
    this.mobileMenuOpen.set(false);
  }
}
