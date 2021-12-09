import React from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Bem vindo ao newsApp</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;