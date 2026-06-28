import React, { useState } from 'react';
import {OnboardingSlider} from '../components/OnboardingSlider';
import {LoginPage} from '../components/LoginPage';

export function Home(){
  const [showLogin, setShowLogin] = useState(false);

  //Se o usuário já tiver visto o onboarding, exibe a tela de login. Caso contrário, exibe o slider de onboarding.
  if (showLogin) {
    return <LoginPage />;
  }

  return <OnboardingSlider onFinish={() => setShowLogin(true)} />;
}