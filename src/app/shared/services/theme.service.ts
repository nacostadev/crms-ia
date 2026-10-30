import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

export type Tema = 'claro' | 'oscuro';

// La misma clave la lee el script inline de index.html para pintar el tema antes de que
// arranque Angular y no haya un parpadeo en claro.
const CLAVE_TEMA = 'crms:tema';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly tema = signal<Tema>(this.temaInicial());
  readonly oscuro = computed(() => this.tema() === 'oscuro');

  constructor() {
    effect(() => {
      const tema = this.tema();
      this.document.documentElement.classList.toggle('dark', tema === 'oscuro');
      try {
        localStorage.setItem(CLAVE_TEMA, tema);
      } catch {
        // Sin storage el tema dura hasta recargar.
      }
    });
  }

  cambiar(tema: Tema): void {
    this.tema.set(tema);
  }

  alternar(): void {
    this.tema.update((actual) => (actual === 'oscuro' ? 'claro' : 'oscuro'));
  }

  // Elección guardada; si no hay, la preferencia del sistema operativo.
  private temaInicial(): Tema {
    try {
      const guardado = localStorage.getItem(CLAVE_TEMA);
      if (guardado === 'claro' || guardado === 'oscuro') return guardado;
    } catch {
      // Storage bloqueado: se usa la preferencia del sistema.
    }
    return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'oscuro'
      : 'claro';
  }
}
