import React from "react";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ConfirmCodePage from "./ConfirmCodePage";

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
      <Stack.Screen name="確認コード入力" component={ConfirmCodePage} />
    </Stack.Navigator>
  );
};

export default Navigator;
