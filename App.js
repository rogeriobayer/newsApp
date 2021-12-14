import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./src/screens/HomeScreen";
import BookmarkedScreen from "./src/screens/BookmarkedScreen";
import SearchScreen from "./src/screens/SearchScreen";
import NewsDetailsScreen from "./src/screens/NewsDetailsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import Logout from "./src/screens/Logout";
import { NewsProvider } from "./src/context/NewsContext";
import { AuthProvider } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Headlines" component={HomeScreen} />
      <Stack.Screen name="News Details" component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
};

const BookmarkStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmarked" component={BookmarkedScreen} />
      <Stack.Screen name="News Details" component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
};

const Feed = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" headerMode="none">
      <Drawer.Screen name="Inicio" options={{ drawerInactiveTintColor: 'red' }} component={Inicio} />
      <Drawer.Screen name="Log out"  component={Logout} />
    </Drawer.Navigator>
  );
}

const Inicio = ({ }) => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#2196f3',
          tabBarLabelStyle: {
            fontSize: 15,
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen}
          options={{
            tabBarLabel: 'Headlines',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen name="Search" component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-sharp" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Saved" component={BookmarkStackScreen}
          options={{
            tabBarLabel: 'Bookmarked',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NewsProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Feed" component={Feed}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </NewsProvider>
  );
}
