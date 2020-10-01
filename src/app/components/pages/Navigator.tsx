import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInPage from "./SignInPage";

const Stack = createStackNavigator();
const Navigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ログイン" component={SignInPage} />
    </Stack.Navigator>
  );
};

export default Navigator;
