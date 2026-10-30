import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

const BOTONES_VISIBLES = 5;

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly total = input.required<number>();
  readonly opcionesTamanio = input([5, 10, 25, 50]);
  readonly pagina = model(1);
  readonly tamanio = model(10);

  readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.total() / this.tamanio())));

  // Ventana de hasta 5 números centrada en la página actual.
  readonly numeros = computed(() => {
    const total = this.totalPaginas();
    const cantidad = Math.min(BOTONES_VISIBLES, total);
    const inicio = Math.min(
      Math.max(1, this.pagina() - Math.floor(BOTONES_VISIBLES / 2)),
      total - cantidad + 1,
    );
    return Array.from({ length: cantidad }, (_, i) => inicio + i);
  });

  irA(pagina: number): void {
    this.pagina.set(Math.min(Math.max(1, pagina), this.totalPaginas()));
  }

  cambiarTamanio(valor: string): void {
    this.tamanio.set(Number(valor));
    this.pagina.set(1);
  }
}
