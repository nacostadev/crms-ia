import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { SessionService } from '../../services/session.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './topbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Topbar {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  protected readonly session = inject(SessionService);
  protected readonly theme = inject(ThemeService);
  readonly abrirMenu = output<void>();

  readonly menuUsuarioAbierto = signal(false);
  readonly pantallaCompleta = signal(false);

  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {
    this.pantallaCompleta.set(!!this.document.fullscreenElement);
  }

  alternarPantallaCompleta(): void {
    if (this.document.fullscreenElement) {
      this.document.exitFullscreen();
    } else {
      this.document.documentElement.requestFullscreen?.();
    }
  }

  cerrarSesion(): void {
    this.menuUsuarioAbierto.set(false);
    this.session.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}
