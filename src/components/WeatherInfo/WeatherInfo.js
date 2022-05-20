import React from "react";
import "./WeatherInfo.css";

const WeatherInfo = (props) => {
  return (
    <div className="weather__container">
      <div className="weather__row">
        <div className="weather__city">{props.weatherData.location}</div>
        <div className="weather__temp">{props.weatherData.temp} °C</div>
      </div>
      <div className="weather__row">
        <div className="weather__wind">
          Wind speed: {props.weatherData.wind}
        </div>
        <div className="weather__feels-like">
          Feels like: {props.weatherData.feelsLike} °C
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
