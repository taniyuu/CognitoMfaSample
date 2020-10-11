import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import {CognitoUser} from 'amazon-cognito-identity-js';

import SignInPage from 'src/app/components/pages/SignInPage';
import SignUpPage from 'src/app/components/pages/SignUpPage';
import ConfirmCodePage from 'src/app/components/pages/ConfirmCodePage';
import MfaPage from 'src/app/components/pages/MfaPage';

export type RootStackParamList = {
  SignUp: { username: string };
  Mfa: { phoneNumber: string, user: CognitoUser };
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
      <Stack.Screen
        name="MfaAuthn"
        component={MfaPage}
        options={{title: '認証コード入力'}}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
