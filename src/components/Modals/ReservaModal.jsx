import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservaModal = ({ show, onClose, estacionamiento, usuario }) => {
    const [fechaReserva, setFechaReserva] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [patente, setPatente] = useState('');

    useEffect(() => {
        if (show) {
            setHoraInicio(obtenerHoraActual());
        }
    }, [show]);


    const obtenerFechaMinima = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    const obtenerHoraActual = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleReserva = async (e) => {
        e.preventDefault();
      
        const reservaData = {
          usuario_id: usuario.usuario_id,
          estacionamiento_id: estacionamiento.estacionamiento_id,
          fecha_reserva: fechaReserva,
          hora_inicio: horaInicio,
          propietario_id: estacionamiento.propietario_id,
          patente: patente, 
        };
      
        try {
          const response = await fetch('https://sistema-estacionamiento-backend-production.up.railway.app/api/reservas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservaData),
          });
      
          const data = await response.json();
          if (data.success) {
            console.log('Reserva creada exitosamente:', data.data);
          } else {
            console.error('Error al crear la reserva:', data.message);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      
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
                                    min={obtenerFechaMinima()}
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
                                    value={patente}
                                    onChange={(e) => setPatente(e.target.value)}
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
    usuario: PropTypes.object.isRequired
};

export default ReservaModal;
