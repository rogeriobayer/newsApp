import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./src/screens/HomeScreen";
import BookmarkedScreen from "./src/screens/BookmarkedScreen";
import SearchScreen from "./src/screens/SearchScreen";
import NewsDetailsScreen from "./src/screens/NewsDetailsScreen";
import { NewsProvider } from "./src/context/NewsContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="News Details" component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NewsProvider>
      <NavigationContainer>
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
          <Tab.Screen name="Bookmarked" component={BookmarkedScreen} 
              options={{
                tabBarLabel: 'Bookmarked',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="heart" color={color} size={size} />
                ),
              }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NewsProvider>
  );
}
