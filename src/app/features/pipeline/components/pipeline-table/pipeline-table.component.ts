import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import {
  CampoOrden,
  ColumnaPipeline,
  ETAPAS,
  EtapaPipeline,
  Orden,
  Pipeline,
} from '../../models/pipeline.model';
import { formatearFecha, formatearMonto } from '../../utils/formato';

@Component({
  selector: 'app-pipeline-table',
  standalone: true,
  imports: [NgTemplateOutlet, IconComponent],
  templateUrl: './pipeline-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineTableComponent {
  readonly filas = input.required<Pipeline[]>();
  readonly columnasOcultas = input<ReadonlySet<ColumnaPipeline>>(new Set());
  readonly orden = model.required<Orden>();
  readonly seleccion = model<ReadonlySet<string>>(new Set());
  readonly ver = output<Pipeline>();
  readonly editar = output<Pipeline>();
  readonly eliminar = output<Pipeline>();

  // El menú se posiciona fijo: dentro del contenedor con scroll horizontal quedaría recortado.
  readonly menuAbierto = signal<{ id: string; top: number; left: number } | null>(null);
  readonly formatearMonto = formatearMonto;
  readonly formatearFecha = formatearFecha;

  readonly todasSeleccionadas = computed(
    () => this.filas().length > 0 && this.filas().every((f) => this.seleccion().has(f.id)),
  );
  readonly algunaSeleccionada = computed(
    () => !this.todasSeleccionadas() && this.filas().some((f) => this.seleccion().has(f.id)),
  );

  abrirMenu(id: string, evento: MouseEvent): void {
    if (this.menuAbierto()?.id === id) {
      this.menuAbierto.set(null);
      return;
    }
    const boton = (evento.currentTarget as HTMLElement).getBoundingClientRect();
    const ANCHO_MENU = 144;
    const ALTO_MENU = 120;
    const cabeAbajo = boton.bottom + 6 + ALTO_MENU < window.innerHeight;
    this.menuAbierto.set({
      id,
      top: cabeAbajo ? boton.bottom + 6 : boton.top - 6 - ALTO_MENU,
      left: Math.max(8, boton.right - ANCHO_MENU),
    });
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  cerrarMenu(): void {
    this.menuAbierto.set(null);
  }

  visible(columna: ColumnaPipeline): boolean {
    return !this.columnasOcultas().has(columna);
  }

  // Primer clic ordena ascendente; el siguiente sobre la misma columna invierte.
  ordenarPor(campo: CampoOrden): void {
    this.orden.update((actual) => ({ campo, asc: actual.campo === campo ? !actual.asc : true }));
  }

  alternarTodas(): void {
    const ids = this.filas().map((f) => f.id);
    this.seleccion.update((actual) => {
      const nueva = new Set(actual);
      if (this.todasSeleccionadas()) ids.forEach((id) => nueva.delete(id));
      else ids.forEach((id) => nueva.add(id));
      return nueva;
    });
  }

  alternarFila(id: string): void {
    this.seleccion.update((actual) => {
      const nueva = new Set(actual);
      if (nueva.has(id)) nueva.delete(id);
      else nueva.add(id);
      return nueva;
    });
  }

  etapa(id: EtapaPipeline) {
    return ETAPAS.find((e) => e.id === id)!;
  }

  accion(tipo: 'ver' | 'editar' | 'eliminar', fila: Pipeline): void {
    this.menuAbierto.set(null);
    ({ ver: this.ver, editar: this.editar, eliminar: this.eliminar })[tipo].emit(fila);
  }
}
