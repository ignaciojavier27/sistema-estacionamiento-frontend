export const obtenerCoordenadas = async (direccion) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('No se encontraron coordenadas para la dirección ingresada');
    }

    const { lat, lon } = data[0];
    return { latitud: parseFloat(lat), longitud: parseFloat(lon) };
  } catch (error) {
    console.error('Error al obtener coordenadas:', error);
    return null;
  }
  
};