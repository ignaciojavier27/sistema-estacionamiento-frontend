import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormularioEstacionamiento = () => {
  const [nombre, setNombre] = useState("");
  const [nombreCalle, setNombreCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [pais, setPais] = useState("");
  const [capacidadTotal, setCapacidadTotal] = useState("");
  const [precioPorMinuto, setPrecioPorMinuto] = useState();
  const [horarioDisponible, setHorarioDisponible] = useState("");
  const [propietarioId, setPropietarioId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioLogueado) {
      setPropietarioId(usuarioLogueado.usuario_id);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const direccion = `${nombreCalle} ${numero}, ${ciudad}, ${region}, ${pais}`;

    const nuevoEstacionamiento = {
      nombre,
      direccion,
      precio_por_minuto: parseInt(precioPorMinuto),
      horario_disponible: horarioDisponible,
      propietario_id: propietarioId,
      capacidad: capacidadTotal
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
        navigate("/");
      } else {
        alert("Error al crear el estacionamiento");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el estacionamiento");
    }
  };

  return (
    <section className="container-md">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <form
            onSubmit={handleSubmit}
            className="container-md border border-2 border-ligth rounded-4 p-5 shadow-lg"
          >
            <div className="mb-3">
              <label
                htmlFor="estacionamiento-nombre-input"
                className="form-label"
              >
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
              <label htmlFor="nombre-calle-input" className="form-label">
                Dirección:
              </label>
              <div className="container-input-direccion d-flex flex-column gap-2 flex-md-row">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Calle"
                  id="nombre-calle-input"
                  value={nombreCalle}
                  onChange={(e) => setNombreCalle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Numero"
                  id="numero-input"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  id="ciudad-input"
                  placeholder="Ciudad"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Region"
                  id="region-input"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pais"
                  id="pais-input"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="estacionamiento-capacidad-input"
                className="form-label"
              >
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
              <label
                htmlFor="estacionamiento-precio-input"
                className="form-label"
              >
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
              <label
                htmlFor="estacionamiento-horario-input"
                className="form-label"
              >
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
            <button className="btn btn-dark" type="submit">
              Agregar Estacionamiento
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormularioEstacionamiento;
