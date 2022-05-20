import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Loader from "./components/Loader/Loader";

class App extends Component {
  state = {
    latitude: false,
    longitude: false,
    location: false,
    temp: "",
    feelsLike: "",
    description: "",
    wind: "",
    loading: false,
    showWeather: false,
  };

  nameBTNloupeSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
    >
      <path
        fill="#616161"
        d="M34.6 28.1H38.6V45.1H34.6z"
        transform="rotate(-45.001 36.586 36.587)"
      />
      <path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z" />
      <path
        fill="#37474F"
        d="M36.2 32.1H40.2V44.400000000000006H36.2z"
        transform="rotate(-45.001 38.24 38.24)"
      />
      <path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z" />
      <path
        fill="#BBDEFB"
        d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"
      />
    </svg>
  );
  nameBTNGetWeather5Days = "Get Weather on 5 days";

  getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("geolocation not supported");
    }
  };

  componentDidMount() {
    this.getGeolocation();
    setTimeout(this.loadWeather, 500);
  }

  loadWeather = async () => {
    let link;
    if (this.state.latitude && this.state.longitude) {
      link = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.latitude}&lon=${this.state.longitude}&appid=0de8b1edf343138974b14fca3016d029`;
    } else if (this.state.location) {
      link = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${this.state.location}&appid=0de8b1edf343138974b14fca3016d029`;
    } else {
      return;
    }

    console.log("start response");

    this.setState({
      loading: true,
    });
    console.log(link);
    const response = await fetch(link, {
      method: "GET",
    });
    const result = await response.json();

    if (response.ok) {
      this.setState({
        location: result.name,
        temp: Math.round(result.main.temp),
        feelsLike: Math.round(result.main.feels_like),
        description: "",
        wind: Math.round(result.wind.speed),
        loading: false,
        showWeather: true,
      });
    } else {
      console.log("error message");
    }
  };

  handleInput = (e) => {
    if (e.target.value) {
      this.setState({
        location: e.target.value.trim(),
        latitude: false,
        longitude: false,
      });
    }
    if (e.keyCode === 13) {
      this.loadWeather();
      e.target.value = "";
    }
  };

  render() {
    return (
      <div>
        <div className="App">
          <div className="App__row">
            <Input getInput={this.handleInput} />
            <Button
              nameBTN={this.nameBTNloupeSVG}
              getWeather={this.loadWeather}
              getInput={this.handleInput}
            />
          </div>

          {this.state.showWeather ? (
            <WeatherInfo weatherData={this.state} />
          ) : null}
          <Button
            nameBTN={this.nameBTNGetWeather5Days}
            getWeather={this.loadWeather}
          />
          {this.state.loading ? <Loader /> : null}
        </div>
      </div>
    );
  }
}

export default App;
