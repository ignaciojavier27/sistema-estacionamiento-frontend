import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { obtenerCoordenadas } from '../helpers/obtenerCoordenadas';
import { obtenerUbicacionUsuario } from '../helpers/obtenerUbicacionUsuario';
import MarcadorEstacionamiento from './MarcadorEstacionamiento';

const userIcon = new L.Icon({
  iconUrl: '/images/icono-auto.png',
  iconSize: [45, 45],
  iconAnchor: [25, 45],
  popupAnchor: [0, -40],
});

const Map = () => {

  const defaultPosition = [-34.9854011, -71.2397409];

  const [userPosition, setUserPosition] = useState(null);
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUbicacionUsuario(setUserPosition, defaultPosition);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los estacionamientos:', error);
        setLoading(false);
      }
    };

    fetchEstacionamientos();
  }, []);

  return (
    <section className='container-fluid m-0 p-0'>
      {loading || !userPosition ? (
        <section className="section-loader d-flex justify-content-center align-items-center">
          <div className="loader"></div>
        </section>
      ) : (
        <div style={{ position: 'relative', height: '90vh', width: '100%' }}>
          <MapContainer center={userPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                  <h3 className='fs-6'>Estás aquí</h3>
              </Popup>
            </Marker>

            {estacionamientos.map((estacionamiento) =>
              estacionamiento.coordenadas && (
                <MarcadorEstacionamiento key={estacionamiento.estacionamiento_id} estacionamiento={estacionamiento} />
              )
            )}
          </MapContainer>

        </div>
      )}
    </section>
  );
};

export default Map;
