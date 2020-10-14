import Auth from '@aws-amplify/auth';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types';
import {Config as AppConfig} from 'react-native-config';
import {CognitoUser} from 'amazon-cognito-identity-js';

const awsConfigMain = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: AppConfig.COGNITO_USERPOOL_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: AppConfig.COGNITO_USERPOOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: AppConfig.COGNITO_USERPOOL_CLIENT_ID,
  },
};
const awsConfigSub = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: AppConfig.COGNITO_USERPOOL_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: AppConfig.COGNITO_USERPOOL_ID_SUB,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: AppConfig.COGNITO_USERPOOL_CLIENT_ID_SUB,
  },
};

class CognitoAuth {
  /** 現在のユーザセッション
   *
   * ※ 認証途中のユーザセッションを複数画面で引き継ぐ場合に利用する
  */
  userSession: CognitoUser | undefined;
  constructor() {
    this.userSession=undefined;
  }
  getAuthConfig(isSub=false) {
    if (isSub) {
      return awsConfigSub;
    } else {
      return awsConfigMain;
    }
  }

  async signIn(username: string, password: string) {
    Auth.configure(this.getAuthConfig());
    console.log('SIGNIN', Auth.configure());
    const user = await Auth.signIn(username, password);
    // 現在のユーザセッションを保持
    this.userSession = user as CognitoUser;
    return user;
  }

  async signOut() {
    // ローカルサインアウト。グローバルサインアウトの場合はオプションをつける
    Auth.configure(this.getAuthConfig());
    await Auth.signOut();
    this.userSession=undefined;
  }

  async signUp(form: SignUpForm) {
    Auth.configure(this.getAuthConfig());
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

  async confirmSignUp(username: string, code: string, isSub=false) {
    Auth.configure(this.getAuthConfig(isSub));
    const result = await Auth.confirmSignUp(username, code);
    console.log(result);
  }

  // 現在のセッション情報を確認します
  async currentSession() {
    try {
      Auth.configure(this.getAuthConfig());
      const user:CognitoUser = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.debug('Error in currentSession:', error);
    }
  }

  async getAttributeValue(attributeName:string) {
    const user = await this.currentSession();
    if (user) {
      Auth.configure(this.getAuthConfig());
      const userAttributes = await Auth.userAttributes(user);
      return userAttributes
          .find((userAttribute)=>userAttribute.getName()===attributeName)
          ?.getValue();
    }
  }

  async updateAttribute(name:string, value:string) {
    const conditionList=['email'];
    const user = await this.currentSession();
    const obj = {
      [name]: value,
    };

    if (conditionList.find((condition)=>condition===name)) {
      // 一定条件の場合、別のユーザプールに入れる
      const username=user?.getUsername();
      const sub=await this.getAttributeValue('sub');

      if (!username||!sub) {
        // 想定外
        throw Error();
      }
      Auth.configure(this.getAuthConfig(true));
      console.log(Auth.configure());
      const params: SignUpParams = {
        username,
        password: sub,
        attributes: obj,
      };
      await Auth.signUp(params);
      return username;
    } else {
      Auth.configure(this.getAuthConfig());
      const result = await Auth.updateUserAttributes(user, obj);
      console.log(result);
    }
  }

  // サインアップ時の確認コードを再送します
  async resendConfirmationCode(username: string) {
    Auth.configure(this.getAuthConfig());
    await Auth.resendSignUp(username);
  }

  async respondToAuthChallenge( code: string) {
    Auth.configure(this.getAuthConfig());
    const result = await Auth.confirmSignIn(this.userSession, code, 'SMS_MFA');
    console.log('SMS_MFA_RESULT', result);
  }
  async forgotPassword( username: string) {
    Auth.configure(this.getAuthConfig());
    const result = await Auth.forgotPassword(username);
    console.log('FORGOT_PASSWORD', result);
  }

  async confirmForgotPassword(username: string, code:string, password: string) {
    Auth.configure(this.getAuthConfig());
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
