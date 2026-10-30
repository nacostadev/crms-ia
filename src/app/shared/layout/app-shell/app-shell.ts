import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Topbar, Footer],
  templateUrl: './app-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  // Mobile/tablet: drawer. Desktop: sidebar fijo que se puede colapsar a solo íconos.
  readonly menuAbierto = signal(false);
  readonly colapsado = signal(false);

  abrirMenu(): void {
    // En el drawer siempre se muestran los textos, aunque en desktop estuviera colapsado.
    this.colapsado.set(false);
    this.menuAbierto.set(true);
  }
}
