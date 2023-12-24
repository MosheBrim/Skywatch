import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "../atoms/locationAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const CityCoordinatesFinder = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);
  const [location, setLocation] = useLocation();
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchCitySuggestions = async () => {
      const apiKey = "815e3705c251499f9bc35f06177483e8";
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        input
      )}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const cityNames = data.results.map(
            (result) => result.components.city || result.formatted
          );
          setSuggestions(cityNames);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching city suggestions:", error.message);
      }
    };

    fetchCitySuggestions();
  }, [input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setSelected(false);
    setIsTyping(true);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && suggestions.length > 0) {
      const cityCoordinates = await getCityCoordinates(input);
      if (cityCoordinates) {
        setLocation((prevLocation) => ({
          ...prevLocation,
          latitude: cityCoordinates.latitude,
          longitude: cityCoordinates.longitude,
          city: cityCoordinates.city,
        }));
        setSuggestions([]);
        setSelected(true);
      }
    }
  };

  const handleSuggestionClick = async (city, event) => {
    event.stopPropagation(); // Stop the click event from propagating
    city = city.split(",")[0];
    setInput(city);
    setSuggestions([]);

    const cityCoordinates = await getCityCoordinates(city);
    if (cityCoordinates) {
      setLocation((prevLocation) => ({
        ...prevLocation,
        latitude: cityCoordinates.latitude,
        longitude: cityCoordinates.longitude,
        city: cityCoordinates.city,
      }));
      setSelected(true);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInput(""); // Reset input value when clicking outside
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [inputRef]);

  const renderSuggestions = () => {
    if (suggestions.length === 0 && !selected && input.trim() !== "") {
      return <li>No matching cities found</li>;
    }

    return suggestions.map((city, index) => (
      <li key={index} onClick={(event) => handleSuggestionClick(city, event)}>
        <FontAwesomeIcon
          icon={faLocationDot}
          style={{ paddingRight: "10px", color: "#ffffff" }}
        />
        {city}
      </li>
    ));
  };

  const getCityCoordinates = async (city) => {
    const apiKey = "815e3705c251499f9bc35f06177483e8";
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      city
    )}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        const { lat, lng } = firstResult.geometry;
        console.log(
          `Coordinates for ${city}: Latitude ${lat}, Longitude ${lng}`
        );
        return {
          latitude: lat,
          longitude: lng,
          city: city,
        };
      } else {
        console.error(`No results found for ${city}`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error.message);
    }
  };

  return (
    <div className={`city-input-container ${isTyping ? "typing" : ""}`}>
      <div className="icon-container">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ paddingLeft: "16px", color: "#ffffff" }}
        />
      </div>
      <label
        htmlFor="cityInput"
        className={`city-label ${input ? "hidden" : ""}`}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search A City
      </label>
      <input
        ref={inputRef}
        type="text"
        id="cityInput"
        value={input}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />
      <ul className="city-list">{renderSuggestions()}</ul>
    </div>
  );
};

export default CityCoordinatesFinder;
