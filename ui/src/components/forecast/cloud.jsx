import React, {Component} from "react";
import WeatherIcon from 'react-icons-weather';

class Cloud extends Component {
    showDescription(temperature) {
        if (temperature > 10) {
            return "Fierce mild"
        } else if (temperature > 5) {
            return "Grand, but bring a jacket"
        } else {
            return "It's fucking shite outside"
        }
    }

    render() {
        const {temperature, city} = this.props;
        return (
            <div>
                <WeatherIcon name="owm" iconId={this.props.iconId}/>
                <h1>It's {temperature}&deg;C in {city}</h1>
                <h3>"{this.showDescription(temperature)}"</h3>
            </div>
        );
    }
}

export default Cloud;
