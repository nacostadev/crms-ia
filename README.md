# CRMS

Front de un CRM maquetado desde Figma ("Maquetado CRMS"). Angular 19 (standalone + signals) y Tailwind 4, con la misma estructura que `dm-web-client`. Sin backend: login y datos salen de los mocks de cada feature.

## Ejecutar

```bash
npm install
npm start        # http://localhost:4200
```

Cuentas demo: `admin@crms.ia` / `Admin123` · `ventas@crms.ia` / `Ventas123`

## Páginas

- `/login` (Figma 2001-20032): formulario reactivo con validaciones y "Remember Me" (localStorage o sessionStorage). En desktop, panel esmerilado sobre la foto; en tablet y mobile, solo el formulario.
- `/pipeline` (Figma 2001-20075, antes Dashboard): búsqueda, filtro por estado y etapa, rango de fechas, orden (menú y encabezados), mostrar u ocultar columnas, selección múltiple, paginación, exportar CSV. CRUD completo en modales: **Ver** (detalle, también con clic en el nombre), **Editar**, **Agregar** y **Eliminar** con confirmación. Los datos se guardan en `localStorage` (`crms:pipelines`) y sobreviven a recargar; para volver a los datos de ejemplo, borrar esa clave. `/dashboard` redirige aquí.
- Layout: sidebar con todo el menú del diseño (colapsable en desktop, drawer en mobile/tablet), header y footer. Solo Pipeline tiene página; el resto de opciones del menú aún no navega.

## Modo oscuro

Se cambia desde el selector sol/luna del header (y el botón del login). `ThemeService` pone la clase `.dark` en `<html>` y guarda la elección en `localStorage` (`crms:tema`); sin elección previa usa la preferencia del sistema. Los colores oscuros son los mismos tokens redefinidos bajo `.dark` en `src/tailwind-theme.css`, así que un componente nuevo soporta el modo oscuro solo si usa los tokens (`bg-superficie`, `text-texto`, `border-linea`...) en vez de colores fijos.

## Íconos

Tabler Icons servidos desde un sprite (`public/assets/icons/tabler-sprite.svg`) con solo los íconos usados. Para agregar uno: sumarlo a la lista de `scripts/build-icons.mjs` y correr `npm run icons`. Uso: `<app-icon name="search" [size]="16" />`.

## Estructura

```
src/app/
  features/
    auth/      components · guards · mocks · models · pages · services
    pipeline/  components · mocks · models · pages · services · utils
  shared/
    components/ (icon, modal, pagination)
    layout/     (app-shell, sidebar, topbar, footer)
    models/ · services/ (session)
public/assets/ (images, icons)
src/styles/_tokens.scss · src/tailwind-theme.css
```

---

Desarrollado por **nacostadev**.
