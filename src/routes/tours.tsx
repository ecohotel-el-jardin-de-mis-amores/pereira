import { createFileRoute } from "@tanstack/react-router";
import { Shield, Clock, Users, MapPin, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Gallery } from "@/components/landing/Gallery";

const cld = (id: string) =>
  `https://res.cloudinary.com/dtymrddlg/image/upload/q_auto,f_auto,w_1280/${id}`;

const tours = [
  {
    title: "Ruta El Guayabo",
    slug: "guayabo",
    images: [
      cld("tour_cuatri_el_Guayabo_principal_njnyzq"),
      cld("tour_cuatri_el_guayabo_1_w2bsgm"),
      cld("tour_cuatri_el_guayabo_2_evuicb"),
    ],
    adult: "$ 99.000",
    kids: "$ 66.000",
    duration: "1 1/2 hora",
    difficulty: "Moderada",
    group: "Máx. 6 personas",
    desc: "Recorre los senderos del corregimiento de Combia Baja con las mejores vistas a las montañas.",
    highlights: ["Miradores panorámicos", "Senderos naturales", "Fotografía de paisaje"],
  },
  {
    title: "Ruta Río La Argentina",
    slug: "rio-argentina",
    images: [
      cld("tour_cuatrimoto_rio_la_argentina_principal_xcmad1"),
      cld("tour_cuatrimoto_rio_la_argentina_1_t0w4on"),
      cld("tour_cuatrimoto_rio_la_argentina_2_s5rqib"),
    ],
    adult: "$ 176.000",
    kids: "$ 110.000",
    duration: "2.5 horas",
    difficulty: "Moderada",
    group: "Máx. 6 personas",
    desc: "Desciende hasta las orillas del Río La Argentina, cruzando puentes y bosques de guadua en una aventura inolvidable.",
    highlights: ["Cruce de río", "Bosque de guadua", "Refrescante parada en el río"],
  },
  {
    title: "Ruta Las Cascadas",
    slug: "cascadas",
    images: [
      "https://res.cloudinary.com/dtymrddlg/image/upload/v1782675981/tour_cuatrimoto_las_cascadas_principal_nxmmux.jpg",
      "https://res.cloudinary.com/dtymrddlg/image/upload/v1782675976/tour_cuatrimoto_las_cascadas_1_mji19j.jpg",
      "https://res.cloudinary.com/dtymrddlg/image/upload/v1782675978/tour_cuatrimoto_las_cascadas_2_wl21wj.jpg",
    ],
    adult: "$ 296.000",
    kids: "$ 226.000",
    duration: "6 horas",
    difficulty: "Alta",
    group: "Máx. 6 personas",
    desc: "La ruta más emocionante: llega a cascadas escondidas en la montaña después de cruzar caminos de barro, piedra y naturaleza pura.",
    highlights: ["Cascadas naturales", "Terreno técnico", "Experiencia extrema"],
  },
];

export const Route = createFileRoute("/tours")({
  component: ToursPage,
  head: () => ({
    meta: [
      { title: "Tours en Cuatrimoto | El Jardín de Mis Amores" },
      { name: "description", content: "Recorre ríos, cascadas y senderos del Eje Cafetero en cuatrimoto. Guías expertos y equipo incluido." },
    ],
  }),
});

function ToursPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={"https://res.cloudinary.com/dtymrddlg/image/upload/v1782675968/banner_tours_ecohotel_el_jardin_seai7g.jpg"}
          alt="Tours en cuatrimoto en el Eje Cafetero"
          width={1920} height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="rounded-full bg-brand-green px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Tours · Cuatrimoto · Eje Cafetero
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
            Aventura sobre cuatro ruedas
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg text-white/90">
            Ríos, cascadas y senderos del corredor turístico de Combia Baja. Guías expertos y equipo de seguridad incluido.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-green px-7 py-3 font-semibold shadow-card transition hover:brightness-110">
              Reservar un tour
            </a>
            <a href="#rutas" className="rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold backdrop-blur-md transition hover:bg-white/20">
              Ver rutas
            </a>
          </div>
        </div>
      </section>

      {/* Garantías */}
      <section className="bg-muted/40 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, text: "Equipo de seguridad incluido" },
              { icon: Users,  text: "Guías expertos certificados" },
              { icon: Clock,  text: "Grupos pequeños y personalizados" },
            ].map((g) => (
              <div key={g.text} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10">
                  <g.icon className="h-5 w-5 text-brand-green" />
                </div>
                <span className="text-sm font-medium">{g.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rutas */}
      <section id="rutas" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-green">Nuestras rutas</span>
          <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Elige tu aventura</h2>
          <p className="mt-4 text-muted-foreground">Tres rutas diseñadas para diferentes niveles de adrenalina.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {tours.map((t) => (
            <article key={t.slug} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform duration-500 hover:-translate-y-1">
              <Gallery images={t.images} alt={t.title} aspect="aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-muted/60 p-2">
                    <Clock className="mx-auto mb-1 h-4 w-4 text-brand-green" />
                    {t.duration}
                  </div>
                  <div className="rounded-xl bg-muted/60 p-2">
                    <Shield className="mx-auto mb-1 h-4 w-4 text-brand-green" />
                    {t.difficulty}
                  </div>
                  <div className="rounded-xl bg-muted/60 p-2">
                    <Users className="mx-auto mb-1 h-4 w-4 text-brand-green" />
                    {t.group}
                  </div>
                </div>

                <ul className="mt-4 space-y-1 text-sm">
                  {t.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-brand-green" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-2xl bg-muted/60 p-4">
                  <div className="text-xs font-medium uppercase text-muted-foreground mb-2">💰 Tarifas oficiales</div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Adulto</p>
                      <p className="text-xl font-extrabold text-brand-green">{t.adult}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Niños</p>
                      <p className="text-xl font-extrabold text-brand-blue">{t.kids}</p>
                    </div>
                  </div>
                </div>
                <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-110">
                  Reservar
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA ubicación */}
      <section className="bg-brand-green py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <MapPin className="mb-4 h-8 w-8 opacity-80" />
          <h2 className="text-balance text-3xl font-bold md:text-4xl">¿Listo para la aventura?</h2>
          <p className="mt-3 max-w-xl text-white/90">
            Combia Baja, Pereira — A 40 minutos del aeropuerto Internacional Matecaña.
          </p>
          <a href="https://reservas.ecohoteleljardindemisamores.com.co" target="_blank" rel="noopener noreferrer" className="mt-6 rounded-full bg-white px-8 py-3 font-semibold text-brand-green shadow-card transition hover:scale-105">
            Reservar un tour
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
