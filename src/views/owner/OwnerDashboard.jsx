import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BotonesGestionEstacionamiento from "../../components/Owner/BotonesGestionEstacionamiento";

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

          console.log(propietarioId)

          const response = await fetch(
            `https://sistema-estacionamiento-backend-production.up.railway.app/api/estacionamientos/propietario/${propietarioId}`
          );

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
    <main className="container-md d-flex flex-column justify-content-center flex-xl-row">
      <section className="mt-5 p-5 border rounded-3 shadow container-estacionamientos">
        <h3>Tus estacionamientos</h3>
        {estacionamientos.length > 0 ? (
            <article className="list-group d-flex gap-2">
              {estacionamientos.map((estacionamiento) => (
                <div
                  key={estacionamiento.estacionamiento_id * 1.3}
                  className="list-group-item border list-group-item-action d-flex flex-column flex-sm-row justify-content-between align-items-center"
                >
                  <div>
                    <h5>{estacionamiento.nombre}</h5>
                    <p>{estacionamiento.direccion}</p>
                  </div>
                  <BotonesGestionEstacionamiento estacionamiento={estacionamiento.estacionamiento_id}/>
                </div>
              ))}
            </article>
        ) : (
          <h3 className="text-center">
            No tienes estacionamientos registrados.
          </h3>
        )}
        <button className="btn btn-dark btn-lg mt-3">
          <NavLink to="/owners/parking" className={"nav-link"}>Añadir estacionamiento</NavLink>
        </button>
      </section>

      <section className="mt-5 p-5 border rounded-3 shadow ms-xl-3 container-estacionamientos-indicadores">
        <h3>Tus ingresos</h3>
      </section>

    </main>
  );
};

export default OwnerDashboard;
