import React from 'react';
import { View, Text } from 'react-native';

export default function Contas() {
  return (
    <View className="flex-1 bg-fundo-claro dark:bg-fundo-escuro justify-center items-center">
      <Text className="text-texto-principal-claro dark:text-texto-principal-escuro text-xl font-bold">
        Tela de Contas
      </Text>
    </View>
  );
}