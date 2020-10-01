import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./SignIn";

const Stack = createStackNavigator();
const Navigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ログイン" component={SignIn} />
    </Stack.Navigator>
  );
};

export default Navigator;
