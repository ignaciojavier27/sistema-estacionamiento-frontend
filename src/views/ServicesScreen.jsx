import '../assets/styles/services.css'

const ServicesScreen = () => {
    return (
    <main>
        <section className="container-desarrollo container-full bg-white  py-5">
            <article className="container-md container-desarrollo-info">
            <img src="../../src/assets/images/line-curve.svg" alt="line-curve" className="line-curve" />
                <h2>Reserva tu estacionamiento desde cualquier parte del mundo</h2>
                <p>Nos especializamos en desarrollar soluciones tecnológicas avanzadas para la gestión de estacionamientos en tiempo real. Nuestro sistema se destaca por su escalabilidad, seguridad y una interfaz intuitiva que facilita la experiencia de usuarios y propietarios de estacionamientos. Ofrecemos herramientas personalizadas para optimizar la gestión y maximizar los ingresos.</p>
                <h3 className="pt-3">¿Qué ofrecemos?</h3>
                <ul className="custom-list">
                    <li>Reservas de estacionamientos en tiempo real</li>
                    <li>Visualización de espacios disponibles en mapas interactivos</li>
                    <li>Gestión de múltiples estacionamientos para propietarios</li>
                    <li>Notificaciones y confirmaciones automáticas</li>
                    <li>Informes y estadísticas sobre el uso del estacionamiento</li>
                    <li>Integración de pagos en línea</li>
                    <li>Soporte para usuarios y administradores</li>
                </ul>
            </article>
        </section>
    </main>
    )
}

export default ServicesScreen
