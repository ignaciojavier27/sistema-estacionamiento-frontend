import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import PropTypes from 'prop-types';
import ReservaModal from './Modals/ReservaModal.jsx';

const parkingIcon = new L.Icon({
    iconUrl: '/images/icono-estacionamiento.png',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
});

const MarcadorEstacionamiento = ({ estacionamiento }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState(null);



    // Efecto para comprobar si el usuario está logeado
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario) {
            setIsLoggedIn(true);
            setUsuario(usuario);
        } else {
            setIsLoggedIn(false);
            setUsuario(null);
        }
    }, []);

    const handleReservaClick = () => {
        if (isLoggedIn) {
            setShowModal(true);
        }
    };

    return (
        <>
            <Marker position={[estacionamiento.coordenadas.latitud, estacionamiento.coordenadas.longitud]} icon={parkingIcon}>
                <Popup>
                    <div className="container-fluid p-0">
                        <h3>{estacionamiento.nombre}</h3>
                        <p>
                            <span className="fw-bold fs-6">Dirección:</span>
                            <span className="fs-6"> {estacionamiento.direccion}</span>
                        </p>
                        <p>
                            <span className="fw-bold fs-6">Horario:</span>
                            <span className="fs-6"> {estacionamiento.horario_disponible}</span>
                        </p>
                        <p>
                            <span className="fw-bold fs-6">Precio Minuto:</span> 
                            <span className="fs-6"> ${estacionamiento.precio_por_minuto}</span>
                        </p>

                        <button 
                            className="btn btn-dark" 
                            onClick={handleReservaClick} 
                            disabled={!isLoggedIn}
                        >
                            {isLoggedIn ? "Reservar" : "Inicia sesión para reservar"}
                        </button>
                    </div>
                </Popup>
            </Marker>

            {/* Modal para realizar la reserva */}
            {isLoggedIn && (
                <ReservaModal 
                    show={showModal} 
                    onClose={() => setShowModal(false)} 
                    estacionamiento={estacionamiento}
                    usuario={usuario}
                />
            )}
        </>
    );
}

MarcadorEstacionamiento.propTypes = {
    estacionamiento: PropTypes.object.isRequired
}

export default MarcadorEstacionamiento;
