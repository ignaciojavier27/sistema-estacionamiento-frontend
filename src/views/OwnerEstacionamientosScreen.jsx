import FormularioEstacionamiento from "../components/Owner/FormularioEstacionamiento";

const OwnerEstacionamientosScreen = () => {
  return (
    <main>
      <section className="container-desarrollo container-md bg-white py-5">
        <h2>Agrega un nuevo estacionamiento</h2>
        <FormularioEstacionamiento/>
      </section>
    </main>
  );
};

export default OwnerEstacionamientosScreen;
