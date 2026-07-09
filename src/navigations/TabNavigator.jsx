import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// Importando suas telas
import HomeScreen from '../screens/HomeScreen';
import ContasScreen from '../screens/Contas';
import FazeresScreen from '../screens/Todo';
import CartoesScreen from '../screens/Cartoes';

//Remover tela de DebugScreen do TabNavigator para não aparecer na barra de navegação antes do deploy
import DebugScreen from '../screens/DebugScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Esconde o texto para focar nos ícones estilo premium
        tabBarActiveTintColor: '#a855f7', // Roxo ativa
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280', // Ajuste dinâmico do cinza inativo
        
        // A MÁGICA DA NAVBAR VOADORA ADAPTÁVEL:
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5', // Altera dinamicamente entre card-escuro e card-claro
          borderRadius: 24,
          height: 64,
          borderTopWidth: 0, // Remove a linha superior padrão
          elevation: 10, // Sombra no Android
          shadowColor: '#000', // Sombra no iOS
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isDarkMode ? 0.4 : 0.1,
          shadowRadius: 20,
        }
      }}
    >
      <Tab.Screen 
        name="Principal" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Contas" 
        component={ContasScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="wallet-outline" size={size + 2} color={color} />
        }}
      />
      <Tab.Screen 
        name="Fazeres" 
        component={FazeresScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="check-square" size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Cartões" 
        component={CartoesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="credit-card" size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Debug" 
        component={DebugScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="tool" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}