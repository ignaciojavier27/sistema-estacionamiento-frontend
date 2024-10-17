export const obtenerUbicacionUsuario = (setUserPosition, defaultPosition) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        () => {
          setUserPosition(defaultPosition);
        }
      );
    } else {
      setUserPosition(defaultPosition);
    }
};
  