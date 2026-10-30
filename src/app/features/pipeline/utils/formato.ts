// El diseño muestra montos con agrupación india ($4,50,664) y fechas "18 Jun 2025".
const MONEDA = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// Abreviaturas fijas: Intl en-GB devuelve "Sept", que no coincide con el diseño.
const MESES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatearMonto = (valor: number): string => MONEDA.format(valor);

export const formatearFecha = (iso: string): string => {
  const [anio, mes, dia] = iso.split('-');
  return `${dia} ${MESES[Number(mes) - 1]} ${anio}`;
};
