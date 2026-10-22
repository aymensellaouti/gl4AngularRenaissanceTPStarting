import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';

// Ce qu'on garde en mémoire quand quelqu'un est connecté
interface Session {
  token: string;
  userId: number;
  email: string;
}
const STORAGE_KEY = 'session';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private session = signal<Session | null>(this.restoreSession());

  // Valeurs calculées à partir de la boîte : elles se mettent à jour seules.
  readonly userId = computed(() => this.session()?.userId ?? null);
  readonly email = computed(() => this.session()?.email ?? null);
  readonly token = computed(() => this.session()?.token ?? null);
  readonly isAuthenticated = computed(() => this.session() !== null);


  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      // On met à jour la session quand on reçoit la réponse
      tap((response) => 
        this.setSession({
          token: response.id,
          userId: response.userId,
          email: credentials.email,
        })
      )
    );
  }

  logout() {
    this.session.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private setSession(session: Session) {
    this.session.set(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  private restoreSession(): Session | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Session) : null;
    } catch {
      return null; 
    }
  }
}
