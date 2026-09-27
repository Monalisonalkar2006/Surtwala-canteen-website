import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  loading = signal(false);
  errorMsg = '';

  constructor(private auth: AuthService, private notif: NotificationService) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter email and password.';
      return;
    }
    this.errorMsg = '';
    this.loading.set(true);

    // Mock login — API ready झाल्यावर हे काढून खालचे API call uncomment करा
    setTimeout(() => {
      const result = this.auth.mockLogin({ email: this.email, password: this.password });
      this.loading.set(false);
      if (result.success) {
        this.notif.success('Login successful! Welcome back 👋');
      } else {
        this.errorMsg = result.error ?? 'Login failed.';
      }
    }, 600); // 600ms fake loading for UX

    // TODO: Backend ready झाल्यावर वरचे setTimeout काढून हे uncomment करा
    // this.auth.login({ email: this.email, password: this.password }).subscribe({
    //   next: () => {
    //     this.loading.set(false);
    //     this.notif.success('Login successful! Welcome back 👋');
    //   },
    //   error: (err) => {
    //     this.loading.set(false);
    //     this.errorMsg = err?.error?.detail ?? err?.error?.message ?? 'Invalid email or password.';
    //   },
    // });
  }
}
