import { CognitoUser } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Button,
  Alert,
  Dimensions,
} from "react-native";
import CognitoAuth from "../../backend/Authn";
import RNPickerSelect from "react-native-picker-select";
import MyDatePicker from "../molecule/DatePicker";
import Icon from "react-native-vector-icons/Ionicons";

// Stack Navigation
interface Props {
  navigation: any;
}

const { width } = Dimensions.get("window"); //get window size

const SignInPage: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secure, setSecure] = useState<boolean>(true);
  const signIn = async () => {
    try {
      // await new CognitoAuth().currentSession();
      const user = await new CognitoAuth().signIn(username, password);
      const authUser: CognitoUser = user;
      const userSession = authUser.getSignInUserSession();
      if (userSession) {
        // ログイン成功
        Alert.alert("ログイン完了");
        // console.log("AccessToken", userSession.getAccessToken());
        // console.log("IdToken", userSession.getIdToken());
        // console.log("RefleshToken", userSession.getRefreshToken());
      } else if (user.challengeName) {
        // チャレンジ(MFA)
        // console.log("USER", user);
        console.log("SESSION", user.Session);
        console.log("challengeName", user.challengeName);
        const { CODE_DELIVERY_DESTINATION: phoneNumber } = user.challengeParam;
        console.log("DESTINATION", phoneNumber);
        Alert.alert("検証コードを送信", `送信先:${phoneNumber}`);
      } else {
        // それ以外の場合は想定外なのでエラー
        throw Error;
      }
    } catch (err) {
      // ログイン失敗時など
      console.log("Err: ", err);
      Alert.alert("エラー", JSON.stringify(err));
    }
    // Alert.alert(`Simple Button pressed:${username}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Home Screen</Text>
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            value={username}
            onChangeText={(input) => setUsername(input)}
            placeholder="ユーザ名"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <View style={styles.formControl}>
            <TextInput
              style={styles.textInput}
              keyboardType="ascii-capable"
              value={password}
              onChangeText={(input) => setPassword(input)}
              placeholder="パスワード"
              returnKeyType="done"
              autoCapitalize="none"
              secureTextEntry={secure}
            />
            <Icon
              style={styles.eyeIcon}
              name={secure ? "ios-eye-off" : "ios-eye"}
              size={25}
              color="gray"
              onPress={() => setSecure(!secure)}
            />
          </View>
          <Button title="ログイン" onPress={signIn} />
          <Button title="新規登録" onPress={() => navigate("SignUp")} />
          <RNPickerSelect
            doneText={"完了"}
            onValueChange={(value) => console.log(value)}
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
          />

          <MyDatePicker />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formControl: {
    flexDirection: "row",
    height: 40,
    width: width * 0.8,
    padding: 8,
    marginBottom: 8,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    height: 32,
  },

  eyeIcon: {
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
});
