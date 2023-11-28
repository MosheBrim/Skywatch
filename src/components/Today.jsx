import React from "react";
import { useDayNight } from "../atoms/dayNightAtom";
import { getWeatherPicture } from "../functions/weatherFunctions";

const Today = (props) => {
  const [isDaytime] = useDayNight();

  const { day, weatherCode, temperatureMax, temperatureMin } = props;

  return (
    <div className="today">
      <div className="date">
        <div>
          <h4>{day}</h4>
        </div>
        <div>
          <h4>{new Date().toLocaleDateString()}</h4>
        </div>
      </div>
      <div>
        <img
          src={`../icons/${isDaytime ? "" : "night-"}${getWeatherPicture(
            weatherCode
          )}`}
          alt="img-weather"
        />
      </div>
      <div>
        <h5>{`${temperatureMin}° / ${temperatureMax}°`}</h5>
      </div>
    </div>
  );
};

export default Today;
