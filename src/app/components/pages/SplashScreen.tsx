import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={{flex: 1, alignItems: 'center',
      justifyContent: 'center'}}>
      <Text>Hello World</Text>
      <Text>Splash Screen</Text>
    </View>
  );
};
export default SplashScreen;
