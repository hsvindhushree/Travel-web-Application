/**
 * Location Service for browser Geolocation and Geocoding
 */

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        let msg = "Could not retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied by user.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          msg = "The request to get user location timed out.";
        }
        reject(new Error(msg));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${lat},${lon}&count=1`);
    // Open-Meteo reverse search via nominatim or fallback
    const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (geoRes.ok) {
      const data = await geoRes.json();
      return {
        city: data.city || data.locality || data.principalSubdivision || "Current Location",
        country: data.countryName || ""
      };
    }
  } catch (e) {
    console.warn("Reverse geocode failed:", e);
  }
  return { city: "Your Location", country: "" };
}

export async function searchLocationByQuery(query) {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
    if (res.ok) {
      const data = await res.json();
      if (data.results) {
        return data.results.map(item => ({
          name: item.name,
          country: item.country || "",
          admin1: item.admin1 || "",
          lat: item.latitude,
          lon: item.longitude,
          displayName: `${item.name}${item.admin1 ? ', ' + item.admin1 : ''}${item.country ? ', ' + item.country : ''}`
        }));
      }
    }
  } catch (e) {
    console.error("Location search error:", e);
  }
  return [];
}
