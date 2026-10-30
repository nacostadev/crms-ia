import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ESTADOS,
  ETAPAS,
  EstadoPipeline,
  EtapaPipeline,
  NuevoPipeline,
  Pipeline,
} from '../../models/pipeline.model';

type CampoValidado = 'nombre' | 'valorTotal' | 'nroDeals';

@Component({
  selector: 'app-pipeline-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pipeline-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  // Con un pipeline el formulario edita; sin él, crea uno nuevo.
  readonly pipeline = input<Pipeline | null>(null);
  readonly guardar = output<NuevoPipeline>();
  readonly cancelar = output<void>();

  readonly etapas = ETAPAS;
  readonly estados = ESTADOS;

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(40)]],
    valorTotal: [0, [Validators.required, Validators.min(1)]],
    nroDeals: [0, [Validators.required, Validators.min(0)]],
    etapa: this.fb.nonNullable.control<EtapaPipeline>('in-pipeline'),
    estado: this.fb.nonNullable.control<EstadoPipeline>('active'),
  });

  ngOnInit(): void {
    const pipeline = this.pipeline();
    if (pipeline) {
      const { id: _, fechaCreacion: __, ...valores } = pipeline;
      this.form.setValue(valores);
    }
  }

  invalido(campo: CampoValidado): boolean {
    const control = this.form.controls[campo];
    return control.invalid && control.touched;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      ...valores,
      nombre: valores.nombre.trim(),
      valorTotal: Number(valores.valorTotal),
      nroDeals: Number(valores.nroDeals),
    });
  }
}
