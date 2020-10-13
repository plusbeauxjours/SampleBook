import * as React from "react";
import { StatusBar } from "react-native";
import vacationData from "../../config/data/vacationData";
import { FlatList } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import GoBack from "../../components/GoBack";

interface IColor {
  color: string;
}

const View = styled.View``;

const BottomCardContainer = styled.View`
  background-color: gold;
  padding: 20px;
  border-radius: 16px;
  margin: 12px;
`;

const Item = styled.View`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  background-color: "rgba(0,0,0,0.05)";
  align-items: center;
  justify-content: center;
`;

const BigText = styled.Text`
  color: #333;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: -1;
  font-weight: 800;
`;

const GreyText = styled.Text`
  color: #444;
  font-size: 11px;
  font-weight: 700;
`;

const IconRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 20px 0;
`;

const IconTouchable = styled.TouchableOpacity`
  padding: 12px;
  align-items: center;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const WhiteText = styled.Text`
  color: white;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: -1;
  font-weight: 800;
`;

const CardContainer = styled.View`
  width: 280px;
  height: 200px;
  margin-right: 12px;
`;

const Card = styled.View<IColor>`
  background-color: ${(props) => props.color};
  flex: 1;
  padding: 12px;
  border-radius: 16px;
`;

const cards = [
  {
    title: "Sunny days",
    color: "turquoise",
  },
  {
    title: "Sand & beach",
    color: "aquamarine",
  },
  {
    title: "Coktails & Party",
    color: "tomato",
  },
  {
    title: "All-inclusive",
    color: "#A531F9",
  },
];

export default ({ navigation }) => {
  return (
    <SafeAreaView>
      <GoBack />
      <StatusBar hidden />
      <FlatList
        data={cards}
        keyExtractor={(item) => item.color}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 12 }}
        snapToInterval={280 + 12}
        decelerationRate="fast"
        renderItem={({ item }) => {
          return (
            <CardContainer>
              <Card color={item.color}>
                <WhiteText>{item.title}</WhiteText>
              </Card>
            </CardContainer>
          );
        }}
      />
      <IconRow>
        {vacationData.map((item) => {
          return (
            <IconTouchable
              key={item.id}
              onPress={() => navigation.push("VacationDetail", { item })}
            >
              <SharedElement id={`item.${item.id}.photo`}>
                <Item>
                  <Image source={{ uri: item.imageUri }} />
                </Item>
              </SharedElement>
            </IconTouchable>
          );
        })}
      </IconRow>
      <BottomCardContainer>
        <View>
          <BigText>+ React Native</BigText>
          <BigText>+ Expo</BigText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <GreyText>@plusbeauxjours</GreyText>
          <GreyText>www.plusbeauxjours.com</GreyText>
        </View>
      </BottomCardContainer>
    </SafeAreaView>
  );
};
