import axios from 'axios';

export const getDirections = async (
  origin: [number, number],
  destination: [number, number],
) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;

    const response = await axios.get(url);
    const route = response.data.routes[0].geometry.coordinates.map(
      (coord: [number, number]) => ({
        latitude: coord[1],
        longitude: coord[0],
      }),
    );
    return route;
  } catch (error) {
    console.log(error);
    return [];
  }
};
