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
import {RootStackParamList} from './Navigator';

// Stack Navigation
type ConfirmationPageRouteProp = RouteProp<RootStackParamList, 'Mfa'>;
interface Props {
  route: ConfirmationPageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

const MfaPage: React.FC<Props> = ({
  route,
  navigation: {dispatch},
}: Props) => {
  const {phoneNumber, user} = route.params;
  const [confirmCode, setConfirmCode] = useState<string>('');
  const respondToAuthChallenge = async () => {
    try {
      await new CognitoAuth().respondToAuthChallenge(user, confirmCode);
      // Alert.alert('登録完了', 'ログイン画面に戻ります。', [
      //   {onPress: () => dispatch(StackActions.popToTop())},
      // ]);
    } catch (err) {
      // 失敗時など
      Alert.alert('確認失敗', `${JSON.stringify(err)}`);
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
          <Text>MFA</Text>
          <Text>検証コードを送信:{phoneNumber}</Text>

          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            value={confirmCode}
            onChangeText={(input) => setConfirmCode(input)}
            placeholder="確認コード"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <Button title="確認" onPress={respondToAuthChallenge} />
          {/* <Button title="再送" onPress={resendConfirmationCode} /> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MfaPage;

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
