import React from 'react';
import {
  View,
  Text, Button, Alert,
} from 'react-native';
import CognitoAuth from 'src/app/backend/Authn';
import {useAuthDispatch} from 'src/app/components/molecule/AuthProvider';

const HomePage: React.FC = () => {
  const dispatch = useAuthDispatch();
  const signOut = async () => {
    try {
      await new CognitoAuth().signOut();
      dispatch({type: 'COMPLETE_LOGOUT'});
    } catch (err) {
    // ログイン失敗時など
      console.log('Err: ', err);
      Alert.alert('エラー', JSON.stringify(err));
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center',
      justifyContent: 'center'}}>
      <Text>Hello World</Text>
      <Text>Home</Text>
      <Button
        title="ログアウト"
        onPress={signOut}
      />
    </View>
  );
};
export default HomePage;
