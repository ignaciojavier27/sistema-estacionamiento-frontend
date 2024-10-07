import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logout = ({ setUserType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');    
    localStorage.removeItem('usuario');    
    setUserType('');

    navigate('/login');
  }, [navigate, setUserType]);

  return (
    <div>
      <h3>Cerrando sesión...</h3>
    </div>
  );
};

Logout.propTypes = {
  setUserType: PropTypes.func
}

export default Logout;
