export const obtenerUbicacionUsuario = (setUserPosition, defaultPosition) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.log('Error al obtener la ubicación del usuario:', error);
          setUserPosition(defaultPosition);
        }
      );
    } else {
      console.log('Geolocalización no es compatible con este navegador');
      setUserPosition(defaultPosition);
    }
};
  