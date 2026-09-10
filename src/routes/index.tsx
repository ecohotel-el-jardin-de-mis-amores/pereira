import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hotel, Bike, Waves, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Location } from "@/components/landing/Location";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Gallery } from "@/components/landing/Gallery";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { track } from "@/lib/pixel";

const cld = (id: string) =>
  `https://res.cloudinary.com/dtymrddlg/image/upload/q_auto,f_auto,w_1280/${id}`;

const IMGS = {
  hero:     cld("home_principal_uvlbri"),
  nosotros: cld("nosotros_ry9ajp"),
  aloj:     cld("Banner_Alojamiento_rbz8ow"),
  tours:    cld("banner_tours_ecohotel_el_jardin_seai7g"),
  pasadia:  cld("banner_principal_pasadias_ecohotel_i1buvy"),
  planes:   cld("banner_planes_completos_kpnn6v"),
  mirador:  cld("mirador_360_wnb8r7"),
  tarima:   cld("tarima_de_eventos_kmrzqc"),
  juegos:   cld("zona_juegos_de_mesa_y_hamacas_vfghz0"),
  aves:     cld("avistamiento_de_aves_coc9ve"),
  bar:      cld("bar_ecohotel_h3rne0"),
  argentina: cld("Pasadia__rio_la_argentina_principal_dzehyj"),
};

const PHONE = "573128993195";
const waLink = (msg: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "El Jardín de Mis Amores | Ecohotel en el Eje Cafetero" },
      {
        name: "description",
        content:
          "Naturaleza, aventura y descanso en el corazón del Eje Cafetero. Alojamiento, tours en cuatrimoto, pasadías y planes todo incluido.",
      },
    ],
  }),
});

type Section = {
  value: string;
  label: string;
  icon: typeof Hotel;
  to: "/alojamiento" | "/tours" | "/pasadias" | "/planes";
  title: string;
  description: string;
  bullets: string[];
  image: string;
  cta: string;
};

const sections: Section[] = [
  {
    value: "alojamiento",
    label: "Alojamiento",
    icon: Hotel,
    to: "/alojamiento",
    title: "Habitaciones rodeadas de naturaleza",
    description:
      "Habitaciones para parejas y familias, cabañas y zona de camping. Despierta con vista a las montañas del Eje Cafetero.",
    bullets: ["Desayuno incluido", "Baño privado", "Acceso completo al Ecohotel"],
    image: IMGS.aloj,
    cta: "Ver alojamientos",
  },
  {
    value: "tours",
    label: "Tours en Cuatrimoto",
    icon: Bike,
    to: "/tours",
    title: "Aventura sobre cuatro ruedas",
    description:
      "Recorre ríos, cascadas y senderos del corredor turístico de Combia Baja con guías expertos y equipo de seguridad incluido.",
    bullets: ["Ruta El Guayabo", "Río La Argentina", "Cascadas"],
    image: IMGS.tours,
    cta: "Ver tours",
  },
  {
    value: "pasadias",
    label: "Pasadías",
    icon: Waves,
    to: "/pasadias",
    title: "Un día completo de experiencia",
    description:
      "8 horas de diversión con almuerzo al barril, piscina, mirador 360°, granja y acceso completo al Ecohotel.",
    bullets: ["9:00 a.m. a 5:00 p.m.", "Almuerzo incluido", "Planes con o sin cuatrimoto"],
    image: IMGS.pasadia,
    cta: "Ver pasadías",
  },
  {
    value: "planes",
    label: "Planes Especiales",
    icon: Sparkles,
    to: "/planes",
    title: "Paquetes todo incluido",
    description:
      "Planes para parejas, familias y grupos de amigos: alojamiento, alimentación y tour en cuatrimoto en un solo precio.",
    bullets: ["Plan Pareja", "Plan Familia", "Plan Amigos"],
    image: IMGS.planes,
    cta: "Ver planes",
  },
];

