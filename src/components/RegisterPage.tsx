import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, useColorScheme, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../database/supabase';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
}

type RegisterPageNavigationProp = NavigationProp<Record<string, object | undefined>>;

export function RegisterPage({onNavigateToLogin}: RegisterPageProps) {
  const navigation = useNavigation<RegisterPageNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';

  // Estados para o formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validações básicas antes de mandar para a API
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Senha Fraca', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (error) {
        Alert.alert('Erro no cadastro', error.message);
        setLoading(false);
        return;
      }

      // IMPORTANTE: Por padrão, o Supabase exige confirmação de e-mail.
      // Se a confirmação estiver ligada no painel, a sessão não inicia imediatamente.
      if (data.user && !data.session) {
        Alert.alert(
          'Sucesso!',
          'Conta criada! Verifique sua caixa de entrada para confirmar o e-mail antes de fazer o login.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else if (data.session) {
        // Se a confirmação de e-mail estiver desligada, já loga direto
        Alert.alert('Sucesso!', 'Conta criada com sucesso!');
        navigation.navigate('AppPrincipal');
      }

    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao tentar cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-fundo-claro dark:bg-fundo-escuro justify-center p-6">
      
      {/* Cabeçalho */}
      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">Criar Conta 🚀</Text>
        <Text className="text-base text-texto-secundario-claro dark:text-texto-secundario-escuro text-center">Comece sua jornada de organização no OrgaLife.</Text>
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
            onChangeText={setEmail}
            editable={!loading}
            className="w-full bg-card-claro dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-texto-principal-claro dark:text-white"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-texto-principal-claro dark:text-gray-300 mb-2 pl-1">Senha</Text>
          <TextInput
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={isDarkMode ? "#6b7280" : "#a1a1aa"}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            className="w-full bg-card-claro dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-texto-principal-claro dark:text-white"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-texto-principal-claro dark:text-gray-300 mb-2 pl-1">Confirmar Senha</Text>
          <TextInput
            placeholder="Repita sua senha"
            placeholderTextColor={isDarkMode ? "#6b7280" : "#a1a1aa"}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
            className="w-full bg-card-claro dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-texto-principal-claro dark:text-white"
          />
        </View>
      </View>

      {/* Botão Cadastrar */}
      <TouchableOpacity
        activeOpacity={0.8}
        className={`w-full py-4 rounded-2xl items-center shadow-md mb-6 ${
          loading ? 'bg-purple-400 dark:bg-purple-700' : 'bg-purple-600 dark:bg-purple-500 active:bg-purple-700 dark:active:bg-purple-600'
        }`}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white font-bold text-lg">Criar Minha Conta</Text>
        )}
      </TouchableOpacity>

      {/* Voltar para o Login */}
      <View className="flex-row justify-center gap-1">
        <Text className="text-sm text-texto-secundario-claro dark:text-texto-secundario-escuro">Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={loading}>
          <Text className="text-sm font-bold text-purple-600 dark:text-purple-400">Faça Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}