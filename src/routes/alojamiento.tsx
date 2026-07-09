import { createFileRoute } from "@tanstack/react-router";
import {
  Wifi, Coffee, Bed, Mountain, Bath, Wine,
  Wind, ShieldCheck, Tent, Flame, Check,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Gallery } from "@/components/landing/Gallery";

const cld = (id: string) =>
  `https://res.cloudinary.com/dtymrddlg/image/upload/q_auto,f_auto,w_1280/${id}`;

const IMGS = {
  hero:       cld("Banner_Alojamiento_rbz8ow"),

  colinaP:    cld("habitacion_colina_parejas_principal_yxismj"),
  colina1:    cld("habitacion_colina_parejas_1_nrnp3z"),
  colina2:    cld("habitacion_colina_parejas_2_im8bii"),

  colonialP:  cld("habitacion_colonial_parejas_principal_fn6ax1"),
  colonial1:  cld("habitacion_colonial_parejas_1_zkdnd4"),
  colonial2:  cld("habitacion_colonial_parejas_2_udtj3y"),

  campestreP: cld("habitacion_campestre_multiple_principal_nuunz7"),
  campestre1: cld("habitacion_campestre_multiple_1_vpqsp9"),
  campestre2: cld("habitacion_campestre_multiple_2_hhrnzh"),

  cafeteraP:  cld("habitacion_cafetera_multiple_principal_htwv81"),
  cafetera1:  cld("habitacion_cafetera_multiple_1_phuy3g"),
  cafetera2:  cld("habitacion_cafetera_multiple_2_bdjkgl"),

  cabanaP:    cld("cabana_1_cokt3n"),
  cabana1:    cld("cabana_2_dqehtr"),
  cabana2:    cld("Cabana_3_mvqmib"),

  campingP:   cld("Zona_de_camping_q9t44e"),
  camping1:   cld("zona_camping_2_jyjc0v"),
  camping2:   cld("zona_camping_3_efdotw"),
};

export const Route = createFileRoute("/alojamiento")({
  component: AlojamientoPage,
  head: () => ({
    meta: [
      { title: "Alojamiento en el Eje Cafetero | El Jardín de Mis Amores" },
      { name: "description", content: "Habitaciones para parejas, familias y grupos. Cabaña y zona para camping en Combia Baja, Eje Cafetero." },
      { property: "og:title", content: "Alojamiento - El Jardín de Mis Amores" },
      { property: "og:description", content: "Hospedaje en habitaciones, cabaña y zona para camping rodeado de naturaleza en el Eje Cafetero." },
    ],
  }),
});

const couplesIncludes = [
  { icon: Coffee, label: "Desayuno" },
  { icon: Bath,   label: "Baño privado" },
  { icon: Wine,   label: "Minibar" },
  { icon: Wind,   label: "Ventilador" },
  { icon: ShieldCheck, label: "Seguro hotelero" },
];

const familyIncludes = [
  { icon: Coffee, label: "Desayuno típico" },
  { icon: Bath,   label: "Baño privado" },
  { icon: Wine,   label: "Minibar" },
  { icon: Wind,   label: "Ventilador" },
  { icon: ShieldCheck, label: "Seguro hotelero" },
];

const couples = [
  {
    title:  "Habitación Colina",
    images: [IMGS.colinaP, IMGS.colina1, IMGS.colina2],
    price:  "$289.000",
    unit:   "x pareja",
    desc:   "Vista a la montaña, ambiente romántico y privacidad total.",
  },
  {
    title:  "Habitación Colonial",
    images: [IMGS.colonialP, IMGS.colonial1, IMGS.colonial2],
    price:  "$289.000",
    unit:   "x pareja",
    desc:   "Estilo colonial cafetero con detalles en madera y luz cálida.",
  },
];

const family = [
  {
    title:  "Habitación Campestre",
    images: [IMGS.campestreP, IMGS.campestre1, IMGS.campestre2],
    price:  "$110.000",
    unit:   "x persona",
    desc:   "Espaciosa, ideal para familias y grupos de amigos.",
  },
  {
    title:  "Habitación Cafetera",
    images: [IMGS.cafeteraP, IMGS.cafetera1, IMGS.cafetera2],
    price:  "$110.000",
    unit:   "x persona",
    desc:   "Ambiente cafetero auténtico, cómoda y funcional.",
  },
  {
    title:  "La Cabaña",
    images: [IMGS.cabanaP, IMGS.cabana1, IMGS.cabana2],
    price:  "$169.500",
    unit:   "x persona · desde 3 personas",
    desc:   "1 cama doble, 1 camarote, 1 cama auxiliar, altillo y domo.",
  },
];

function AlojamientoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={IMGS.hero}
          alt="Alojamiento en El Jardín de Mis Amores"
          width={1920} height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="rounded-full bg-brand-green px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Hospedaje · Eje Cafetero
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
            Duerme rodeado de naturaleza y montañas
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg text-white/90">
            Habitaciones para parejas, familias y grupos. Cabañas y zona para camping bajo las estrellas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-green px-7 py-3 font-semibold shadow-card transition hover:brightness-110">
              Reservar ahora
            </a>
            <a href="#opciones" className="rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold backdrop-blur-md transition hover:bg-white/20">
              Ver opciones
            </a>
          </div>
        </div>
      </section>

      {/* Parejas */}
      <section id="opciones" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-red">Para parejas</span>
          <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Escapadas románticas en pareja</h2>
          <p className="mt-4 text-muted-foreground">Habitaciones acogedoras con todo lo que necesitas para una experiencia inolvidable.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {couples.map((r) => (
            <article key={r.title} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform duration-500 hover:-translate-y-1">
              <Gallery images={r.images} alt={r.title} aspect="aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-bold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {couplesIncludes.map((i) => (
                    <div key={i.label} className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
                      <i.icon className="h-4 w-4 text-brand-green" />
                      <span className="text-xs font-medium">{i.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-end justify-between gap-4 rounded-2xl bg-muted/60 p-4">
                  <div>
                    <div className="text-xs font-medium uppercase text-muted-foreground">Tarifa oficial</div>
                    <div className="mt-1 text-2xl font-bold">{r.price}</div>
                    <div className="text-xs text-muted-foreground">{r.unit}</div>
                  </div>
                  <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-110">
                    Reservar ahora
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Familias */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">Para familias y amigos</span>
            <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Espacios cómodos para grupos</h2>
            <p className="mt-4 text-muted-foreground">Comparte la experiencia con quienes más quieres.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {family.map((r) => (
              <article key={r.title} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform duration-500 hover:-translate-y-1">
                <Gallery images={r.images} alt={r.title} aspect="aspect-[4/3]" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {familyIncludes.map((i) => (
                      <li key={i.label} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brand-green" />
                        <span>{i.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <div className="text-xs font-medium uppercase text-muted-foreground">Tarifa oficial</div>
                    <div className="mt-1 text-2xl font-bold">{r.price}</div>
                    <div className="text-xs text-muted-foreground">{r.unit}</div>
                  </div>
                  <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 font-semibold text-white shadow-card transition hover:brightness-110">
                    Reservar ahora
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Servicios incluidos</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Bed,      title: "Habitaciones cómodas", desc: "Camas amplias." },
              { icon: Coffee,   title: "Desayuno típico",      desc: "Sabores del Eje Cafetero cada mañana." },
              { icon: Mountain, title: "Vistas al valle",      desc: "Paisajes de montañas y cafetales." },
              { icon: Wifi,     title: "Conexión WiFi",        desc: "Internet en zonas comunes del EcoHotel." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-transform duration-500 hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <s.icon className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-semibold">{s.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camping */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 overflow-hidden rounded-3xl bg-card shadow-card md:grid-cols-2">
          <div className="group aspect-[4/3] overflow-hidden md:aspect-auto">
            <img src={IMGS.campingP} alt="Zona para camping" width={1280} height={960} loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-blue">Zona para Camping</span>
            <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Duerme bajo las estrellas del Eje Cafetero</h2>
            <p className="mt-4 text-muted-foreground">Trae tu carpa y vive una noche inolvidable en medio de la naturaleza. Contamos con un espacio especialmente acondicionado para que instales tu equipo de camping y disfrutes de una velada única bajo el cielo del Eje Cafetero.</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Tent className="h-4 w-4 text-brand-green" /> Zona habilitada para instalar tu propia carpa</li>
              <li className="flex items-center gap-2"><Bath className="h-4 w-4 text-brand-green" /> Acceso a baños y duchas sociales</li>
              <li className="flex items-center gap-2"><Flame className="h-4 w-4 text-brand-green" /> Zona de fogata y conexión con la naturaleza</li>
            </ul>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brand-green">$35.000</span>
              <span className="text-sm text-muted-foreground">por persona / noche</span>
            </div>
            <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-brand-green px-6 py-3 font-semibold text-white shadow-card transition hover:brightness-110">
              Reservar ahora
            </a>
          </div>
        </div>
        <Gallery images={[IMGS.campingP, IMGS.camping1, IMGS.camping2]} alt="Zona para camping" />
      </section>

      {/* CTA */}
      <section className="bg-brand-green py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl">¿Listo para hospedarte con nosotros?</h2>
          <p className="mt-3 max-w-xl text-white/90">Reserva ahora y recibe confirmación inmediata.</p>
          <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-6 rounded-full bg-white px-8 py-3 font-semibold text-brand-green shadow-card transition hover:scale-105">
            Reservar ahora
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
