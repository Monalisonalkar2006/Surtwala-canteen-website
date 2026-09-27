import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';
import { API } from '../constants/api-endpoints';
import { STORAGE_KEYS } from '../constants/app.constants';
import { ROLE_REDIRECTS as ROLE_REDIRECT_MAP } from '../constants/role.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private currentUserSignal = signal<User | null>(this.getStoredUser());
  private tokenSignal = signal<string | null>(this.getStoredToken());

  currentUser = this.currentUserSignal.asReadonly();
  isLoggedIn = computed(() => !!this.tokenSignal());
  isAdmin = computed(() => this.currentUserSignal()?.role === 'admin');
  isStaff = computed(() => this.currentUserSignal()?.role === 'staff');
  isCustomer = computed(() => this.currentUserSignal()?.role === 'customer');

  constructor(private http: HttpClient, private router: Router) {}

  // ─── MOCK USERS (backend ready होईपर्यंत) ───────────────────────────────────
  private mockUsers: Record<string, User & { password: string }> = {
    'customer@demo.com': { id: 1, name: 'Monali Pawar',  email: 'customer@demo.com', role: 'customer', is_active: true, password: 'demo1234' },
    'admin@demo.com':    { id: 2, name: 'Admin User',    email: 'admin@demo.com',    role: 'admin',    is_active: true, password: 'demo1234' },
    'staff@demo.com':    { id: 3, name: 'Staff Member',  email: 'staff@demo.com',    role: 'staff',    is_active: true, password: 'demo1234' },
  };

  /** Mock login — API ready झाल्यावर हे काढून खालचे `login()` वापरा */
  mockLogin(credentials: LoginRequest): { success: boolean; error?: string } {
    const found = this.mockUsers[credentials.email.toLowerCase()];
    if (!found) return { success: false, error: 'Email not found.' };
    if (found.password !== credentials.password) return { success: false, error: 'Incorrect password.' };
    const { password, ...user } = found;
    const fakeToken = 'mock-token-' + user.role + '-' + Date.now();
    this.handleAuthSuccess({ token: fakeToken, user });
    return { success: true };
  }
  // ─────────────────────────────────────────────────────────────────────────────

  // TODO: Backend ready झाल्यावर mockLogin() काढून हे uncomment करा
  // login(credentials: LoginRequest): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(API.AUTH.LOGIN, credentials).pipe(
  //     tap(res => this.handleAuthSuccess(res)),
  //     catchError(err => throwError(() => err))
  //   );
  // }

  // TODO: Backend ready झाल्यावर uncomment करा
  // register(data: RegisterRequest): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(API.AUTH.REGISTER, data).pipe(
  //     tap(res => this.handleAuthSuccess(res)),
  //     catchError(err => throwError(() => err))
  //   );
  // }

  logout(): void {
    // TODO: Backend ready झाल्यावर uncomment करा
    // this.http.post(API.AUTH.LOGOUT, {}).subscribe({ error: () => {} });
    this.clearStorage();
    this.router.navigate(['/auth/login']);
  }

  forgotPassword(email: string): Observable<any> {
    // TODO: Backend ready झाल्यावर uncomment करा
    // return this.http.post(API.AUTH.FORGOT_PASSWORD, { email });
    return new Observable(obs => { obs.next({ message: 'Reset link sent (mock)' }); obs.complete(); });
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private getStoredToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser) return null;
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  }

  private handleAuthSuccess(res: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
      if (res.refresh_token) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, res.refresh_token);
    }
    this.tokenSignal.set(res.token);
    this.currentUserSignal.set(res.user);
    const redirect = ROLE_REDIRECT_MAP[res.user.role];
    this.router.navigate([redirect]);
  }

  private clearStorage(): void {
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
  }
}
