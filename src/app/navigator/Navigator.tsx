import React, {useEffect} from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import CognitoAuth from 'src/app/backend/Authn';

import SignInPage from 'src/app/components/pages/SignInPage';
import SignUpPage from 'src/app/components/pages/SignUpPage';
import ForgotPasswordPage from 'src/app/components/pages/ForgotPasswordPage';
import ConfirmForgotPasswordPage
  from 'src/app/components/pages/ConfirmForgotPasswordPage';
import ConfirmCodePage from 'src/app/components/pages/ConfirmCodePage';
import SplashScreen from 'src/app/components/pages/SplashScreen';
import HomePage from 'src/app/components/pages/HomePage';
import MfaPage from 'src/app/components/pages/MfaPage';
import {useAuthState,
  useAuthDispatch} from 'src/app/components/molecule/AuthProvider';

export type RootStackParamList = {
  SignUp: { username: string };
  Mfa: { phoneNumber: string };
  ForgotPassword: { username: string };
};

const Stack = createStackNavigator();
const Navigator: React.FC = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  // 初期起動時の認証状態を元に、遷移先を決める
  useEffect( () => {
    async function isAuthorized() {
      if (await CognitoAuth.currentSession()) {
        dispatch({type: 'COMPLETE_LOGIN', token: 'dummy-token'});
      } else {
        dispatch({type: 'COMPLETE_LOGOUT'});
      }
    }
    isAuthorized();
  }, [dispatch]);


  if (state.status === 'Loading') {
    return <SplashScreen />;
  } else if (state.status === 'Authenticated') {
    return <HomePage />;
  } else {
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
          name="ForgotPassword"
          component={ForgotPasswordPage}
          options={{title: 'アカウントを探す'}}
        />
        <Stack.Screen
          name="ConfirmForgotPassword"
          component={ConfirmForgotPasswordPage}
          options={{title: 'パスワード再設定'}}
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
  }
};

export default Navigator;
