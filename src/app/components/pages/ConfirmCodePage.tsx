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
} from "react-native";
import CognitoAuth from "../../backend/Authn";

// Stack Navigation
interface Props {
  navigation: any;
}

const SignInPage: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [confirmCode, setConfirmCode] = useState<string>("");
  const signIn = () => {
    //new CognitoAuth().signIn(username, password);
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
          <Text>Confirmation Screen</Text>
          <Text>ユーザ名:</Text>

          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            value={confirmCode}
            onChangeText={(input) => setConfirmCode(input)}
            placeholder="確認コード"
            returnKeyType="done"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Button title="確認" onPress={signIn} />
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
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});
