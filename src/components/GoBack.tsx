import * as React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Touchable = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`;
const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();
  return (
    <Touchable onPress={() => navigation.goBack()}>
      <AntDesign
        name="arrowleft"
        style={{ marginRight: 5 }}
        size={22}
        color={"#000"}
      />
      <Text>LIST</Text>
    </Touchable>
  );
};
