import { useState } from "react";
const ModalDeleteParking = ({ show, onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState("");
  const handleConfirmClick = () => {
    if (confirmText === "Eliminar estacionamiento") {
      onConfirm();
    } else {
      alert("Escribe correctamente 'Eliminar estacionamiento' para confirmar");
    }
  };

  return (
    show && (
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
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
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={handleConfirmClick}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalDeleteParking;
