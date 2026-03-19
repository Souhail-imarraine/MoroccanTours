import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-redirect',
  standalone: true,
  template: '<div class="flex items-center justify-center min-h-screen"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>'
})
export class ProfileRedirectComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    const user = this.authService.currentUser() as any;
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.role === 'GUIDE') {
      this.router.navigate(['/guide/dashboard']);
    } else if (user.role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/tourist/profile']);
    }
  }
}
