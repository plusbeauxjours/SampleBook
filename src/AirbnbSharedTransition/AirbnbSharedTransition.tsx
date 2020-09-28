import React from "react";
import styeld from "styled-components/native";

interface IProps {
  front: string;
  back: string;
}

const View = styeld.View``;
const Text = styeld.Text``;

const AirbnbSharedTransition: React.FC<IProps> = ({ front, back }) => {
  return (
    <View>
      <Text>AirbnbSharedTransition</Text>
    </View>
  );
};

export default AirbnbSharedTransition;
