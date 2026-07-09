import { createFileRoute, Link } from "@tanstack/react-router";
import { Waves, Mountain, Trophy, Bird, PawPrint, Hammer, Check } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Gallery } from "@/components/landing/Gallery";

const cld = (id: string) =>
  `https://res.cloudinary.com/dtymrddlg/image/upload/q_auto,f_auto,w_1280/${id}`;

const IMGS = {
  hero:       cld("banner_principal_pasadias_ecohotel_i1buvy"),
  piscina:    cld("piscina_principal_x5yzew"),
  mirador:    cld("mirador_360_wnb8r7"),
  aves:       cld("avistamiento_de_aves_coc9ve"),
  juegos:     cld("zona_juegos_de_mesa_y_hamacas_vfghz0"),
  tarima:     cld("tarima_de_eventos_kmrzqc"),
  bar:        cld("bar_ecohotel_h3rne0"),

  sinCuatri:  cld("pasadia_sin_cuatrimoto_z9v1hf"),
  sinCuatri2: cld("pasadia_cuatrimoto_El_guayabo_2_ebjxvc"),
  sinCuatri3: cld("Pasadia__rio_la_argentina_1_nfk0fv"),

  guayaboP:   cld("pasadia_cuatrimoto_El_guayabo_principal_fdyl1i"),
  guayabo1:   cld("pasadia_cuatrimoto_El_guayabo_1_ikemzk"),
  guayabo2:   cld("pasadia_cuatrimoto_El_guayabo_2_ebjxvc"),

  argentinaP: cld("Pasadia__rio_la_argentina_principal_dzehyj"),
  argentina1: cld("Pasadia__rio_la_argentina_1_nfk0fv"),
  argentina2: "https://res.cloudinary.com/dtymrddlg/image/upload/v1783098762/Pasadia_rio_la_argentina_outcdu.jpg",

  cascadasP:  cld("pasadia_las_cascadas_principal_ymsqxo"),
  cascadas1:  cld("Pasadia_las_cascadas_1_gy4phd"),
  cascadas2:  cld("pasadia_las_cascadas_2_idziu8"),
};

const plans = [
  {
    title: "Pasadía sin Cuatrimoto",
    accent: "bg-brand-blue",
    badge: "Pareja, Familia y Amigos",
    duration: "8 horas · 9:00 a.m. – 5:00 p.m.",
    images: [IMGS.sinCuatri, IMGS.piscina, IMGS.mirador],
    includes: [
      "Menú típico de la finca",
      "Acceso completo al EcoHotel",
      "Piscina, miradores y zonas verdes",
    ],
    adult: "$72.900",
    kid: "$62.900",
  },
  {
    title: "Pasadía + Cuatrimoto El Guayabo",
    accent: "bg-brand-green",
    badge: "Aventura ligera",
    duration: "8 horas · 1½ h de tour en cuatrimoto",
    images: [IMGS.guayaboP, IMGS.guayabo1, IMGS.guayabo2],
    includes: [
      "1½ horas de tour en cuatrimotos",
      "Almuerzo típico de la casa",
      "Acceso completo al EcoHotel",
    ],
    adult: "$166.900",
    kid: "$136.900",
  },
  {
    title: "Pasadía + Cuatrimoto Río La Argentina",
    accent: "bg-brand-orange",
    badge: "Más popular",
    duration: "8 horas · 2½ h de tour en cuatrimoto",
    images: [IMGS.argentinaP, IMGS.argentina1, IMGS.argentina2],
    includes: [
      "2½ horas de tour en cuatrimotos",
      "Almuerzo con proteína al barril",
      "Acceso completo al EcoHotel",
    ],
    adult: "$226.000",
    kid: "$176.000",
  },
  {
    title: "Pasadía + Cuatrimoto a Las Cascadas",
    accent: "bg-brand-red",
    badge: "Aventura extrema",
    duration: "6 horas de aventura completa",
    images: [IMGS.cascadasP, IMGS.cascadas1, IMGS.cascadas2],
    includes: [
      "Cuatrimotos, marranitas, garrucha, senderismo y cascadas",
      "Almuerzo tipo fiambre con proteína al barril",
      "Disfrute de las instalaciones del EcoHotel",
    ],
    adult: "$316.000",
    kid: "$226.000",
  },
];

