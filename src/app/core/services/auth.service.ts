import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/Auth`;

  private platformId = inject(PLATFORM_ID);


  private _isLoggedIn = signal(false);
  isLoggedInSignal = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.set(!!this.getToken());
    }
  }

  login(data: any) {
    localStorage.setItem("userEmail", data.email);
    return this.http.post<any>(`${this.api}/login`, data);
  }

  register(data: any) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  saveToken(token: string) {
    const expiryDays = 7;
    const date = new Date();
    date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    document.cookie = `token=${token}; expires=${date.toUTCString()}; path=/`;
    this._isLoggedIn.set(true);
  }

  getToken(): string | null {
    const name = "token=";
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const decoded = decodeURIComponent(document.cookie);
    const cookies = decoded.split(';');

    for (let c of cookies) {
      c = c.trim();
      if (c.startsWith(name)) {
        return c.substring(name.length);
      }
    }

    return null;
  }

  logout() {
    const date = new Date();
    date.setTime(date.getTime() - 1);

    document.cookie = `token=; expires=${date.toUTCString()}; path=/`;
    localStorage.clear();
    this._isLoggedIn.set(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  getUser(email: string) {
    return this.http.get(`${this.api}/getUser/${email}`);
  }

  updateUser(data: any) {
    localStorage.setItem("userEmail", data.email);
    return this.http.patch(`${this.api}/Update`, data);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch {
      return null;
    }
  }

  googleLogin(idToken: string) {
    return this.http.post(`${this.api}/google-login`, { idToken });
  }
}
