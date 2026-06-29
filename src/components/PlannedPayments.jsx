import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function PlannedPayments(){
    return(
        <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-lg font-bold">Pagamentos Planejados</Text>
                <TouchableOpacity><Text className="text-purple-400 text-xs">Ver todos</Text></TouchableOpacity>
            </View>

            {/*Componente do Item 01*/}
            <View className="bg-gray-900 p-4 rounded-2xl flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                    <View className="bg-purple-500/10 p-3 rounded-xl mr-4">
                        <MaterialCommunityIcons name="file-document-outline" size={20} color="#a855f7" />
                    </View>
                    <View>
                        <Text className="text-white font-medium">Internet / Fibra</Text>
                        <Text className="text-gray-400 text-xs">Vence em: 05/07</Text>
                    </View>
                </View>
                <Text className="text-white font-semibold">R$ +99,30</Text>
            </View>

            {/*Componente do Item 02*/}
            <View className="bg-gray-900 p-4 rounded-2xl flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                    <View className="bg-pink-500/10 p-3 rounded-xl mr-4">
                        <MaterialCommunityIcons name="stethoscope" size={20} color="#a855f7" />
                    </View>
                    <View>
                        <Text className="text-white font-medium">Remedio Mensal</Text>
                        <Text className="text-gray-400 text-xs">Vence em: 15/07</Text>
                    </View>
                </View>
                <Text className="text-white font-semibold">R$ +33,30</Text>
            </View>
        </View>
    );
}