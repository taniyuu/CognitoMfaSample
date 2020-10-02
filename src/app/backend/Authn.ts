import Auth from "@aws-amplify/auth";
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
      const {
        signInUserSession,
        challengeName,
        Session: session,
        challengeParam,
      } = user;
      if (signInUserSession) {
        const { accessToken, idToken, refreshToken } = signInUserSession;
        console.log("AccessToken", accessToken.jwtToken);
        console.log("IdToken", idToken.jwtToken);
        console.log("RefleshToken", refreshToken.token);
      } else if (challengeName) {
        console.log("USER", user);
        console.log("SESSION", session);
        console.log("challengeName", challengeName);
        const { CODE_DELIVERY_DESTINATION: phoneNumber } = challengeParam;
        console.log("DESTINATION", phoneNumber);
      } else {
        throw Error;
      }

      hoge = user;
    } catch (err) {
      console.log("Err: ", err);
    }
    return hoge;
  }
}
export default CognitoAuth;
