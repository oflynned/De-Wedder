import axios from "axios";

const {REACT_APP_API_KEY} = process.env;

export const fetchWeatherAPI = async (lat, lng) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lng}&units=metric&appid=${REACT_APP_API_KEY}`;
    const {data, status} = await axios.get(url);
    if (status !== 200) {
        throw new Error(data)
    }

    return data;
};
