import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/terminos")({
  component: TerminosPage,
  head: () => ({
    meta: [
      { title: "Términos y Condiciones | El Jardín de Mis Amores" },
      { name: "description", content: "Términos y condiciones de tours en cuatrimoto y política de reservas del Ecohotel El Jardín de Mis Amores." },
    ],
  }),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 space-y-2 leading-relaxed text-foreground/80">{children}</div>
    </article>
  );
}

function TerminosPage() {
  return (
    <main className="min-h-screen bg-secondary/30">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-32">

        {/* PARTE 1 — TOURS EN CUATRIMOTO */}
        <h1 className="text-3xl font-extrabold md:text-4xl">Términos y Condiciones</h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wider text-brand-green">Tours en Cuatrimoto</p>
        <p className="mt-1 text-sm text-muted-foreground">Ecohotel El Jardín de Mis Amores · Pereira – Risaralda</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/70">
          Al reservar o participar en cualquiera de nuestros tours en cuatrimoto, el usuario acepta los siguientes términos y condiciones:
        </p>

        <div className="mt-10 space-y-8 text-foreground/90">
          <Section title="1. Descripción del Servicio">
            <p>Ecohotel El Jardín de Mis Amores ofrece experiencias turísticas de aventura en cuatrimoto por diferentes destinos del corredor turístico de Combia, Pereira, Colombia, incluyendo guía acompañante, inducción teórico-práctica, elementos de protección personal y seguro de asistencia para actividades de aventura.</p>
          </Section>

          <Section title="2. Requisitos para Participar">
            <ul className="list-disc space-y-1 pl-5">
              <li>Presentar documento de identidad.</li>
              <li>Asistir obligatoriamente a la inducción de seguridad.</li>
              <li>Acatar las instrucciones del guía durante toda la actividad.</li>
              <li>Utilizar permanentemente los elementos de protección suministrados.</li>
              <li>Encontrarse en condiciones físicas adecuadas para participar en actividades de aventura.</li>
            </ul>
          </Section>

          <Section title="3. Menores de Edad">
            <ul className="list-disc space-y-1 pl-5">
              <li>Los menores de 4 años no podrán participar en la actividad.</li>
              <li>Los menores entre 5 y 12 años podrán participar únicamente como acompañantes de un adulto responsable.</li>
              <li>Los menores entre 13 y 17 años podrán conducir únicamente con autorización escrita de sus padres o representante legal y previa aprobación del guía.</li>
            </ul>
          </Section>

          <Section title="4. Seguridad">
            <p>Todos los participantes recibirán una capacitación teórico-práctica antes de iniciar el recorrido. El Ecohotel se reserva el derecho de negar o suspender la participación de cualquier persona que no demuestre capacidad suficiente para operar la cuatrimoto de manera segura o que incumpla las normas de seguridad establecidas.</p>
          </Section>

          <Section title="5. Prohibición de Alcohol y Sustancias Psicoactivas">
            <p>Está prohibida la participación de personas bajo efectos de alcohol, sustancias psicoactivas o medicamentos que puedan afectar la capacidad de conducción. En estos casos, el Ecohotel podrá cancelar la participación sin derecho a reembolso.</p>
          </Section>

          <Section title="6. Aceptación de Riesgos">
            <p>Los tours en cuatrimoto son actividades recreativas de aventura que implican riesgos inherentes asociados al tránsito por caminos rurales, terrenos irregulares, condiciones climáticas variables y otros factores propios de la actividad. Al participar, el usuario declara conocer y aceptar dichos riesgos y se compromete a seguir todas las instrucciones impartidas por el personal encargado.</p>
          </Section>

          <Section title="7. Daños al Vehículo o a Terceros">
            <p>El participante será responsable por los daños ocasionados al vehículo, a terceros o a bienes ajenos cuando estos sean consecuencia de conductas imprudentes, incumplimiento de instrucciones o uso indebido de la cuatrimoto.</p>
          </Section>

          <Section title="8. Reservas y Cancelaciones">
            <p>Las reservas estarán sujetas a disponibilidad y se considerarán confirmadas una vez recibido el pago o anticipo acordado. Las cancelaciones realizadas con suficiente anticipación podrán ser reprogramadas según disponibilidad. La inasistencia sin previo aviso podrá generar la pérdida del valor entregado como reserva.</p>
          </Section>

          <Section title="9. Condiciones Climáticas">
            <p>Por razones de seguridad, el Ecohotel podrá modificar, reprogramar o cancelar recorridos cuando las condiciones climáticas o del terreno representen un riesgo para los participantes.</p>
          </Section>

          <Section title="10. Uso de Imagen">
            <p>Durante el desarrollo de las actividades podrán tomarse fotografías o videos con fines promocionales, publicitarios o institucionales del Ecohotel. Si el participante no desea aparecer en dicho material, deberá informarlo por escrito antes de iniciar la actividad.</p>
          </Section>

          <Section title="11. Protección de Datos Personales">
            <p>La información suministrada por los usuarios será tratada conforme a la legislación colombiana vigente sobre protección de datos personales y será utilizada exclusivamente para la prestación de los servicios contratados, atención de emergencias, gestión comercial y cumplimiento de obligaciones legales.</p>
          </Section>

          <Section title="12. Aceptación">
            <p>La reserva, pago o participación en cualquiera de nuestros tours implica la aceptación de los presentes términos y condiciones.</p>
          </Section>
        </div>

        {/* SEPARADOR */}
        <div className="my-16 border-t border-border" />

        {/* PARTE 2 — POLÍTICA DE RESERVAS */}
        <h2 className="text-2xl font-extrabold md:text-3xl">Política de Reservas, Cancelaciones, Reprogramaciones e Ingreso de Menores de Edad</h2>
        <p className="mt-1 text-sm font-bold uppercase tracking-wider text-brand-green">Ecohotel El Jardín de Mis Amores</p>

        <div className="mt-10 space-y-8 text-foreground/90">
          <Section title="Marco Legal">
            <p>El Ecohotel El Jardín de Mis Amores desarrolla sus actividades de conformidad con la Ley 300 de 1996 (Ley General de Turismo) y demás normas que la complementan o modifiquen. De acuerdo con el artículo 65 de la Ley General de Turismo, cuando el huésped o usuario incumpla con la prestación contratada, no se presente o decida no hacer uso de los servicios reservados, el establecimiento podrá retener las sumas entregadas como anticipo o depósito, a título de compensación, según las condiciones aquí establecidas.</p>
          </Section>

          <Section title="Política General de Reservas">
            <p>Para reservar cualquiera de los servicios ofrecidos por el Ecohotel El Jardín de Mis Amores, el usuario deberá realizar la solicitud a través de los canales oficiales de reserva. Una vez definido el servicio, la fecha y el número de personas, el cliente deberá realizar un pago equivalente al <strong>cincuenta por ciento (50%)</strong> del valor total de la reserva para su confirmación. El saldo pendiente y los consumos adicionales deberán ser cancelados al momento del ingreso o durante la prestación del servicio.</p>
            <p className="mt-3 font-semibold">Parágrafo 1. La reserva solo se considerará confirmada cuando:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Se haya realizado el pago del anticipo correspondiente.</li>
              <li>El establecimiento haya verificado la transacción.</li>
              <li>El cliente haya suministrado: nombre completo, número de documento de identidad, teléfono de contacto, dirección de residencia y correo electrónico.</li>
            </ul>
          </Section>

          <Section title="Política de Ingreso de Menores de Edad">
            <p>En cumplimiento de la normatividad colombiana de protección de niños, niñas y adolescentes, todo menor de edad deberá ingresar al establecimiento acompañado por sus padres o representante legal. Cuando el menor viaje en compañía de un familiar o tercero diferente a sus padres, deberá presentar autorización escrita y autenticada ante notaría por al menos uno de sus padres, junto con copia del documento de identidad de quien autoriza. Todo menor deberá portar su documento de identificación original (Registro Civil o Tarjeta de Identidad). El Ecohotel se reserva el derecho de negar el ingreso cuando no se presente la documentación exigida por la ley.</p>
          </Section>

          <Section title="Política de Cancelación y Reembolso">
            <p>En caso de cancelación voluntaria por parte del usuario después de haber realizado el pago del anticipo, dicho valor <strong>no será reembolsable</strong>, salvo en los casos de fuerza mayor debidamente demostrados y aceptados por la administración del establecimiento.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Parágrafo 1.</strong> Se entenderán como situaciones de fuerza mayor aquellos hechos imprevisibles e irresistibles que impidan objetivamente la prestación o disfrute del servicio, debidamente soportados por el usuario.</li>
              <li><strong>Parágrafo 2.</strong> Una vez el huésped haya ingresado al Ecohotel o haya iniciado el disfrute de cualquiera de los servicios contratados, no procederán cancelaciones ni devoluciones parciales o totales por decisión voluntaria del cliente.</li>
              <li><strong>Parágrafo 3.</strong> Si el titular de la reserva no se presenta en la fecha y horario acordados sin previo aviso (No Show), la reserva se considerará cancelada, perdiendo el valor abonado hasta ese momento.</li>
            </ul>
          </Section>

          <Section title="Política de Modificación o Reprogramación de Reservas">
            <p>El Ecohotel podrá autorizar la reprogramación de una reserva cuando el cliente la solicite con una anticipación mínima de <strong>siete (7) días calendario</strong> respecto de la fecha de ingreso o prestación del servicio. El valor abonado quedará como saldo a favor del cliente por un término máximo de <strong>seis (6) meses</strong> contados a partir de la fecha del pago inicial, para ser utilizado según disponibilidad del establecimiento.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Parágrafo 1.</strong> Las reprogramaciones podrán generar cobros adicionales cuando existan diferencias tarifarias entre la fecha inicialmente reservada y la nueva fecha seleccionada, especialmente en temporadas altas o fechas especiales.</li>
              <li><strong>Parágrafo 2.</strong> Si durante el período de vigencia del saldo a favor no es posible concretar una nueva fecha por causas atribuibles al cliente, no procederá devolución del dinero abonado.</li>
              <li><strong>Parágrafo 3.</strong> Las reservas realizadas con menos de siete (7) días calendario de anticipación no tendrán derecho a reprogramación.</li>
            </ul>
          </Section>

          <Section title="Aceptación de las Políticas">
            <p>Al realizar una reserva y efectuar cualquier pago, el cliente declara haber leído, comprendido y aceptado íntegramente las presentes políticas del Ecohotel El Jardín de Mis Amores.</p>
          </Section>
        </div>

        <div className="mt-12 rounded-2xl bg-brand-green/5 p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Administración — Ecohotel El Jardín de Mis Amores</p>
          <p>Pereira – Risaralda · "Aventura y Diversión"</p>
        </div>

      </section>
      <Footer />
    </main>
  );
}
