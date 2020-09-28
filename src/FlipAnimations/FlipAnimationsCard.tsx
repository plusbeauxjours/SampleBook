import React from "react";
import {
  ImageSourcePropType,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import Animated, {
  interpolate,
  cond,
  concat,
  and,
  greaterOrEq,
  lessThan,
} from "react-native-reanimated";
import styled from "styled-components/native";

interface IProps {
  front: ImageSourcePropType;
  back: ImageSourcePropType;
  x: Animated.Value<any>;
}

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 306px;
`;

const Image = styled.Image``;

const FlipAnimationsCard: React.FC<IProps> = ({ front, back, x }) => {
  const { width } = Dimensions.get("window");
  const perspective = Platform.OS === "ios" ? 1000 : undefined;
  const rotateYAsDeg = interpolate(x, {
    inputRange: [0, width],
    outputRange: [0, 180],
  });
  const rotateY = concat(rotateYAsDeg, "deg");
  const opacity =
    Platform.OS === "android"
      ? cond(
          and(greaterOrEq(rotateYAsDeg, -90), lessThan(rotateYAsDeg, 90)),
          1,
          0
        )
      : 1;
  const backOpacity = Platform.OS === "android" ? cond(opacity, 0, 1) : 1;

  return (
    <View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          opacity: backOpacity,
          backfaceVisibility: "hidden",
          transform: [{ perspective }, { rotateY: "180deg" }, { rotateY }],
        }}
      >
        <Image source={front} style={{ ...StyleSheet.absoluteFillObject }} />
      </Animated.View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backfaceVisibility: "hidden",
          transform: [{ perspective }, { rotateY }],
        }}
      >
        <Image source={back} style={{ ...StyleSheet.absoluteFillObject }} />
      </Animated.View>
    </View>
  );
};

export default FlipAnimationsCard;
