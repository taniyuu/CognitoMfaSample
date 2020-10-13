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
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './Navigator';
import {useAuthDispatch} from 'src/app/components/molecule/AuthProvider';

// Stack Navigation
type ConfirmationPageRouteProp = RouteProp<RootStackParamList, 'Mfa'>;
interface Props {
  route: ConfirmationPageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

const MfaPage: React.FC<Props> = ({
  route,
}: Props) => {
  const {phoneNumber} = route.params;
  const [confirmCode, setConfirmCode] = useState<string>('');
  const dispatch = useAuthDispatch();
  const respondToAuthChallenge = async () => {
    try {
      await CognitoAuth.respondToAuthChallenge(confirmCode);
      // ログイン成功
      // FIXME トークンを入れるインタフェースになっているが、不要な気がする
      dispatch({type: 'COMPLETE_LOGIN', token: 'DUMMY'});
    } catch (err) {
      // 失敗時など
      Alert.alert('認証失敗', `${JSON.stringify(err)}`);
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
          <Text>認証コードを送信:{phoneNumber}</Text>

          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            value={confirmCode}
            onChangeText={(input) => setConfirmCode(input)}
            placeholder="認証コード"
            returnKeyType="done"
            autoCapitalize="none"
            secureTextEntry={true}
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
