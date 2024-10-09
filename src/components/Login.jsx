import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Login = ({ setUserType }) => {
  const [correo_electronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://sistema-estacionamiento-backend-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo_electronico, contrasenia }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario)); 
        setUserType(data.usuario.tipo_usuario);

        if (data.usuario.tipo_usuario === "cliente") {
          navigate("/");
        } else if (data.usuario.tipo_usuario === "propietario") {
          navigate("/owners/dashboard");
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error al iniciar sesión: ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="correo-log-input" className="form-label">
        Correo Electrónico:
      </label>
      <input
        type="email"
        className="form-control mb-3"
        placeholder="correo@example.com"
        id="correo-log-input"
        value={correo_electronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />
      <label htmlFor="contrasenia-log-input" className="form-label">
        Contraseña:
      </label>
      <input
        type="password"
        id="contrasenia-log-input"
        className="form-control mb-3"
        placeholder="Contraseña"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
      />
      <button className="btn btn-dark" type="submit">
        Iniciar Sesión
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

Login.propTypes = {
  setUserType: PropTypes.func
}

export default Login;

