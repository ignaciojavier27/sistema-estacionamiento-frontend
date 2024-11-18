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
    <section className="container-md">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="container-md border border-2 border-ligth rounded-4 p-5 shadow-lg">
          <div className="mb-3">
            <label htmlFor="nombre-input" className="form-label fw-bold">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              id="nombre-input"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido-input" className="form-label fw-bold">
              Apellido:
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido-input"
              className="form-control"
              value={usuario.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correo-input" className="form-label fw-bold">
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
            <label htmlFor="contrasenia-input" className="form-label fw-bold">
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
            <label htmlFor="tipo-input" className="form-label fw-bold">
              Tipo de Usuario:
            </label>
            <select
              className="form-select"
              name="tipo_usuario"
              value={usuario.tipo_usuario}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo de usuario</option>
              <option value="cliente" >Usuario Común</option>
              <option value="propietario">Propietario</option>
            </select>
          </div>
          <button  className="btn btn-dark" type="submit">Registrarse</button>
          </form>
        </div>
      </div> 
    </section>
  );
};

export default Register;
