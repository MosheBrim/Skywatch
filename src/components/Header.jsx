import React, { useEffect, useState } from "react";
import getLocation from "../functions/locationFunction";

function Header() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loc = await getLocation();
        setLocation(loc);
      } catch (error) {
        console.error("Error fetching location:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <header>
        <div className="webName">
          <div>
            <img src="../images/weather_logo.png" alt="" />
          </div>
          <div>
            <h1>Local Weather</h1>
          </div>
        </div>
        <div>
          <h1>Error fetching location: {error}</h1>
        </div>
      </header>
    );
  }

  if (!location) {
    return (
      <header>
        <div className="webName">
          <div>
            <img src="../images/weather_logo.png" alt="" />
          </div>
          <div>
            <h1>Local Weather</h1>
          </div>
        </div>
        <div>
          <h1>Loading...</h1>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="webName">
        <div>
          <img src="../images/weather_logo.png" alt="" />
        </div>
        <div>
          <h1>Local Weather</h1>
        </div>
      </div>
      <div>
        <h1>{location.countryCapital}</h1>
      </div>
    </header>
  );
}

export default Header;
