import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ImageSourcePropType, StyleSheet, Dimensions } from "react-native";
import Animated, { Value } from "react-native-reanimated";
import { Asset } from "expo-asset";

import Card from "~/FlipAnimations/components/Card";

interface IProps {}

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FlipAnimations: React.FC<IProps> = () => {
  const { width } = Dimensions.get("window");
  let x = new Value(0);

  const [front, setFront] = useState<ImageSourcePropType>();
  const [back, setBack] = useState<ImageSourcePropType>();

  useEffect(() => {
    const init = async () => {
      const front = require("./assets/front.png");
      const back = require("./assets/back.png");
      await Asset.loadAsync([front, back]);
      setFront(front);
      setBack(back);
    };
    init();
  }, []);

  return (
    <View>
      <Card front={front} back={back} {...{ x }} />
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
