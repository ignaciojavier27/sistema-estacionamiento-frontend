import { useEffect, useState } from "react";

const OwnerDashboard = () => {
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstacionamientos = async () => {
      try {
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioLogueado) {
          const propietarioId = usuarioLogueado.usuario_id;
          
          const response = await fetch(
            `https://sistema-estacionamiento-backend-production.up.railway.app/api/estacionamientos/propietario/${propietarioId}`
          );

          if (!response.ok) {
            throw new Error("Error al obtener los estacionamientos");
          }

          const data = await response.json();
          setEstacionamientos(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEstacionamientos();
  }, []);

  if (loading) {
    return <p>Cargando estacionamientos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <section className="container-md">
        <h3>Owner Dashboard</h3>
        {estacionamientos.length > 0 ? (
          <div className="list-group">
            {estacionamientos.map((estacionamiento) => (
              <div
                key={estacionamiento.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{estacionamiento.nombre}</h5>
                  <p>{estacionamiento.direccion}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => console.log(`Editar estacionamiento ${estacionamiento.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => console.log(`Ver detalles de estacionamiento ${estacionamiento.id}`)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes estacionamientos registrados.</p>
        )}
      </section>
    </main>
  );
};

export default OwnerDashboard;
