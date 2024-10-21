import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OwnerManageParkingScreen = () => {
  const { id } = useParams();
  const [espacios, setEspacios] = useState([]);
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  const [patente, setPatente] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingRegistro, setLoadingRegistro] = useState(false);
  const [esSalida, setEsSalida] = useState(false); // Para distinguir entre ingreso y salida

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

  const handleEspacioClick = (espacio) => {
    setSelectedEspacio(espacio);
    if (espacio.estado === 0) {
      setEsSalida(false); 
      setModalVisible(true);
    } else {
      setEsSalida(true); 
      setModalVisible(true);
    }
  };

  const handleRegistroVehiculo = async () => {

    if (!patente && !esSalida) {
      alert('Debe ingresar la patente del vehículo');
      return;
    }

    setLoadingRegistro(true);
    try {
      if (!esSalida) {
        try {
          const response = await fetch(`https://sistema-estacionamiento-backend-production.up.railway.app/api/ingresoVehiculo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              patente: patente,
              espacio_id: selectedEspacio.espacio_id,
            }),
          });
      
          if (!response.ok) {
            throw new Error('Error al registrar el ingreso');
          }
      
          const data = await response.json();
          
          if (data.ingreso.ingreso_id) {
            alert('Vehículo ingresado correctamente');
            
            const updatedEspacio = { ...selectedEspacio, ingreso_id:data.ingreso.ingreso_id };
      
            const updatedEspacios = espacios.map((espacio) =>
              espacio.espacio_id === selectedEspacio.espacio_id ? { ...updatedEspacio, estado: 1 } : espacio
            );
            setEspacios(updatedEspacios);
          } else {
            throw new Error('No se recibió ingreso_id del servidor');
          }
      
          setModalVisible(false);
          setPatente('');
          
        } catch (error) {
          console.error(error);
          alert('Error al registrar el ingreso del vehículo');
        }
      } else {

        // Registro de salida de vehículo
        const response = await fetch(`https://sistema-estacionamiento-backend-production.up.railway.app/api/salidaVehiculo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ingreso_id: selectedEspacio.ingreso_id,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al registrar la salida');
        }

        const result = await response.json();
        alert(`Vehículo salió correctamente. Total a pagar: $${result.salida.total_a_pagar}`);

        const updatedEspacios = espacios.map((espacio) =>
          espacio.espacio_id === selectedEspacio.espacio_id ? { ...espacio, estado: 0 } : espacio
        );
        setEspacios(updatedEspacios);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      alert(`Error al registrar el ${esSalida ? 'salida' : 'ingreso'} del vehículo`);
    } finally {
      setLoadingRegistro(false);
    }
  };

  if (loading) return <h3 className='text-center mt-5'>Cargando...</h3>;
  if (error) return <p>{error}</p>;

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
                    <span
                      className={`item-estacionamiento ${espacio.estado === 0 ? 'estacionamiento-ocupado' : 'estacionamiento-desocupado'}`}
                      onClick={() => handleEspacioClick(espacio)}
                    >
                      {espacio.estado === 0 ? 'Disponible' : 'Ocupado'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay espacios disponibles en este estacionamiento.</p>
        )}
      </section>

      <section className='mt-5 ms-3 p-5 border rounded-3 shadow'>
        <h3>Datos del estacionamiento</h3>
      </section>

      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{esSalida ? 'Salida de Vehículo' : 'Ingreso de Vehículo'}</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <p>Espacio seleccionado: {selectedEspacio?.numero_espacio}</p>
                {!esSalida && (
                  <input
                    type="text"
                    placeholder="Patente del vehículo"
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                    className="form-control"
                  />
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRegistroVehiculo}
                  disabled={loadingRegistro}
                >
                  {loadingRegistro ? 'Registrando...' : esSalida ? 'Registrar salida' : 'Registrar ingreso'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default OwnerManageParkingScreen;
