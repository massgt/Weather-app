import React from "react";
import "./App.css";
import Weather from "./Components/weather.component.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Form from "./Components/form.component"

const API_key = "3dba347866aa6ad8be824e653057351b";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      celcius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };
    // this.getWeather();

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  getWeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  calCelcius(temp) {
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );
      const response = await api_call.json();
      console.log(response);
  
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        temp_celcius: this.calCelcius(response.main.temp),
        temp_min: this.calCelcius(response.main.temp_min),
        temp_max: this.calCelcius(response.main.temp_max),
        celcius: this.calCelcius(response.main.temp),
        description: response.weather[0].description,
        error: false
      });
  
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
    }else{
      this.setState({error: true});
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <h1>
          <Weather
            city={this.state.city}
            country={this.state.country}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            temp_celcius={this.state.celcius}
            description={this.state.description}
            weatherIcon={this.state.icon}
          />
        </h1>
      </div>
    );
  }
}

export default App;
