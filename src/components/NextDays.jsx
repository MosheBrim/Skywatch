import React, { useEffect, useState } from "react";
import { useDayNight } from '../atoms/dayNightAtom';
import { getWeatherPicture } from "../functions/weatherFunctions";

const NextDays = (props) => {
    const [isDaytime] = useDayNight();
  return (
    <div className="next-days">
      <div className="date">
        <h4>{props.day}</h4>
        <h4>{props.date}</h4>
      </div>
      <div>
        <img src={`../icons/${isDaytime ? "" : "night-"}${getWeatherPicture(props.weatherCode)}`} alt="img-weather" />
      </div>
      <div>
        <h5>{`${props.temperatureMin}° / ${props.temperatureMax}°`}</h5>
      </div>
    </div>
  );
};

export default NextDays;