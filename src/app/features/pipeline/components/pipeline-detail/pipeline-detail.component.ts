import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ETAPAS, Pipeline } from '../../models/pipeline.model';
import { formatearFecha, formatearMonto } from '../../utils/formato';

@Component({
  selector: 'app-pipeline-detail',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './pipeline-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineDetailComponent {
  readonly pipeline = input.required<Pipeline>();
  readonly editar = output<Pipeline>();
  readonly eliminar = output<Pipeline>();
  readonly cerrar = output<void>();

  readonly etapa = computed(() => ETAPAS.find((e) => e.id === this.pipeline().etapa)!);

  // Valor promedio por deal: dato derivado útil en la vista de detalle.
  readonly promedio = computed(() => {
    const { valorTotal, nroDeals } = this.pipeline();
    return nroDeals > 0 ? formatearMonto(Math.round(valorTotal / nroDeals)) : '—';
  });

  readonly formatearMonto = formatearMonto;
  readonly formatearFecha = formatearFecha;
}