const facilities = [
  { icon: Waves,    title: "Piscina con plataforma",   desc: "Bahía para los más pequeños y plataforma elevada para lanzarse." },
  { icon: Mountain, title: "Mirador al Cristo Rey",    desc: "Vistas 360° al Cristo Rey de Belalcázar y al Eje Cafetero." },
  { icon: Bird,     title: "Avistamiento de aves",     desc: "Sendero ecológico con biodiversidad única del cafetal." },
  { icon: Trophy,   title: "Zona de juegos y hamacas", desc: "Juegos de mesa, hamacas y descanso entre árboles." },
  { icon: Hammer,   title: "Tarima de eventos",        desc: "Espacio para celebraciones, shows y entretenimiento." },
  { icon: PawPrint, title: "Bar del EcoHotel",         desc: "Bebidas y cocteles con vista a la naturaleza." },
];

export const Route = createFileRoute("/pasadias")({
  component: PasadiasPage,
  head: () => ({
    meta: [
      { title: "Pasadías en el Eje Cafetero | El Jardín de Mis Amores" },
      { name: "description", content: "Pasadías para pareja, familia y amigos en Combia Baja. Piscina, mirador 360°, aves y tours en cuatrimoto. Almuerzo incluido." },
      { property: "og:title", content: "Pasadías - El Jardín de Mis Amores" },
      { property: "og:description", content: "4 planes de pasadía con almuerzo, piscina y aventura en cuatrimoto." },
    ],
  }),
});

function PasadiasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={IMGS.hero}
          alt="Pasadías en El Jardín de Mis Amores"
          width={1920} height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="rounded-full bg-brand-green px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Pasadías 9 a.m. – 5 p.m.
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
            Un día perfecto en el corazón del Eje Cafetero
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg text-white/90">
            Pareja, familia o amigos. Elige tu plan: piscina, mirador, almuerzo y aventura en cuatrimoto incluida.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-green px-7 py-3 font-semibold shadow-card transition hover:brightness-110">
              Reservar pasadía
            </a>
            <a href="#planes" className="rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold backdrop-blur-md transition hover:bg-white/20">
              Ver planes
            </a>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-green">4 planes de pasadía</span>
          <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Elige la experiencia perfecta para tu día</h2>
          <p className="mt-4 text-muted-foreground">
            Menores de 12 años cuentan con tarifa especial. Todos los planes incluyen almuerzo y acceso a las instalaciones del EcoHotel.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {plans.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform duration-500 hover:-translate-y-1">
              <Gallery images={p.images} alt={p.title} aspect="aspect-[16/10]" />
              <div className={`${p.accent} px-6 py-2 text-xs font-bold uppercase tracking-wider text-white`}>
                {p.badge}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.duration}</p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-muted/60 p-4">
                  <div>
                    <div className="text-xs font-medium uppercase text-muted-foreground">Adulto</div>
                    <div className="mt-1 text-xl font-bold">{p.adult}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase text-muted-foreground">Niños</div>
                    <div className="mt-1 text-xl font-bold">{p.kid}</div>
                  </div>
                </div>
                <a
                  href="https://reservas.ecohoteleljardindemisamores.com.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 font-semibold text-white shadow-card transition hover:brightness-110"
                >
                  Reservar ahora
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Instalaciones */}
      <section id="instalaciones" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">Instalaciones</span>
            <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Espacios para disfrutar todo el día</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { img: IMGS.piscina, title: "Piscina con plataforma", desc: "Bahía para niños, zonas húmedas y plataforma elevada." },
              { img: IMGS.mirador, title: "Mirador al Cristo Rey",  desc: "Vistas 360° al valle del Eje Cafetero y Belalcázar." },
              { img: IMGS.aves,    title: "Avistamiento de aves",   desc: "Sendero ecológico con biodiversidad del cafetal." },
              { img: IMGS.juegos,  title: "Zona de juegos y hamacas", desc: "Relájate y diviértete entre árboles." },
              { img: IMGS.tarima,  title: "Tarima de eventos",      desc: "Espacio para celebraciones y entretenimiento." },
              { img: IMGS.bar,     title: "Bar del EcoHotel",       desc: "Bebidas y cocteles con vista a la naturaleza." },
              { img: IMGS.aves,  title: "Granja y animales",      desc: "Experiencia única con animales para los más pequeños." },
            ].map((c) => (
              <div key={c.title} className="group overflow-hidden rounded-3xl bg-card shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.title} width={1024} height={768} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <div key={f.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-transform duration-500 hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <f.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{f.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-green py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl">¿Listo para vivir tu pasadía?</h2>
          <p className="mt-3 max-w-xl text-white/90">
            Reserva y recibe asesoría inmediata sobre tarifas especiales para grupos y niños.
          </p>
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
