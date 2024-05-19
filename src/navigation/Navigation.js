import 'react-native-gesture-handler';
//import React from "react";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { LogBox, Text, View } from 'react-native';
import StepScreen from "../screens/StepScreen";



const Stack = createStackNavigator();

LogBox.ignoreLogs([
    'Non-serializable value were found in the navigation state',
]);

export default function NavigationMenu() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={StepScreen}>
            <Stack.Screen name="StepScreen" options={{headerShown: false}} component={StepScreen} />
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }