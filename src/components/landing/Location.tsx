const MAPS_URL  = "https://maps.app.goo.gl/VXXxoGMNrACn7SfH9";
const WAZE_URL  = "https://ul.waze.com/ul?place=ChIJW0KKY3V_OI4RiVFQOqK2Kec&ll=4.88465210%2C-75.78848690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";
const APPLE_URL = "https://maps.apple.com/place?place-id=I3DBC0378D669F072&address=Combia+Baja%2C+Pereira%2C+Risaralda%2C+Colombia&coordinate=4.884671%2C-75.788488&name=Finca+El+Jardin+De+Mis+Amores&_provider=9902";

const navApps = [
  { label: "Google Maps", icon: "🗺️", href: MAPS_URL,  color: "bg-brand-green" },
  { label: "Waze",        icon: "🚗", href: WAZE_URL,   color: "bg-brand-blue" },
  { label: "Apple Maps",  icon: "🍎", href: APPLE_URL,  color: "bg-brand-orange" },
];

export function Location() {
  return (
    <section id="ubicacion" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
              Ubicación
            </span>
            <h2 className="mt-3 text-balance text-4xl font-extrabold md:text-5xl">
              Combia Baja, Eje Cafetero
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Estamos ubicados en el corredor turístico de <strong>Combia Baja</strong>,
              a solo 40 minutos del Aeropuerto Internacional Matecaña. Fácil acceso,
              naturaleza espectacular y la mejor experiencia en cuatrimoto del Eje Cafetero.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-3">
                <span className="text-brand-green text-lg">📍</span>
                <span>Corredor turístico de Combia Baja, Risaralda — Colombia</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-brand-green text-lg">✈️</span>
                <span>40 min desde el Aeropuerto Internacional Matecaña</span>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {navApps.map((app) => (
                <a
                  key={app.label}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full ${app.color} px-5 py-3 text-sm font-semibold text-white shadow-card hover:brightness-110 transition`}
                >
                  <span>{app.icon}</span>
                  {app.label}
                </a>
              ))}
            </div>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-3xl shadow-card ring-1 ring-border/50"
          >
            <iframe
              title="Mapa El Jardín de Mis Amores - Combia Baja"
              src="https://www.google.com/maps?q=Combia+Baja,+Pereira,+Risaralda&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[420px] w-full border-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
              <span className="text-sm font-semibold">Toca para abrir en Google Maps</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
