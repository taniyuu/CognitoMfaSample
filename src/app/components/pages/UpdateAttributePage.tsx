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
  Alert,
  Dimensions,
} from 'react-native';
import CognitoAuth from 'src/app/backend/Authn';
import {RouteProp, StackActions} from '@react-navigation/native';
import {RootStackParamList} from 'src/app/navigator/Navigator';
import Authn from 'src/app/backend/Authn';

// Stack Navigation
// type ConfirmCodePageRouteProp = RouteProp<RootStackParamList, 'SignUp'>;
interface Props {
  // route: ConfirmCodePageRouteProp;
  navigation: any;
}

const {width} = Dimensions.get('window'); // get window size

export const UpdateAttributePage: React.FC<Props> = ({
  navigation: {dispatch},
}: Props) => {
  const [alterValue, setAlterValue] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const attrKey='email';
  const updateAttribute = async () => {
    await Authn.updateAttribute(attrKey, alterValue);
  };

  useEffect(() => {
    async function fetchData() {
      const attribute=await CognitoAuth.getAttributeValue(attrKey)||'';
      setCurrentValue(attribute);
    }
    fetchData();
  }, []);

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
            keyboardType="number-pad"
            value={alterValue}
            onChangeText={(input) => setAlterValue(input)}
            placeholder="更新後の値"
            placeholderTextColor="gray"
            returnKeyType="done"
            autoCapitalize="none"
          />
          <Button title="確認" onPress={updateAttribute} />
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
