import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-brand">
          <span>🍽️</span>
          <div><h1>Surtwala Canteen</h1><p>Delicious Food, Happiness in every bite!</p></div>
        </div>
        <div class="info-box">
          <div class="info-icon">🔐</div>
          <h3>Forgot your password?</h3>
          <p>No worries! Enter your registered email and we'll send you a reset link.</p>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card">
          <div class="mobile-logo">
            <span>🍽️</span><span>Surtwala Canteen</span>
          </div>

          <ng-container *ngIf="!sent()">
            <h2 class="auth-title">Reset Password</h2>
            <p class="auth-subtitle">Enter your email to receive a reset link</p>

            <div class="alert alert-error" *ngIf="errorMsg">❌ {{ errorMsg }}</div>

            <form (ngSubmit)="onSubmit()" novalidate>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <div class="input-icon-wrap">
                  <span class="icon">✉️</span>
                  <input type="email" class="form-control" placeholder="you@example.com"
                    [(ngModel)]="email" name="email" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-lg" [disabled]="loading()">
                <span class="spinner" *ngIf="loading()"></span>
                <span *ngIf="!loading()">Send Reset Link 📧</span>
                <span *ngIf="loading()">Sending...</span>
              </button>
            </form>
          </ng-container>

          <div class="success-state" *ngIf="sent()">
            <div class="success-icon">✅</div>
            <h3>Email Sent!</h3>
            <p>We've sent a password reset link to <strong>{{ email }}</strong></p>
            <p class="hint">Check your inbox (and spam folder)</p>
          </div>

          <p class="auth-link-text mt-2">
            <a routerLink="/auth/login" class="auth-link">← Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page{min-height:100vh;display:flex;background:white}
    .auth-left{flex:1;background:linear-gradient(145deg,#1b4332 0%,#2d6a4f 60%,#40916c 100%);color:white;display:flex;flex-direction:column;justify-content:center;padding:48px 40px}
    .auth-brand{display:flex;align-items:center;gap:16px;margin-bottom:40px}
    .auth-brand span:first-child{font-size:52px}
    .auth-brand h1{font-size:28px;font-weight:800;font-family:var(--font-heading);margin:0}
    .auth-brand p{font-size:14px;opacity:.8;margin:4px 0 0}
    .info-box{background:rgba(255,255,255,.1);border-radius:16px;padding:28px;text-align:center}
    .info-icon{font-size:48px;margin-bottom:14px}
    .info-box h3{font-size:20px;font-weight:700;margin-bottom:8px}
    .info-box p{font-size:14px;opacity:.85;line-height:1.6}
    .auth-right{width:460px;display:flex;align-items:center;justify-content:center;padding:32px 24px;background:#fafafa;overflow-y:auto}
    .auth-card{width:100%;max-width:400px;background:white;border-radius:20px;box-shadow:var(--shadow-lg);padding:36px 32px}
    .mobile-logo{display:none;align-items:center;gap:10px;font-size:17px;font-weight:700;color:var(--primary);font-family:var(--font-heading);margin-bottom:16px}
    .mobile-logo span:first-child{font-size:26px}
    .auth-title{font-size:24px;font-weight:800;color:var(--text-primary);margin-bottom:6px}
    .auth-subtitle{font-size:14px;color:var(--text-secondary);margin-bottom:22px}
    .auth-link-text{text-align:center;font-size:14px;color:var(--text-secondary)}
    .auth-link{color:var(--primary);font-weight:600;text-decoration:none}
    .success-state{text-align:center;padding:24px 0}
    .success-icon{font-size:56px;margin-bottom:14px}
    .success-state h3{font-size:22px;font-weight:700;margin-bottom:10px}
    .success-state p{font-size:14px;color:var(--text-secondary);margin-bottom:6px}
    .hint{font-size:12px;color:var(--text-muted)}
    .spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,.4);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite;display:inline-block}
    @keyframes spin{to{transform:rotate(360deg)}}
    @media(max-width:768px){.auth-left{display:none}.auth-right{width:100%;background:white}.auth-card{box-shadow:none}.mobile-logo{display:flex!important}}
  `]
})
export class ForgotPasswordComponent {
  email = '';
  loading = signal(false);
  sent = signal(false);
  errorMsg = '';

  constructor(private auth: AuthService) {}

  onSubmit(): void {
    if (!this.email.trim()) { this.errorMsg = 'Please enter your email.'; return; }
    this.errorMsg = '';
    this.loading.set(true);
    this.auth.forgotPassword(this.email).subscribe({
      next: () => { this.loading.set(false); this.sent.set(true); },
      error: (err) => { this.loading.set(false); this.errorMsg = err?.error?.detail ?? 'Failed. Try again.'; },
    });
  }
}
