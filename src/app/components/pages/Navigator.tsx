import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();
const Navigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;

// const styles = StyleSheet.create({
//   icon: {
//     color: "black",
//   },
// });
