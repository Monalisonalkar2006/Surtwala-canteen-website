import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h1 class="page-title">My Profile</h1>
      <p class="page-subtitle">Manage your account details</p>
      <div class="card p-3 mt-3" style="max-width:480px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:22px">
          <div style="width:60px;height:60px;background:var(--primary);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700">
            {{ auth.currentUser()?.name?.[0]?.toUpperCase() }}
          </div>
          <div>
            <div class="fw-700" style="font-size:18px">{{ auth.currentUser()?.name }}</div>
            <div style="font-size:13px;color:var(--text-muted)">{{ auth.currentUser()?.email }}</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" [value]="auth.currentUser()?.name ?? ''" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" [value]="auth.currentUser()?.email ?? ''" />
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-control" [value]="auth.currentUser()?.phone ?? ''" />
        </div>
        <button class="btn btn-primary">Save Changes</button>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
