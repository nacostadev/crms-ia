import { SessionUser } from '../../../shared/models/session-user.model';

export interface UsuarioMock extends SessionUser {
  password: string;
}

// Sin backend todavía: estas son las únicas cuentas que acepta el login.
export const USUARIOS_MOCK: UsuarioMock[] = [
  {
    id: 'u-001',
    nombre: 'Andrea Salazar',
    correo: 'admin@crms.ia',
    password: 'Admin123',
    rol: 'Administradora',
    avatarColor: '#4f46e5',
  },
  {
    id: 'u-002',
    nombre: 'Luis Ramírez',
    correo: 'ventas@crms.ia',
    password: 'Ventas123',
    rol: 'Ejecutivo comercial',
    avatarColor: '#7c3aed',
  },
];
