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
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp, StackActions} from '@react-navigation/native';
import {RootStackParamList} from 'src/app/navigator/Navigator';

// Stack Navigation
type ConfirmationPageRouteProp =
RouteProp<RootStackParamList, 'ForgotPassword'>;
interface Props {
  route: ConfirmationPageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

export const ConfirmForgotPasswordPage: React.FC<Props> =
({route, navigation: {dispatch}}: Props) => {
  const {username} = route.params;
  const [confirmCode, setConfirmCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // FIXME マスキングが同じ変数を参照しているので、分離してください。
  const [secure, setSecure] = useState<boolean>(true);

  const confirmForgotPassword = async () => {
    try {
      await CognitoAuth
          .confirmForgotPassword(username, confirmCode, password);
      Alert.alert('再設定完了', 'ログイン画面に戻ります。', [
        {onPress: () => dispatch(StackActions.popToTop())},
      ]);
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
          <Text>{username}さん</Text>
          <Text>検証コードを送信しました。</Text>
          <View style={styles.formControl}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="gray"
              keyboardType="ascii-capable"
              value={confirmCode}
              onChangeText={(input) => setConfirmCode(input)}
              placeholder="検証コード"
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
          <View style={styles.formControl}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="gray"
              keyboardType="ascii-capable"
              value={password}
              onChangeText={(input) => setPassword(input)}
              placeholder="新しいパスワード"
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
          <Button title="再設定する" onPress={confirmForgotPassword} />
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

  eyeIcon: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    padding: 8,
  },
});
