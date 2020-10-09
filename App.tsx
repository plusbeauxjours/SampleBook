import "react-native-gesture-handler";
import React from "react";
import { LogBox, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { AppLoading } from "expo";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { SourceSansPro_700Bold } from "@expo-google-fonts/source-sans-pro";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
} from "@expo-google-fonts/playfair-display";

import Detail from "./Screens/Detail";

import NavigationList from "./Screens/NavigationList";
import List from "./src/screens/List";

LogBox.ignoreAllLogs(true);

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    SourceSansPro_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NavigationList"
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen name="NavigationList" component={NavigationList} />
        {navigation.map((item) => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        ))}
        <Stack.Screen name="List" component={List} options={() => options} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
