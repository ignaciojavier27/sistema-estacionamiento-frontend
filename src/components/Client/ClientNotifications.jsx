import { useEffect, useState } from "react";

const ClientNotifications = ({ usuarioId }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener notificaciones del usuario
  useEffect(() => {
    if (!usuarioId) return;
    const fetchNotificaciones = async () => {
        console.log("fetchNotificaciones")
      try {
        const response = await fetch(
          `https://sistema-estacionamiento-backend-production.up.railway.app/api/notificacion/usuarios/${usuarioId}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las notificaciones");
        }

        const data = await response.json();
        console.log(data)
        setNotificaciones(data.notificaciones);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, [usuarioId]);

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
              className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded-3 border-2"
            >
              <div>
                <p className="mb-1">
                  <strong>Mensaje:</strong> {notificacion.mensaje}
                </p>
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

export default ClientNotifications;
