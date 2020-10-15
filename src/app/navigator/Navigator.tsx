import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CognitoAuth from 'src/app/backend/Authn';
import {useAuthState,
  useAuthDispatch} from 'src/app/components/molecule/AuthProvider';

import {SignInPage, SignUpPage, SplashScreen,
  MfaPage, HomePage, ConfirmCodePage,
  ForgotPasswordPage,
  ConfirmForgotPasswordPage,
  UpdateAttributePage,
  ConfirmUpdatedAttributePage} from 'src/app/components/pages';

export type RootStackParamList = {
  SignUp: { username: string };
  Mfa: { phoneNumber: string };
  ForgotPassword: { username: string };
  ConfirmUpdatedAttribute: { username: string, alterValue: string }
  UpdateAttribute: { attrKey: string };
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
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'トップ'}}
        />
        <Stack.Screen
          name="UpdateAttribute"
          component={UpdateAttributePage}
          options={{title: '属性変更'}}
        />
        <Stack.Screen
          name="ConfirmUpdatedAttribute"
          component={ConfirmUpdatedAttributePage}
          options={{title: '属性変更の確認'}}
        />
      </Stack.Navigator>);
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
