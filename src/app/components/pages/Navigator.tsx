import React from "react";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

type RootStackParamList = {
  SignIn: undefined;
  //Profile: { userId: string };
  //Feed: { sort: "latest" | "top" } | undefined;
};

const Stack = createStackNavigator();
const Navigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ログイン">
      <Stack.Screen name="ログイン" component={SignInPage} />
      <Stack.Screen name="新規登録" component={SignUpPage} />
    </Stack.Navigator>
  );
};

export default Navigator;
