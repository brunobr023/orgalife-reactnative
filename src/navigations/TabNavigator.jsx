import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// Importando suas telas
import HomeScreen from '../screens/HomeScreen';
import ContasScreen from '../screens/Contas';
import FazeresScreen from '../screens/Todo';
import CartoesScreen from '../screens/Cartoes';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Esconde o texto para focar nos ícones estilo premium
        tabBarActiveTintColor: '#a855f7', // Roxo do ativa
        tabBarInactiveTintColor: '#9ca3af', // Cinza da inativa
        
        // A MÁGICA DA NAVBAR VOADORA COM NATIVEWIND:
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          backgroundColor: '#111827', // bg-gray-900
          borderRadius: 24,
          height: 64,
          borderTopWidth: 0, // Remove a linha superior padrão
          elevation: 10, // Sombra no Android
          shadowColor: '#000', // Sombra no iOS
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
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
    </Tab.Navigator>
  );
}