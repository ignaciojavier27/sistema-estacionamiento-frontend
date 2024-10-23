import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservaModal = ({ show, onClose, estacionamiento }) => {
    const [fechaReserva, setFechaReserva] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    const handleReserva = (e) => {
        e.preventDefault();

        const reservaData = {
            estacionamiento_id: estacionamiento.estacionamiento_id,
            fecha_reserva: fechaReserva,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
        };

        console.log('Datos de la reserva:', reservaData);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal" style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Reservar {estacionamiento.nombre}</h3>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleReserva}>
                            <div className="mb-3">
                                <label htmlFor="fechaReserva" className="form-label fs-6 fw-bold">Fecha de Reserva</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fechaReserva"
                                    value={fechaReserva}
                                    onChange={(e) => setFechaReserva(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="horaInicio" className="form-label fs-6 fw-bold">Hora de Inicio</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="horaInicio"
                                    value={horaInicio}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="patente" className="form-label fs-6 fw-bold">Patente Vehículo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="patente"
                                    value={horaFin}
                                    onChange={(e) => setHoraFin(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Confirmar Reserva</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReservaModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    estacionamiento: PropTypes.object.isRequired,
};

export default ReservaModal;
