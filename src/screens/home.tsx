/// <reference path="../../nativewind-env.d.ts" />
import React from 'react';
import { Text, View } from 'react-native';

export function Home() {
  return (
    <View className="flex-1 bg-white dark:bg-slate-900 items-center justify-center p-5">
      <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        OrgaLife 🚀
      </Text>
      
      <Text className="text-base text-gray-600 dark:text-gray-300 text-center">
        O ambiente está 100% configurado com Expo, TypeScript e Tailwind CSS!
      </Text>
    </View>
  );
}