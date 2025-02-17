import React from "react";
import { useDayNight } from "../atoms/dayNightAtom";
import { getWeatherPicture } from "../functions/weatherFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudRain, faWind } from "@fortawesome/free-solid-svg-icons";

const Today = (props) => {
  const [isDaytime] = useDayNight();

  const {
    day,
    weatherCode,
    temperatureMax,
    temperatureMin,
    realTemperature,
    relativeHumidity,
    precipitation,
    windSpeed,
  } = props;

  return (
    <div className="today">
      <div className="inner-today">
        <div className="date today-date">
          <div className="inner-inner-date">
            <div className="day">
              <h4>{day}</h4>
            </div>
            <div className="inner-date">
              <h4>{new Date().toLocaleDateString()}</h4>
            </div>
            <div className="inner-date">
              <h4>
                {new Date().getHours().toString().padStart(2, "0") + ":00"}
              </h4>
            </div>
          </div>
          <div className="temperature">
            <h5 className="temperature-min">{`${temperatureMin}°`}</h5>
            <h5>{`${temperatureMax}°`}</h5>
          </div>
        </div>

        <div className="img-today">
          <div className="image">
            <img
              className="iag"
              src={`/icons/${isDaytime ? "" : "night-"}${getWeatherPicture(
                weatherCode
              )}`}
              alt="img-weather"
            />
          </div>
          <div>
            <h1>{`${realTemperature}°`}</h1>
          </div>
        </div>
        <div className="weather-details">
          <h4>
            <svg
              viewBox="0 0 30 30"
              fill="currentColor"
              height="1.7em"
              width="1.7em"
              style={{ verticalAlign: "middle" }}
            >
              <path d="M7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86-.39.91-.91 1.7-1.57 2.36-.66.66-1.45 1.19-2.37 1.58-.92.39-1.89.59-2.91.59-1 0-1.95-.19-2.86-.57-.91-.38-1.7-.89-2.36-1.55-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93zm2.26-2.93c0 .83.17 1.49.52 1.99.35.49.88.74 1.59.74.72 0 1.25-.25 1.61-.74.35-.49.53-1.15.54-1.99-.01-.84-.19-1.5-.54-2-.35-.49-.89-.74-1.61-.74-.71 0-1.24.25-1.59.74-.35.5-.52 1.16-.52 2zm1.57 0v-.35c0-.08.01-.19.02-.33s.02-.25.05-.32.05-.16.09-.24c.04-.08.09-.15.15-.18.07-.04.14-.06.23-.06.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06a.335.335 0 01-.15-.18c-.04-.08-.07-.17-.09-.24-.02-.08-.04-.19-.05-.32-.01-.14-.02-.25-.02-.32v-.34zm.59 7.75h1.32l4.99-10.74h-1.35l-4.96 10.74zm4.3-2.99c.01.84.2 1.5.55 2 .35.49.89.74 1.6.74.72 0 1.25-.25 1.6-.74.35-.49.52-1.16.53-2-.01-.84-.18-1.5-.53-1.99-.35-.49-.88-.74-1.6-.74-.71 0-1.25.25-1.6.74-.36.49-.54 1.15-.55 1.99zm1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45.09-.3.17-.38.19-.12.33-.12c.09 0 .17.02.24.06.07.04.12.1.16.19.04.09.07.17.1.24s.04.18.05.32l.01.32v.69l-.01.32-.05.32-.1.24-.16.19-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53z" />
            </svg>
            {`  ${relativeHumidity}%`}
          </h4>
          <h4>
            <FontAwesomeIcon
              icon={faCloudRain}
              style={{ padding: "0 6px", color: "#ffffff" }}
            />
            {`  ${precipitation}%`}
          </h4>
          <h4>
            <FontAwesomeIcon
              icon={faWind}
              style={{ padding: "0 6px", color: "#ffffff" }}
            />
            {`  ${windSpeed} km/h`}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Today;
