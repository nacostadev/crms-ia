import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { MENU } from './sidebar-menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  // `abierto` es el drawer de mobile/tablet; `colapsado` es el modo solo íconos de desktop.
  readonly abierto = input(false);
  readonly colapsado = input(false);
  readonly cerrar = output<void>();
  readonly alternarColapso = output<void>();

  readonly menu = MENU;
}
