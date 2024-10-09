import { NavLink } from 'react-router-dom';
import '../assets/styles/navbar.css';
const Navbar = () => {
    return (
    <div className="container-fluid p-0 m-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary ">
            <div className="container-fluid px-5">
                <NavLink className="navbar-brand" to={'/'}>
                    <img src="/images/icono-estacionamiento.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/services' className="nav-link">Servicios</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/owners' className="nav-link">Propietarios</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/signup' className="nav-link">Registrar</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login' className="nav-link">Ingresar</NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </div>
    );
};

export default Navbar;
