import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Gallery } from "@/components/landing/Gallery";
import { Heart, Zap, Users, Coffee, BedDouble, Mountain, Check, X } from "lucide-react";

const cld = (id: string) =>
  `https://res.cloudinary.com/dtymrddlg/image/upload/q_auto,f_auto,w_1280/${id}`;

const IMGS = {
  hero:        cld("banner_planes_completos_kpnn6v"),

  parejaG1:    cld("plan_completo_pareja_ruta_el_guayabo_1_lremda"),
  parejaG2:    cld("plan_completo_pareja_ruta_el_guayabo_2_xwbqiu"),
  parejaG3:    cld("plan_completo_pareja_ruta_el_guayabo_3_eqjpki"),

  parejaA1:    cld("plan_completo_pareja_ruta_la_argentina_1_ach2jw"),
  parejaA2:    cld("plan_completo_pareja_ruta_la_argentina_2_xazkpn"),
  parejaA3:    cld("plan_completo_pareja_ruta_la_argentina_3_wntn8m"),

  parejaC1:    cld("plan_completo_pareja_ruta_la_cascada_1_w7x10v"),
  parejaC2:    cld("plan_completo_pareja_ruta_la_cascada_2_iwemhb"),
  parejaC3:    cld("plan_completo_pareja_ruta_la_cascada_3_nbw53o"),

  familiaG1:   cld("plan_completo_familia_y_amigos_ruta_el_guayabo_1_dmklna"),
  familiaG2:   cld("plan_completo_familia_y_amigos_ruta_el_guayabo_2_hrvhzz"),
  familiaG3:   cld("plan_completo_familia_y_amigos_ruta_el_guayabo_3_kg9xzi"),

  familiaA1:   cld("plan_completo_familia_y_amigos_ruta_la_argentina_1_d6pwjm"),
  familiaA2:   cld("plan_completo_familia_y_amigos_ruta_la_argentina_2_r1kg8o"),
  familiaA3:   cld("plan_completo_familia_y_amigos_ruta_la_argentina_3_jxzwmq"),

  familiaC1:   cld("plan_completo_familia_y_amigos_ruta_la_cascada_1_lqdmka"),
  familiaC2:   cld("plan_completo_familia_y_amigos_ruta_la_cascada_2_yw4aok"),
  familiaC3:   cld("plan_completo_familia_y_amigos_ruta_la_cascada_3_ihohog"),
};

const galleryParejaGuayabo   = [IMGS.parejaG1,   IMGS.parejaG2,   IMGS.parejaG3];
const galleryParejaArgentina = [IMGS.parejaA1,   IMGS.parejaA2,   IMGS.parejaA3];
const galleryParejaCascada   = [IMGS.parejaC1,   IMGS.parejaC2,   IMGS.parejaC3];
const galleryFamiliaGuayabo  = [IMGS.familiaG1,  IMGS.familiaG2,  IMGS.familiaG3];
const galleryFamiliaArgentina= [IMGS.familiaA1,  IMGS.familiaA2,  IMGS.familiaA3];
const galleryFamiliaCascada  = [IMGS.familiaC1,  IMGS.familiaC2,  IMGS.familiaC3];

const baseIncludes = [
  "1 noche de alojamiento (check in 3:00 pm – check out 5:00 pm)",
  "Alimentación completa: desayuno, almuerzo y cena",
  "Acceso a todas las zonas recreativas: piscina, miradores 360°, mirador al Cristo Rey, cancha de fútbol, hamacas, animales de granja, sendero ecológico, avistamiento de aves, restaurante y bar",
];

type Plan = {
  title: string;
  tour: string;
  duration: string;
  price: string;
  priceLabel: string;
  kids?: string;
  badge: string;
  badgeColor: "green" | "blue" | "orange";
  icon: React.ReactNode;
  images: string[];
};

const couplePlans: Plan[] = [
  {
    title: "Plan Pareja — Ruta El Guayabo",
    tour: "Tour en cuatrimoto al Guayabo",
    duration: "1 ½ horas",
    price: "$580.000",
    priceLabel: "por pareja",
    badge: "Romántico",
    badgeColor: "green",
    icon: <Zap className="h-5 w-5" />,
    images: galleryParejaGuayabo,
  },
  {
    title: "Plan Pareja — Río La Argentina",
    tour: "Tour en cuatrimoto al Río La Argentina",
    duration: "2 ½ horas",
    price: "$772.000",
    priceLabel: "por pareja",
    badge: "Popular",
    badgeColor: "blue",
    icon: <Heart className="h-5 w-5" />,
    images: galleryParejaArgentina,
  },
  {
    title: "Plan Pareja — Cascadas",
    tour: "Tour en cuatrimoto a Cascadas",
    duration: "6 horas",
    price: "$952.000",
    priceLabel: "por pareja",
    badge: "Aventura Premium",
    badgeColor: "orange",
    icon: <Mountain className="h-5 w-5" />,
    images: galleryParejaCascada,
  },
];

