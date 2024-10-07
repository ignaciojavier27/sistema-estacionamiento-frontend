import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormularioEstacionamiento = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [capacidadTotal, setCapacidadTotal] = useState("");
  const [precioPorMinuto, setPrecioPorMinuto] = useState("");
  const [horarioDisponible, setHorarioDisponible] = useState("");
  const [propietarioId, setPropietarioId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuarioLogueado);
    if (usuarioLogueado) {
      setPropietarioId(usuarioLogueado.usuario_id);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoEstacionamiento = {
      nombre,
      direccion,
      capacidad_total: capacidadTotal,
      precio_por_minuto: precioPorMinuto,
      horario_disponible: horarioDisponible,
      propietario_id: propietarioId,
    };

    try {
      const response = await fetch(
        "https://sistema-estacionamiento-backend-production.up.railway.app/api/estacionamientos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoEstacionamiento),
        }
      );

      if (response.ok) {
        alert("Estacionamiento creado exitosamente");
        navigate("/dashboard");
      } else {
        alert("Error al crear el estacionamiento");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el estacionamiento");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="estacionamiento-nombre-input" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          id="estacionamiento-nombre-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estacionamiento-direccion-input" className="form-label">
          Dirección:
        </label>
        <input
          type="text"
          name="dirección"
          className="form-control"
          id="estacionamiento-direccion-input"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estacionamiento-capacidad-input" className="form-label">
          Capacidad Total:
        </label>
        <input
          type="number"
          name="capacidad"
          className="form-control"
          id="estacionamiento-capacidad-input"
          value={capacidadTotal}
          onChange={(e) => setCapacidadTotal(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="estacionamiento-precio-input" className="form-label">
          Precio por Minuto:
        </label>
        <input
          type="number"
          name="precio"
          className="form-control"
          id="estacionamiento-precio-input"
          value={precioPorMinuto}
          onChange={(e) => setPrecioPorMinuto(e.target.value)}
          required
        />
      </div>      

      <div className="mb-3">
        <label htmlFor="estacionamiento-horario-input" className="form-label">
          Horario Disponible:
        </label>
        <input
          type="text"
          name="horario"
          className="form-control"
          id="estacionamiento-horario-input"
          value={horarioDisponible}
          onChange={(e) => setHorarioDisponible(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit">Agregar Estacionamiento</button>
    </form>
  );
};

export default FormularioEstacionamiento;
