import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const SignIn = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <TextInput
          style={styles.formControl}
          keyboardType="default"
          value=""
          placeholder="ユーザ名"
          returnKeyType="done"
        />
        <TextInput
          style={styles.formControl}
          keyboardType="ascii-capable"
          value=""
          placeholder="パスワード"
          returnKeyType="done"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});
