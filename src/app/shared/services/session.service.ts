import { computed, Injectable, signal } from '@angular/core';
import { SessionUser } from '../models/session-user.model';

const CLAVE_SESION = 'crms-ia:sesion';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly usuario = signal<SessionUser | null>(this.leerGuardada());
  readonly iniciales = computed(() =>
    (this.usuario()?.nombre ?? '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join(''),
  );

  // `recordar` decide dónde vive la sesión: localStorage sobrevive a cerrar el navegador,
  // sessionStorage se va con la pestaña.
  iniciarSesion(usuario: SessionUser, recordar: boolean): void {
    this.usuario.set(usuario);
    try {
      (recordar ? localStorage : sessionStorage).setItem(CLAVE_SESION, JSON.stringify(usuario));
    } catch {
      // Storage bloqueado: la sesión queda solo en memoria hasta recargar.
    }
  }

  cerrarSesion(): void {
    this.usuario.set(null);
    try {
      localStorage.removeItem(CLAVE_SESION);
      sessionStorage.removeItem(CLAVE_SESION);
    } catch {
      // Nada que limpiar si el storage no está disponible.
    }
  }

  private leerGuardada(): SessionUser | null {
    try {
      const guardada = localStorage.getItem(CLAVE_SESION) ?? sessionStorage.getItem(CLAVE_SESION);
      return guardada ? (JSON.parse(guardada) as SessionUser) : null;
    } catch {
      return null;
    }
  }
}
