import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';

import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ConfirmCodePage from './ConfirmCodePage';

export type RootStackParamList = {
  SignUp: { username: string };
};

const Stack = createStackNavigator();
const Navigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInPage}
        options={{title: 'ログイン'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{title: '新規登録'}}
      />
      <Stack.Screen
        name="ConfirmCode"
        component={ConfirmCodePage}
        options={{title: '確認コード入力'}}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
