// Catálogo de servicios con precios para el checkout.
// La fuente de verdad es src/data/catalogo.json: el sitio lo publica en
// /catalogo.json (ver vite.config.ts) y n8n lo lee desde ahí para calcular
// el monto y la firma de Wompi. Si cambias un precio en las páginas,
// cámbialo también en ese JSON.
import data from "@/data/catalogo.json";

export type Categoria = "pasadia" | "plan" | "tour" | "alojamiento";

// persona       → adulto × adultos + niño × niños
// pareja        → precio fijo por los dos
// noche-pareja  → precio × noches
// noche-persona → precio × personas × noches
export type Cobro = "persona" | "pareja" | "noche-pareja" | "noche-persona";

export type Servicio = {
  id: string;
  categoria: Categoria;
  titulo: string;
  resumen: string;
  imagen: string;
  cobro: Cobro;
  adulto?: number;
  nino?: number;
  precio?: number;
  minPersonas?: number;
  maxPersonas?: number;
};

export type Seleccion = { adultos: number; ninos: number; noches: number };

export const SERVICIOS = data.servicios as Servicio[];
export const PORCENTAJE_ANTICIPO = data.anticipo;

export const CATEGORIAS: { id: Categoria; titulo: string; emoji: string }[] = [
  { id: "pasadia",     titulo: "Pasadías (un día)",          emoji: "☀️" },
  { id: "plan",        titulo: "Planes con noche incluida",  emoji: "🌙" },
  { id: "alojamiento", titulo: "Solo alojamiento",           emoji: "🛏️" },
  { id: "tour",        titulo: "Solo tour en cuatrimoto",    emoji: "🏍️" },
];

export function buscarServicio(id: string | undefined): Servicio | undefined {
  return SERVICIOS.find((s) => s.id === id);
}

// Para los botones "Reservar" de las páginas: lleva al checkout con el
// servicio ya elegido. Si el título no está en el catálogo, abre la lista.
export function reservaDe(titulo: string): { s?: string } {
  const s = SERVICIOS.find((x) => x.titulo === titulo);
  return s ? { s: s.id } : {};
}

export function usaNoches(s: Servicio) {
  return s.cobro === "noche-pareja" || s.cobro === "noche-persona";
}

export function usaNinos(s: Servicio) {
  return s.cobro === "persona";
}

export function esPareja(s: Servicio) {
  return s.cobro === "pareja" || s.cobro === "noche-pareja";
}

export function seleccionInicial(s: Servicio): Seleccion {
  return { adultos: esPareja(s) ? 2 : s.minPersonas ?? 1, ninos: 0, noches: 1 };
}

export function calcularTotal(s: Servicio, sel: Seleccion): number {
  switch (s.cobro) {
    case "persona":
      return (s.adulto ?? 0) * sel.adultos + (s.nino ?? 0) * sel.ninos;
    case "pareja":
      return s.precio ?? 0;
    case "noche-pareja":
      return (s.precio ?? 0) * sel.noches;
    case "noche-persona":
      return (s.precio ?? 0) * sel.adultos * sel.noches;
  }
}

export function calcularAnticipo(total: number): number {
  return Math.ceil(total * PORCENTAJE_ANTICIPO);
}

export function formatCOP(n: number): string {
  return "$" + n.toLocaleString("es-CO");
}

// Texto corto del precio para las tarjetas de selección.
export function precioDesde(s: Servicio): string {
  switch (s.cobro) {
    case "persona":       return `${formatCOP(s.adulto ?? 0)} por adulto`;
    case "pareja":        return `${formatCOP(s.precio ?? 0)} por pareja`;
    case "noche-pareja":  return `${formatCOP(s.precio ?? 0)} por noche (pareja)`;
    case "noche-persona": return `${formatCOP(s.precio ?? 0)} por persona / noche`;
  }
}
