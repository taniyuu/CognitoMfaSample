import Auth from '@aws-amplify/auth';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types';
import {Config as AppConfig} from 'react-native-config';

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
  async signIn(username: string, password: string) {
    console.log('SIGNIN', Auth.configure());
    return await Auth.signIn(username, password);
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
    console.log(Auth.configure());
    const result = await Auth.confirmSignUp(username, code);
    console.log(result);
  }
  // 現在のセッション情報を確認します
  async currentSession() {
    const result = await Auth.currentSession();
    // console.log("Current User", result);
    if (result) {
      console.log('SESSION EXISTS.');
    } else {
      if (result) {
        console.log('SESSION NOT FOUND.');
      }
    }
  }
  // サインアップ時の確認コードを再送します
  async resendConfirmationCode(username: string) {
    await Auth.resendSignUp(username);
  }
}
export default CognitoAuth;

export type SignUpForm = {
  username: string;
  familyName: string;
  givenName: string;
  password: string;
  phone: string;
  email: string;
};
