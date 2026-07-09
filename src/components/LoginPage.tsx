import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, useColorScheme, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// Importando o cliente que você configurou
import { supabase } from '../database/supabase'; 

interface LoginPageProps {
  onNavigateToRegister: () => void;
}

type LoginPageNavigationProp = NavigationProp<Record<string, object | undefined>>;

export function LoginPage({ onNavigateToRegister }: LoginPageProps) {
  const navigation = useNavigation<LoginPageNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';

  // 1. Estados para capturar os dados do formulário e controle de loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Função que lida com a autenticação no Supabase
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        // Trata os erros mais comuns de forma amigável
        if (error.message === 'Invalid login credentials') {
          Alert.alert('Erro ao entrar', 'E-mail ou senha incorretos.');
        } else {
          Alert.alert('Erro ao entrar', error.message);
        }
        setLoading(false);
        return;
      }

      // Se deu certo, o Supabase já salvou a sessão no AsyncStorage
      // Redireciona o usuário para o App Principal
      if (data.session) {
        navigation.navigate('AppPrincipal');
      }
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-fundo-claro dark:bg-fundo-escuro justify-center p-6">
      
      {/* Cabeçalho */}
      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">OrgaLife 🎯</Text>
        <Text className="text-base text-texto-secundario-claro dark:text-texto-secundario-escuro text-center">Organize sua rotina. Faça login para continuar.</Text>
      </View>

      {/* Formulário */}
      <View className="flex-col">
        <View className="mb-4">
          <Text className="text-sm font-semibold text-texto-principal-claro dark:text-gray-300 mb-2 pl-1">E-mail</Text>
          <TextInput
            placeholder="seu-email@exemplo.com"
            placeholderTextColor={isDarkMode ? "#6b7280" : "#a1a1aa"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail} // Vincula o texto digitado ao estado do e-mail
            editable={!loading}
            className="w-full bg-card-claro dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-texto-principal-claro dark:text-white"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-texto-principal-claro dark:text-gray-300 mb-2 pl-1">Senha</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={isDarkMode ? "#6b7280" : "#a1a1aa"}
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Vincula o texto digitado ao estado da senha
            editable={!loading}
            className="w-full bg-card-claro dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-texto-principal-claro dark:text-white"
          />
        </View>
      </View>

      {/* Esqueceu a senha */}
      <TouchableOpacity className="mt-1 mb-8 self-end pr-1" disabled={loading}>
        <Text className="text-sm font-semibold text-purple-600 dark:text-purple-400">Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity
        activeOpacity={0.8}
        className={`w-full py-4 rounded-2xl items-center shadow-md mb-6 ${
          loading ? 'bg-purple-400 dark:bg-purple-700' : 'bg-purple-600 dark:bg-purple-500 active:bg-purple-700 dark:active:bg-purple-600'
        }`}
        onPress={handleLogin} // Dispara a função de autenticação
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white font-bold text-lg">Entrar</Text>
        )}
      </TouchableOpacity>

      {/* Criar Conta */}
      <View className="flex-row justify-center gap-1">
        <Text className="text-sm text-texto-secundario-claro dark:text-texto-secundario-escuro">Não tem uma conta?</Text>
        <TouchableOpacity disabled={loading} onPress={onNavigateToRegister}>
          <Text className="text-sm font-bold text-purple-600 dark:text-purple-400">Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}