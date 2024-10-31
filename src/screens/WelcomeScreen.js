import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { fetchKanyeQuote } from '../../utils/kenyeApi';
import { useState, useEffect } from 'react'

export default function WelcomeScreen() {
  const navegacao = useNavigation();
  const [frase, setFrase] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para pegar uma frase
  const getKanyeQuote = async () => {
    const data = await fetchKanyeQuote();
    setLoading(false);
    if (data.quote) {
      //console.log("Frase", data);
      setFrase(data.quote);
    }
  };

  // useEffect para chamar getQuote ao montar o componente
  useEffect(() => {
    getKanyeQuote();
  }, []);

  return (
    <View className="flex-1 justify-end items-center space-y-10 relative">
      <Image
        source={require("../../assets/images/welcome.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <StatusBar style='ligth' />

      {/* Título e botão */}
      <View className="flex items-center justify-center py-28 max-w-[80%]">
        <View className="bg-red-700 p-4 rounded-3xl">
          <Text className="text-white text-4xl font-extrabold tracking-widest my-4">
            PF
          </Text>

        </View>

        <Text className="text-white text-4xl font-bold tracking-widest my-4">
          PirataFlix
        </Text>

        <Text className="text-white tracking-widest mb-2 text-lg text-center font-medium">
          Desfrute de filmes gratuitos no conforto do seu lar.
        </Text>

        <Text className="text-white tracking-widest mb-2 text-center font-medium pt-2">
          {frase}
        </Text>
        <Text className="text-white tracking-widest text-center font-medium">
          Kanye West
        </Text>

      </View>

      <View className="my-4 mb-36">
        <TouchableOpacity
          className="px-12 py-3 rounded-lg bg-red-700"
          onPress={() => navegacao.navigate("Home")} // Navega até a tela de Home
        >
          <Text
            className="text-white text-lg font-medium">
            Explorar
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}