import React from 'react';
import {
  View,
  Text, Alert, Dimensions, StyleSheet,
} from 'react-native';
import CognitoAuth from 'src/app/backend/Authn';
import {useAuthDispatch} from 'src/app/components/molecule/AuthProvider';

import RNPickerSelect from 'react-native-picker-select';
import MyDatePicker from 'src/app/components/molecule/DatePicker';
import {ListItem} from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Stack Navigation
interface Props {
  navigation: any;
}
const {width} = Dimensions.get('window'); // get window size

export const HomePage: React.FC<Props> = ({navigation: {navigate}}: Props) => {
  const dispatch = useAuthDispatch();
  const signOut = async () => {
    Alert.alert(
        '確認',
        'ログアウトしますか',
        [
          {
            text: 'はい',
            onPress: async () => {
              // FIXME: onPress内のエラーハンドリングがない
              await CognitoAuth.signOut();
              dispatch({type: 'COMPLETE_LOGOUT'});
            },
            style: 'default',
          },
          {
            text: 'いいえ',
            style: 'cancel',
          },
        ],
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center',
      justifyContent: 'center'}}>
      <Text>Home</Text>
      <View style={styles.listViewParent}>
        <ListItem bottomDivider
          onPress={()=>navigate('UpdateAttribute', {attrKey: 'email'})}>
          <IonIcon name={'ios-mail'} size={24}/>
          <ListItem.Content>
            <ListItem.Title>メールアドレス変更</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider
          onPress={()=>navigate('UpdateAttribute', {attrKey: 'phone_number'})}>
          <FontAwesome name={'phone'} size={24}/>
          <ListItem.Content>
            <ListItem.Title>電話番号変更</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={signOut}>
          <IonIcon name={'ios-exit'} size={24}/>
          <ListItem.Content>
            <ListItem.Title>ログアウト</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

      <RNPickerSelect
        doneText={'完了'}
        onValueChange={(value) => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />

      <MyDatePicker />
    </View>
  );
};
const styles = StyleSheet.create({
  listViewParent: {
    width: width * 0.8,
  },
});
