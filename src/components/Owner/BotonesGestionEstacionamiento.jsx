import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BotonesGestionEstacionamiento = ({ estacionamiento }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (estacionamiento) => {
    navigate(`/owners/edit-parking/${estacionamiento}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (confirmText === "Eliminar estacionamiento") {
      try {
        const response = await fetch(
          `https://sistema-estacionamiento-backend-production.up.railway.app/api/estacionamientos/${estacionamiento}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          alert("Estacionamiento eliminado exitosamente");
          navigate("/owners/dashboard");
        } else {
          alert("Error al eliminar el estacionamiento");
        }
      } catch (error) {
        console.error("Error al eliminar el estacionamiento:", error);
        alert("Error al eliminar el estacionamiento");
      }
    } else {
      alert("Escribe correctamente 'Eliminar estacionamiento' para confirmar");
    }
  };

  return (
    <div>
      <button
        className="btn btn-dark btn-sm me-2"
        onClick={() => handleEditClick(estacionamiento)}
      >
        Editar
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={handleDeleteClick}
      >
        Eliminar
      </button>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Escribe &quot;Eliminar estacionamiento&quot; para confirmar.</p>
                <input
                  type="text"
                  className="form-control"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonesGestionEstacionamiento;
