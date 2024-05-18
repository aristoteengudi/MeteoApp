import axios from "axios";
import CONFIG from "../../configs/config";
import {runSendSMS} from "./infobip";

// WeatherApi EndPoint
const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${CONFIG.API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=${CONFIG.API_KEY}&q=${params.cityName}`;

// Call to Api Endpoint and do de query
const apiCall = async (endpoint) =>{
    const options = {
        method: "GET",
        url: endpoint
    }

    try{
        const responses = await axios.request(options);
        return responses.data;     
    }catch(exception){
        await runSendSMS(exception)
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