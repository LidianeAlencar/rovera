export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
