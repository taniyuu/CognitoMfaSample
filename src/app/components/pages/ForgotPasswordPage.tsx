import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import CognitoAuth from 'src/app/backend/Authn';

// Stack Navigation
interface Props {
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

export const ForgotPasswordPage: React.FC<Props> =
({navigation: {navigate}}: Props) => {
  const [username, setUsername] = useState<string>('');
  const forgotPassword = async () => {
    try {
      await CognitoAuth.forgotPassword(username);
      navigate('ConfirmForgotPassword', {username});
    } catch (err) {
      // ログイン失敗時など
      console.log('Err: ', err);
      Alert.alert('エラー', JSON.stringify(err));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
          <View style={styles.formControl}>
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              value={username}
              onChangeText={(input) => setUsername(input)}
              placeholder="ユーザ名"
              placeholderTextColor="gray"
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>
          <Button title="リセット用のコードを送信する" onPress={forgotPassword} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formControl: {
    flexDirection: 'row',
    height: 40,
    width: width * 0.8,
    marginBottom: 8,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    paddingLeft: 8,
  },
});
