export type EtapaPipeline = 'win' | 'in-pipeline' | 'conversation' | 'lost';

export type EstadoPipeline = 'active' | 'inactive';

export interface Pipeline {
  id: string;
  nombre: string;
  valorTotal: number;
  nroDeals: number;
  etapa: EtapaPipeline;
  // ISO yyyy-mm-dd
  fechaCreacion: string;
  estado: EstadoPipeline;
}

export type NuevoPipeline = Omit<Pipeline, 'id' | 'fechaCreacion'>;

export interface EtapaInfo {
  id: EtapaPipeline;
  etiqueta: string;
  color: string;
}

// Colores de la barra de etapa según Figma.
export const ETAPAS: EtapaInfo[] = [
  { id: 'win', etiqueta: 'Win', color: '#27ae60' },
  { id: 'in-pipeline', etiqueta: 'In Pipeline', color: '#3538cd' },
  { id: 'conversation', etiqueta: 'Conversation', color: '#06aed4' },
  { id: 'lost', etiqueta: 'Lost', color: '#ef1e1e' },
];

export const ESTADOS: { id: EstadoPipeline; etiqueta: string }[] = [
  { id: 'active', etiqueta: 'Active' },
  { id: 'inactive', etiqueta: 'Inactive' },
];

export type ColumnaPipeline = 'valorTotal' | 'nroDeals' | 'etapa' | 'fechaCreacion' | 'estado';

export const COLUMNAS: { id: ColumnaPipeline; etiqueta: string }[] = [
  { id: 'valorTotal', etiqueta: 'Total Deal Value' },
  { id: 'nroDeals', etiqueta: 'No of Deals' },
  { id: 'etapa', etiqueta: 'Stages' },
  { id: 'fechaCreacion', etiqueta: 'Created Date' },
  { id: 'estado', etiqueta: 'Status' },
];

export type CampoOrden = 'nombre' | ColumnaPipeline;

export interface Orden {
  campo: CampoOrden;
  asc: boolean;
}
