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
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/app/navigator/Navigator';
import CognitoAuth, {SignUpForm} from 'src/app/backend/Authn';

// Stack Navigation
interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
}

const {width} = Dimensions.get('window'); // get window size

export const SignUpPage:
React.FC<Props> = ({navigation: {navigate}}: Props) => {
  const [form, setForm] = useState<SignUpForm>({
    username: '',
    familyName: '',
    givenName: '',
    password: '',
    phone: '',
    email: '',
  });
  const signUp = async () => {
    try {
      await CognitoAuth.signUp(form);
      navigate('ConfirmCode', {username: form.username}); // 型が適当
    } catch (err) {
      // 失敗時など
      Alert.alert('登録失敗', `${JSON.stringify(err)}`);
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
          <Text>SignUp Screen</Text>
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            placeholderTextColor="gray"
            value={form.username}
            onChangeText={(username) =>
              setForm((state) => ({...state, username}))
            }
            placeholder="ユーザID"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            placeholderTextColor="gray"
            value={form.familyName}
            onChangeText={(familyName) =>
              setForm((state) => ({...state, familyName}))
            }
            placeholder="姓"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="default"
            placeholderTextColor="gray"
            value={form.givenName}
            onChangeText={(givenName) =>
              setForm((state) => ({...state, givenName}))
            }
            placeholder="名"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="ascii-capable"
            placeholderTextColor="gray"
            value={form.password}
            onChangeText={(password) =>
              setForm((state) => ({...state, password}))
            }
            placeholder="パスワード"
            returnKeyType="done"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.formControl}
            keyboardType="email-address"
            placeholderTextColor="gray"
            value={form.email}
            onChangeText={(email) => setForm((state) => ({...state, email}))}
            placeholder="メールアドレス"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formControl}
            keyboardType="number-pad"
            placeholderTextColor="gray"
            value={form.phone}
            onChangeText={(phone) => setForm((state) => ({...state, phone}))}
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
