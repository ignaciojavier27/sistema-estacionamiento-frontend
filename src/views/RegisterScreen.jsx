import Register from '../components/Register'

const RegisterScreen = () => {
    return (
        <main>
            <section className="container-desarrollo container-md bg-white d-flex align-items-center flex-column justify-content-center ">
                <h3 className='pt-5 pb-3'>Crea una cuenta nueva</h3>
                <Register />
            </section>
        </main>
    )
}

export default RegisterScreen
