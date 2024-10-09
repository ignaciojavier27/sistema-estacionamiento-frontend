import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../assets/styles/navbar.css';
const ClientNavbar = () => {

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
            <div className="container-fluid mx-3">
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
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userName}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink to='/client/history' className="dropdown-item">Historial</NavLink>
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

export default ClientNavbar;
