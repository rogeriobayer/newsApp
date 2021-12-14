import React, { useState, useEffect } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import newsApi from "../api/newsApi";
import News from '../components/News';

const HomeScreen = ({ navigation }) => {

  const [headlines, setHeadlines] = useState([]);

  async function getHeadlines() {
    try {
      const response = await newsApi.get('top-headlines', {
        params: {
          country: 'br',
          pageSize: 100
        }
      });
      setHeadlines(response.data.articles);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getHeadlines()
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <FlatList
          data = {headlines}
          keyExtractor = {(item) => item.url}
          renderItem = {({item}) => {
            return (
              <View>
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
  },

});

export default HomeScreen;
