export interface ItemMenu {
  etiqueta: string;
  // Nombre del ícono Tabler (ver scripts/build-icons.mjs).
  icono: string;
  ruta?: string;
  // En Figma muestra chevron: es un grupo con submenú.
  desplegable?: boolean;
}

export interface SeccionMenu {
  titulo: string;
  items: ItemMenu[];
}

// Menú tal cual el sidebar de Figma (nodo 2001-20075). Solo Pipeline tiene página por ahora.
export const MENU: SeccionMenu[] = [
  {
    titulo: 'Main Menu',
    items: [
      { etiqueta: 'Dashboard', icono: 'dashboard' },
      { etiqueta: 'Application', icono: 'brand-airtable', desplegable: true },
      { etiqueta: 'Super Admin', icono: 'user-cog', desplegable: true },
      { etiqueta: 'Layouts', icono: 'layout-grid', desplegable: true },
    ],
  },
  {
    titulo: 'CRM',
    items: [
      { etiqueta: 'Contacts', icono: 'user-up' },
      { etiqueta: 'Customers', icono: 'users-group' },
      { etiqueta: 'Companies', icono: 'building-community' },
      { etiqueta: 'Deals', icono: 'medal' },
      { etiqueta: 'Leads', icono: 'chart-arcs' },
      { etiqueta: 'Pipeline', icono: 'timeline-event-exclamation', ruta: '/pipeline' },
      { etiqueta: 'Campaign', icono: 'brand-campaignmonitor' },
      { etiqueta: 'Projects', icono: 'atom-2' },
      { etiqueta: 'Tasks', icono: 'list-check' },
      { etiqueta: 'Proposals', icono: 'file-star' },
      { etiqueta: 'Contracts', icono: 'file-check' },
      { etiqueta: 'Estimations', icono: 'file-report' },
      { etiqueta: 'Invoices', icono: 'file-invoice' },
      { etiqueta: 'Payments', icono: 'report-money' },
      { etiqueta: 'Analytics', icono: 'chart-bar' },
      { etiqueta: 'Activities', icono: 'bounce-right' },
    ],
  },
  {
    titulo: 'Reports',
    items: [{ etiqueta: 'Reports', icono: 'report-analytics', desplegable: true }],
  },
  {
    titulo: 'CRM Settings',
    items: [
      { etiqueta: 'Sources', icono: 'artboard' },
      { etiqueta: 'Lost Reason', icono: 'message-exclamation' },
      { etiqueta: 'Contact Stage', icono: 'steam' },
      { etiqueta: 'Industry', icono: 'building-factory' },
      { etiqueta: 'Calls', icono: 'phone-check' },
    ],
  },
  {
    titulo: 'User Management',
    items: [
      { etiqueta: 'Manage Users', icono: 'users' },
      { etiqueta: 'Roles & Permissions', icono: 'user-shield' },
      { etiqueta: 'Delete Request', icono: 'flag-question' },
    ],
  },
  {
    titulo: 'Membership',
    items: [{ etiqueta: 'Membership', icono: 'brand-apple-podcast', desplegable: true }],
  },
  {
    titulo: 'Content',
    items: [
      { etiqueta: 'Pages', icono: 'page-break' },
      { etiqueta: 'Blog', icono: 'brand-blogger', desplegable: true },
      { etiqueta: 'Location', icono: 'map-pin-pin', desplegable: true },
      { etiqueta: 'Testimonials', icono: 'quote' },
      { etiqueta: 'FAQ', icono: 'question-mark' },
    ],
  },
  {
    titulo: 'Support',
    items: [
      { etiqueta: 'Contact Messages', icono: 'message-check' },
      { etiqueta: 'Tickets', icono: 'ticket' },
    ],
  },
  {
    titulo: 'Settings',
    items: [
      { etiqueta: 'General Settings', icono: 'settings-cog' },
      { etiqueta: 'Website Settings', icono: 'world-cog', desplegable: true },
      { etiqueta: 'App Settings', icono: 'apps', desplegable: true },
      { etiqueta: 'System Settings', icono: 'device-laptop', desplegable: true },
      { etiqueta: 'Financial Settings', icono: 'moneybag', desplegable: true },
      { etiqueta: 'Other Settings', icono: 'settings-2', desplegable: true },
    ],
  },
  {
    titulo: 'Pages',
    items: [
      { etiqueta: 'Authentication', icono: 'lock-square-rounded', desplegable: true },
      { etiqueta: 'Error Pages', icono: 'error-404', desplegable: true },
      { etiqueta: 'Blank Page', icono: 'file' },
      { etiqueta: 'Coming Soon', icono: 'inner-shadow-top-right' },
      { etiqueta: 'Under Maintenance', icono: 'info-triangle' },
    ],
  },
  {
    titulo: 'UI Interface',
    items: [
      { etiqueta: 'Base UI', icono: 'adjustments-check', desplegable: true },
      { etiqueta: 'Advanced UI', icono: 'box-align-bottom', desplegable: true },
      { etiqueta: 'Charts', icono: 'chart-donut', desplegable: true },
      { etiqueta: 'Icons', icono: 'icons', desplegable: true },
      { etiqueta: 'Forms', icono: 'forms', desplegable: true },
      { etiqueta: 'Tables', icono: 'table', desplegable: true },
      { etiqueta: 'Maps', icono: 'map-star', desplegable: true },
    ],
  },
  {
    titulo: 'Help',
    items: [
      { etiqueta: 'Documentation', icono: 'file-stack' },
      { etiqueta: 'Changelog v2.2.2', icono: 'arrow-capsule' },
      { etiqueta: 'Multi Level', icono: 'menu-deep', desplegable: true },
    ],
  },
];
