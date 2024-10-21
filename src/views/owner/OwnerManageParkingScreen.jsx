import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OwnerManageParkingScreen = () => {
  const { id } = useParams();
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const response = await fetch(`https://sistema-estacionamiento-backend-production.up.railway.app/api/espacios/estacionamiento/${id}`);

        if (!response.ok) {
          throw new Error('Error al obtener los espacios');
        }

        const data = await response.json();
        setEspacios(data);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los espacios', error);
        setLoading(false);
      }
    };

    fetchEspacios();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Divide los espacios en grupos de máximo 10
  const groupedEspacios = [];
  for (let i = 0; i < espacios.length; i += 9) {
    groupedEspacios.push(espacios.slice(i, i + 9));
  }

  return (
    <main className="container-md d-flex flex-column justify-content-center flex-xl-row">
      <section className="mt-5 p-5 border rounded-3 shadow container-estacionamientos">
        <h3 className="text-center mb-4">Mapa de ocupación</h3>
        {espacios.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-evenly">
            {groupedEspacios.map((grupo, index) => (
              <div key={index} className="me-4 mb-4">
                {grupo.map((espacio) => (
                  <div key={espacio.espacio_id} className="mb-3">
                    <span className="fw-bold border border-3 border-black rounded-2 p-1 me-2 bg-primary-subtle">E{espacio.numero_espacio}</span>
                    {
                      espacio.estado === 0 
                      ? <span className="item-estacionamiento estacionamiento-ocupado">Disponible</span>
                      : <span className="item-estacionamiento estacionamiento-desocupado">Ocupado</span>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay espacios disponibles en este estacionamiento.</p>
        )}
      </section>
    </main>
  );
};

export default OwnerManageParkingScreen;
