import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ThemeService } from '../../../../shared/services/theme.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Credenciales } from '../../models/credenciales.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, IconComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);

  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);

  onLogin(credenciales: Credenciales): void {
    if (this.cargando()) return;
    this.cargando.set(true);
    this.error.set(null);

    this.auth
      .login(credenciales)
      .pipe(
        finalize(() => this.cargando.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/pipeline'),
        error: (err: Error) => this.error.set(err.message),
      });
  }
}
