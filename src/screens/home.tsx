import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { OnboardingSlider } from '../components/OnboardingSlider';
import { LoginPage } from '../components/LoginPage';
import { RegisterPage } from '../components/RegisterPage';
import HomeScreen from "../screens/HomeScreen"; // 👈 Importe a sua tela principal aqui (ajuste o caminho se necessário)
import { supabase } from '../database/supabase';

type AuthStep = 'onboarding' | 'login' | 'register';

export function Home() {
  const [currentStep, setCurrentStep] = useState<AuthStep>('onboarding');
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // 1. Busca a sessão/JWT persistida no AsyncStorage ao abrir o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingSession(false);
    });

    // 2. Escuta mudanças em tempo real (login, logout, refresh do token JWT)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enquanto o Supabase lê o AsyncStorage buscando o JWT salvo, exibe um loading
  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8b5cf6" />
      </View>
    );
  }

  // ==========================================
  // CASO 1: USUÁRIO LOGADO (JWT ativo no aparelho)
  // ==========================================
  if (session) {
    return <HomeScreen />; // Renderiza a tela principal direto
  }

  // ==========================================
  // CASO 2: USUÁRIO DESLOGADO (Fluxo de Auth)
  // ==========================================
  if (currentStep === 'login') {
    return (
      <LoginPage 
        onNavigateToRegister={() => setCurrentStep('register')} 
      />
    );
  }

  if (currentStep === 'register') {
    return (
      <RegisterPage 
        onNavigateToLogin={() => setCurrentStep('login')} 
      />
    );
  }

  // Onboarding padrão
  return (
    <OnboardingSlider onFinish={() => setCurrentStep('login')} />
  );
}