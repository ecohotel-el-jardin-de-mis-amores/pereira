import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Lock, ArrowLeft, CheckCircle2, AlertCircle, Plus, Minus, Loader2, Clock, CalendarDays,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { track } from "@/lib/pixel";
import {
  CATEGORIAS, SERVICIOS, buscarServicio, calcularAnticipo, calcularTotal, esPareja, formatCOP,
  precioDesde, seleccionInicial, usaNinos, usaNoches, type Seleccion, type Servicio,
} from "@/lib/catalogo";
import {
  abrirPago, consultarTransaccion, crearReserva, type ResultadoTransaccion,
} from "@/lib/wompi";

// WhatsApp: el agente atiende dudas e información; la asesora confirma reservas.
const WA_AGENTE  = "573128993195";
const WA_ASESORA = "573112411805";
const waLink = (phone: string, msg: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

type Search = { s?: string; pago?: string; id?: string };

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  validateSearch: (s: Record<string, unknown>): Search => ({
    s:    typeof s.s    === "string" ? s.s    : undefined,
    pago: typeof s.pago === "string" ? s.pago : undefined,
    id:   typeof s.id   === "string" ? s.id   : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reserva tu experiencia | El Jardín de Mis Amores" },
      { name: "description", content: "Reserva y paga el 50% de forma segura con Wompi." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function CheckoutPage() {
  const search = Route.useSearch();
  const servicio = buscarServicio(search.s);
  const volviendoDePago = Boolean(search.pago && search.id);
  const paso = volviendoDePago ? 3 : servicio ? 2 : 1;

  return (
    <main className="min-h-screen bg-secondary/30">
      <Navbar solido />

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <Pasos actual={paso} />

        {volviendoDePago ? (
          <ResultadoDesdeWompi id={search.id!} prueba={search.pago === "prueba"} />
        ) : servicio ? (
          <DetalleReserva key={servicio.id} servicio={servicio} />
        ) : (
          <ElegirServicio />
        )}
      </section>

      <Footer />
      <WhatsAppButton contentName="Checkout" contentCategory="checkout" source="flotante" />
    </main>
  );
}

// ─── Indicador de pasos ───────────────────────────────────────────────────────
function Pasos({ actual }: { actual: number }) {
  const pasos = ["Elige", "Tus datos", "Paga el 50%"];
  return (
    <ol className="mb-8 flex items-center justify-center gap-2 text-sm sm:gap-4">
      {pasos.map((p, i) => {
        const n = i + 1;
        const activo = n === actual;
        const hecho = n < actual;
        return (
          <li key={p} className="flex items-center gap-2 sm:gap-4">
            <span className={`flex items-center gap-2 ${activo ? "font-bold text-foreground" : "text-muted-foreground"}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                activo || hecho ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"
              }`}>
                {hecho ? "✓" : n}
              </span>
              <span className="hidden sm:inline">{p}</span>
            </span>
            {n < pasos.length && <span className="h-px w-6 bg-border sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}

// ─── Paso 1: elegir servicio ──────────────────────────────────────────────────
function ElegirServicio() {
  return (
    <>
      <h1 className="text-center text-3xl font-extrabold md:text-4xl">¿Qué quieres reservar?</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted-foreground">
        Toca la opción que te guste. Hoy pagas solo el <strong>50%</strong> y el resto al llegar.
      </p>

      {CATEGORIAS.map((c) => (
        <div key={c.id} id={c.id} className="mt-12 scroll-mt-28">
          <h2 className="text-xl font-bold md:text-2xl">{c.emoji} {c.titulo}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.filter((s) => s.categoria === c.id).map((s) => (
              <Link
                key={s.id}
                to="/checkout"
                search={{ s: s.id }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border/50 transition hover:-translate-y-1 hover:ring-brand-green focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40"
              >
                <img src={s.imagen} alt="" width={800} height={500} loading="lazy"
                  className="aspect-[16/10] w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug">{s.titulo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.resumen}</p>
                  <p className="mt-3 text-base font-extrabold text-brand-green">{precioDesde(s)}</p>
                  <span className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-base font-semibold text-white transition group-hover:brightness-110">
                    Elegir
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <p className="mt-12 text-center text-muted-foreground">
        ¿No sabes cuál elegir?{" "}
        <a href={waLink(WA_AGENTE, "Hola, quiero ayuda para elegir mi reserva")} target="_blank" rel="noopener noreferrer"
          className="font-semibold text-brand-green underline">
          Escríbenos por WhatsApp
        </a>{" "}
        y te ayudamos.
      </p>
    </>
  );
}

// ─── Paso 2 y 3: detalles, datos y pago ──────────────────────────────────────
function mananaISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const schema = z.object({
  fecha:    z.string().min(1, "Elige la fecha de llegada"),
  nombre:   z.string().trim().min(3, "Escribe tu nombre completo"),
  telefono: z.string().refine((v) => v.replace(/\D/g, "").length >= 10, "Escribe tu celular de 10 dígitos"),
  email:    z.string().trim().email("Revisa tu correo, parece incompleto"),
  notas:    z.string().optional(),
});
type FormData = z.infer<typeof schema>;

type Estado =
  | { tipo: "listo" }
  | { tipo: "preparando" }
  | { tipo: "pagando" }
  | { tipo: "resultado"; tx: ResultadoTransaccion }
  | { tipo: "error"; mensaje: string };

function DetalleReserva({ servicio }: { servicio: Servicio }) {
  const navigate = useNavigate();
  const [sel, setSel] = useState<Seleccion>(() => seleccionInicial(servicio));
  const [estado, setEstado] = useState<Estado>({ tipo: "listo" });
  const [datos, setDatos] = useState<FormData | null>(null);

  const total = calcularTotal(servicio, sel);
  const anticipo = calcularAnticipo(total);
  const saldo = total - anticipo;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    track("InitiateCheckout", { content_name: servicio.titulo, content_category: servicio.categoria, currency: "COP", value: anticipo });
    // Solo al elegir el servicio, no en cada cambio de personas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicio.id]);

  const max = servicio.maxPersonas ?? 20;
  const ocupado = estado.tipo === "preparando" || estado.tipo === "pagando";

  const onSubmit = async (form: FormData) => {
    setDatos(form);
    setEstado({ tipo: "preparando" });
    try {
      const reserva = await crearReserva({
        servicio: servicio.id,
        fecha: form.fecha,
        adultos: sel.adultos,
        ninos: sel.ninos,
        noches: sel.noches,
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono,
        notas: form.notas ?? "",
      });
      if (reserva.montoCentavos !== anticipo * 100) {
        setEstado({ tipo: "error", mensaje: "El precio de este servicio cambió. Recarga la página para ver el valor actualizado." });
        return;
      }
      setEstado({ tipo: "pagando" });
      const tx = await abrirPago(reserva, { email: form.email, nombre: form.nombre, telefono: form.telefono });
      if (!tx) {
        setEstado({ tipo: "listo" });
        return;
      }
      if (tx.status === "APPROVED") {
        track("Purchase", { content_name: servicio.titulo, content_category: servicio.categoria, currency: "COP", value: anticipo });
      }
      setEstado({ tipo: "resultado", tx });
    } catch (e) {
      setEstado({ tipo: "error", mensaje: e instanceof Error ? e.message : "Algo salió mal. Intenta de nuevo." });
    }
  };

  if (estado.tipo === "resultado" && datos) {
    return (
      <ResultadoPago
        tx={estado.tx}
        detalle={{ servicio: servicio.titulo, fecha: datos.fecha, nombre: datos.nombre, saldo, personas: textoPersonas(servicio, sel) }}
        onReintentar={() => setEstado({ tipo: "listo" })}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* Resumen — arriba en móvil */}
      <aside className="h-fit rounded-3xl bg-card p-5 shadow-card ring-1 ring-border/50 md:p-7 lg:sticky lg:top-28 lg:order-last">
        <div className="flex gap-4 lg:block">
          <img src={servicio.imagen} alt="" width={800} height={500}
            className="h-24 w-28 shrink-0 rounded-2xl object-cover lg:h-44 lg:w-full" />
          <div className="lg:mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tu reserva</p>
            <h2 className="text-lg font-bold leading-snug">{servicio.titulo}</h2>
            <p className="text-sm text-muted-foreground">{textoPersonas(servicio, sel)}</p>
            <button type="button" onClick={() => navigate({ to: "/checkout", search: {} })}
              disabled={ocupado}
              className="mt-1 text-sm font-semibold text-brand-green underline disabled:opacity-50">
              Cambiar
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4 text-base">
          <Row label="Valor total" value={formatCOP(total)} />
          <Row label="Pagas al llegar" value={formatCOP(saldo)} />
        </div>
        <div className="mt-4 rounded-2xl bg-brand-green/10 p-4">
          <div className="flex items-end justify-between">
            <span className="font-semibold">Pagas hoy (50%)</span>
            <span className="text-3xl font-extrabold text-brand-green">{formatCOP(anticipo)}</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          ¿Dudas? Escríbenos por{" "}
          <a href={waLink(WA_AGENTE, `Hola, tengo una pregunta sobre ${servicio.titulo}`)} target="_blank" rel="noopener noreferrer"
            className="font-semibold text-brand-green underline">WhatsApp</a>.
        </p>
      </aside>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Link to="/checkout" search={{}} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand-green">
          <ArrowLeft className="h-4 w-4" /> Ver otras opciones
        </Link>

        {/* Cuándo y cuántos */}
        <Tarjeta titulo="¿Cuándo vienes y cuántos son?">
          <Campo label="Fecha de llegada" error={errors.fecha?.message}>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type="date" min={mananaISO()} disabled={ocupado} {...register("fecha")}
                className={inputClase(!!errors.fecha) + " pl-12"} />
            </div>
          </Campo>

          <div className="mt-5 space-y-3">
            {esPareja(servicio) ? (
              <div className="rounded-xl border border-brand-green/40 bg-brand-green/5 px-4 py-3 font-medium text-brand-green">
                💑 Precio fijo para 2 personas
              </div>
            ) : (
              <Contador
                label={usaNinos(servicio) ? "Adultos" : "Personas"}
                ayuda={servicio.minPersonas && servicio.minPersonas > 1 ? `Mínimo ${servicio.minPersonas} personas` : undefined}
                value={sel.adultos}
                min={servicio.minPersonas ?? 1}
                max={max - sel.ninos}
                disabled={ocupado}
                onChange={(adultos) => setSel((s) => ({ ...s, adultos }))}
              />
            )}
            {usaNinos(servicio) && (
              <Contador
                label="Niños"
                ayuda="De 4 a 12 años"
                value={sel.ninos}
                min={0}
                max={max - sel.adultos}
                disabled={ocupado}
                onChange={(ninos) => setSel((s) => ({ ...s, ninos }))}
              />
            )}
            {usaNoches(servicio) && (
              <Contador
                label="Noches"
                value={sel.noches}
                min={1}
                max={15}
                disabled={ocupado}
                onChange={(noches) => setSel((s) => ({ ...s, noches }))}
              />
            )}
            {servicio.maxPersonas && (
              <p className="text-sm text-muted-foreground">Máximo {servicio.maxPersonas} personas por grupo.</p>
            )}
            {servicio.cobro === "pareja" && (
              <p className="text-sm text-muted-foreground">
                ¿Vienen niños?{" "}
                <a href={waLink(WA_AGENTE, `Hola, quiero ${servicio.titulo} con niños`)} target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-brand-green underline">Pregúntanos la tarifa especial</a>.
              </p>
            )}
          </div>
        </Tarjeta>

        {/* Datos */}
        <Tarjeta titulo="Tus datos">
          <div className="space-y-5">
            <Campo label="Nombre completo" error={errors.nombre?.message}>
              <input autoComplete="name" placeholder="Ej. María Pérez" disabled={ocupado} {...register("nombre")}
                className={inputClase(!!errors.nombre)} />
            </Campo>
            <Campo label="Celular (WhatsApp)" error={errors.telefono?.message}>
              <input type="tel" inputMode="tel" autoComplete="tel" placeholder="300 000 0000" disabled={ocupado} {...register("telefono")}
                className={inputClase(!!errors.telefono)} />
            </Campo>
            <Campo label="Correo electrónico" error={errors.email?.message}>
              <input type="email" inputMode="email" autoComplete="email" placeholder="tu@correo.com" disabled={ocupado} {...register("email")}
                className={inputClase(!!errors.email)} />
            </Campo>
            <Campo label="¿Algo que debamos saber? (opcional)">
              <textarea rows={2} placeholder="Alergias, hora de llegada, celebración especial…" disabled={ocupado} {...register("notas")}
                className={inputClase(false) + " resize-none"} />
            </Campo>
          </div>
        </Tarjeta>

        {estado.tipo === "error" && (
          <div className="flex items-start gap-3 rounded-2xl bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              {estado.mensaje}{" "}
              <a href={waLink(WA_AGENTE, `Hola, tuve un problema pagando ${servicio.titulo} en la página`)} target="_blank" rel="noopener noreferrer"
                className="font-semibold underline">Escríbenos por WhatsApp</a>.
            </p>
          </div>
        )}

        <button type="submit" disabled={ocupado}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-5 text-lg font-bold text-white shadow-card transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
          {ocupado ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> {estado.tipo === "preparando" ? "Preparando tu pago…" : "Completa el pago en la ventana de Wompi"}</>
          ) : (
            <><Lock className="h-5 w-5" /> Pagar {formatCOP(anticipo)}</>
          )}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          <Lock className="mr-1 inline h-3.5 w-3.5" />
          Pago seguro con Wompi (Bancolombia): tarjeta, PSE, Nequi o Bancolombia.
          El resto ({formatCOP(saldo)}) lo pagas al llegar.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Al pagar aceptas los{" "}
          <Link to="/terminos" className="underline hover:text-brand-green">términos y la política de cancelación</Link>.
        </p>
      </form>
    </div>
  );
}

function textoPersonas(s: Servicio, sel: Seleccion) {
  const partes: string[] = [];
  if (esPareja(s)) partes.push("2 personas");
  else if (usaNinos(s)) {
    partes.push(`${sel.adultos} ${sel.adultos === 1 ? "adulto" : "adultos"}`);
    if (sel.ninos > 0) partes.push(`${sel.ninos} ${sel.ninos === 1 ? "niño" : "niños"}`);
  } else partes.push(`${sel.adultos} ${sel.adultos === 1 ? "persona" : "personas"}`);
  if (usaNoches(s)) partes.push(`${sel.noches} ${sel.noches === 1 ? "noche" : "noches"}`);
  return partes.join(" · ");
}

// ─── Resultado del pago ───────────────────────────────────────────────────────
type Detalle = { servicio: string; fecha: string; nombre: string; saldo: number; personas: string };

function ResultadoPago({ tx, detalle, onReintentar }: {
  tx: ResultadoTransaccion;
  detalle?: Detalle;
  onReintentar?: () => void;
}) {
  const pagado = formatCOP(Math.round(tx.amount_in_cents / 100));

  if (tx.status === "APPROVED") {
    const lineas = [
      "Hola, acabo de pagar mi reserva en la página web.",
      detalle && `Nombre: ${detalle.nombre}`,
      detalle && `Reserva: ${detalle.servicio}`,
      detalle && `Fecha de llegada: ${detalle.fecha}`,
      detalle && `Personas: ${detalle.personas}`,
      `Pagué: ${pagado}`,
      `Referencia: ${tx.reference}`,
    ].filter(Boolean).join("\n");

    return (
      <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-card ring-1 ring-border/50 md:p-10">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" />
        <h1 className="mt-4 text-3xl font-extrabold">¡Pago recibido!</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Pagaste <strong className="text-foreground">{pagado}</strong>
          {detalle && <> de tu reserva <strong className="text-foreground">{detalle.servicio}</strong></>}.
        </p>
        {detalle && (
          <p className="mt-2 text-muted-foreground">El resto ({formatCOP(detalle.saldo)}) lo pagas al llegar.</p>
        )}
        <p className="mt-6 rounded-2xl bg-muted/60 p-4 text-base">
          <strong>Último paso:</strong> toca el botón para enviarnos tu comprobante por WhatsApp y confirmar tu fecha.
        </p>
        <a href={waLink(WA_ASESORA, lineas)} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-green px-6 py-5 text-lg font-bold text-white shadow-card transition hover:brightness-110">
          Confirmar mi reserva por WhatsApp
        </a>
        <p className="mt-4 text-xs text-muted-foreground">Referencia de pago: {tx.reference}</p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-muted-foreground hover:text-brand-green">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (tx.status === "PENDING") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-card ring-1 ring-border/50 md:p-10">
        <Clock className="mx-auto h-16 w-16 text-brand-orange" />
        <h1 className="mt-4 text-3xl font-extrabold">Tu pago está en proceso</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          El banco todavía lo está confirmando. Cuando se apruebe te escribimos por WhatsApp.
          No necesitas pagar de nuevo.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">Referencia de pago: {tx.reference}</p>
        <a href={waLink(WA_AGENTE, `Hola, mi pago quedó en proceso. Referencia: ${tx.reference}`)} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-brand-green px-6 py-3 font-semibold text-brand-green">
          Escríbenos por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-card ring-1 ring-border/50 md:p-10">
      <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
      <h1 className="mt-4 text-3xl font-extrabold">El pago no se pudo completar</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        No se hizo ningún cobro. Puedes intentar con otro medio de pago o escribirnos y te ayudamos.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {onReintentar ? (
          <button type="button" onClick={onReintentar}
            className="rounded-full bg-brand-green px-6 py-4 text-lg font-bold text-white shadow-card transition hover:brightness-110">
            Intentar de nuevo
          </button>
        ) : (
          <Link to="/checkout" search={{}}
            className="rounded-full bg-brand-green px-6 py-4 text-lg font-bold text-white shadow-card transition hover:brightness-110">
            Volver a intentar
          </Link>
        )}
        <a href={waLink(WA_AGENTE, "Hola, no pude completar el pago de mi reserva en la página")} target="_blank" rel="noopener noreferrer"
          className="rounded-full border border-brand-green px-6 py-3 font-semibold text-brand-green">
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  );
}

// Cuando la persona regresa de PSE u otro medio externo (?pago=...&id=...).
function ResultadoDesdeWompi({ id, prueba }: { id: string; prueba: boolean }) {
  const [tx, setTx] = useState<ResultadoTransaccion | null | undefined>(null);

  useEffect(() => {
    let activo = true;
    consultarTransaccion(id, prueba)
      .then((r) => { if (activo) setTx(r); })
      .catch(() => { if (activo) setTx(undefined); });
    return () => { activo = false; };
  }, [id, prueba]);

  if (tx === null) {
    return (
      <div className="flex flex-col items-center py-20 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-brand-green" />
        <p className="mt-4 text-lg">Revisando tu pago…</p>
      </div>
    );
  }
  if (!tx) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-card ring-1 ring-border/50">
        <p className="text-lg">No pudimos revisar el estado de tu pago.</p>
        <a href={waLink(WA_AGENTE, `Hola, quiero saber el estado de mi pago. Transacción: ${id}`)} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 font-semibold text-white">
          Escríbenos por WhatsApp
        </a>
      </div>
    );
  }
  return <ResultadoPago tx={tx} />;
}

// ─── Piezas de UI ─────────────────────────────────────────────────────────────
function Tarjeta({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-card ring-1 ring-border/50 md:p-8">
      <h2 className="mb-5 text-xl font-bold md:text-2xl">{titulo}</h2>
      {children}
    </div>
  );
}

function Campo({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-base font-semibold">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-sm font-medium text-destructive">{error}</p>}
    </label>
  );
}

function inputClase(conError: boolean) {
  return `w-full rounded-xl border bg-background px-4 py-3.5 text-base outline-none transition focus:ring-2 focus:ring-brand-green/20 disabled:opacity-60 ${
    conError ? "border-destructive" : "border-border focus:border-brand-green"
  }`;
}

function Contador({ label, ayuda, value, onChange, min, max, disabled }: {
  label: string; ayuda?: string; value: number; onChange: (v: number) => void;
  min: number; max: number; disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3">
      <div>
        <p className="text-base font-semibold">{label}</p>
        {ayuda && <p className="text-sm text-muted-foreground">{ayuda}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Quitar ${label.toLowerCase()}`} disabled={disabled || value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border transition hover:bg-muted disabled:opacity-40">
          <Minus className="h-5 w-5" />
        </button>
        <span className="w-8 text-center text-xl font-bold" aria-live="polite">{value}</span>
        <button type="button" aria-label={`Agregar ${label.toLowerCase()}`} disabled={disabled || value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white transition hover:brightness-110 disabled:opacity-40">
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
