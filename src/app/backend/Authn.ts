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
    console.log(Auth.configure());
    let hoge;
    try {
      const user = await Auth.signIn(username, password);
      console.log("USER", user);
      hoge = user;
    } catch (err) {
      console.log("Err: ", err);
    }
    return hoge;
  }
}
export default CognitoAuth;
