const getLocation = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Problem fetching location data");
    }
    const data = await response.json();

    const latitude = data.latitude;
    const longitude = data.longitude;
    const countryCapital = data.country_capital;
    
    return { latitude, longitude, countryCapital };
  } catch (error) {
    console.error("Error fetching location:", error.message);
    return {
      latitude: 32.9499,
      longitude: 35.2132,
      countryCapital: "Jerusalem",
    };
  }
};

export default getLocation;
