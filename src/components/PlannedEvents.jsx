import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function PlannedEvents() {
  return (
    <View className="mb-6">
      <Text className="text-texto-principal-claro dark:text-texto-principal-escuro text-lg font-bold mb-3">Eventos Planejados</Text>
      <View className="bg-card-claro dark:bg-card-escuro p-4 rounded-2xl flex-row items-center border border-zinc-200 dark:border-zinc-800">
        <View className="bg-amber-500/10 p-3 rounded-xl mr-4">
          <Feather name="calendar" size={20} color="#f59e0b" />
        </View>
        <View>
          <Text className="text-texto-principal-claro dark:text-texto-principal-escuro font-medium">Manutenção Preventiva do Carro</Text>
          <Text className="text-texto-secundario-claro dark:text-gray-400 text-xs">Sábado às 09:00</Text>
        </View>
      </View>
    </View>
  );
}