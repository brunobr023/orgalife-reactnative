import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function Header({showBalance, setShowBalance}){
    const [greeting, setGreeting] = UseState('');

    //Mensagens de Boa Vindas!
    const messages = [
        "Bem-vindo de volta",
        "Bora organizar os planos hoje?",
        "Pronto para focar?",
        "Tudo sob controle por aqui?",
        "Dia de atualizar as metas!"
    ];

    useEffect(()=> {
        //Sorteia um índice para o tamanho maximo.
        const randomIndex = Math.floor(Math.random() * messages.length);
        setGreeting(messages[randomIndex]);
    }, []);

    return(
        <View className="px-6 pb-6 border-b border-gray-900 flew-row justify-between items-center">
            <View>
                <Text className="text-gray-400 text-sm">Olá Bruno!</Text>{/* O nome do Usuário deve vir aqui*/}
                <Text className="text-gray-400 text-sm">{greeting}</Text> 
            </View>
            <TouchableOpacity
            onPress={() => setShowBalance(!showBalance)}
            className="bg-gray-900 p-3 rounded-full"
            >
                <Feather name={showBalance ? "eye" : "eye-off"} size={20} color="#fff"></Feather>
            </TouchableOpacity>
        </View>
    );
}