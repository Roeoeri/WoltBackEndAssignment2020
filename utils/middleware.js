const queryIsMalformed = (req) => {
  const queryString = req.query.q;
  const { lat } = req.query;
  const { lon } = req.query;

  if (typeof queryString === 'undefined' || typeof lat === 'undefined' || typeof lon === 'undefined') {
    return true;
  }
  return false;
};

const queryStringIsNotValidLenght = (req) => {
  const queryString = req.query.q;

  const minimalLengthForQueryString = 1;

  if (queryString.length < minimalLengthForQueryString) {
    return true;
  }
  return false;
};

const coordinatesAreMalformed = (req) => {
  const { lat } = req.query;
  const { lon } = req.query;

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return true;
  }

  const minimalValueForLat = -90;
  const maximalValueForLat = 90;
  const minimalValueForLon = -180;
  const maximalValueForLon = 180;


  if (lat > maximalValueForLat
      || lon > maximalValueForLon
      || lat < minimalValueForLat
      || lon < minimalValueForLon) {
    return true;
  }

  return false;
};


const queryContainsErrors = (req, res) => {
  if (queryIsMalformed(req)) {
    res.status(400).send({ error: 'Malformed query. Please double check that you have given all parameters (Query String, Latitude and Longitude) in correct format.' });
    return true;
  }

  if (queryStringIsNotValidLenght(req)) {
    res.status(400).send({ error: 'Query String is too short. Query String needs to be at least one character' });
    return true;
  }

  if (coordinatesAreMalformed(req)) {
    res.status(400).send({ error: 'Malformed latitude or longitude. Correct format for coordinates is decimal value between -90 - 90 latitude and -180 - 180 longitude' });
    return true;
  }

  return false;
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  queryContainsErrors,
  unknownEndpoint,
};
