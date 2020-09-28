import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("FlipAnimations");
  };

  return (
    <View>
      <Touchable onPress={() => onPress()}>
        <Text>FlipAnimations</Text>
      </Touchable>
    </View>
  );
};
