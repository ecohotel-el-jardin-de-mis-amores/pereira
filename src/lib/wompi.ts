// Pago con Wompi (Web Checkout / widget).
//
// Flujo:
// 1. El sitio envía la reserva a n8n (RESERVA_URL). n8n calcula el anticipo con
//    /catalogo.json, guarda la reserva como pendiente y devuelve la referencia,
//    el monto y la firma de integridad. El secreto de Wompi solo vive en n8n.
// 2. El sitio abre el widget de Wompi con esos datos.
// 3. Wompi avisa a n8n (evento firmado) y n8n confirma la reserva y envía los
//    WhatsApp. Lo que diga el navegador nunca confirma una reserva.

// Webhook de n8n "Jardin - Reserva Wompi (crear)" (no es un secreto).
export const RESERVA_URL =
  "https://app-n8n-n8n.f5c8zw.easypanel.host/webhook/28aea092-f819-4cbb-829b-59261f6ec418/jardin-reserva-wompi";

const WIDGET_SRC = "https://checkout.wompi.co/widget.js";

export type DatosReserva = {
  servicio: string;
  fecha: string;
  adultos: number;
  ninos: number;
  noches: number;
  nombre: string;
  email: string;
  telefono: string;
  notas: string;
};

export type ReservaCreada = {
  referencia: string;
  montoCentavos: number;
  firma: string;
  llavePublica: string;
};

export type ResultadoTransaccion = {
  id: string;
  status: "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING";
  reference: string;
  amount_in_cents: number;
};

type WidgetCheckoutOptions = {
  currency: "COP";
  amountInCents: number;
  reference: string;
  publicKey: string;
  signature: { integrity: string };
  redirectUrl?: string;
  customerData?: {
    email?: string;
    fullName?: string;
    phoneNumber?: string;
    phoneNumberPrefix?: string;
  };
};

declare global {
  interface Window {
    WidgetCheckout?: new (opts: WidgetCheckoutOptions) => {
      open: (cb: (result: { transaction?: ResultadoTransaccion }) => void) => void;
    };
  }
}

export async function crearReserva(datos: DatosReserva): Promise<ReservaCreada> {
  const res = await fetch(RESERVA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.ok) {
    throw new Error(json?.mensaje ?? "No pudimos iniciar el pago. Intenta de nuevo en unos minutos.");
  }
  return json as ReservaCreada;
}

let cargando: Promise<void> | null = null;

function cargarWidget(): Promise<void> {
  if (window.WidgetCheckout) return Promise.resolve();
  if (!cargando) {
    cargando = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        cargando = null;
        reject(new Error("No se pudo cargar Wompi. Revisa tu conexión a internet."));
      };
      document.head.appendChild(script);
    });
  }
  return cargando;
}

export function esLlaveDePrueba(llavePublica: string) {
  return llavePublica.startsWith("pub_test_");
}

// Abre el widget. Se resuelve cuando la persona cierra el widget; si pagó,
// trae la transacción (aprobada, rechazada o pendiente).
export async function abrirPago(
  reserva: ReservaCreada,
  cliente: { email: string; nombre: string; telefono: string },
): Promise<ResultadoTransaccion | undefined> {
  await cargarWidget();
  if (!window.WidgetCheckout) throw new Error("No se pudo cargar Wompi.");

  // Para PSE y otros medios que salen del sitio, Wompi regresa a esta URL
  // agregando ?id=<transacción>.
  const redirectUrl = `${window.location.origin}/checkout?pago=${esLlaveDePrueba(reserva.llavePublica) ? "prueba" : "real"}`;

  const checkout = new window.WidgetCheckout({
    currency: "COP",
    amountInCents: reserva.montoCentavos,
    reference: reserva.referencia,
    publicKey: reserva.llavePublica,
    signature: { integrity: reserva.firma },
    redirectUrl,
    customerData: {
      email: cliente.email,
      fullName: cliente.nombre,
      phoneNumber: cliente.telefono.replace(/\D/g, "").slice(-10),
      phoneNumberPrefix: "+57",
    },
  });

  return new Promise((resolve) => checkout.open((result) => resolve(result.transaction)));
}

// Consulta el estado de una transacción en la API pública de Wompi
// (para cuando la persona regresa de PSE u otro medio externo).
export async function consultarTransaccion(id: string, prueba: boolean): Promise<ResultadoTransaccion | undefined> {
  const base = prueba ? "https://sandbox.wompi.co/v1" : "https://production.wompi.co/v1";
  const res = await fetch(`${base}/transactions/${encodeURIComponent(id)}`);
  if (!res.ok) return undefined;
  const json = await res.json();
  return json?.data as ResultadoTransaccion | undefined;
}
