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
            src={`${import.meta.env.BASE_URL}/Images/WeatherLogo.png`}
            alt="logo-weather"
            />
          </div>
          <div>
            <h1>Skywatch</h1>
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
            style={{
              width: "160px",
              height: "56px",
              backdropFilter: "blur(20px)",
              borderRadius: "5px",
            }}
            src={`${import.meta.env.BASE_URL}/Images/WeatherLogo.png`}
            alt="logo-weather"
          />
        </div>
      </div>
      <div>
        <h1 style={{fontSize:"40px"}}>{location.city}</h1>
      </div>
      <div>
        <CityCoordinatesFinder />
      </div>
    </header>
  );
}

export default Header;
