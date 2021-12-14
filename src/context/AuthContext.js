import React, { createContext, useReducer, useEffect } from "react";
import * as RootNavigation from '../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        signedIn: true,
        access_token: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "signOut":
      return {
        ...state,
        signedIn: false,
        access_token: null,
      };
    default:
      return { ...state };
  }
}

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    signedIn: false,
    access_token: null,
    error: "",
  });

  const tryLocalSignIn = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token) {
      dispatch({ type: 'signIn', payload: access_token });
      RootNavigation.navigate('Feed');
    }
    else {
      dispatch({ type: 'signOut' });
      RootNavigation.navigate('Sign in');
    }

  }

  const signIn = async (access_token) => {
    try {
      await AsyncStorage.setItem('access_token', access_token);
      dispatch({ type: "signIn", payload: access_token });
      RootNavigation.navigate('Feed');
    } catch (err) {
      dispatch({
        type: "error",
        payload: "Problemas para autenticar usuário.",
      });
      console.log(err);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('access_token'); 
    dispatch({ type: 'signOut' });
    RootNavigation.navigate('Sign in');
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        tryLocalSignIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
