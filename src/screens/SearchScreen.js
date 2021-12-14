import React, { useState, useEffect }  from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import newsApi from "../api/newsApi";
import News from '../components/News';
import SearchBarComponent from '../components/SearchBarComponent';
import DropdownComponent from '../components/DropdownComponent';

const SearchScreen = ({ navigation }) => {

  const [results, setResults] = useState([]);
  const [text, setText] = useState('');
  const [sort, setSort] = useState('publishedAt');

  async function searchNews(query, sort) {
    try {
      const response = await newsApi.get('everything', {
        params: {
          language: 'pt',
          qInTitle: query,
          sortBy: sort,
          pageSize: 100
        }
      });
      setResults(response.data.articles);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <SearchBarComponent
          value={text}
          onTextChange={(t) => {
            setText(t);
          }}
          onTextSubmit={(t) => {
            searchNews(t, sort);
          }}
          onTextClean={() => {
            setResults([]);
            console.log('Text Clean')
          }}
        />

        <DropdownComponent
          onSortChange={(s) => {
            setSort(s);
            searchNews(text, s);
          }}
        />

        <>
          <FlatList
            data = {results}
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
        </>
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

  dropdows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

});

export default SearchScreen;