import {CognitoUser} from 'amazon-cognito-identity-js';
import React, {useState} from 'react';
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
} from 'react-native';
import CognitoAuth from 'src/app/backend/Authn';
import {useAuthDispatch} from 'src/app/components/molecule/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';

// Stack Navigation
interface Props {
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

const SignInPage: React.FC<Props> = ({navigation: {navigate}}: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(true);
  const dispatch = useAuthDispatch();
  const signIn = async () => {
    try {
      const user = await CognitoAuth.signIn(username, password);
      const authUser: CognitoUser = user;
      const userSession = authUser.getSignInUserSession();
      if (userSession) {
        // ログイン成功
        // FIXME トークンを入れるインタフェースになっているが、不要な気がする
        dispatch({type: 'COMPLETE_LOGIN', token: 'DUMMY'});
      } else if (user.challengeName && user.challengeName == 'SMS_MFA') {
        // チャレンジ(MFA)
        // console.log("USER", user);
        console.log('SESSION', user.Session);
        console.log('challengeName', user.challengeName);
        const {CODE_DELIVERY_DESTINATION: phoneNumber} = user.challengeParam;
        console.log('DESTINATION', phoneNumber);
        navigate('MfaAuthn', {phoneNumber, authUser});
        // Alert.alert('検証コードを送信', `送信先:${phoneNumber}`);
      } else {
        // それ以外の場合は想定外なのでエラー
        throw Error;
      }
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
          <Text>Home Screen</Text>
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
          <View style={styles.formControl}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="gray"
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
              name={secure ? 'ios-eye-off' : 'ios-eye'}
              size={24}
              color="gray"
              onPress={() => setSecure(!secure)}
            />
          </View>
          <Button title="ログイン" onPress={signIn} />
          <Button title="新規登録" onPress={() => navigate('SignUp')} />
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

  eyeIcon: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    padding: 8,
  },
});
