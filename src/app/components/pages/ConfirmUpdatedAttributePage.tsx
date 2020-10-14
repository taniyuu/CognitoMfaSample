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
type ConfirmUpdatedAttributePageRouteProp
= RouteProp<RootStackParamList, 'ConfirmUpdatedAttribute'>;
interface Props {
  route: ConfirmUpdatedAttributePageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

export const ConfirmUpdatedAttributePage: React.FC<Props> = ({
  route,
  navigation: {dispatch},
}: Props) => {
  const {username, alterValue} = route.params;
  const [confirmCode, setConfirmCode] = useState<string>('');
  const confirmSignUp = async () => {
    try {
      await CognitoAuth.confirmSignUp(username, confirmCode, true);
      Alert.alert('属性更新完了', 'トップ画面に戻ります。', [
        {onPress: () => dispatch(StackActions.popToTop())},
      ]);
    } catch (err) {
      // 失敗時など
      Alert.alert('検証失敗', `${JSON.stringify(err)}`);
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
          <Text>{alterValue} に</Text>
          <Text>検証コードを送信しました</Text>
          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            value={confirmCode}
            onChangeText={(input) => setConfirmCode(input)}
            placeholder="検証コード"
            placeholderTextColor="gray"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <Button title="確認" onPress={confirmSignUp} />
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
