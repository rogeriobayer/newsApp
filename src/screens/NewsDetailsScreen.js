import React from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";

const NewsDetailsScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Details Screen!</Text>
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

export default NewsDetailsScreen;