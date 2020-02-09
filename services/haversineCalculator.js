const convertToRadians = (degrees) => degrees * (Math.PI / 180.0);

const distanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
  const r = 6371;

  const dLatRadians = convertToRadians(lat2 - lat1);
  const dLonRadians = convertToRadians(lon2 - lon1);

  const lat1Radians = convertToRadians(lat1);
  const lat2Radians = convertToRadians(lat2);

  const a = Math.sin(dLatRadians / 2) ** 2
  + Math.sin(dLonRadians / 2) ** 2 * Math.cos(lat1Radians) * Math.cos(lat2Radians);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return r * c;
};

module.exports = {
  distanceBetweenLocations,
};
