import React, { useRef, useEffect } from "react";
import { Dimensions, Animated } from "react-native";
import data from "../../config/data/vacationData";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { SIZE, SPACING } from "../../config/theme";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const { width } = Dimensions.get("window");

const View = styled.View`
  padding: 12px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const StyledView = styled.View`
  flex-direction: row;
  margin-left: 160px;
  flex-wrap: nowrap;
  align-self: flex-start;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  font-size: 10px;
`;

const VacationDetail = ({ route: { params } }) => {
  const { item } = params;
  const navigation = useNavigation();
  const selectedItemIndex = data.findIndex((x) => x.id === item.id);
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const animatedValue = useRef(new Animated.Value(selectedItemIndex)).current;
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const ref = useRef(null);

  const animation = (toValue, delay = 0) =>
    Animated.timing(mountedAnimated, {
      toValue,
      delay,
      duration: 400,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animatedValue, {
        toValue: activeIndex,
        useNativeDriver: true,
      }),
      animation(1, 400),
    ]).start();
  }, [item]);

  const s = SIZE + 14 * 2;
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -s, -s * 2],
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  const translateXIcon = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatedAntDesign
        name="arrowleft"
        size={24}
        style={{
          padding: 12,
          opacity: mountedAnimated,
          transform: [
            {
              translateX: translateXIcon,
            },
          ],
        }}
        color="#333"
        onPress={() => {
          animation(0).start();
          navigation.goBack();
        }}
      />
      <StyledView as={Animated.View} style={{ transform: [{ translateX }] }}>
        {data.map((item, index) => {
          const opacity = animatedValue.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const scale = animatedValue.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [1, 1.2, 1],
            extrapolate: "clamp",
          });
          return (
            <TouchableOpacity
              key={item.id}
              style={{ padding: 14, alignItems: "center" }}
              onPress={() => {
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
            >
              <SharedElement id={`item.${item.id}.photo`}>
                <Animated.View
                  style={{
                    height: SIZE,
                    opacity,
                    marginBottom: 4,
                    width: SIZE,
                    borderRadius: SIZE / 2,
                    backgroundColor: "rgba(0,0,0,0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image source={{ uri: item.imageUri }} />
                </Animated.View>
              </SharedElement>
              <StyledText
                as={Animated.Text}
                style={{ opacity, transform: [{ scale }] }}
              >
                {item.title}
              </StyledText>
            </TouchableOpacity>
          );
        })}
      </StyledView>
      <Animated.FlatList
        style={{ opacity: mountedAnimated, transform: [{ translateY }] }}
        ref={ref}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const index = Math.floor(ev.nativeEvent.contentOffset.x / width);
          activeIndex.setValue(index);
        }}
        renderItem={({ item }) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: SIZE / 4,
              }}
            >
              <View>
                <Text>{Array(50).fill(`${item.title} inner text \n`)}</Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

VacationDetail.sharedElements = () => {
  return data.map((i) => ({
    id: `item.${i.id}.photo`,
    align: "center-bottom",
  }));
};

export default VacationDetail;
