import React, { useEffect, useState } from "react";
import { useDayNight } from "./atoms/dayNightAtom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Today from "./components/Today";
import NextDays from "./components/NextDays";
import { getDayOfWeek, getWeather } from "./functions/weatherFunctions";
import { useLocation } from "./atoms/locationAtom"


const App = () => {

  const [location] = useLocation();
  const [isDaytime] = useDayNight();
  const [weatherData, setWeatherData] = useState({
    weatherCode: [10, 10, 10, 10],
    temperatureMax: [0, 0, 0, 0],
    temperatureMin: [0, 0, 0, 0],
    realTemperature: "",
    relativeHumidity: "",
    precipitation: "",
    rain: "",
    windSpeed: "",
    windDirection: "",
  });

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0){
    const fetchData = async () => {
      try {
        console.log(location);
        const weather = await getWeather(location.latitude, location.longitude);
        console.log(weather);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    fetchData();
  }}, [isDaytime, location]);

  return (
    <div className={`app ${isDaytime ? "daytime" : "nighttime"}`}>
      <div>
        <Header />
        <Footer />
        <div className="middle-container">
          <div className="container-today">
            <Today
              realTemperature={weatherData.realTemperature}
              relativeHumidity={weatherData.relativeHumidity}
              precipitation={weatherData.precipitation*100}
              rain={weatherData.rain}
              windSpeed={weatherData.windSpeed}
              windDirection={weatherData.windDirection}
              day={getDayOfWeek(new Date().getDay())}
              weatherCode={weatherData.weatherCode[0]}
              temperatureMax={weatherData.temperatureMax[0]}
              temperatureMin={weatherData.temperatureMin[0]}
            />
          </div>
          <div className="container-next-days">
            {[1, 2, 3].map((index) => {
              const nextDayIndex = new Date().getDay() + index;
              const nextDayDate = new Date();
              nextDayDate.setDate(nextDayDate.getDate() + index);

              return (
                <NextDays
                  key={index}
                  day={getDayOfWeek(nextDayIndex)}
                  date={nextDayDate.toLocaleDateString()}
                  weatherCode={weatherData.weatherCode[index]}
                  temperatureMax={weatherData.temperatureMax[index]}
                  temperatureMin={weatherData.temperatureMin[index]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;