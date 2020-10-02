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
import CognitoAuth, { SignUpForm } from "../../backend/Authn";

// Stack Navigation
interface Props {
  navigation: any;
}

const SignUpPage: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [form, setForm] = useState<SignUpForm>({
    username: "",
    familyName: "",
    givenName: "",
    password: "",
    phone: "",
    email: "",
  });
  const signUp = async () => {
    try {
      await new CognitoAuth().signUp(form);
      navigate("確認コード入力", { username: form.username }); // 型が適当
    } catch (err) {
      // 失敗時など
      Alert.alert("登録失敗", `${err}`);
    }
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
          <Text>SignUp Screen</Text>
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            value={form.username}
            onChangeText={(username) =>
              setForm((state) => ({ ...state, username }))
            }
            placeholder="ユーザID"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            value={form.familyName}
            onChangeText={(familyName) =>
              setForm((state) => ({ ...state, familyName }))
            }
            placeholder="姓"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            value={form.givenName}
            onChangeText={(givenName) =>
              setForm((state) => ({ ...state, givenName }))
            }
            placeholder="名"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="ascii-capable"
            value={form.password}
            onChangeText={(password) =>
              setForm((state) => ({ ...state, password }))
            }
            placeholder="パスワード"
            returnKeyType="done"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.formControl}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(email) => setForm((state) => ({ ...state, email }))}
            placeholder="メールアドレス"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            value={form.phone}
            onChangeText={(phone) => setForm((state) => ({ ...state, phone }))}
            placeholder="電話番号(日本)"
            returnKeyType="done"
            autoCapitalize="none"
            maxLength={11}
          />
          <Button title="登録" onPress={signUp} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;

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
