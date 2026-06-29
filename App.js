import "./src/styles/global.css"; 
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// Importando suas telas / navegadores
import { Home as LoginScreen } from './src/screens/home';
import TabNavigator from './src/navigations/TabNavigator';

LogBox.ignoreLogs(['[Reanimated] Reading from `value` during component render']);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Tela 1: Login */}
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Tela 2: O App em si com a Navbar Voadora interna */}
        <Stack.Screen name="AppPrincipal" component={TabNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}