import FormularioEstacionamiento from "../components/Owner/FormularioEstacionamiento";

const OwnerEstacionamientosScreen = () => {
  return (
    <main>
      <section className="container-desarrollo container-md bg-white d-flex align-items-center flex-column justify-content-center">
        <h3 className="pt-5 pb-3">Agrega un nuevo estacionamiento</h3>
        <FormularioEstacionamiento/>
      </section>
    </main>
  );
};

export default OwnerEstacionamientosScreen;
