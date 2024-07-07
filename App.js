import React from "react";
import { useState, useEffect } from "react";
import {Text, View,LogBox,StatusBar,Alert,SafeAreaView} from 'react-native';
import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Home from "./src/Home";
import Chatbot from "./src/Chatbot";
LogBox.ignoreAllLogs()

function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{headerShown: false}}
        >
        <Stack.Screen
          name="home"
          component={Home} />
      </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName="chatbot"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="chatbot"
        component={Chatbot} />
    </Stack.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = focused
              ? 'home-outline'
              : 'home-variant';
          } else if (route.name === 'ChatStack') {
            iconName = focused
              ? 'file-search'
              : 'file-search-outline';
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        }
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
        }}  />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={{
          tabBarLabel: 'ChatBot',
          title: 'ChatBot'
        }} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

export default App;


