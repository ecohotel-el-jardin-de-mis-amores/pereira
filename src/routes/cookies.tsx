import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Política de Cookies | El Jardín de Mis Amores" },
      { name: "description", content: "Política de cookies de Ecohotel El Jardín de Mis Amores." },
    ],
  }),
});

function CookiesPage() {
  return (
    <main className="min-h-screen bg-secondary/30">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-32">
        <h1 className="text-3xl font-extrabold md:text-4xl">Política de Cookies</h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Ecohotel El Jardín de Mis Amores
        </p>

        <div className="mt-10 space-y-6 text-foreground/90 leading-relaxed">
          <p>
            Este sitio web utiliza <strong>cookies técnicas y de análisis</strong> para mejorar la experiencia de navegación del usuario y analizar el tráfico web con fines de optimización SEO.
          </p>
          <p>
            Al navegar en nuestro sitio, usted acepta el uso de cookies esenciales para la gestión de su reserva. Puede desactivar las cookies de análisis desde la configuración de su navegador, teniendo en cuenta que esto podría afectar algunas funciones interactivas del sitio.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
