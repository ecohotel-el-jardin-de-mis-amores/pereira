import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/privacidad")({
  component: PrivacidadPage,
  head: () => ({
    meta: [
      { title: "Política de Privacidad | El Jardín de Mis Amores" },
      { name: "description", content: "Política de tratamiento de datos personales de Ecohotel El Jardín de Mis Amores." },
    ],
  }),
});

function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-secondary/30">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-32">
        <h1 className="text-3xl font-extrabold md:text-4xl">
          Política de Tratamiento de Datos Personales
        </h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Ecohotel El Jardín de Mis Amores
        </p>

        <div className="mt-10 space-y-10 text-foreground/90">
          <article>
            <h2 className="text-xl font-bold">1. Identificación del Responsable</h2>
            <p className="mt-3 leading-relaxed">
              <strong>Wilfor Andrés Rubiano Osorio</strong>, con NIT <strong>9867499-5</strong> y RNT <strong>155162</strong>,
              con domicilio en Corregimiento de Combia Baja, vereda La Honda, Pereira, Colombia,
              correo electrónico{" "}
              <a href="mailto:eljardindemisamorescombia@gmail.com" className="text-brand-green hover:underline">
                eljardindemisamorescombia@gmail.com
              </a>{" "}
              y teléfono <strong>3159281284</strong>, es el responsable del tratamiento de sus datos personales.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-bold">2. Finalidad del Tratamiento</h2>
            <p className="mt-3 leading-relaxed">
              Los datos personales recolectados a través de nuestros formularios de reserva y contacto serán utilizados para:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li>Gestionar y confirmar las reservas de alojamiento, pasadías, tours y planes todo incluido.</li>
              <li>Procesar y gestionar las reservas a través de nuestro motor de reservas seguro (Kunas PMS).</li>
              <li>Enviar confirmaciones de compra, facturación y detalles logísticos del servicio.</li>
              <li>Atender solicitudes de soporte, quejas o reclamos a través de canales como WhatsApp.</li>
              <li>Cumplir con las obligaciones legales del sector hotelero en Colombia (tarjeta de registro hotelero).</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl font-bold">3. Derechos de los Titulares</h2>
            <p className="mt-3 leading-relaxed">
              De acuerdo con la <strong>Ley 1581 de 2012</strong>, usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos personales en cualquier momento, enviando una solicitud al correo electrónico:{" "}
              <a href="mailto:eljardindemisamorescombia@gmail.com" className="text-brand-green hover:underline">
                eljardindemisamorescombia@gmail.com
              </a>.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
