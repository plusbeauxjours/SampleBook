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

import NavigationList from "~/screens/NavigationList";
import VacationDetail from "~/screens/Vacation/VacationDetail";
import VacationList from "~/screens/Vacation/VacationList";

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

export default () => {
  const [fontsLoaded] = useFonts({
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
        <Stack.Screen
          name="VacationList"
          component={VacationList}
          options={() => options}
        />
        <Stack.Screen
          name="VacationDetail"
          component={VacationDetail}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
