import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import FlipAnimations from "../FlipAnimations/FlipAnimations";
import AirbnbSharedTransition from "../AirbnbSharedTransition/AirbnbSharedTransition";

const RootStack = createStackNavigator();
export default () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName={"HomeScreen"}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="FlipAnimations" component={FlipAnimations} />
      <RootStack.Screen
        name="AirbnbSharedTransition"
        component={AirbnbSharedTransition}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);
