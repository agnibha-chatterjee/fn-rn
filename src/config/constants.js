export const generateGeocodeURI = (lat, lng) =>
  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

export const MULTIPLY_FACTOR = 800;
