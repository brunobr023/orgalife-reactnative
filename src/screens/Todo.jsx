import React from 'react';
import { View, Text } from 'react-native';

export default function Todo() {
  return (
    <View className="flex-1 bg-fundo-claro dark:bg-fundo-escuro p-6">
      <Text className="text-texto-principal-claro dark:text-texto-principal-escuro text-xl font-bold">
        Tela de Tarefas
      </Text>
    </View>
  );
}