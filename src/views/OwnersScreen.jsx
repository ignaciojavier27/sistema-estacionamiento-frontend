import "../assets/styles/owners.css";

const OwnersScreen = () => {
  return (
    <main>
      <section className="position-relative container-owners container-full bg-white py-5">
        <article className="container-md">
          <div className="container-svg">
            <img
              src="/images/line-curve.svg"
              alt="line-curve"
              className="line-curve"
            />
          </div>
          <h2>Promociona tu estacionamiento y aumenta tus ingresos</h2>
          <p className="mt-3">
            Únete a nuestra plataforma de reservas y maximiza el uso de tus
            espacios de estacionamiento. Ofrecemos una solución inteligente que
            te permitirá atraer más clientes, gestionar tus reservas y aumentar
            tus ingresos de forma fácil y rápida.
          </p>
        </article>

        <article className="container-beneficios">
          <div className="container-md">
            <h3 className="text-center">¿Qué te ofrecemos?</h3>
            <ul className="custom-list mt-4">
              <li>Gestión eficiente de espacios y reservas en tiempo real.</li>
              <li>Plataforma accesible desde cualquier dispositivo.</li>
              <li>
                Visibilidad para miles de usuarios que buscan estacionamiento.
              </li>
              <li>Estadísticas y reportes sobre la ocupación y ganancias.</li>
              <li>Soporte técnico 24/7.</li>
            </ul>
          </div>
        </article>
        <article className="container-como-funciona bg-light">
          <div className="container-md">
            <h3 className="text-center">¿Cómo funciona?</h3>
            <div className="steps mt-4">
              <div className="step">
                <h4>1. Regístrate y configura tus espacios</h4>
                <p>
                  Crea una cuenta de propietario y configura tu estacionamiento.
                  Añade los espacios disponibles, tarifas y horarios de
                  operación.
                </p>
              </div>
              <div className="step">
                <h4>2. Atrae a más usuarios</h4>
                <p>
                  Tu estacionamiento será visible para miles de conductores que
                  buscan estacionamiento en tiempo real. Ellos podrán reservar
                  directamente desde la plataforma.
                </p>
              </div>
              <div className="step">
                <h4>3. Administra y optimiza</h4>
                <p>
                  Recibe notificaciones de reservas, gestiona tus espacios y
                  analiza el rendimiento con nuestros reportes detallados.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="container-cta bg-dark text-white py-5 text-center">
        <div className="container-md">
          <h3>Comienza a ganar más hoy mismo</h3>
          <p className="mt-3">
            Únete a nuestra plataforma y empieza a gestionar tus
            estacionamientos de manera más eficiente. Es rápido, fácil y seguro.
          </p>
          <button className="btn btn-dark border border-2 mt-4">Registrarse</button>
        </div>
      </section>
    </main>
  );
};

export default OwnersScreen;
