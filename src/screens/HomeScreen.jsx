import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

//Componentes de Construção
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import PlannedPayments from '../components/PlannedPayments';
import TodoList from '../components/TodoList';
import PlannedEvents from '../components/PlannedEvents';
// import FloatingNavbar from '..;/components/FloatingNavbar';


export default function HomeScreen(){
    const[showBalance, setShowBalance] = useState(true);

    return(
        <View className="flex-1 bg-gray-950 pt-12 relative">
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
            {/* Aqui ficaria a barra flutuante ou o componente dela */}
        </View>
    );
}