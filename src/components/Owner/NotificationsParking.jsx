import { useEffect, useState } from "react";

const NotificationsParking = ({ propietarioId }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener notificaciones del propietario
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch(
          `https://sistema-estacionamiento-backend-production.up.railway.app/api/notificacion/propietarios/${propietarioId}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las notificaciones");
        }
        
        const data = await response.json();
        setNotificaciones(data.notificaciones);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotificaciones();
    console.log(notificaciones);
  }, [propietarioId]);

  // Actualizar estado local después de aceptar o rechazar
  const actualizarNotificacion = (notificacionId) => {
    setNotificaciones((prev) =>
      prev.filter((notificacion) => notificacion.notificacion_id !== notificacionId)
    );
  };

  // Manejo genérico de estado de reservas
  const cambiarEstadoReserva = async (reservaId, estado, notificacionId) => {
    try {
      const response = await fetch(
        `https://sistema-estacionamiento-backend-production.up.railway.app/api/reserva/${reservaId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la reserva");
      }

      if (data.warning) {
        console.warn("Advertencia:", data.warning);
      }

      actualizarNotificacion(notificacionId);
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  if (loading) return <p>Cargando notificaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="mt-5 ms-3 p-5 border rounded-3 shadow position-relative">
      <div>
        <h3 className="text-center">Notificaciones</h3>
      </div>
      <ul className="list-group mt-4">
        {notificaciones.length > 0 ? (
          notificaciones.map((notificacion) => (
            <li
              key={notificacion.notificacion_id}
              className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded-3 border-2 border-black"
            >
              <div>
                <p className="mb-1">
                  <strong>Mensaje:</strong> {notificacion.mensaje}
                </p>
                <p className="mb-1">
                  <strong>Fecha:</strong> {notificacion.reserva?.fecha_reserva} a las{" "}
                  {notificacion.reserva?.hora_inicio}
                </p>
                <p className="mb-1">
                  <strong>Patente:</strong> {notificacion.reserva?.patente}
                </p>
                <button
                  className="btn btn-dark p-1 m-2 px-2"
                  onClick={() =>
                    cambiarEstadoReserva(
                      notificacion.reserva_id,
                      "aceptada",
                      notificacion.notificacion_id
                    )
                  }
                >
                  Aceptar
                </button>
                <button
                  className="btn btn-danger p-1 px-2"
                  onClick={() =>
                    cambiarEstadoReserva(
                      notificacion.reserva_id,
                      "rechazada",
                      notificacion.notificacion_id
                    )
                  }
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">No tienes notificaciones.</p>
        )}
      </ul>
    </section>
  );
};

export default NotificationsParking;
