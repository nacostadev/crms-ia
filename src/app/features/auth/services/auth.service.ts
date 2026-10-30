import { inject, Injectable } from '@angular/core';
import { defer, delay, Observable, of, tap, throwError } from 'rxjs';
import { SessionUser } from '../../../shared/models/session-user.model';
import { SessionService } from '../../../shared/services/session.service';
import { USUARIOS_MOCK } from '../mocks/usuarios.mock';
import { Credenciales } from '../models/credenciales.model';

const LATENCIA_SIMULADA_MS = 800;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session = inject(SessionService);

  // Simula el POST /auth/login: valida contra los mocks y responde con la latencia de una red
  // real para que la UI muestre su estado de carga.
  login({ correo, password, recordar }: Credenciales): Observable<SessionUser> {
    return defer(() => {
      const encontrado = USUARIOS_MOCK.find(
        (u) => u.correo === correo.trim().toLowerCase() && u.password === password,
      );
      if (!encontrado) {
        return throwError(() => new Error('Invalid email or password.'));
      }
      const { password: _, ...usuario } = encontrado;
      return of(usuario);
    }).pipe(
      delay(LATENCIA_SIMULADA_MS),
      tap((usuario) => this.session.iniciarSesion(usuario, recordar)),
    );
  }
}
