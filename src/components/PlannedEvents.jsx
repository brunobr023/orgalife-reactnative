import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function PlannedEvents() {
  return (
    <View className="mb-6">
      <Text className="text-white text-lg font-bold mb-3">Eventos Planejados</Text>
      <View className="bg-gray-900 p-4 rounded-2xl flex-row items-center">
        <View className="bg-amber-500/10 p-3 rounded-xl mr-4">
          <Feather name="calendar" size={20} color="#f59e0b" />
        </View>
        <View>
          <Text className="text-white font-medium">Manutenção Preventiva do Carro</Text>
          <Text className="text-gray-400 text-xs">Sábado às 09:00</Text>
        </View>
      </View>
    </View>
  );
}