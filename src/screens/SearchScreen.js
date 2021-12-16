import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import newsApi from "../api/newsApi";
import News from "../components/News";
import SearchBarComponent from "../components/SearchBarComponent";
import DropdownComponent from "../components/DropdownComponent";

const SearchScreen = ({ navigation }) => {
  const data = [
    { label: "Published At", value: "publishedAt" },
    { label: "Popularity", value: "popularity" },
    { label: "Relevancy", value: "relevancy" },
  ];

  const dataCategories = [
    { label: "All", value: "all" },
    { label: "Business", value: "business" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Health", value: "health" },
    { label: "Science", value: "science" },
    { label: "Sports", value: "sports" },
    { label: "Technology", value: "technology" },
  ];
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [sort, setSort] = useState("publishedAt");
  const [category, setCategory] = useState("category");
  const [show, setShow] = useState("");

  async function searchNews(query, sort) {
    try {
      const response = await newsApi.get("everything", {
        params: {
          language: "pt",
          qInTitle: query,
          sortBy: sort,
          pageSize: 100,
        },
      });
      setResults(response.data.articles);
    } catch (err) {
      console.log(err);
    }
  }

  async function searchCategoryNews(a) {
    try {
      const response = await newsApi.get("top-headlines", {
        params: {
          language: "pt",
          category: a,
          pageSize: 100,
        },
      });
      setResults(response.data.articles);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {!show ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setShow("query");
              }}
            >
              <View style={styles.button}>
                <Text style={styles.textButton}>BY QUERY </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShow("category");
              }}
            >
              <View style={styles.button}>
                <Text style={styles.textButton}>BY CATEGORY </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : show === "query" ? (
          <>
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
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setShow("category");
                }}
              >
                <View style={styles.internalButton}>
                  <Text style={styles.textButton}>BY CATEGORY </Text>
                </View>
              </TouchableOpacity>

              <DropdownComponent
                items={data}
                title={"SORT BY"}
                onSortChange={(s) => {
                  setSort(s);
                  searchNews(text, s);
                }}
              />
            </View>
          </>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setShow("query");
              }}
            >
              <View style={styles.internalButton}>
                <Text style={styles.textButton}>BY QUERY </Text>
              </View>
            </TouchableOpacity>
            <DropdownComponent
              items={dataCategories}
              title={"CATEGORY"}
              onSortChange={(s) => {
                setCategory(s);
                searchCategoryNews(category);
              }}
            />
          </View>
        )}
        <View style={styles.flex}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("News Details", {
                        item: item,
                        fonte: "search"
                      })
                    }
                  >
                    <News props={item} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
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
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },

  dropdows: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 10,
    margin: 10,
    height: 40,
    width: 160,
    flexDirection: "row",
  },
  internalButton: {
    backgroundColor: "#1DA1F2",
    padding: 10,
    margin: 10,
    marginTop: 40,
    height: 40,
    width: 150,
    flexDirection: "row",
  },
  flex: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SearchScreen;
