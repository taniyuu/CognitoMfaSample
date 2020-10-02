import Auth from "@aws-amplify/auth";
import { SignUpParams } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Config as AppConfig } from "react-native-config";

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
    let hoge;
    try {
      const user = await Auth.signIn(username, password);

      // FIXME 以下のロジックは、Controller層で分岐して、画面遷移に利用できるようにすべき?
      const authUser: CognitoUser = user;
      const userSession = authUser.getSignInUserSession();
      if (userSession) {
        // ログイン成功
        console.log("AccessToken", userSession.getAccessToken());
        console.log("IdToken", userSession.getIdToken());
        console.log("RefleshToken", userSession.getRefreshToken());
      } else if (user.challengeName) {
        // チャレンジ(MFA)
        // console.log("USER", user);
        console.log("SESSION", user.Session);
        console.log("challengeName", user.challengeName);
        const { CODE_DELIVERY_DESTINATION: phoneNumber } = user.challengeParam;
        console.log("DESTINATION", phoneNumber);
      } else {
        // それ以外の場合は想定外なのでエラー
        throw Error;
      }
      hoge = user;
    } catch (err) {
      // ログイン失敗時など
      console.log("Err: ", err);
    }
    return hoge;
  }
  async signUp(form: SignUpForm) {
    console.log(Auth.configure());
    const japanesePhoneNumberPrefix = "+81";
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
    try {
      const result = await Auth.signUp(params);
      console.log(result);
    } catch (err) {
      // ログイン失敗時など
      console.log("Err: ", err);
    }
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
