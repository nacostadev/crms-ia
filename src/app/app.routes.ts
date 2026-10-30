import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';
import { loginGuard } from './features/auth/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Sign In | CRMS',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    // Las vistas privadas viven dentro del shell (sidebar + header + footer).
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/layout/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pipeline' },
      {
        path: 'pipeline',
        title: 'Pipeline | CRMS',
        loadComponent: () =>
          import('./features/pipeline/pages/pipeline-page/pipeline-page').then(
            (m) => m.PipelinePage,
          ),
      },
      // Compatibilidad: el Dashboard anterior pasó a llamarse Pipeline.
      { path: 'dashboard', redirectTo: 'pipeline' },
    ],
  },
  { path: '**', redirectTo: '' },
];
