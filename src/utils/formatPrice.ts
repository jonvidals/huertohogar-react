export function formatPrice(value: number): string {
  if (isNaN(value)) return "$0";
  return `$${value.toLocaleString("es-CL")}`;
}

export {};
