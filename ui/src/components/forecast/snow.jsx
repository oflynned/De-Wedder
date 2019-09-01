import React, {Component} from "react";
import WeatherIcon from 'react-icons-weather';

class Snow extends Component {
    render() {
        return (
            <div>
                <WeatherIcon name="owm" iconId={this.props.iconId}/>
                <h1>It's {this.props.temperature}&deg;C in {this.props.city}</h1>
                <h3>"Bitta sneachta"</h3>
            </div>
        );
    }
}

export default Snow;
