import Auth from '@aws-amplify/auth';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types';
import {Config as AppConfig} from 'react-native-config';
import {CognitoUser} from 'amazon-cognito-identity-js';

const awsConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: AppConfig.COGNITO_USERPOOL_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: AppConfig.COGNITO_USERPOOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: AppConfig.COGNITO_USERPOOL_CLIENT_ID,
  },
};
Auth.configure(awsConfig);

class CognitoAuth {
  /** 現在のユーザセッション
   *
   * ※ 認証途中のユーザセッションを複数画面で引き継ぐ場合に利用する
  */
  userSession: CognitoUser | undefined;
  constructor() {
    // NOP
  }

  async signIn(username: string, password: string) {
    console.log('SIGNIN', Auth.configure());
    const user = await Auth.signIn(username, password);
    // 現在のユーザセッションを保持
    this.userSession = user as CognitoUser;
    return user;
  }

  async signOut() {
    // ローカルサインアウト。グローバルサインアウトの場合はオプションをつける
    await Auth.signOut();
    this.userSession=undefined;
  }

  async signUp(form: SignUpForm) {
    console.log(Auth.configure());
    const japanesePhoneNumberPrefix = '+81';
    const params: SignUpParams = {
      username: form.username,
      password: form.password,
      attributes: {
        email: form.email,
        phone_number: japanesePhoneNumberPrefix + form.phone.substring(1),
        family_name: form.familyName,
        given_name: form.givenName,
      },
    };
    console.log(params);
    const result = await Auth.signUp(params);
    console.log(result);
  }

  async confirmSignUp(username: string, code: string) {
    const result = await Auth.confirmSignUp(username, code);
    console.log(result);
  }

  // 現在のセッション情報を確認します
  async currentSession() {
    try {
      const user:CognitoUser = await Auth.currentAuthenticatedUser();
      // this.userAttributeList=await Auth.userAttributes(user);
      return user;
    } catch (error) {
      console.log('Error in currentSession:', error);
    }
  }

  async getAttributeValue(attributeName:string) {
    const user = await this.currentSession();
    if (user) {
      const userAttributes = await Auth.userAttributes(user);
      return userAttributes
          .find((userAttribute)=>userAttribute.getName()===attributeName)
          ?.getValue();
    }
  }

  async updateAttribute(name:string, value:string) {
    const user = await this.currentSession();
    const obj = {
      [name]: value,
    };
    const result = await Auth.updateUserAttributes(user, obj);
    console.log(result);
  }

  // サインアップ時の確認コードを再送します
  async resendConfirmationCode(username: string) {
    await Auth.resendSignUp(username);
  }

  async respondToAuthChallenge( code: string) {
    const result = await Auth.confirmSignIn(this.userSession, code, 'SMS_MFA');
    console.log('SMS_MFA_RESULT', result);
  }
  async forgotPassword( username: string) {
    const result = await Auth.forgotPassword(username);
    console.log('FORGOT_PASSWORD', result);
  }

  async confirmForgotPassword(username: string, code:string, password: string) {
    await Auth.forgotPasswordSubmit(username, code, password);
  }
}
export default new CognitoAuth;

export type SignUpForm = {
  username: string;
  familyName: string;
  givenName: string;
  password: string;
  phone: string;
  email: string;
};
