import React, { useEffect, useState } from "react";
import { useDayNight } from "./atoms/dayNightAtom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Today from "./components/Today";
import NextDays from "./components/NextDays";
import { getDayOfWeek, getWeather } from "./functions/weatherFunctions";

// // Function to get latitude and longitude for a given city
// async function getCityCoordinates(city) {
//   const apiKey = "815e3705c251499f9bc35f06177483e8";
//   const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//     city
//   )}&key=${apiKey}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data.results && data.results.length > 0) {
//       const firstResult = data.results[0];
//       const { lat, lng } = firstResult.geometry;

//       console.log(`Coordinates for ${city}: Latitude ${lat}, Longitude ${lng}`);
//       return { lat, lng };
//     } else {
//       console.error(`No results found for ${city}`);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error.message);
//     return null;
//   }
// }

// // Example usage:

const App = () => {
//   const data = {
//     resource_id: "8f714b6f-c35c-4b40-a0e7-547b675eee0e", // the resource id
//     limit: 100, // get 5 results
//     q: "jones", // query for 'jones'
//   };

//   fetch("https://data.gov.il/api/3/action/datastore_search", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       alert("Total results found: " + data.result.total);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
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
    const fetchData = async () => {
      try {
        const weather = await getWeather();
        console.log(weather);
        // const coordinates = await getCityCoordinates("Maale Amos");
        // console.log(coordinates);
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
              realTemperature={weatherData.realTemperature}
              relativeHumidity={weatherData.relativeHumidity}
              precipitation={weatherData.precipitation}
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
