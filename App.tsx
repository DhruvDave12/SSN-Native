import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

import Home from "./App/Screens/Home/home";
import Weather from "./App/Screens/Weather/weather";
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={Home} options={{headerShown:false, tabBarIcon: ({size, color}) => <Icon name="home" color={color} size={size}/>}} />
          <Tab.Screen name="Weather" component={Weather} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;