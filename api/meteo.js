import axios from "axios";
import { apiKey } from "../constants";

const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint) =>{
    const options = {
        method: "GET",
        url: endpoint
    }

    try{
        const responses = await axios.request(options);
        return responses.data;     
    }catch(exception){
        console.log('Exception',exception);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}

export const fetchWeatherLocations = params => {
    return apiCall(locationsEndpoint(params));
}