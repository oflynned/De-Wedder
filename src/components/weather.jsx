import React, {Component} from "react";

import {fetchWeatherAPI} from "../api/api";

import "./weather.css";

import Rain from "./forecast/rain";
import Cloud from "./forecast/cloud";

// TODO ask for location permissions
const LONGITUDE = 4.34878, LATITUDE = 50.85045;

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            conditions: null,
            description: null,
            temperature: null,
            humidity: null,
            iconId: null
        };
    }

    componentDidMount() {
        fetchWeatherAPI(LONGITUDE, LATITUDE)
            .then(({weather, main}) => {
                const {temp: temperature, humidity} = main;
                const {main: conditions, description, id: iconId} = weather[0];
                this.setState({
                    conditions,
                    description,
                    temperature: Math.round(temperature - 273.15),
                    humidity,
                    iconId
                });
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        let currentWeather = this.assignWeather();
        return (
            <div className={"weather gradient-cloudy"}>
                <div className={"container"}>
                    {currentWeather}
                </div>
            </div>
        );
    }

    assignWeather() {
        switch (this.state.conditions) {
            case "Thunderstorm":
            case "Drizzle":
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Clear":
            case "Thunder":
            case "Ash":
            case "Squall":
            case "Tornado":
            case "Clouds":
                return <Cloud
                    temperature={this.state.temperature}
                    description={this.state.description}
                    iconId={this.state.iconId}/>;
            case "Rain":
                return <Rain description={this.state.description} iconId={this.state.iconId}/>;
            default:
                return this.state.loading ? <div>Loading...</div> : <div>Unknown weather type!</div>;
        }
    }
}

export default Weather;
