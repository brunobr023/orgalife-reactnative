import "./src/styles/global.css"; // <-- Verifique se o caminho do seu CSS global está correto
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Home } from './src/screens/home';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['[Reanimated] Reading from `value` during component render']);

export default function App() {
  return (
    <View className="flex-1">
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}


