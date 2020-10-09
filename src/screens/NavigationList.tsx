import * as React from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import navigation from "../config/navigation";
import { SPACING } from "../config/theme";

const Text = styled.Text`
  font-size: 24px;
`;
const Touchable = styled.TouchableOpacity`
  padding: SPACING;
`;

export default function NavigationList(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <FlatList
        data={navigation}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ flex: 1, justifyContent: "space-evenly" }}
        renderItem={({ item, index }) => {
          return (
            <Touchable onPress={() => props.navigation.push(item.name)}>
              <Text>
                {index + 1}. {item.label}
              </Text>
            </Touchable>
          );
        }}
      />
    </SafeAreaView>
  );
}
