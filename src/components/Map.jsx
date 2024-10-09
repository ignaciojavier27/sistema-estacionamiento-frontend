import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { obtenerCoordenadas } from '../helpers/obtenerCoordenadas';
import MarcadorEstacionamiento from './MarcadorEstacionamiento';

const Map = () => {
  const defaultMapPosition = [-34.9854011, -71.2397409];

  const [estacionamientos, setEstacionamientos] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    const fetchEstacionamientos = async () => {
      try {
        const response = await fetch('https://sistema-estacionamiento-backend-production.up.railway.app/api/estacionamientos');
        const data = await response.json();

        const estacionamientosConCoordenadas = await Promise.all(
          data.map(async (estacionamiento) => {
            const coordenadas = await obtenerCoordenadas(estacionamiento.direccion);
            return { ...estacionamiento, coordenadas };
          })
        );

        setEstacionamientos(estacionamientosConCoordenadas);
        setLoading(false); // Los estacionamientos ya están cargados
      } catch (error) {
        console.error('Error al cargar los estacionamientos:', error);
        setLoading(false); // Asegúrate de ocultar el estado de carga en caso de error
      }
    };

    fetchEstacionamientos();
  }, []);

  return (
    <section className='container-fluid m-0 p-0'>
      {loading ? (
        <section className="section-loader d-flex justify-content-center align-items-center">
          <div className="loader"></div>
        </section>
      ) : (
        <MapContainer center={defaultMapPosition} zoom={15} style={{ height: '90vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {estacionamientos.map((estacionamiento) => (          
            estacionamiento.coordenadas && (
              <MarcadorEstacionamiento key={estacionamiento.estacionamiento_id * 1.1} estacionamiento={estacionamiento}/>
            )
          ))}
        </MapContainer>
      )}
    </section>
  );
};

export default Map;
