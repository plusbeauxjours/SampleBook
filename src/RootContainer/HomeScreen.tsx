import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity`
  margin: 10px 0;
`;
const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();
  return (
    <View>
      <Touchable onPress={() => navigation.navigate("FlipAnimations")}>
        <Text>FlipAnimations</Text>
      </Touchable>
      <Touchable onPress={() => navigation.navigate("Example")}>
        <Text>Example</Text>
      </Touchable>
      <Touchable onPress={() => navigation.navigate("JellyScroll")}>
        <Text>JellyScroll</Text>
      </Touchable>
    </View>
  );
};
