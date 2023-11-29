import React from "react";
import { useDayNight } from "../atoms/dayNightAtom";
import { getWeatherPicture } from "../functions/weatherFunctions";

const Today = (props) => {
  const [isDaytime] = useDayNight();

  const { day, weatherCode, temperatureMax, temperatureMin } = props;

  return (
    <div className="today">
      <div className="inner-today">
        <div className="date today-date">
          <div className="day">
            <h4>{day}</h4>
          </div>
          <div className="inner-date">
            <h4>{new Date().toLocaleDateString()}</h4>
          </div>
          <div className="inner-date">
            <h4>{new Date().getHours().toString().padStart(2, "0") + ":00"}</h4>
          </div>
          <div>
          <h5 className="temperature-min">{`${temperatureMin}°`}</h5>
          <h5>{`${temperatureMax}°`}</h5>
        </div>
        </div>
        <div className="img-today">
        <div className="image">
          <img
            className="iag"
            src={`../icons/${isDaytime ? "" : "night-"}${getWeatherPicture(
              weatherCode
            )}`}
            alt="img-weather"
          />
        </div>
        </div>
      
      </div>
    </div>
  );
};

export default Today;
