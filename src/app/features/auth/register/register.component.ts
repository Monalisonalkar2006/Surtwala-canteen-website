import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  loading = signal(false);
  errorMsg = '';
  errors: Record<string, string> = {};

  constructor(private auth: AuthService, private notif: NotificationService) {}

  validate(): boolean {
    this.errors = {};
    if (!this.name.trim()) this.errors['name'] = 'Name is required.';
    if (!this.email.trim()) this.errors['email'] = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.errors['email'] = 'Invalid email address.';
    if (!this.phone.trim()) this.errors['phone'] = 'Phone is required.';
    else if (!/^[6-9]\d{9}$/.test(this.phone)) this.errors['phone'] = 'Invalid phone number.';
    if (!this.password) this.errors['password'] = 'Password is required.';
    else if (this.password.length < 8) this.errors['password'] = 'Minimum 8 characters.';
    if (this.password !== this.confirmPassword) this.errors['confirmPassword'] = 'Passwords do not match.';
    return Object.keys(this.errors).length === 0;
  }

  onSubmit(): void {
    if (!this.validate()) return;
    this.errorMsg = '';
    this.loading.set(true);

    // Mock register — API ready झाल्यावर हे काढून खालचे API call uncomment करा
    setTimeout(() => {
      this.loading.set(false);
      this.notif.success('Account created successfully! Please login.');
      // redirect to login after 1s
      setTimeout(() => {}, 1000);
    }, 700);

    // TODO: Backend ready झाल्यावर uncomment करा
    // this.auth.register({
    //   name: this.name, email: this.email, phone: this.phone,
    //   password: this.password, confirm_password: this.confirmPassword,
    // }).subscribe({
    //   next: () => { this.loading.set(false); this.notif.success('Account created successfully!'); },
    //   error: (err) => { this.loading.set(false); this.errorMsg = err?.error?.detail ?? 'Registration failed.'; },
    // });
  }
}
