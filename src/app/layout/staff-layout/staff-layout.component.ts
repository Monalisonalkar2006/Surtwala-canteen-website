import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-staff-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="staff-layout">
      <aside class="sidebar" [class.open]="open">
        <div class="sb-head">
          <div class="logo"><span>🍽️</span><div><b>Surtwala</b><small>Staff Panel</small></div></div>
          <button (click)="open=false">✕</button>
        </div>
        <nav>
          <a routerLink="/staff/dashboard" routerLinkActive="active" (click)="open=false">📊 Dashboard</a>
          <a routerLink="/staff/orders" routerLinkActive="active" (click)="open=false">📋 Orders</a>
          <a routerLink="/staff/inventory" routerLinkActive="active" (click)="open=false">📦 Inventory</a>
        </nav>
        <button class="logout" (click)="auth.logout()">🚪 Logout</button>
      </aside>
      <div class="overlay" *ngIf="open" (click)="open=false"></div>
      <main class="content">
        <header class="hdr">
          <button (click)="open=true">☰</button>
          <span class="brand">🍽️ Surtwala Staff</span>
          <div class="hdr-right" *ngIf="auth.currentUser() as u">
            <div class="av">{{u.name[0]}}</div>
            <span>{{u.name}}</span>
          </div>
        </header>
        <div class="page"><router-outlet /></div>
      </main>
      <div class="toasts">
        <div class="toast" *ngFor="let t of notif.toasts()" [class]="'t-'+t.type" (click)="notif.dismiss(t.id)">
          {{t.message}}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .staff-layout{display:flex;min-height:100vh;background:#f8f9fa}
    .sidebar{width:220px;background:#1b4332;color:#fff;position:fixed;top:0;left:0;height:100vh;z-index:1000;display:flex;flex-direction:column;transform:translateX(-100%);transition:.3s;padding:16px 0}
    .sidebar.open{transform:translateX(0)}
    .sb-head{display:flex;align-items:center;justify-content:space-between;padding:0 16px 14px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:10px}
    .logo{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700}
    .logo span{font-size:24px}
    .logo small{display:block;font-size:10px;opacity:.65;text-transform:uppercase;letter-spacing:1px}
    .sb-head button{background:rgba(255,255,255,.1);color:#fff;border:none;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:11px}
    nav{flex:1;padding:0}
    nav a{display:flex;align-items:center;gap:10px;padding:12px 20px;color:rgba(255,255,255,.8);font-size:13.5px;font-weight:500;text-decoration:none;transition:.2s}
    nav a:hover{background:rgba(255,255,255,.08);color:#fff}
    nav a.active{background:var(--accent);color:#fff;border-radius:0 20px 20px 0;margin-right:10px}
    .logout{margin:12px 16px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px;cursor:pointer;font-size:13px;transition:.2s}
    .logout:hover{background:var(--danger);color:#fff;border-color:var(--danger)}
    .overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999}
    .content{flex:1;display:flex;flex-direction:column;min-height:100vh}
    .hdr{background:#fff;box-shadow:var(--shadow-sm);height:65px;display:flex;align-items:center;padding:0 16px;gap:12px;position:sticky;top:0;z-index:100}
    .hdr button{background:none;border:none;font-size:20px;cursor:pointer}
    .brand{font-size:15px;font-weight:700;color:var(--primary);font-family:var(--font-heading);flex:1}
    .hdr-right{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500}
    .av{width:34px;height:34px;background:var(--primary);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
    .page{padding:20px;max-width:1200px;margin:0 auto;width:100%}
    .toasts{position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px}
    .toast{padding:10px 14px;border-radius:10px;font-size:13px;cursor:pointer;box-shadow:var(--shadow-sm)}
    .t-success{background:#d8f3dc;color:#1b4332}.t-error{background:#fde8e8;color:#e63946}.t-warning{background:#fff3cd;color:#856404}.t-info{background:#dbeafe;color:#4361ee}
    @media(min-width:768px){.sidebar{transform:translateX(0)!important;position:fixed}.content{margin-left:220px}.hdr button:first-child,.overlay,.sb-head button{display:none!important}.brand{display:none}}
  `]
})
export class StaffLayoutComponent {
  open = false;
  constructor(public auth: AuthService, public notif: NotificationService) {}
}
