import React, { useEffect, useState } from "react";
import { useDayNight } from "./atoms/dayNightAtom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Today from "./components/Today";
import NextDays from "./components/NextDays";
import { getDayOfWeek, getWeather } from "./functions/weatherFunctions";

const App = () => {
  const [isDaytime] = useDayNight();
  const [weatherData, setWeatherData] = useState({
    weatherCode: [0, 0, 0, 0],
    temperatureMax: [0, 0, 0, 0],
    temperatureMin: [0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weather = await getWeather();
        console.log(weather);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        // Handle error
      }
    };
  
    fetchData();
  }, [isDaytime]);

  return (
    <div className={`app ${isDaytime ? "daytime" : "nighttime"}`}>
      <div>
        <Header />
        <Footer />
        <div className="middle-container">
          <div className="container-today">
          <Today
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
