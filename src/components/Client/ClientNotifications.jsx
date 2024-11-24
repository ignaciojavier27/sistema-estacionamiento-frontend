import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"; // Importa el ícono de cierre

const ClientNotifications = ({ usuarioId }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener notificaciones del usuario
  useEffect(() => {
    if (!usuarioId) return;

    const fetchNotificaciones = async () => {
      console.log("fetchNotificaciones");
      try {
        const response = await fetch(
          `https://sistema-estacionamiento-backend-production.up.railway.app/api/notificacion/usuarios/${usuarioId}`
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
  }, [usuarioId]);

  // Función para eliminar una notificación (puedes ajustarla según tu lógica)
  const eliminarNotificacion = (notificacionId) => {
    setNotificaciones((prev) =>
      prev.filter((notificacion) => notificacion.notificacion_id !== notificacionId)
    );
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
              className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded-3 border-2 position-relative px-4 border-black"
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
              </div>

              {/* Icono de cierre */}
              <MdClose
                onClick={() => eliminarNotificacion(notificacion.notificacion_id)}
                className="position-absolute top-0 end-0 p-2 cursor-pointer close-icon"
                style={{ fontSize: "1.7rem", color: "red" }}
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

export default ClientNotifications;
