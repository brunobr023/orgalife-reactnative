import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TodoList(){
    const isDarkMode = useColorScheme() === 'dark';

    return(
        <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-texto-principal-claro dark:text-texto-principal-escuro text-lg font-bold">To-do List</Text>
                <TouchableOpacity><Text className="text-purple-600 dark:text-purple-400 text-xs font-medium">Novo item</Text></TouchableOpacity>
            </View>
            
            <View className="bg-card-claro dark:bg-card-escuro p-4 rounded-2xl flex-row items-center mb-2 border border-zinc-200 dark:border-zinc-800">
                <Ionicons 
                    name="square-outline" 
                    size={20} 
                    color={isDarkMode ? "#9ca3af" : "#71717a"} 
                    className="mr-3" 
                />
                <Text className="text-texto-principal-claro dark:text-gray-300 ml-2">Revisar código do app antes do deploy</Text>
            </View>
        </View>
    );
}