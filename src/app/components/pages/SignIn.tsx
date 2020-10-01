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
} from "react-native";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          <TextInput
            style={styles.formControl}
            keyboardType="ascii-capable"
            value={password}
            onChangeText={(input) => setPassword(input)}
            placeholder="パスワード"
            returnKeyType="done"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

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
