import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-native-elements";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { AuthContext } from "../context/AuthContext.js";
import * as WebBrowser from "expo-web-browser";
import { Feather } from "@expo/vector-icons";
import { RedditOutlined } from '@ant-design/icons';
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.reddit.com/api/v1/authorize.compact",
  tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
};

const LoginScreen = ({ navigation }) => {
  const { authState, signIn, signOut, tryLocalSignIn } =
    useContext(AuthContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "FrPIqLo2HyPeDlnJ5kKtxA",
      scopes: ["identity"],
      responseType: "token",
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({}),
    },

    discovery
  );

  useEffect(() => {
    console.log(response);
    tryLocalSignIn();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      const token = response.authentication.accessToken;
      console.log(response);
      signIn(token);
    }
  }, [response]);

  function nonSignedLogin() {
    signIn("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.greetings}>Bem vindo ao</Text>
        <Image
          source={require("../../assets/splash.png")}
          style={{ width: 200, height: 100, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            promptAsync();
          }}
        >
          <View style={styles.buttonReddit}>
          <RedditOutlined
              style={{color:"#fff"}}/>
            <Text style={styles.login}>Faça login com o Reddit</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            nonSignedLogin();
          }}
        >
          <View style={styles.buttonLogin}>
            <Feather
              style={styles.starIcon}
              name="user"
              size={16}
              color="#ffffff"
            />
            <Text style={styles.login}>Entre sem login</Text>
          </View>
        </TouchableHighlight>
        {authState.error ? (
          <Text style={styles.error}>{authState.error}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AppTitle: {
    marginVertical: 50,
    flex: 0,
    fontSize: 30,
    textAlign: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  greetings: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#5968e4",
  },
  error: {
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
    color: "#f80000",
  },
  login: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    color: "#ffffff",
  },
  buttonReddit: {
    backgroundColor: "#FF5700",
    padding: 10,
    height: 40,
    flexDirection: "row",
  },
  buttonLogin: {
    backgroundColor: "#1DA1F2",
    padding: 10,
    marginTop: 10,
    height: 40,
    flexDirection: "row",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

export default LoginScreen;
