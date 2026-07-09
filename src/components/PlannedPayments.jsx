import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function PlannedPayments(){
    return(
        <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-texto-principal-claro dark:text-texto-principal-escuro text-lg font-bold">Pagamentos Planejados</Text>
                <TouchableOpacity><Text className="text-purple-600 dark:text-purple-400 text-xs font-medium">Ver todos</Text></TouchableOpacity>
            </View>

            {/*Componente do Item 01*/}
            <View className="bg-card-claro dark:bg-card-escuro p-4 rounded-2xl flex-row items-center justify-between mb-2 border border-zinc-200 dark:border-zinc-800">
                <View className="flex-row items-center">
                    <View className="bg-purple-500/10 p-3 rounded-xl mr-4">
                        <MaterialCommunityIcons name="file-document-outline" size={20} color="#a855f7" />
                    </View>
                    <View>
                        <Text className="text-texto-principal-claro dark:text-texto-principal-escuro font-medium">Internet / Fibra</Text>
                        <Text className="text-texto-secundario-claro dark:text-gray-400 text-xs">Vence em: 05/07</Text>
                    </View>
                </View>
                <Text className="text-texto-principal-claro dark:text-texto-principal-escuro font-semibold">R$ 99,30</Text>
            </View>

            {/*Componente do Item 02*/}
            <View className="bg-card-claro dark:bg-card-escuro p-4 rounded-2xl flex-row items-center justify-between mb-2 border border-zinc-200 dark:border-zinc-800">
                <View className="flex-row items-center">
                    <View className="bg-pink-500/10 p-3 rounded-xl mr-4">
                        <MaterialCommunityIcons name="stethoscope" size={20} color="#ec4899" />
                    </View>
                    <View>
                        <Text className="text-texto-principal-claro dark:text-texto-principal-escuro font-medium">Remédio Mensal</Text>
                        <Text className="text-texto-secundario-claro dark:text-gray-400 text-xs">Vence em: 15/07</Text>
                    </View>
                </View>
                <Text className="text-texto-principal-claro dark:text-texto-principal-escuro font-semibold">R$ 33,30</Text>
            </View>
        </View>
    );
}