// controllers/locationController.js
const haversine = require('haversine-distance');
const locations = require('../public/wisata.json');

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Earth's radius in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
};

const findNearbyLocations = (req, res) => {
  const { userLatitude, userLongitude, maxDistance } = req.body;

  if (!userLatitude || !userLongitude || !maxDistance) {
    return res.status(400).json({ error: 'Invalid parameters.' });
  }

  try {
    const nearbyLocations = locations.filter((loc) => {
      const distance = haversineDistance(
        userLatitude,
        userLongitude,
        parseFloat(loc.latitude),
        parseFloat(loc.longitude)
      );

      return distance <= maxDistance;
    });

    const nearbyLocationsWithDistance = nearbyLocations.map((loc) => ({
      ...loc,
      distance: haversineDistance(
        userLatitude,
        userLongitude,
        parseFloat(loc.latitude),
        parseFloat(loc.longitude)
      ),
    }));

    res.json(nearbyLocationsWithDistance);

    console.log(nearbyLocationsWithDistance);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};




module.exports = {
  findNearbyLocations,
};







