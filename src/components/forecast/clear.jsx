import React, {Component} from "react";
import WeatherIcon from 'react-icons-weather';

class Cloud extends Component {
    render() {
        return (
            <div>
                <WeatherIcon name="owm" iconId={this.props.iconId}/>
                <h1>It's {this.props.temperature}&deg;C in {this.props.city}</h1>
                <h3>"It's a grand clear day"</h3>
            </div>
        );
    }
}

export default Cloud;
