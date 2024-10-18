import FormPutParking from "../../components/Owner/FormPutParking";

const OwnerEditParkingScreen = () => {
  return (
    <main>
      <section className="container-desarrollo container-md bg-white d-flex align-items-center flex-column justify-content-center">
        <h3 className="pt-5 pb-3">Actualizar datos del estacionamiento</h3>
        <FormPutParking />
      </section>
    </main>
  );
};

export default OwnerEditParkingScreen;
