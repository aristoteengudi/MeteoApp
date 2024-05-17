import * as React from "react";
import { View, StyleSheet, Text, SafeAreaView, Image} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import NavigationMenu from "./src/navigation/Navigation";

export default function App(){
    return (
        <NavigationMenu/>
    );
};
