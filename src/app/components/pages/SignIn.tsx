import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const SignIn = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TextInput
        style={styles.formControl}
        value=""
        placeholder="何かやること"
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});
