import React, {useState, useEffect} from 'react';
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
  Dimensions, Alert,
} from 'react-native';
import CognitoAuth from 'src/app/backend/Authn';
import Authn from 'src/app/backend/Authn';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'src/app/navigator/Navigator';

// Stack Navigation
type UpdateAttributePageRouteProp
= RouteProp<RootStackParamList, 'UpdateAttribute'>;
interface Props {
  route: UpdateAttributePageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

export const UpdateAttributePage: React.FC<Props> = ({
  route,
  navigation: {navigate},
}: Props) => {
  const [alterValue, setAlterValue] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const {attrKey} = route.params;
  const requestForUpdateAttribute = async () => {
    try {
      const username =await Authn.updateAttribute(attrKey, alterValue);
      if (username) {
        // ページ遷移
        navigate('ConfirmUpdatedAttribute',
            {username:attrKey, alterValue}); // 型が適当
      } else {
        // TODO 変更属性は今のところ確認必須
        // Alert.alert('変更完了', 'トップ画面に戻ります。', [
        //   {onPress: () => dispatch(StackActions.popToTop())},
        // ]);
      }
    } catch (err) {
      // 失敗時など
      Alert.alert('送信失敗', `${JSON.stringify(err)}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const attribute=await CognitoAuth.getAttributeValue(attrKey)||'';
        setCurrentValue(attribute);
      } catch (err) {
        if (err.code==='NotAuthorizedException') {
        // 失敗時など
          Alert.alert('送信失敗', `${JSON.stringify(err)}`);
        }
      }
    })();
  }, [attrKey]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
          <Text>現在の値: {currentValue}</Text>

          <TextInput
            style={styles.formControl}
            keyboardType={
              attrKey==='phone_number' ? 'number-pad':'email-address'}
            value={alterValue}
            onChangeText={(input) => setAlterValue(input)}
            placeholder="更新後の値"
            placeholderTextColor="gray"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <Button title="確認" onPress={requestForUpdateAttribute} />
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
