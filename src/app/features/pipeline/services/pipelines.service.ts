import { effect, Injectable, signal } from '@angular/core';
import { PIPELINES_MOCK } from '../mocks/pipelines.mock';
import { NuevoPipeline, Pipeline } from '../models/pipeline.model';

const CLAVE_STORAGE = 'crms:pipelines';

// Sin backend: los datos viven en localStorage. La primera vez (o si el storage no está
// disponible) se parte de los mocks del diseño.
@Injectable({ providedIn: 'root' })
export class PipelinesService {
  private readonly _pipelines = signal<Pipeline[]>(this.leerGuardados());
  readonly pipelines = this._pipelines.asReadonly();
  private siguienteId = this.calcularSiguienteId();

  constructor() {
    effect(() => {
      const lista = this._pipelines();
      try {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
      } catch {
        // Storage lleno o bloqueado: los cambios quedan solo en memoria.
      }
    });
  }

  obtener(id: string): Pipeline | undefined {
    return this._pipelines().find((p) => p.id === id);
  }

  agregar(nuevo: NuevoPipeline): Pipeline {
    const pipeline: Pipeline = {
      ...nuevo,
      id: `P-${String(this.siguienteId++).padStart(2, '0')}`,
      fechaCreacion: new Date().toISOString().slice(0, 10),
    };
    this._pipelines.update((lista) => [pipeline, ...lista]);
    return pipeline;
  }

  actualizar(id: string, cambios: NuevoPipeline): void {
    this._pipelines.update((lista) => lista.map((p) => (p.id === id ? { ...p, ...cambios } : p)));
  }

  eliminar(ids: string[]): void {
    const borrar = new Set(ids);
    this._pipelines.update((lista) => lista.filter((p) => !borrar.has(p.id)));
  }

  private leerGuardados(): Pipeline[] {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      const lista = guardado ? JSON.parse(guardado) : null;
      if (Array.isArray(lista)) return lista as Pipeline[];
    } catch {
      // JSON corrupto o storage bloqueado: se usan los mocks.
    }
    return structuredClone(PIPELINES_MOCK);
  }

  // Evita repetir ids tras recargar: sigue desde el número más alto guardado.
  private calcularSiguienteId(): number {
    const numeros = this._pipelines().map((p) => Number(p.id.replace(/\D/g, '')) || 0);
    return Math.max(PIPELINES_MOCK.length, ...numeros) + 1;
  }
}
