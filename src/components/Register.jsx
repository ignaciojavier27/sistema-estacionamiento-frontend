import { useState } from "react";

const Register = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    contrasenia: "",
    tipo_usuario: "",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sistema-estacionamiento-backend-production.up.railway.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registro exitoso");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Error en la conexión con el servidor: ", error.message);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="container-md">
        <div className="mb-3">
          <label htmlFor="nombre-input" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido-input" className="form-label">
            Apellido:
          </label>
          <input
            type="text"
            name="apellido"
            className="form-control"
            value={usuario.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo-input" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            name="correo_electronico"
            className="form-control"
            id="correo-input"
            value={usuario.correo_electronico}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasenia-input" className="form-label">
            Contraseña:
          </label>
          <input
            name="contrasenia"
            type="password"
            className="form-control"
            id="contrasenia-input"
            value={usuario.contrasenia}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo-input" className="form-label">
            Tipo de Usuario:
          </label>
          <select
            className="form-select"
            name="tipo_usuario"
            value={usuario.tipo_usuario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="cliente">Usuario Común</option>
            <option value="propietario">Propietario</option>
          </select>
        </div>
        <button  className="btn btn-primary" type="submit">Registrarse</button>
      </form>
  );
};

export default Register;
