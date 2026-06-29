import React from 'react';
import {View, Text} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function BalanceCard({showBalance}){
    return(
        <View className="bg-gray-900 p-5 rounded-3xl mb-6">
            {/* Visão Geral*/}
            <Text className="text-gray-400 text-sm font-medium mb-1">Saldo Disponível</Text>
            <Text className="text-white text-3xl font-bold mb-4">
                {showBalance ? "R$ 1.900,00" : "******"}
            </Text>

            <View className="flex-row justify-between border-t border-gray-800 pt-4">
                {/* Receitas*/}
                <View className="flex-row items-center">
                    <View className="bg-green-500/10 p-2 rounded-xl mr-3">
                        <Feather name="arrow-down-left" size={18} color="#22c55e"/>
                    </View>
                    <View>
                        <Text className="text-gray-400 text-xs">Receitas</Text>
                        <Text className="text-green-500 text-sm font-semibold">
                            {showBalance ? "+ R$ 195,99" : "******" }
                        </Text>
                    </View>
                </View>
                {/* Despesas*/}
                <View className="flex-row items-center">
                    <View className="bg-red-500/10 p-2 rounded-xl mr-3">
                        <Feather name="arrow-down-left" size={18} color="#ef4444"/>
                    </View>
                    <View>
                        <Text className="text-gray-400 text-xs">Despesas</Text>
                        <Text className="text-red-500 text-sm font-semibold">
                            {showBalance ? "- R$ 294,93" : "******"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}