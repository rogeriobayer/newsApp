import React, { useState, useEffect, useContext } from 'react';
import { Button,} from "react-native-elements";
import { Text, View, StyleSheet, Image, } from 'react-native';
import { AuthContext } from "../context/AuthContext.js";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

const LoginScreen = ({ navigation }) => {

    const { authState, signIn, signOut, tryLocalSignIn } = useContext(AuthContext);

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'ylyBsrDA2iBjbimC19Ub6A',
            scopes: ['identity'],
            responseType: 'token',
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
        if (response?.type === 'success') {
            const { code } = response.params;
            const token = response.authentication.accessToken;
            console.log(response);
            signIn(token);
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <Button
                disabled={!request}
                title="Login Reddit"
                onPress={() => {
                    promptAsync();
                }}
            />
            {authState.error ? <Text>{authState.error}</Text> : null}

        </View>


    );
}

const styles = StyleSheet.create({
    AppTitle: {
        marginVertical: 50,
        flex: 0,
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    logo: {
        width: 90,
        height: 90,
        margin: 10,
    },
    input: {
        color: 'black',
        width: '80%',
        margin: 20,
        padding: 10,
        backgroundColor: 'lightgrey',
    },
    createButton: {
        margin: 20,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#1f75cb',
        borderRadius: 15,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LoginScreen;