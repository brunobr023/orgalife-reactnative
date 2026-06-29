import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Ioicons} from '@expo/vector-icons';

export default function TodoList(){
    return(
        <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-lg font-bold">To-do List</Text>
                <TouchableOpacity><Text className="text-purple-400 text-xs">Novo item</Text></TouchableOpacity>
            </View>
            <View className="bg-gray-900 p-4 rounded-2xl flex-row items-center mb-2">
                <Ionicons name="square-outline" size={20} color="#9ca3af" mr={3} />
                <Text className="text-gray-300 ml-2">Revisar código do app antes do deploy</Text>
            </View>
        </View>
    );
}