function Home() {
  const [active, setActive] = useState("alojamiento");

  const handleTabChange = (value: string) => {
    setActive(value);
    // onValueChange de Radix Tabs solo dispara en cambios por interacción del
    // usuario, no en el montaje inicial: no hace falta filtrar el tab por defecto.
    const section = sections.find((s) => s.value === value);
    if (section) {
      track("ViewContent", {
        content_name: section.title,
        content_category: section.value,
      });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <img
          src={IMGS.hero}
          alt="Ecohotel El Jardín de Mis Amores en el Eje Cafetero"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-start justify-center px-6 pt-24 text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-green/95 px-4 py-1.5 text-sm font-semibold shadow-card">
            🌿 Ecohotel · Combia Baja, Eje Cafetero
          </span>
          <h1 className="text-balance max-w-4xl text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            El Jardín de Mis Amores
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Naturaleza, aventura y descanso en el corazón del Eje Cafetero.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a  
              href={waLink("Hola, vengo de la página y quiero más información del Ecohotel El Jardín de Mis Amores")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-4 text-base font-semibold text-white shadow-card transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              Reservar por WhatsApp
            </a>
            
            <a  
              href="#explorar"
              className="rounded-full bg-white/10 backdrop-blur-sm px-7 py-4 text-base font-semibold text-white ring-1 ring-white/40 hover:bg-white/20"
            >
              Explorar experiencias
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/80">
            <span>✅ A 40 min del Aeropuerto Internacional Matecaña</span>
            <span>✅ Naturaleza y aventura</span>
            <span>✅ Atención personalizada</span>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section id="explorar" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Nuestras experiencias
            </span>
            <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
              Todo lo que puedes vivir en el Ecohotel
            </h2>
            <p className="mt-4 text-muted-foreground">
              Elige la experiencia que más te emociona y descúbrela en detalle.
            </p>
          </div>

          <Tabs value={active} onValueChange={handleTabChange} className="mt-12">
            <TabsList className="mx-auto flex h-auto w-full max-w-3xl flex-wrap justify-center gap-2 rounded-2xl bg-background p-2 shadow-card">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <TabsTrigger
                    key={s.value}
                    value={s.value}
                    className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-semibold data-[state=active]:bg-brand-green data-[state=active]:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {sections.map((s) => (
              <TabsContent key={s.value} value={s.value} className="mt-10">
                <div className="grid items-center gap-10 overflow-hidden rounded-2xl bg-background p-6 shadow-card md:grid-cols-2 md:p-10">
                  <div className="group overflow-hidden rounded-2xl">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-96"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                      <s.icon className="h-3.5 w-3.5" />
                      {s.label}
                    </span>
                    <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">{s.title}</h3>
                    <p className="mt-3 text-muted-foreground">{s.description}</p>
                    <ul className="mt-5 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        to={s.to}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:scale-105"
                      >
                        {s.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      
                      <a
                        href={waLink(`Hola, quiero más información sobre ${s.label}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("Lead", {
                            content_name: s.title,
                            content_category: s.value,
                            source: "tab_experiencias",
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-brand-green hover:text-brand-green"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl shadow-card">
            <img
              src={IMGS.nosotros}
              alt="Nuestra familia anfitriona en el Ecohotel"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-green/20 via-transparent to-transparent" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Nosotros
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold md:text-5xl">
              Una familia, un sueño hecho ecohotel
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              El Jardín de Mis Amores nació del amor por la tierra cafetera y el deseo
              de compartir su magia con quienes nos visitan. Cada habitación, cada
              sendero y cada plato sirven a un propósito: que te lleves un pedacito
              del Eje Cafetero en el corazón.
            </p>
            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span><strong>Más de una década</strong> recibiendo a familias, parejas y aventureros de todo el mundo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span><strong>Turismo sostenible</strong>: respetamos la biodiversidad del cafetal y trabajamos con la comunidad de Combia Baja.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span><strong>Atención personalizada</strong> para que vivas una experiencia auténtica y a tu medida.</span>
              </li>
            </ul>
            
            <a  
              href={waLink("Hola, quiero conocer más sobre el Ecohotel El Jardín de Mis Amores")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> Hablemos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Reseñas de Google</span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold md:text-4xl">Lo que dicen nuestros huéspedes</h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex text-yellow-400">{"★★★★★"}</div>
              <span className="text-sm font-semibold text-muted-foreground">5.0 · Google Reviews</span>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Carla Khalsa",
                badge: "Local Guide",
                stars: 5,
                text: "5/5 Stars – An unforgettable escape in paradise! The ATV tour was thrilling with incredible scenery. The food was outstanding with authentic Colombian flavor. The team is incredibly warm and goes above and beyond. Jardín de Mis Amores is hands-down one of the most beautiful places we've visited. Highly recommend for couples, families, or friends! 🌿🏍️💚",
              },
              {
                name: "Angie Sarmiento",
                badge: "",
                stars: 5,
                text: "Verdadero 'Hidden Gem' — nuestras mejores e inolvidables vacaciones! Fuimos por dos noches y terminamos quedándonos tres. El paseo a las cascadas no te lo puedes perder, mis niños de 5 y 9 años se fueron llenos de experiencias inolvidables. Las cuatri lo máximo, ni en los EEUU hemos experimentado algo así! Volveremos pronto 🏎️💦🌵",
              },
              {
                name: "Emilce Molina",
                badge: "",
                stars: 5,
                text: "Excelente servicio de Milena y Lucía. La comida es deliciosa, muy casera, pero Lucía le da el toque especial y el sazón maravilloso de la región. La tranquilidad y paz del lugar te hacen querer repetir la experiencia. El tour de cuatrimotos, fenomenal.",
              },
              {
                name: "Andrés Loaiza",
                badge: "Local Guide · 743 reseñas",
                stars: 4,
                text: "Un muy bonito lugar para disfrutar del paisaje cultural cafetero. Está lleno de experiencias para recorrer el sector de Combia y conocer el café, la montaña y todo lo que ofrece la cultura risaraldense. Muy buenas vistas y excelente atención por parte de todo el equipo.",
              },
              {
                name: "Pablo González Ayala",
                badge: "",
                stars: 5,
                text: "En cuanto al recibimiento, buena atención al cliente y buen tour de bienvenida. En cuanto a la comida, excelente y muy buenas porciones. Un lugar perfecto para ir a relajarse y despejar la mente junto a los que más quieres.",
              },
            ].map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl bg-card p-6 shadow-card ring-1 ring-border/50">
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-sm font-bold text-brand-green">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    {t.badge && <p className="text-xs text-muted-foreground">{t.badge}</p>}
                  </div>
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://maps.app.goo.gl/uTGCCZhcGFkXhQpe8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-green px-6 py-3 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-white"
            >
              Ver todas las reseñas en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* INSTALACIONES */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Instalaciones</span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold md:text-4xl">Todo lo que necesitas para un día perfecto</h2>
            <p className="mt-4 text-muted-foreground">Espacios diseñados para el descanso, la aventura y la diversión en medio de la naturaleza.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: IMGS.argentina, title: "Río La Argentina",          desc: "Tour en cuatrimotos, a destinos increíbles." },
              { img: IMGS.mirador,   title: "Mirador al Cristo Rey",     desc: "Vistas 360° al valle del Eje Cafetero." },
              { img: IMGS.aves,      title: "Avistamiento de aves",      desc: "Sendero ecológico con avistamiento de aves y fauna silvestre." },
              { img: IMGS.juegos,    title: "Zona de juegos y hamacas",  desc: "Relájate y diviértete entre árboles." },
              { img: IMGS.tarima,    title: "Tarima de eventos",         desc: "Espacio para celebraciones y entretenimiento." },
              { img: IMGS.bar,       title: "Bar del EcoHotel",          desc: "Bebidas y cocteles con vista a la naturaleza." },
            ].map((item) => (
              <div key={item.title} className="group overflow-hidden rounded-2xl bg-card shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.title} width={800} height={600} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Location />
      <Footer />
      <WhatsAppButton contentName="Home" contentCategory="home" source="flotante" />
    </main>
  );
}
