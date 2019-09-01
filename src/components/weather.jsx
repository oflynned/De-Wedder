import React, {Component} from "react";

import "./weather.css";

import Rain from "./forecast/rain";
import Cloud from "./forecast/cloud";
import Clear from "./forecast/clear";
import Snow from "./forecast/snow";
import Thunderstorm from "./forecast/thunderstorm";
import Drizzle from "./forecast/drizzle";
import {fetchWeatherAPI} from "../api/api";

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            allowedLocationPermissions: false,
            loading: true,
            conditions: null,
            description: null,
            temperature: null,
            humidity: null,
            iconId: null
        };
    }

    componentDidMount() {
        return new Promise(res => navigator.geolocation.getCurrentPosition(({coords}) => res(coords)))
            .then(({latitude, longitude}) => {
                this.setState({allowedLocationPermissions: true});
                return fetchWeatherAPI(latitude, longitude);
            })
            .then(({weather, main, name}) => {
                const {temp: temperature, humidity} = main;
                const {main: conditions, description, id: iconId} = weather[0];
                this.setState({
                    conditions,
                    description,
                    temperature: Math.round(temperature),
                    humidity,
                    iconId,
                    city: Weather.formatCity(name)
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({loading: false});
            })
    }

    render() {
        const {allowedLocationPermissions} = this.state;
        if (!allowedLocationPermissions) {
            return (
                <div className={"weather"}>
                    <div className={"container"}>
                        Please allow browser location permissions!
                    </div>
                </div>
            );
        }

        let {component, gradient} = this.assignWeather();
        return (
            <div className={"weather"}>
                <div className={`container ${gradient}`}>
                    {component}
                </div>
            </div>
        );
    }

    static formatCity(city) {
        return city.replace("(", "").replace(")", "");
    }

    assignWeather() {
        switch (this.state.conditions) {
            case "Drizzle":
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Ash":
                return {
                    component: <Drizzle temperature={this.state.temperature}
                                        description={this.state.description}
                                        iconId={this.state.iconId}
                                        city={this.state.city}/>,
                    gradient: "gradient-rain"
                };
            case "Squall":
            case "Rain":
                return {
                    component: <Rain temperature={this.state.temperature}
                                     description={this.state.description}
                                     iconId={this.state.iconId}
                                     city={this.state.city}/>,
                    gradient: "gradient-rain"
                };
            case "Tornado":
            case "Thunder":
            case "Thunderstorm":
                return {
                    component: <Thunderstorm temperature={this.state.temperature}
                                             description={this.state.description}
                                             iconId={this.state.iconId}
                                             city={this.state.city}/>,
                    gradient: "gradient-thunderstorm"
                };
            case "Snow":
                return {
                    component: <Snow temperature={this.state.temperature}
                                     description={this.state.description}
                                     iconId={this.state.iconId}
                                     city={this.state.city}/>,
                    gradient: "gradient-snow"
                };
            case "Clear":
                return {
                    component: <Clear temperature={this.state.temperature}
                                      description={this.state.description}
                                      iconId={this.state.iconId}
                                      city={this.state.city}/>,
                    gradient: "gradient-clear"
                };
            case "Clouds":
                return {
                    component: <Cloud temperature={this.state.temperature}
                                      description={this.state.description}
                                      iconId={this.state.iconId}
                                      city={this.state.city}/>,
                    gradient: "gradient-cloudy"
                };
            default:
                return this.state.loading ? <div>Loading...</div> : <div>Unknown weather type!</div>;
        }
    }
}

export default Weather;
