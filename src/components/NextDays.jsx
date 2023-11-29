import React, { useEffect, useState } from "react";
import { useDayNight } from "../atoms/dayNightAtom";
import { getWeatherPicture } from "../functions/weatherFunctions";

const NextDays = (props) => {
  const [isDaytime] = useDayNight();
  return (
    <div className="next-days">
      <div className="date">
        <div className="day">
          <h4>{props.day}</h4>
        </div>
        <div className="inner-date">
          <h4>{props.date}</h4>
        </div>
      </div>
      <div className="image">
        <img
        className="iag"
          src={`../icons/${isDaytime ? "" : "night-"}${getWeatherPicture(
            props.weatherCode
          )}`}
          alt="img-weather"
        />
      </div>
      <div>
        <h5 className="temperature-min">{`${props.temperatureMin}°`}</h5>
        <h5>{`${props.temperatureMax}°`}</h5>
      </div>
    </div>
  );
};

export default NextDays;
