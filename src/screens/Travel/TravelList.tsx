// Inspiration: https://dribbble.com/shots/7378780-Travel-App-Trip-Detail-Animation

import * as React from "react";
import { StatusBar, Dimensions, Animated, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { SafeAreaView } from "react-native-safe-area-context";

import travelData from "~/config/data/travelData";
import GoBack from "~/components/GoBack";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const ITEM_WIDTH = width * 0.68;
export const SPACING = 20;

const View = styled.View``;
const Title = styled.Text`
  font-weight: 900;
  margin: 20px;
  text-transform: uppercase;
  font-size: 18px;
  margin-bottom: 0;
`;

const NumberContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 134, 151);
`;

const NumberText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  color: white;
  font-weight: 800;
`;

const WhiteText = styled.Text`
  font-size: 9px;
  color: white;
`;

const Touchable = styled.TouchableOpacity`
  width: 300px;
  height: 400px;
  margin: 20px;
  border-radius: 18px;
  overflow: hidden; ;
`;

export default ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView>
      <GoBack />
      <StatusBar hidden />
      <Title>Trips</Title>
      <Animated.FlatList
        data={travelData}
        keyExtractor={(item) => item.key}
        horizontal
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingRight: width - (ITEM_WIDTH + SPACING * 2),
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item, index }) => {
          const s = ITEM_WIDTH + SPACING * 2;
          const inputRange = [(index - 1) * s, index * s, (index + 1) * s];
          const imageScale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.3, 1],
            extrapolate: "clamp",
          });
          const headingTranslateX = scrollX.interpolate({
            inputRange,
            outputRange: [width, 0, -width],
            extrapolate: "clamp",
          });
          return (
            <Touchable
              activeOpacity={0.8}
              onPress={() => navigation.push("TravelDetail", { item })}
            >
              <SharedElement
                id={`item.${item.key}.photo`}
                style={[StyleSheet.absoluteFillObject]}
              >
                <Animated.Image
                  source={{ uri: item.image }}
                  style={{
                    width: 300,
                    height: 400,
                    borderRadius: 18,
                    resizeMode: "cover",
                    transform: [{ scale: imageScale }],
                  }}
                />
              </SharedElement>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { padding: 18, justifyContent: "space-between" },
                ]}
              >
                <SharedElement
                  id={`item.${item.key}.location`}
                  style={{ width: ITEM_WIDTH - SPACING * 2 }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 32,
                      color: "white",
                      fontWeight: "800",
                      letterSpacing: -1,
                      textTransform: "uppercase",
                      transform: [{ translateX: headingTranslateX }],
                    }}
                  >
                    {item.location}
                  </Animated.Text>
                </SharedElement>
                <View>
                  <NumberContainer>
                    <NumberText>{item.numberOfDays}</NumberText>
                    <WhiteText>days</WhiteText>
                  </NumberContainer>
                </View>
              </View>
            </Touchable>
          );
        }}
      />
    </SafeAreaView>
  );
};
