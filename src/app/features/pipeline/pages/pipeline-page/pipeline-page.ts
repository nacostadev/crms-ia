import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PipelineDetailComponent } from '../../components/pipeline-detail/pipeline-detail.component';
import { PipelineFormComponent } from '../../components/pipeline-form/pipeline-form.component';
import { PipelineTableComponent } from '../../components/pipeline-table/pipeline-table.component';
import {
  PipelineToolbarComponent,
  RangoFechas,
} from '../../components/pipeline-toolbar/pipeline-toolbar.component';
import {
  ColumnaPipeline,
  ETAPAS,
  EstadoPipeline,
  EtapaPipeline,
  NuevoPipeline,
  Orden,
  Pipeline,
} from '../../models/pipeline.model';
import { PipelinesService } from '../../services/pipelines.service';
import { formatearFecha } from '../../utils/formato';

const ORDEN_INICIAL: Orden = { campo: 'fechaCreacion', asc: false };
const DURACION_AVISO_MS = 3000;

@Component({
  selector: 'app-pipeline-page',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    PipelineToolbarComponent,
    PipelineTableComponent,
    PipelineFormComponent,
    PipelineDetailComponent,
  ],
  templateUrl: './pipeline-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelinePage {
  private readonly service = inject(PipelinesService);
  readonly pipelines = this.service.pipelines;

  // Filtros, orden y paginación
  readonly busqueda = signal('');
  readonly estado = signal<EstadoPipeline | 'todos'>('todos');
  readonly etapas = signal<ReadonlySet<EtapaPipeline>>(new Set());
  readonly rango = signal<RangoFechas | null>(null);
  readonly orden = signal<Orden>(ORDEN_INICIAL);
  readonly columnasOcultas = signal<ReadonlySet<ColumnaPipeline>>(new Set());
  readonly pagina = signal(1);
  readonly tamanio = signal(10);
  readonly seleccion = signal<ReadonlySet<string>>(new Set());

  // Estado de la UI
  readonly filtrosColapsados = signal(false);
  readonly menuExportar = signal(false);
  // Se guarda el id y no el objeto: así el detalle siempre muestra la versión vigente.
  readonly detalleId = signal<string | null>(null);
  readonly detalle = computed(() => {
    const id = this.detalleId();
    return id ? (this.service.obtener(id) ?? null) : null;
  });
  readonly formulario = signal<{ pipeline: Pipeline | null } | null>(null);
  readonly porEliminar = signal<Pipeline[] | null>(null);
  readonly aviso = signal<string | null>(null);
  private avisoTimer?: ReturnType<typeof setTimeout>;

  readonly rangoDatos = computed<RangoFechas | null>(() => {
    const fechas = this.pipelines().map((p) => p.fechaCreacion).sort();
    return fechas.length ? { desde: fechas[0], hasta: fechas[fechas.length - 1] } : null;
  });

  readonly filtrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const estado = this.estado();
    const etapas = this.etapas();
    const rango = this.rango();
    const { campo, asc } = this.orden();
    return this.pipelines()
      .filter((p) => !texto || p.nombre.toLowerCase().includes(texto))
      .filter((p) => estado === 'todos' || p.estado === estado)
      .filter((p) => etapas.size === 0 || etapas.has(p.etapa))
      .filter((p) => !rango || (p.fechaCreacion >= rango.desde && p.fechaCreacion <= rango.hasta))
      .sort((a, b) => {
        const va = a[campo];
        const vb = b[campo];
        const diff =
          typeof va === 'number' && typeof vb === 'number'
            ? va - vb
            : campo === 'etapa'
              ? ETAPAS.findIndex((e) => e.id === va) - ETAPAS.findIndex((e) => e.id === vb)
              : String(va).localeCompare(String(vb));
        return asc ? diff : -diff;
      });
  });

  readonly visibles = computed(() => {
    const inicio = (this.pagina() - 1) * this.tamanio();
    return this.filtrados().slice(inicio, inicio + this.tamanio());
  });

  constructor() {
    // Cualquier cambio de filtro vuelve a la primera página.
    effect(() => {
      this.busqueda();
      this.estado();
      this.etapas();
      this.rango();
      this.pagina.set(1);
    });

    // Si una eliminación deja la página actual vacía, se retrocede a la última con datos.
    effect(() => {
      const ultima = Math.max(1, Math.ceil(this.filtrados().length / this.tamanio()));
      if (this.pagina() > ultima) this.pagina.set(ultima);
    });
  }

  refrescar(): void {
    this.busqueda.set('');
    this.estado.set('todos');
    this.etapas.set(new Set());
    this.rango.set(null);
    this.orden.set(ORDEN_INICIAL);
    this.seleccion.set(new Set());
    this.mostrarAviso('Pipeline list refreshed.');
  }

  exportarCsv(): void {
    this.menuExportar.set(false);
    const filas = this.filtrados();
    const encabezado = ['Pipeline Name', 'Total Deal Value', 'No of Deals', 'Stage', 'Created Date', 'Status'];
    const lineas = filas.map((p) =>
      [
        p.nombre,
        p.valorTotal,
        p.nroDeals,
        ETAPAS.find((e) => e.id === p.etapa)?.etiqueta ?? p.etapa,
        formatearFecha(p.fechaCreacion),
        p.estado === 'active' ? 'Active' : 'Inactive',
      ]
        .map((valor) => `"${String(valor).replace(/"/g, '""')}"`)
        .join(','),
    );
    const blob = new Blob([[encabezado.join(','), ...lineas].join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'pipelines.csv';
    enlace.click();
    URL.revokeObjectURL(url);
    this.mostrarAviso(`${filas.length} pipelines exported.`);
  }

  onGuardar(datos: NuevoPipeline): void {
    const actual = this.formulario()?.pipeline;
    if (actual) {
      this.service.actualizar(actual.id, datos);
      this.mostrarAviso(`Pipeline "${datos.nombre}" updated.`);
    } else {
      this.service.agregar(datos);
      this.orden.set(ORDEN_INICIAL);
      this.pagina.set(1);
      this.mostrarAviso(`Pipeline "${datos.nombre}" added.`);
    }
    this.formulario.set(null);
  }

  eliminarSeleccionados(): void {
    const ids = this.seleccion();
    this.porEliminar.set(this.pipelines().filter((p) => ids.has(p.id)));
  }

  confirmarEliminar(): void {
    const lista = this.porEliminar();
    if (!lista?.length) return;
    this.service.eliminar(lista.map((p) => p.id));
    this.seleccion.update((actual) => {
      const nueva = new Set(actual);
      lista.forEach((p) => nueva.delete(p.id));
      return nueva;
    });
    this.porEliminar.set(null);
    this.mostrarAviso(
      lista.length === 1 ? `Pipeline "${lista[0].nombre}" deleted.` : `${lista.length} pipelines deleted.`,
    );
  }

  private mostrarAviso(mensaje: string): void {
    clearTimeout(this.avisoTimer);
    this.aviso.set(mensaje);
    this.avisoTimer = setTimeout(() => this.aviso.set(null), DURACION_AVISO_MS);
  }
}
