import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const NotificationsParking = ({ propietarioId }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false); // Estado para evitar solicitudes duplicadas

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

        console.log(data);

        // Ordenar las notificaciones de más recientes a más antiguas
        const notificacionesOrdenadas = data.notificaciones.sort((a, b) => {
          const fechaA = new Date(a.reserva?.fecha_reserva + " " + a.reserva?.hora_inicio);
          const fechaB = new Date(b.reserva?.fecha_reserva + " " + b.reserva?.hora_inicio);
          return fechaB - fechaA; // Orden descendente (más recientes primero)
        });

        setNotificaciones(notificacionesOrdenadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, [propietarioId]);

  // Cambiar estado de la reserva y eliminar la notificación
  const manejarNotificacion = async (reservaId, estado, notificacionId) => {
    if (processing) return; // Evitar solicitudes duplicadas
    setProcessing(true);

    try {
      // Cambiar el estado de la reserva
      const response = await fetch(
        `https://sistema-estacionamiento-backend-production.up.railway.app/api/reserva/${reservaId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al actualizar la reserva");
      }

      console.log(`Reserva ${estado}: actualizada con éxito`);

      // Eliminar la notificación del backend
      const deleteResponse = await fetch(
        `https://sistema-estacionamiento-backend-production.up.railway.app/api/notificacion/propietarios/${notificacionId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Error al eliminar la notificación");
      }

      console.log(`Notificación ${notificacionId} eliminada con éxito`);

      // Actualizar la lista de notificaciones tras eliminarla del servidor
      setNotificaciones((prev) =>
        prev.filter((notificacion) => notificacion.notificacion_id !== notificacionId)
      );
    } catch (error) {
      console.error("Error al procesar la notificación:", error);
      alert("Ocurrió un error. Por favor, intenta nuevamente.");
    } finally {
      setProcessing(false);
    }
  };

  // Función para eliminar una notificación directamente (MdClose)
  const eliminarNotificacion = async (notificacionId) => {
    if (processing) return; // Evitar solicitudes duplicadas
    setProcessing(true);

    try {
      const response = await fetch(
        `https://sistema-estacionamiento-backend-production.up.railway.app/api/notificacion/propietarios/${notificacionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la notificación");
      }

      console.log(`Notificación ${notificacionId} eliminada con éxito`);

      // Actualizar la lista de notificaciones tras eliminarla del servidor
      setNotificaciones((prev) =>
        prev.filter((notificacion) => notificacion.notificacion_id !== notificacionId)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
      alert("No se pudo eliminar la notificación. Intenta nuevamente.");
    } finally {
      setProcessing(false);
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
              className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded-3 border-2 border-black px-4"
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
                    manejarNotificacion(
                      notificacion.reserva_id,
                      "aceptada",
                      notificacion.notificacion_id
                    )
                  }
                  disabled={processing} // Deshabilita el botón si está en proceso
                >
                  Aceptar
                </button>
                <button
                  className="btn btn-danger p-1 px-2"
                  onClick={() =>
                    manejarNotificacion(
                      notificacion.reserva_id,
                      "rechazada",
                      notificacion.notificacion_id
                    )
                  }
                  disabled={processing} // Deshabilita el botón si está en proceso
                >
                  Rechazar
                </button>
              </div>
              <MdClose
                onClick={() => eliminarNotificacion(notificacion.notificacion_id)}
                className="position-absolute top-0 end-0 p-2 cursor-pointer close-icon"
                style={{ fontSize: "1.7rem", color: "red", cursor: "pointer" }}
              />
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
