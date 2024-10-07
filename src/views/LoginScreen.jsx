import Login from '../components/Login'
import '../assets/styles/login.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const LoginScreen = ({ setUserType }) => {
    return (
        <main>
            <section className="container-desarrollo container-fluid bg-white py-5 d-flex flex-row justify-content-around align-items-center">
                <article className='info-login'>
                    <h2>Inicio Sesión</h2>
                    <p className='mt-2'>¿No tienes una cuenta? <NavLink to="/signup">Registrate</NavLink></p>
                </article>

                <article className='w-50 p-5 bg-light rounded-5 border'>
                    <Login setUserType={setUserType}/>
                </article>

            </section>
        </main>
    )
}

LoginScreen.propTypes = {
    setUserType: PropTypes.func
}

export default LoginScreen