const familyPlans: Plan[] = [
  {
    title: "Familia / Amigos — Ruta El Guayabo",
    tour: "Tour en cuatrimoto al Guayabo",
    duration: "1 ½ horas",
    price: "$290.000",
    priceLabel: "por persona",
    kids: "$257.000",
    badge: "Clásico",
    badgeColor: "green",
    icon: <Users className="h-5 w-5" />,
    images: galleryFamiliaGuayabo,
  },
  {
    title: "Familia / Amigos — Río La Argentina",
    tour: "Tour en cuatrimoto al Río La Argentina",
    duration: "2 ½ horas",
    price: "$367.000",
    priceLabel: "por persona",
    kids: "$301.000",
    badge: "Popular",
    badgeColor: "blue",
    icon: <Users className="h-5 w-5" />,
    images: galleryFamiliaArgentina,
  },
  {
    title: "Familia / Amigos — Cascadas",
    tour: "Tour en cuatrimoto a Cascadas",
    duration: "6 horas",
    price: "$465.000",
    priceLabel: "por persona",
    kids: "$395.000",
    badge: "Aventura Premium",
    badgeColor: "orange",
    icon: <Mountain className="h-5 w-5" />,
    images: galleryFamiliaCascada,
  },
];

const badgeStyles: Record<Plan["badgeColor"], string> = {
  green:  "bg-brand-green",
  blue:   "bg-brand-blue",
  orange: "bg-brand-orange",
};

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border/50 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Gallery images={plan.images} alt={plan.title} aspect="aspect-[4/3]" />
        <span className={`absolute left-4 top-4 z-10 rounded-full ${badgeStyles[plan.badgeColor]} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-card`}>
          {plan.badge}
        </span>
        <span className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          ⏱ {plan.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-brand-green">
          {plan.icon}
          <span className="text-xs font-bold uppercase tracking-wider">Todo incluido</span>
        </div>
        <h3 className="mt-2 text-xl font-bold leading-tight">{plan.title}</h3>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>{baseIncludes[0]}</span>
          </li>
          <li className="flex gap-2">
            <Coffee className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
            <span>{baseIncludes[1]}</span>
          </li>
          <li className="flex gap-2">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>{plan.tour} ({plan.duration})</span>
          </li>
          <li className="flex gap-2">
            <BedDouble className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
            <span>{baseIncludes[2]}</span>
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
            <span>No incluye consumo ni bebidas adicionales</span>
          </li>
        </ul>

        <div className="mt-6 rounded-2xl bg-secondary p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">💰 Tarifa oficial</p>
          {plan.kids ? (
            <div className="mt-2 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Adultos</p>
                <p className="text-2xl font-extrabold text-brand-green">{plan.price}</p>
                <p className="text-xs text-muted-foreground">{plan.priceLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Niños</p>
                <p className="text-2xl font-extrabold text-brand-blue">{plan.kids}</p>
                <p className="text-xs text-muted-foreground">{plan.priceLabel}</p>
              </div>
            </div>
          ) : (
            <div className="mt-1 flex items-end justify-between">
              <p className="text-2xl font-extrabold text-brand-green">{plan.price}</p>
              <p className="text-xs text-muted-foreground">{plan.priceLabel}</p>
            </div>
          )}
        </div>

        <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-110"
        >
          Reservar ahora
        </a>
      </div>
    </article>
  );
}

export const Route = createFileRoute("/planes")({
  component: PlanesPage,
  head: () => ({
    meta: [
      { title: "Planes Todo Incluido — El Jardín de Mis Amores" },
      { name: "description", content: "Paquetes todo incluido para parejas, familias y amigos: alojamiento, alimentación y tour en cuatrimoto en el corazón del Eje Cafetero." },
      { property: "og:title", content: "Planes Todo Incluido — El Jardín de Mis Amores" },
      { property: "og:description", content: "Vive una experiencia sin preocupaciones: alojamiento + alimentación + tour en cuatrimoto." },
    ],
  }),
});

function PlanesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24">
        <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <img src={IMGS.hero} alt="Planes todo incluido en El Jardín de Mis Amores"
            width={1600} height={900} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                <Heart className="h-4 w-4" /> Planes Todo Incluido
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
                Una experiencia <span className="text-brand-green">sin preocupaciones</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/85">
                Alojamiento, alimentación completa y tour en cuatrimoto en un solo paquete. Para parejas, familias y grupos de amigos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes pareja */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-green">💑 Para parejas</span>
            <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Planes Pareja Todo Incluido</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Alojamiento + alimentación completa + tour en cuatrimoto. Tres rutas para vivir la aventura a tu medida.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {couplePlans.map((p) => <PlanCard key={p.title} plan={p} />)}
          </div>
        </div>
      </section>

      {/* Planes familia */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-blue">👨‍👩‍👧 Familia y amigos</span>
            <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Planes Familia / Amigos Todo Incluido</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Alojamiento + alimentación + tour en cuatrimoto. Tarifa por persona. Tarifa especial para niños de 4 a 12 años.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {familyPlans.map((p) => <PlanCard key={p.title} plan={p} />)}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            * Consulta tarifa especial para niños de 4 a 12 años por WhatsApp.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-green py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">¿Listo para vivir la experiencia completa?</h2>
          <p className="mt-3 text-lg text-white/90">Te ayudamos a elegir el plan perfecto para tu escapada.</p>
          <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-green shadow-card transition hover:brightness-105">
            Reservar ahora
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
