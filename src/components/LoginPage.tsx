import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export function LoginPage() {
  return (
    // Renderiza a tela de login com campos de e-mail e senha, botão de login e link para cadastro
    <View className="flex-1 bg-white dark:bg-slate-900 justify-center p-6">
      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
          OrgaLife 🎯
        </Text>
        <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
          Organize sua rotina. Faça login para continuar.
        </Text>
      </View>
        // Renderiza os campos de entrada para e-mail e senha
      <View className="gap-4">
        <View>
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
            E-mail
          </Text>
          <TextInput
            placeholder="seu-email@exemplo.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-gray-900 dark:text-white"
          />
        </View>

        <View>
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
            Senha
          </Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-gray-900 dark:text-white"
          />
        </View>
      </View>
        // Renderiza o link "Esqueceu a senha?", botão de login e link para cadastro
      <TouchableOpacity className="mt-3 mb-8 self-end pr-1">
        <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>
        // Renderiza o botão de login
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-full bg-blue-600 dark:bg-blue-500 py-4 rounded-2xl items-center shadow-md mb-6"
      > 
        <Text className="text-white font-bold text-lg">
          Entrar
        </Text>
      </TouchableOpacity>
        // Renderiza o link para cadastro, incentivando o usuário a criar uma nova conta se ainda não tiver uma.
      <View className="flex-row justify-center gap-1">
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Não tem uma conta?
        </Text>
        <TouchableOpacity>
          <Text className="text-sm font-bold text-blue-600 dark:text-blue-400">
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}