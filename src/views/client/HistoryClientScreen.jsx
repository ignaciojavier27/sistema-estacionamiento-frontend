import { useEffect, useState } from "react";
import ClientNotifications from "../../components/Client/ClientNotifications";

const HistoryClientScreen = () => {

  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLogueado) {
      setUsuarioId(usuarioLogueado.usuario_id);
    }
  }, []);

  if (usuarioId === null) {
    return <p>Cargando...</p>;
  }

  return (  
    <main className="container-fluid d-flex flex-column justify-content-center flex-xl-row gap-3 px-5 py-0 my-0">
      <ClientNotifications usuarioId={usuarioId}/>
    </main>
  );
};

export default HistoryClientScreen;
