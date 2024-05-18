import React, {useCallback, useState} from "react";
import { View, Text, SafeAreaView, TextInput, ScrollView} from "react-native";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { theme } from "../../theme/themeStyle";
import { debounce } from "lodash";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline"
import {MapPinIcon} from "react-native-heroicons/solid"
import {CalendarDaysIcon} from "react-native-heroicons/solid"
import { fetchWeatherForecast, fetchWeatherLocations } from "../components/api/meteo";
import CONFIG from "../configs/config";



export default function HomeScreen(){
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({})

    const handleLocation = (loc) =>{
        console.log('location ', loc);
        setLocations([]);
        toggleSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: CONFIG.DAY
        }).then(data =>{
            setWeather(data);
            console.log("got forecast: ",data)
        })
    }

    const handleSearch = value => {
        console.log('value: ',value);

        if (value.length > 2){
            fetchWeatherLocations({cityName: value}).then(data =>{
                setLocations(data);
                console.log("get locaitons: ", data);
            })
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])
    const {current, location} = weather;
    const [date, hours] = location?.localtime? location?.localtime.split(" "):""

    return (
        <View className="flex-1 relative">
            <StatusBar style="light"/>
            <Image blurRadius={70} source={require('../../assets/images/bg.png')} className="absolute h-full w-full" />
            <SafeAreaView className="flex flex-1">
                {/* Search Section*/}
                <View style={{height: '7%'}} className="mt-10 mx-4 relative z-50">
                    <View className="flex-row justify-end items-center rounded-full"
                    style={{backgroundColor: showSearch?  theme.bgWhite(0.1): 'transparent'}}>
                    {
                        showSearch? (
                            <TextInput 
                            onChangeText={handleSearch}
                            placeholder='Recherche Ville'
                            placeholderTextColor={'lightgray'}
                            className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                            />
                        ):null
                    }
                        
                        <TouchableOpacity 
                        onPress={()=>toggleSearch(!showSearch)} 
                        style={{backgroundColor: theme.bgWhite(0.1)}} 
                        className="rounded-full p-3 m-1"
                        >
                        <MagnifyingGlassIcon size={"25"} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    {
                        locations.length>0 && showSearch?(
                            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                                {
                                    locations.map((locat,index) => {
                                        let showBorder = index +1 != locations.length;
                                        let borderClass = showBorder? "border-b-2 border-b-gray-400": "";
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handleLocation(locat)}
                                                key={index} 
                                                className={"flex-row items-center border-0 p-3 px-4 mb-1 "+borderClass}>
                                                <MapPinIcon size={"20"}color={"gray"}/>
                                                <Text className="text-black text-lg ml-2">{locat?.name}, {locat?.country}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ):null
                    }
                </View>
                {/* forecast section*/}
                <View className="mx-4 flex justify-around flex-1 mb-5">
                    <ScrollView 
                        contentContainerStyle={{paddingVertical: 50}}
                        showsVerticalScrollIndicator={false}>
                    <Text className="text-white text-center text-2xl font-bold">
                    {location?.name===undefined ? "":location?.name+", "}
                        <Text className="text-lg font-semibold text-gray-300">
                        {location?.country===undefined ? "":" "+location?.country}
                        </Text>
                    </Text>
                    {/** weather image*/}
                    <View className="flex-row justify-center">
                        <Image
                          source={{ uri: "https:"+current?.condition.icon}}
                          className="w-52 h-52"/>
                    </View>
                    {/* degre celcius */}
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            {current?.temp_c} {current?.temp_c? "°":""}
                        </Text>
                        <Text className="text-center text-white text-xl ml-5 tracking-widest">
                            {current?.condition?.text}
                        </Text>
                    </View>
                    {/* other state */}
                    </ScrollView>
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require("../../assets/icons/wind.png")} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                {current?.wind_kph}km
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require("../../assets/icons/drop.png")} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                {current?.humidity}%
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require("../../assets/icons/sun.png")} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                {hours}
                            </Text>
                        </View>
                    </View>

                </View>
                {/* forecast for next day */}
                <View className="mb-2 space-y-3">
                    <View className="flex-row items-center mx-5 space-x-2">
                        <CalendarDaysIcon size={"22"} color={"white"}/>
                        <Text className="text-white text-base">
                            Daily forecast
                        </Text>
                    </View>
                    <ScrollView 
                        horizontal 
                        contentContainerStyle={{paddingHorizontal: 15}}
                        showsHorizontalScrollIndicator={false}
                     >
                     {
                        weather?.forecast?.forecastday?.map((item,index) =>{
                            let date = new Date(item.date)
                            let options = {weekday: 'long'};
                            let dayName = date.toLocaleDateString('en-US', options);
                            dayName = dayName.split(',')[0];

                            return (
                                <View key={index}
                                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                style={{backgroundColor: theme.bgWhite(0.15)}}>
                                    <Image source={{ uri: "https:"+item?.day?.condition.icon}} className="h-11 w-11" />
                                    <Text className="text-white">{dayName}</Text>
                                    <Text className="text-white text-xl font-semibold">{item?.day?.avgtemp_c}&#176;</Text>
                             </View>
                            )
                        })
                     }
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}