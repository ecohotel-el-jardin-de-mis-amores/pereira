import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  const socials = [
    {
      label: "WhatsApp",
      href: "https://wa.me/573128993195",
      icon: (
        <path d="M19.05 4.91A10 10 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.93 9.93 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02ZM12.04 20.15c-1.45 0-2.87-.39-4.11-1.13l-.29-.18-3.05.8.81-2.97-.19-.31a8.2 8.2 0 0 1-1.27-4.45c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Z" />
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/Ecohoteleljardindemisamores",
      icon: (
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ecohoteleljardindemisamores/",
      icon: (
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 4a5.84 5.84 0 1 0 0 11.68 5.84 5.84 0 0 0 0-11.68Zm0 9.64a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Zm6.13-9.83a1.36 1.36 0 1 1-2.72 0 1.36 1.36 0 0 1 2.72 0Z" />
      ),
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@ECOHOTELELJARDINDEMISAMORES",
      icon: (
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.4.53A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.12c1.9.53 9.4.53 9.4.53s7.5 0 9.4-.53A3 3 0 0 0 23.5 17.5C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.27 3.6L9.6 15.6Z" />
      ),
    },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="El Jardín de Mis Amores" className="h-16 w-auto" />
          <p className="mt-4 max-w-md text-sm text-background/70">
            Ecohotel en el corazón del Eje Cafetero. Aventura, naturaleza y descanso
            en Combia Baja, Risaralda.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-background/80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-green" />
              <a href="https://wa.me/573128993195" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">
                +57 312 899 3195
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-green" />
              <a href="mailto:eljardindemisamorescombia@gmail.com" className="hover:text-brand-green">
                eljardindemisamorescombia@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-green" />
              <span>Colombia - Pereira - Corregimiento de Combia Baja</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-background/60">Navegación</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-green">Inicio</Link></li>
            <li><Link to="/alojamiento" className="hover:text-brand-green">Alojamiento</Link></li>
            <li><Link to="/tours" className="hover:text-brand-green">Tours en Cuatrimoto</Link></li>
            <li><Link to="/pasadias" className="hover:text-brand-green">Pasadías</Link></li>
            <li><Link to="/planes" className="hover:text-brand-green">Planes Todo Incluido</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-background/60">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/privacidad" className="hover:text-brand-green">Política de Privacidad</Link></li>
            <li><Link to="/terminos" className="hover:text-brand-green">Términos y Condiciones</Link></li>
            <li><Link to="/cookies" className="hover:text-brand-green">Política de Cookies</Link></li>
          </ul>

          <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-background/60">Síguenos</h4>
          <div className="mt-3 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition hover:bg-brand-green"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-background" aria-hidden>
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-background/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Ecohotel El Jardín de Mis Amores. Todos los derechos reservados.</span>
          <a
            href="https://www.sistemicadigital.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-background/80"
          >
            Diseñado por Sistémica Digital
          </a>
        </div>
      </div>
    </footer>
  );
}
