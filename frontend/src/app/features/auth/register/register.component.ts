import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['TOURIST', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { role, ...data } = this.registerForm.value;
      
      const req$ = role === 'GUIDE' 
        ? this.authService.registerGuide(data)
        : this.authService.registerTourist(data);

      req$.subscribe({
        next: (res) => {
          if (role === 'GUIDE') {
            this.success = 'Compte guide créé. En attente de validation administrateur.';
            this.registerForm.reset();
            this.error = '';
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
           this.error = err.error?.error || 'Erreur lors de l\'inscription';
           this.success = '';
        }
      });
    }
  }
}
