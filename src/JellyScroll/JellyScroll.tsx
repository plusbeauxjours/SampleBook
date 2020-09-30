import React from "react";
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

import { Cards, Card } from "~/Components";

const cards = [
  {
    index: 1,
    type: Cards.Card1,
  },
  {
    index: 2,
    type: Cards.Card2,
  },
  {
    index: 3,
    type: Cards.Card3,
  },
  {
    index: 4,
    type: Cards.Card4,
  },
  {
    index: 5,
    type: Cards.Card5,
  },
  {
    index: 7,
    type: Cards.Card6,
  },
];

const JellyScroll = () => {
  const velocity = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event, ctx) => {
    const now = new Date().getTime();
    const { y } = event.contentOffset;
    const dt = now - (ctx?.time ?? 0);
    const dy = y - (ctx?.y ?? 0);
    const v = dy / dt;
    //   velocity.value = dy / dt;
    // ctx.time = now;
    // ctx.y = y;
  });
  return (
    <Animated.ScrollView scrollEventThrottle={1} {...{ onScroll }}>
      {cards.map(({ type }, index) => {
        const style = useAnimatedStyle(() => {
          const skewY = interpolate(
            velocity.value,
            [-5, 0, 5],
            [-Math.PI / 9, 0, Math.PI / 9]
          );
          return {
            transform: [{ skewY }],
          };
        });
        return (
          <Animated.View key={index} style={[styles.card, style]}>
            <Card card={type} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
  },
});

export default JellyScroll;
