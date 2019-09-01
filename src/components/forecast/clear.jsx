import React, {Component} from "react";
import WeatherIcon from 'react-icons-weather';

class Cloud extends Component {
    showDescription(temperature) {
        if (temperature > 20) {
            return "Hotter than a Mexican wedding"
        } else if (temperature > 15) {
            return "Fierce mild. It's a grand day for drying the clothes"
        } else if (temperature > 10) {
            return "Grand, but you'll need a jacket"
        } else {
            return "Cold as brass monkeys - fuckin' Baltic outside"
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
