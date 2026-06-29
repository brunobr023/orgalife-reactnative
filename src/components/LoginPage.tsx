import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type LoginPageNavigationProp = NavigationProp<Record<string, object | undefined>>;

export function LoginPage() {
  const navigation = useNavigation<LoginPageNavigationProp>();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 justify-center p-6">
      
      {/* Cabeçalho */}
      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">OrgaLife 🎯</Text>
        <Text className="text-base text-gray-500 dark:text-gray-400 text-center">Organize sua rotina. Faça login para continuar.</Text>
      </View>

      {/* Formulário */}
      <View className="flex-col">
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">E-mail</Text>
          <TextInput
            placeholder="seu-email@exemplo.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-gray-900 dark:text-white"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">Senha</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-gray-900 dark:text-white"
          />
        </View>
      </View>

      {/* Esqueceu a senha */}
      <TouchableOpacity className="mt-1 mb-8 self-end pr-1">
        <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-full bg-blue-600 dark:bg-blue-500 py-4 rounded-2xl items-center shadow-md mb-6"
        onPress={() => navigation.navigate('AppPrincipal')}
      >
        <Text className="text-white font-bold text-lg">Entrar</Text>
      </TouchableOpacity>

      {/* Criar Conta */}
      <View className="flex-row justify-center gap-1">
        <Text className="text-sm text-gray-500 dark:text-gray-400">Não tem uma conta?</Text>
        <TouchableOpacity>
          <Text className="text-sm font-bold text-blue-600 dark:text-blue-400">Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}