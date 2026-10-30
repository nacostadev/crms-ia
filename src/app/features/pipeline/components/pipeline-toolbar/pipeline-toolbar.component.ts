import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import {
  COLUMNAS,
  ColumnaPipeline,
  ESTADOS,
  ETAPAS,
  EstadoPipeline,
  EtapaPipeline,
  Orden,
} from '../../models/pipeline.model';
import { formatearFecha } from '../../utils/formato';

export interface RangoFechas {
  desde: string;
  hasta: string;
}

type Menu = 'filtro' | 'fecha' | 'orden' | 'columnas';

export const OPCIONES_ORDEN: { etiqueta: string; orden: Orden }[] = [
  { etiqueta: 'Newest', orden: { campo: 'fechaCreacion', asc: false } },
  { etiqueta: 'Oldest', orden: { campo: 'fechaCreacion', asc: true } },
  { etiqueta: 'Name (A–Z)', orden: { campo: 'nombre', asc: true } },
  { etiqueta: 'Name (Z–A)', orden: { campo: 'nombre', asc: false } },
  { etiqueta: 'Highest Deal Value', orden: { campo: 'valorTotal', asc: false } },
];

@Component({
  selector: 'app-pipeline-toolbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './pipeline-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineToolbarComponent {
  // Rango de fechas de los datos: es lo que se muestra mientras no se elija uno.
  readonly rangoDatos = input.required<RangoFechas | null>();

  readonly estado = model<EstadoPipeline | 'todos'>('todos');
  readonly etapas = model<ReadonlySet<EtapaPipeline>>(new Set());
  readonly rango = model<RangoFechas | null>(null);
  readonly orden = model.required<Orden>();
  readonly columnasOcultas = model<ReadonlySet<ColumnaPipeline>>(new Set());

  readonly opcionesEstado: { id: EstadoPipeline | 'todos'; etiqueta: string }[] = [
    { id: 'todos', etiqueta: 'All' },
    ...ESTADOS,
  ];
  readonly opcionesEtapa = ETAPAS;
  readonly opcionesOrden = OPCIONES_ORDEN;
  readonly opcionesColumna = COLUMNAS;

  readonly menuAbierto = signal<Menu | null>(null);
  readonly borradorDesde = signal('');
  readonly borradorHasta = signal('');

  readonly filtrosActivos = computed(
    () => (this.estado() !== 'todos' ? 1 : 0) + this.etapas().size,
  );

  readonly textoRango = computed(() => {
    const rango = this.rango() ?? this.rangoDatos();
    return rango ? `${formatearFecha(rango.desde)} - ${formatearFecha(rango.hasta)}` : 'Select dates';
  });

  alternar(menu: Menu): void {
    if (menu === 'fecha' && this.menuAbierto() !== 'fecha') {
      const actual = this.rango() ?? this.rangoDatos();
      this.borradorDesde.set(actual?.desde ?? '');
      this.borradorHasta.set(actual?.hasta ?? '');
    }
    this.menuAbierto.update((abierto) => (abierto === menu ? null : menu));
  }

  alternarEtapa(etapa: EtapaPipeline): void {
    this.etapas.update((actuales) => {
      const nuevas = new Set(actuales);
      if (nuevas.has(etapa)) nuevas.delete(etapa);
      else nuevas.add(etapa);
      return nuevas;
    });
  }

  limpiarFiltros(): void {
    this.estado.set('todos');
    this.etapas.set(new Set());
  }

  aplicarRango(): void {
    const desde = this.borradorDesde();
    const hasta = this.borradorHasta();
    if (!desde || !hasta) return;
    // Si se invierten las fechas, se ordenan en vez de rechazar el rango.
    this.rango.set(desde <= hasta ? { desde, hasta } : { desde: hasta, hasta: desde });
    this.menuAbierto.set(null);
  }

  limpiarRango(): void {
    this.rango.set(null);
    this.menuAbierto.set(null);
  }

  elegirOrden(orden: Orden): void {
    this.orden.set(orden);
    this.menuAbierto.set(null);
  }

  esOrdenActual(orden: Orden): boolean {
    const actual = this.orden();
    return actual.campo === orden.campo && actual.asc === orden.asc;
  }

  alternarColumna(columna: ColumnaPipeline): void {
    this.columnasOcultas.update((actuales) => {
      const nuevas = new Set(actuales);
      if (nuevas.has(columna)) nuevas.delete(columna);
      else nuevas.add(columna);
      return nuevas;
    });
  }
}
