import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ImageSourcePropType, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { Asset } from "expo-asset";

import FlipAnimationsCard from "./FlipAnimationsCard";

interface IProps {}

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FlipAnimations: React.FC<IProps> = () => {
  let x;
  const { width } = Dimensions.get("window");
  x = new Animated.Value(0);

  const [front, setFront] = useState<ImageSourcePropType>(null);
  const [back, setBack] = useState<ImageSourcePropType>(null);

  useEffect(() => {
    const init = async () => {
      const front = require("./front.png");
      const back = require("./back.png");
      await Asset.loadAsync([front, back]);
      setFront(front);
      setBack(back);
    };
    init();
  }, []);

  return (
    <View>
      <FlipAnimationsCard front={front} back={back} {...{ x }} />
      <Animated.ScrollView
        style={StyleSheet.absoluteFillObject}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: width * 2 }}
        scrollEventThrottle={1}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { x },
            },
          },
        ])}
      />
    </View>
  );
};

export default FlipAnimations;
