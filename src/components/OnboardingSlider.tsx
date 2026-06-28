import React, { useState, useRef } from 'react';
import { Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Bem-vindo ao OrgaLife 🚀',
    description: 'O seu novo espaço para organizar sua rotina, gerenciar tarefas e manter suas metas em dia de forma totalmente integrada.',
    image: require('../../assets/slide1.png'),
  },
  {
    id: '2',
    title: 'Tudo em um só lugar 📁',
    description: 'Centralize suas notas, monte listas de hábitos e acompanhe sua evolução diária sem complicações ou poluição visual.',
    image: require('../../assets/slide2.png'),
  },
  {
    id: '3',
    title: 'Foco no que importa 🎯',
    description: 'Interface limpa, minimalista e adaptada para que você gaste energia executando suas tarefas, não organizando elas.',
    image: require('../../assets/slide3.png'),
  },
];

interface OnboardingProps {
  onFinish: () => void;
}

export function OnboardingSlider({ onFinish }: OnboardingProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (activeIndex + 1),
        animated: true,
      });
    } else {
      onFinish();
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 justify-between py-14">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-grow-0"
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={{ width: SCREEN_WIDTH }} className="items-center justify-center px-10">
            <Image 
              source={slide.image} 
              style={{ width: 256, height: 256, marginBottom: 32 }}
              resizeMode="contain"
            />
            <Text className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 text-center mb-5">
              {slide.title}
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-300 text-center leading-6">
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="items-center px-10">
        <View className="flex-row gap-2 mb-8">
          {SLIDES.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-6 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          className="w-full bg-blue-600 dark:bg-blue-500 py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white font-bold text-lg">
            {activeIndex === SLIDES.length - 1 ? 'Começar Jornada' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}