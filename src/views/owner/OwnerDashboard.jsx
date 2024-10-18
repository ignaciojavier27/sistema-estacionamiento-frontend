import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const navigate = useNavigate(); 

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

  const handleEditClick = (estacionamientoId) => {
    navigate(`/owners/edit-parking/${estacionamientoId}`);
  };

  if (loading) {
    return (
      <section className="section-loader d-flex justify-content-center align-items-center">
        <div className="loader-owner-estacionamiento"></div>
      </section>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-5">Error: {error}</p>;
  }

  return (
    <main className="container-md">
      <section className="mt-5 p-3 border rounded-3 shadow">
        <h3>Tus estacionamientos</h3>
        {estacionamientos.length > 0 ? (
          <div className="list-group d-flex gap-2">
            {estacionamientos.map((estacionamiento) => (
              <div
                key={estacionamiento.estacionamiento_id * 1.3}
                className="list-group-item border list-group-item-action d-flex flex-column flex-sm-row justify-content-between align-items-center"
              >
                <div>
                  <h5>{estacionamiento.nombre}</h5>
                  <p>{estacionamiento.direccion}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleEditClick(estacionamiento.estacionamiento_id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() =>
                      console.log(
                        `Ver detalles de estacionamiento ${estacionamiento.estacionamiento_id}`
                      )
                    }
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-center">
            No tienes estacionamientos registrados.
          </h3>
        )}
      </section>
      <button className="btn btn-dark btn-lg mt-5">
        <NavLink to="/owners/parking" className={"nav-link"}>Añadir estacionamiento</NavLink>
      </button>
    </main>
  );
};

export default OwnerDashboard;
