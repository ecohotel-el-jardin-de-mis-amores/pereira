import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/alojamiento", label: "Alojamiento" },
  { to: "/tours", label: "Tours" },
  { to: "/pasadias", label: "Pasadías" },
  { to: "/planes", label: "Planes" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al hacer scroll
  useEffect(() => {
    if (open) setOpen(false);
  }, [scrolled]);

  const linkBase = scrolled ? "text-foreground" : "text-white drop-shadow";

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-background/85 border-b border-border/50 shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="El Jardín de Mis Amores"
              className={`h-12 w-auto transition ${scrolled ? "" : ""}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden items-center gap-7 text-sm font-medium md:flex ${linkBase}`}>
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-brand-green transition">
                {l.label}
              </Link>
            ))}
            <a
              href="https://reservas.ecohoteleljardindemisamores.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-green px-5 py-2 text-white shadow-card hover:brightness-105 transition"
            >
              Reservar
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl md:hidden transition ${
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <nav
          className={`absolute right-0 top-0 h-full w-72 bg-background shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <img src={logo} alt="El Jardín de Mis Amores" className="h-10 w-auto" />
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted hover:text-brand-green"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://reservas.ecohoteleljardindemisamores.com.co"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-110"
            >
              Reservar ahora
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
