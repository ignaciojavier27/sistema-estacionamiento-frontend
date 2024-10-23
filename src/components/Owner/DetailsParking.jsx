import { useState, useEffect } from 'react';

const DetailsParking = ({ estacionamientoId }) => {
  const [ingresosDiarios, setIngresosDiarios] = useState(0);
  const [ingresosMensuales, setIngresosMensuales] = useState(0);
  const [ingresosAnuales, setIngresosAnuales] = useState(0);

  const fetchSalidas = async () => {
    try {
      const response = await fetch(
        `https://sistema-estacionamiento-backend-production.up.railway.app/api/salidaVehiculo/estacionamiento/${estacionamientoId}`
      );
      const data = await response.json();
      calcularIngresos(data);
    } catch (error) {
      console.error('Error al obtener las salidas:', error);
    }
  };

  useEffect(() => {
    fetchSalidas(); // Se ejecuta al cargar el componente
  }, [estacionamientoId]);

  const calcularIngresos = (salidas) => {
    const hoy = new Date();
    let totalDiario = 0;
    let totalMensual = 0;
    let totalAnual = 0;

    salidas.forEach((salida) => {
      const horaSalida = new Date(salida.hora_salida);
      const totalPagar = parseFloat(salida.total_a_pagar);

      if (
        hoy.getDate() === horaSalida.getDate() &&
        hoy.getMonth() === horaSalida.getMonth() &&
        hoy.getFullYear() === horaSalida.getFullYear()
      ) {
        totalDiario += totalPagar;
      }

      if (hoy.getMonth() === horaSalida.getMonth() && hoy.getFullYear() === horaSalida.getFullYear()) {
        totalMensual += totalPagar;
      }

      if (hoy.getFullYear() === horaSalida.getFullYear()) {
        totalAnual += totalPagar;
      }
    });

    setIngresosDiarios(totalDiario.toFixed(0));
    setIngresosMensuales(totalMensual.toFixed(0));
    setIngresosAnuales(totalAnual.toFixed(0));
  };

  return (
    <section className="mt-5 ms-3 p-5 border rounded-3 shadow position-relative">
      <div className="d-flex justify-content-between">
        <h3 className="text-center">Datos del estacionamiento</h3>
        {/* Botón de refrescar */}
        <button
          onClick={fetchSalidas}
          className="btn btn-light"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          title="Refrescar ingresos"
        >
          <img
            src="/images/icono-sincronizacion.png"
            alt="Refrescar ingresos"
            width={26}
            height={26}
          />
        </button>
      </div>
      <article className="mt-3 p-3 border border-2 rounded bg-light shadow">
        <h4 className="fs-5 text-center fw-bold">Ingresos del día: 
          <span className="text-center fs-5 text-success"> ${ingresosDiarios}</span>
        </h4>
      </article>
      <article className="mt-3 p-3 border border-2 rounded bg-light shadow">
        <h4 className="fs-5 text-center fw-bold">Ingresos del mes: 
          <span className="text-center fs-5 text-success"> ${ingresosMensuales}</span>
        </h4>
      </article>
      <article className="mt-3 p-3 border border-2 rounded bg-light shadow">
        <h4 className="fs-5 text-center fw-bold">Ingresos del año: 
          <span className="text-center fs-5 text-success"> ${ingresosAnuales}</span>
        </h4>
      </article>
    </section>
  );
};

export default DetailsParking;
