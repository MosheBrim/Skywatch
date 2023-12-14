import getLocation from "./locationFunction";

const getWeatherPicture = (weatherCode) => {
  const picture = {
    10: "loader.gif",
    0: "clear.svg",
    1: "cloudy.svg",
    2: "cloudy-2.svg",
    3: "cloudy-3.svg",
    45: "cloudy-3.svg",
    48: "cloudy-3.svg",
    51: "rainy.svg",
    53: "rainy.svg",
    55: "rainy.svg",
    56: "rainy-2.svg",
    57: "rainy-2.svg",
    61: "rainy-2.svg",
    63: "rainy-2.svg",
    65: "rainy-2.svg",
    66: "rainy-2.svg",
    67: "rainy-2.svg",
    71: "snowy.svg",
    73: "snowy.svg",
    75: "snowy.svg",
    77: "snowy.svg",
    80: "rainy-2.svg",
    81: "rainy-2.svg",
    82: "rainy-2.svg",
    85: "snowy.svg",
    86: "snowy.svg",
    95: "stormy.svg",
    96: "stormy.svg",
    99: "stormy.svg",
  };
  return picture[weatherCode] || "image-loader.gif";
};

const getDayOfWeek = (dayIndex) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[dayIndex % 7];
};

const getWeather = async () => {
  try {
    const location = await getLocation();
    console.log(location);
    const url = `https://api.open-meteo.com/v1/dwd-icon?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=4`;
    const responseWeather = await fetch(url);
    const dataWeather = await responseWeather.json();

    const weather = {
      realTemperature: dataWeather.current.temperature_2m,
      relativeHumidity: dataWeather.current.relative_humidity_2m,
      precipitation: dataWeather.current.precipitation,
      rain: dataWeather.current.rain,
      windSpeed: dataWeather.current.wind_speed_10m,
      windDirection: dataWeather.current.wind_direction_10m,
      weatherCode: dataWeather.daily.weathercode,
      temperatureMax: dataWeather.daily.temperature_2m_max,
      temperatureMin: dataWeather.daily.temperature_2m_min,
    };
    return weather;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return {
      weatherCode: [10, 10, 10, 10],
      temperatureMax: [0, 0, 0, 0],
      temperatureMin: [0, 0, 0, 0],
    };
  }
};

export { getWeatherPicture, getDayOfWeek, getWeather };
