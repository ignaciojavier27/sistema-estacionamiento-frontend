import { Marker, Popup } from "react-leaflet"
import L from "leaflet";
import PropTypes from 'prop-types'

const parkingIcon = new L.Icon({
    iconUrl: '/images/icono-estacionamiento.png', 
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48] 
});

const MarcadorEstacionamiento = ({estacionamiento}) => {


    return (
    <Marker position={[estacionamiento.coordenadas.latitud, estacionamiento.coordenadas.longitud]} icon={parkingIcon}>
        <Popup>
            <div className="container-fluid p-0">
                <h3>{estacionamiento.nombre}</h3>
                <p>Dirección: <span>{estacionamiento.direccion}</span></p>
                <p>Horario: <span>{estacionamiento.horario_disponible}</span></p>
                <button className="btn btn-primary" disabled>Reservar</button>
            </div>
        </Popup>
    </Marker>
    )
}

MarcadorEstacionamiento.propTypes = {
    estacionamiento: PropTypes.object.isRequired
}

export default MarcadorEstacionamiento
