import { Marker, Popup } from "react-leaflet"
import PropTypes from 'prop-types'
const MarcadorEstacionamiento = ({estacionamiento}) => {
    return (
    <Marker position={[estacionamiento.coordenadas.latitud, estacionamiento.coordenadas.longitud]}>
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
