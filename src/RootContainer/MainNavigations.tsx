import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import FlipAnimations from "../FlipAnimations";
import Example from "../Example/Example";
import JellyScroll from "../JellyScroll/JellyScroll";

const RootStack = createStackNavigator();
export default () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName={"HomeScreen"}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="FlipAnimations" component={FlipAnimations} />
      <RootStack.Screen name="Example" component={Example} />
      <RootStack.Screen name="JellyScroll" component={JellyScroll} />
    </RootStack.Navigator>
  </NavigationContainer>
);
