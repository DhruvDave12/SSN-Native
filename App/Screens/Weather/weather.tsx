import React from "react";
import {View,Text} from "react-native";

import IonIcon from "react-native-vector-icons/Ionicons"
const Weather = () => {
    return (
        <View>
        <Text>Weather</Text>
        <IonIcon name="rainy-sharp" size={20} color={"blue"} />
        </View>
    );
}

export default Weather;