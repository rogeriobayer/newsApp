import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./src/screens/HomeScreen";
import BookmarkedScreen from "./src/screens/BookmarkedScreen";
import SearchScreen from "./src/screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
        <Tab.Screen name="Home" component={HomeScreen} 
            options={{
              tabBarLabel: 'Headlines',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" color={color} size={size} />
              ),
            }}/>
        <Tab.Screen name="Search" component={SearchScreen}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search-sharp" color={color} size={size} />
              ),
            }}/>
        <Tab.Screen name="Bookmarked" component={BookmarkedScreen} 
            options={{
              tabBarLabel: 'Bookmarked',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
