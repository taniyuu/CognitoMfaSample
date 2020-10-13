import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from 'src/app/navigator/Navigator';
import AuthProvider from 'src/app/components/molecule/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    // </View>
  );
}
