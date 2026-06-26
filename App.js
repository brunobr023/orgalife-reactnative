import "./src/styles/global.css";

// Correção para o erro de Runtime do FormData:
if (typeof global.FormData === 'undefined') {
  global.FormData = require('react-native/Libraries/Network/FormData');
}
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from "./src/screens/home";

export default function App() {
  return <Home />;
}