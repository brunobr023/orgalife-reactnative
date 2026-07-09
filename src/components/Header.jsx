import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function Header({showBalance, setShowBalance}){
    const [greeting, setGreeting] = useState('');
    const isDarkMode = useColorScheme() === 'dark';

    //Mensagens de Boas-Vindas!
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
        <View className="px-6 pb-6 border-b border-zinc-200 dark:border-zinc-900 flex-row justify-between items-center">
            <View>
                {/* Ajustado o tamanho e peso para destacar o nome do usuário */}
                <Text className="text-texto-principal-claro dark:text-texto-principal-escuro text-2xl font-bold">Olá, Bruno!</Text>
                {/* A mensagem dinâmica fica menor e mais discreta embaixo */}
                <Text className="text-texto-secundario-claro dark:text-gray-400 text-lg mt-0.5">{greeting}</Text> 
            </View>
            
            <TouchableOpacity
                onPress={() => setShowBalance(!showBalance)}
                className="bg-card-claro dark:bg-gray-900 p-3 rounded-full border border-zinc-200 dark:border-transparent"
            >
                <Feather 
                    name={showBalance ? "eye" : "eye-off"} 
                    size={25} 
                    color={isDarkMode ? "#fff" : "#09090b"} 
                />
            </TouchableOpacity>
        </View>
    );
}