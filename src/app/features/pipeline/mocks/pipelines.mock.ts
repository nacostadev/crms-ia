import { Pipeline } from '../models/pipeline.model';

// Filas tal cual aparecen en el diseño de Figma (nodo 2001-20075).
export const PIPELINES_MOCK: Pipeline[] = [
  { id: 'P-01', nombre: 'Sales', valorTotal: 450664, nroDeals: 315, etapa: 'win', fechaCreacion: '2025-06-18', estado: 'active' },
  { id: 'P-02', nombre: 'Marketing', valorTotal: 312893, nroDeals: 447, etapa: 'win', fechaCreacion: '2025-05-07', estado: 'inactive' },
  { id: 'P-03', nombre: 'Email', valorTotal: 289274, nroDeals: 654, etapa: 'in-pipeline', fechaCreacion: '2025-04-29', estado: 'active' },
  { id: 'P-04', nombre: 'Chats', valorTotal: 159326, nroDeals: 768, etapa: 'win', fechaCreacion: '2025-04-18', estado: 'active' },
  { id: 'P-05', nombre: 'Operational', valorTotal: 290173, nroDeals: 142, etapa: 'win', fechaCreacion: '2025-03-14', estado: 'active' },
  { id: 'P-06', nombre: 'Collaborative', valorTotal: 451417, nroDeals: 315, etapa: 'conversation', fechaCreacion: '2025-03-12', estado: 'active' },
  { id: 'P-07', nombre: 'Differentiate', valorTotal: 317589, nroDeals: 478, etapa: 'lost', fechaCreacion: '2025-02-05', estado: 'active' },
  { id: 'P-08', nombre: 'Interact', valorTotal: 169146, nroDeals: 664, etapa: 'lost', fechaCreacion: '2025-02-03', estado: 'active' },
  { id: 'P-09', nombre: 'Deals', valorTotal: 232213, nroDeals: 213, etapa: 'in-pipeline', fechaCreacion: '2025-01-25', estado: 'active' },
  { id: 'P-10', nombre: 'Onboarding', valorTotal: 432476, nroDeals: 432, etapa: 'win', fechaCreacion: '2025-01-15', estado: 'active' },
];
