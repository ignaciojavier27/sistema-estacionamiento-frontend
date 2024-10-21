import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDeleteParking from "../Modals/ModalDeleteParking";

const BotonesGestionEstacionamiento = ({ estacionamiento }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (estacionamiento) => {
    navigate(`/owners/edit-parking/${estacionamiento}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleManageClick = () => {
    navigate(`/owners/manage-parking/${estacionamiento}`);
  }

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `https://sistema-estacionamiento-backend-production.up.railway.app/api/estacionamientos/${estacionamiento}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("Estacionamiento eliminado exitosamente");
        window.location.reload(); 
      } else {
        alert("Error al eliminar el estacionamiento");
      }
    } catch (error) {
      console.error("Error al eliminar el estacionamiento:", error);
      alert("Error al eliminar el estacionamiento");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-dark btn-sm me-2"
        onClick={() => handleManageClick(estacionamiento)}
      >
        Gestionar
      </button>
      <button
        className="btn btn-dark btn-sm me-2"
        onClick={() => handleEditClick(estacionamiento)}
      >
        Editar
      </button>
      <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
        Eliminar
      </button>

      <ModalDeleteParking
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BotonesGestionEstacionamiento;
