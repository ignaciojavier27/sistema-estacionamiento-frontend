import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../assets/styles/navbar.css';

const OwnerNavbar = () => {
    
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("usuario");
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserName(parsedUser.nombre_usuario);
        }
    }, []);

    return (
    <div className="container-fluid p-0 m-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
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
                            <NavLink to='/owners/dashboard' className="nav-link">Inicio</NavLink>
                        </li>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userName} <img src="/images/icono-usuario.png" alt="Icono usuario estandar" width={"24"} height={"24"} className="d-inline-block align-text-top"/>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink to='/' className="dropdown-item">Mapa</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/logout' className="dropdown-item">Cerrar Sesión</NavLink>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    );
};

export default OwnerNavbar;
