import React, { useEffect, useState } from "react";
import CityCoordinatesFinder from "./CityCoordinatesFinder";
import { useLocation } from "../atoms/locationAtom";

function Header() {
  const [location] = useLocation();
  const [error, setError] = useState(null);

  if (!location) {
    return (
      <header>
        <div className="webName">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}/Images/weather_logo.png`}
              alt="logo-weather"
            />
          </div>
          <div>
            <h1>Weather</h1>
          </div>
        </div>
        <div>
          <h1>Loading...</h1>
        </div>
        <div>
          <CityCoordinatesFinder />
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="webName">
        <div>
          <img
            src={`${import.meta.env.BASE_URL}/Images/weather_logo.png`}
            alt="logo-weather"
          />
        </div>
        <div>
          <h1>Weather</h1>
        </div>
      </div>
      <div>
        <h1>{location.city}</h1>
      </div>
      <div>
        <CityCoordinatesFinder />
      </div>
    </header>
  );
}

export default Header;
