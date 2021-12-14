import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NewsContext } from "../context/NewsContext";
import News from '../components/Bookmarked';

const BookmarkedScreen = ({ navigation }) => {
  const newsContext = useContext(NewsContext);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
              data = {newsContext.state.saved}
              keyExtractor = {(item) => item.title}
              renderItem = {({item}) => {
                return (
                  <View style={styles.content}>
                    <TouchableOpacity
                      onPress = {() => navigation.navigate("News Details", {
                        title: item.title
                      })}
                    >
                      <News 
                        props = {item}
                      />
                    </TouchableOpacity>
                  </View>
                )
              }}
        />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  }
});

export default BookmarkedScreen;
