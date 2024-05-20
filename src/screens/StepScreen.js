import React from "react";
import {Image, StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import {theme} from "../../theme/themeStyle";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";


const StepScreen = ({navigation}) => {
    return (
        <View className={"flex justify-center mt-56"}>
            <View className={"items-center"}>
                <Image source={require("../../assets/weather-app_7133364.png")} className={"w-32 h-24"}/>
                <Text className={"mt-10 text-5xl font-medium"}>
                    Weather App
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                //style={{backgroundColor: theme.bgWhite(0.1)}}
                className="items-center rounded-full p-3 m-1 border-2 border-black bg-gray-100"
            >
                <Text className={"text-2xl text-gray-950"}>
                    Get started
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default StepScreen;