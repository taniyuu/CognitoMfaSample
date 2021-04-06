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
import {RouteProp, StackActions} from '@react-navigation/native';
import {RootStackParamList} from 'src/app/navigator/Navigator';

// Stack Navigation
type ConfirmCodePageRouteProp = RouteProp<RootStackParamList, 'ConfirmCode'>;
interface Props {
  route: ConfirmCodePageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

export const ConfirmCodePage: React.FC<Props> = ({
  route,
  navigation: {dispatch},
}: Props) => {
  const {username} = route.params;
  const [confirmCode, setConfirmCode] = useState<string>('');
  const confirmSignUp = async () => {
    try {
      await CognitoAuth.confirmSignUp(username, confirmCode);
      Alert.alert('登録完了', 'ログイン画面に戻ります。', [
        {onPress: () => dispatch(StackActions.popToTop())},
      ]);
    } catch (err) {
      // 失敗時など
      Alert.alert('検証失敗', `${JSON.stringify(err)}`);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      await CognitoAuth.resendConfirmationCode(username);
      Alert.alert('再送しました', '確認してください。');
    } catch (err) {
      // 失敗時など
      Alert.alert('再送失敗', `${JSON.stringify(err)}`);
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
          <Text>Confirmation Screen</Text>
          <Text>ユーザ名:{username}</Text>

          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            value={confirmCode}
            onChangeText={(input) => setConfirmCode(input)}
            placeholder="検証コード"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <Button title="確認" onPress={confirmSignUp} />
          <Button title="再送" onPress={resendConfirmationCode} />
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
    height: 40,
    width: width * 0.8,
    padding: 8,
    marginBottom: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
