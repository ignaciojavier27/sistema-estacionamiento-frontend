import Logout from '../components/Logout';
import PropTypes from 'prop-types';

const LogoutScreen = ({ setUserType }) => {
    return (
        <main>
            <section className="container-desarrollo container-md bg-white py-5">
                <h2>Cerrar Sesión</h2>
                <Logout setUserType={setUserType} />
            </section>
        </main>
    )
}

LogoutScreen.propTypes = {
    setUserType: PropTypes.func
}

export default LogoutScreen;
