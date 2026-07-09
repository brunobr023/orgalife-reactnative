import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

//Componentes de Construção
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import PlannedPayments from '../components/PlannedPayments';
import TodoList from '../components/TodoList';
import PlannedEvents from '../components/PlannedEvents';
import TabNavigator from '../navigations/TabNavigator';
// import FloatingNavbar from '..;/components/FloatingNavbar';
import {supabase} from '../database/supabase'; 

//função para deslogar o usuário
async function handleLogout() {
    const { error } = await supabase.auth.signOut();
}
// chamar await supabase.auth.signOut(); para fazer logout do usuário,
// e depois redirecionar para a tela de login ou onboarding.

export default function HomeScreen(){
    const[showBalance, setShowBalance] = useState(true);

    return(
        <View className="flex-1 bg-fundo-claro dark:bg-fundo-escuro pt-12 relative">
            {/* HEADER */}
            <Header showBalance={showBalance} setShowBalance={setShowBalance}/>

            {/* Conteúdo da Pagina*/}
            <ScrollView 
            contentContainerStyle={{ paddingBottom: 120 }} 
            showsVerticalScrollIndicator={false}
            className="px-6 pt-6"
            >
                <BalanceCard showBalance={showBalance} />
                <PlannedPayments />
                <TodoList />
                <PlannedEvents />
            </ScrollView>

            {/* FLOATING NAVBAR */}
            <TabNavigator />
        </View>
    );
}