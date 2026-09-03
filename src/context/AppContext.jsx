import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { fetchLiveWeather } from '../services/weatherService';
import { getUserLocation, reverseGeocode } from '../services/locationService';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [destinations, setDestinations] = useState(DESTINATIONS);
  
  const [selectedDestination, setSelectedDestination] = useState(() => {
    try {
      const savedId = localStorage.getItem('wanderlust_selected_dest_id');
      const found = DESTINATIONS.find(d => d.id === savedId);
      return found || DESTINATIONS[0];
    } catch (e) {
      return DESTINATIONS[0];
    }
  });
  
  // Modals & Drawers state
  const [activeModal, setActiveModal] = useState(null); // 'detail' | 'location' | 'aiChat' | 'itinerary' | 'settings' | 'savedTrips' | 'auth'
  const [selectedFamousPlace, setSelectedFamousPlace] = useState(null);

  // User Authentication & Profile State (localStorage persistence)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('wanderlust_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('wanderlust_user_profile');
    }
  }, [user]);

  const loginUser = (profileData) => {
    const newUser = {
      id: "usr_" + Date.now(),
      name: profileData.name || "Alex Voyager",
      email: profileData.email || "alex.voyager@example.com",
      avatar: profileData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      travelVibe: profileData.travelVibe || "Global Explorer",
      isLoggedIn: true
    };
    setUser(newUser);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const updateUserProfile = (updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  // User Location State (localStorage persistence)
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const savedLoc = localStorage.getItem('wanderlust_user_location');
      return savedLoc ? JSON.parse(savedLoc) : {
        lat: 48.8566,
        lon: 2.3522,
        city: "Paris",
        country: "France",
        isDetected: false,
        error: null
      };
    } catch (e) {
      return {
        lat: 48.8566,
        lon: 2.3522,
        city: "Paris",
        country: "France",
        isDetected: false,
        error: null
      };
    }
  });

  // Attempt location auto-detection on initial load if not yet detected
  useEffect(() => {
    if (!userLocation.isDetected) {
      requestUserLocation().catch(() => {});
    }
  }, []);

  // Weather State
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherUnit, setWeatherUnit] = useState(() => {
    try {
      return localStorage.getItem('wanderlust_weather_unit') || 'C';
    } catch (e) {
      return 'C';
    }
  });

  // Saved Trips & Favorites (localStorage persistence)
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_saved_trips');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [savedDestinations, setSavedDestinations] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_fav_destinations');
      return saved ? JSON.parse(saved) : ["paris", "tokyo"];
    } catch (e) {
      return ["paris", "tokyo"];
    }
  });

  // API Keys state
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_api_keys');
      return saved ? JSON.parse(saved) : { openWeather: '', gemini: '', unsplash: '' };
    } catch (e) {
      return { openWeather: '', gemini: '', unsplash: '' };
    }
  });

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('wanderlust_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    localStorage.setItem('wanderlust_fav_destinations', JSON.stringify(savedDestinations));
  }, [savedDestinations]);

  useEffect(() => {
    localStorage.setItem('wanderlust_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    localStorage.setItem('wanderlust_user_location', JSON.stringify(userLocation));
  }, [userLocation]);

  useEffect(() => {
    localStorage.setItem('wanderlust_weather_unit', weatherUnit);
  }, [weatherUnit]);

  useEffect(() => {
    if (selectedDestination) {
      localStorage.setItem('wanderlust_selected_dest_id', selectedDestination.id);
    }
  }, [selectedDestination]);

  // Load weather when selected destination changes
  useEffect(() => {
    if (selectedDestination) {
      loadWeatherForLocation(selectedDestination.lat, selectedDestination.lon, selectedDestination.name);
    }
  }, [selectedDestination, apiKeys.openWeather]);

  const loadWeatherForLocation = async (lat, lon, cityName) => {
    setWeatherLoading(true);
    try {
      const weather = await fetchLiveWeather(lat, lon, cityName, apiKeys.openWeather);
      setWeatherData(weather);
    } catch (err) {
      console.error("Weather load error:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  const requestUserLocation = async () => {
    try {
      const coords = await getUserLocation();
      const geo = await reverseGeocode(coords.lat, coords.lon);
      const newLoc = {
        lat: coords.lat,
        lon: coords.lon,
        city: geo.city,
        country: geo.country,
        isDetected: true,
        error: null
      };
      setUserLocation(newLoc);
      loadWeatherForLocation(coords.lat, coords.lon, geo.city);
      return newLoc;
    } catch (err) {
      console.warn("Location error:", err.message);
      setUserLocation(prev => ({ ...prev, error: err.message }));
      throw err;
    }
  };

  const setManualLocation = (city, country, lat, lon) => {
    const loc = {
      lat,
      lon,
      city,
      country,
      isDetected: false,
      error: null
    };
    setUserLocation(loc);
    loadWeatherForLocation(lat, lon, city);
  };

  const toggleFavoriteDestination = (destId) => {
    setSavedDestinations(prev => 
      prev.includes(destId) ? prev.filter(id => id !== destId) : [...prev, destId]
    );
  };

  const saveItinerary = (itinerary) => {
    const newTrip = {
      ...itinerary,
      id: "trip_" + Date.now(),
      createdAt: new Date().toISOString()
    };
    setSavedTrips(prev => [newTrip, ...prev]);
  };

  const deleteItinerary = (tripId) => {
    setSavedTrips(prev => prev.filter(t => t.id !== tripId));
  };

  const openDestinationDetail = (dest) => {
    setSelectedDestination(dest);
    setActiveModal('detail');
  };

  return (
    <AppContext.Provider
      value={{
        destinations,
        selectedDestination,
        setSelectedDestination,
        openDestinationDetail,
        activeModal,
        setActiveModal,
        selectedFamousPlace,
        setSelectedFamousPlace,
        userLocation,
        requestUserLocation,
        setManualLocation,
        weatherData,
        weatherLoading,
        weatherUnit,
        setWeatherUnit,
        savedTrips,
        saveItinerary,
        deleteItinerary,
        savedDestinations,
        toggleFavoriteDestination,
        apiKeys,
        setApiKeys,
        user,
        loginUser,
        logoutUser,
        updateUserProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
