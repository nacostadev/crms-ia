// Genera public/assets/icons/tabler-sprite.svg solo con los íconos Tabler que usa el diseño de
// Figma. Correr con `npm run icons` después de agregar un nombre a la lista.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'node_modules/@tabler/icons/icons');

const OUTLINE = [
  // Sidebar
  'arrow-bar-to-left', 'dashboard', 'brand-airtable', 'user-cog', 'layout-grid', 'chevron-down',
  'user-up', 'users-group', 'building-community', 'medal', 'chart-arcs', 'timeline-event-exclamation',
  'brand-campaignmonitor', 'atom-2', 'list-check', 'file-star', 'file-check', 'file-report',
  'file-invoice', 'report-money', 'chart-bar', 'bounce-right', 'report-analytics', 'artboard',
  'message-exclamation', 'steam', 'building-factory', 'phone-check', 'users', 'user-shield',
  'flag-question', 'brand-apple-podcast', 'page-break', 'brand-blogger', 'map-pin-pin', 'quote',
  'question-mark', 'message-check', 'ticket', 'settings-cog', 'world-cog', 'apps', 'device-laptop',
  'moneybag', 'settings-2', 'lock-square-rounded', 'error-404', 'file', 'inner-shadow-top-right',
  'info-triangle', 'adjustments-check', 'box-align-bottom', 'chart-donut', 'icons', 'forms', 'table',
  'map-star', 'file-stack', 'arrow-capsule', 'menu-deep',
  // Header
  'command', 'maximize', 'minimize', 'sun', 'moon', 'layout-grid-add', 'help-hexagon', 'chart-pie',
  'message-circle-exclamation', 'bell', 'menu-2', 'logout',
  // Pipeline
  'package-export', 'refresh', 'transition-top', 'transition-bottom', 'search', 'filter',
  'calendar-due', 'sort-ascending-2', 'columns-3', 'arrows-up-down', 'arrow-up', 'arrow-down',
  'dots-vertical', 'chevron-left', 'chevron-right', 'eye', 'edit', 'trash', 'x', 'check',
  // Login
  'mail', 'user',
];
const FILLED = ['square-rounded-plus'];

const simbolo = (tipo, nombre, id) => {
  const svg = readFileSync(join(origen, tipo, `${nombre}.svg`), 'utf8');
  const cuerpo = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/, '')
    .trim();
  return `<symbol id="${id}" viewBox="0 0 24 24">${cuerpo}</symbol>`;
};

const simbolos = [
  ...OUTLINE.map((n) => simbolo('outline', n, n)),
  ...FILLED.map((n) => simbolo('filled', n, `${n}-filled`)),
];

writeFileSync(
  join(raiz, 'public/assets/icons/tabler-sprite.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg">\n${simbolos.join('\n')}\n</svg>\n`,
);
console.log(`Sprite generado con ${simbolos.length} íconos.`);
