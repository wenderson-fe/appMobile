import { View, Text, Image, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../utils/moviesApi';

const { width, height } = Dimensions.get("window");

export default function TopRatedMovies({ data, title }) {
  const navegacao = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      // Torna a imagem clicavel
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navegacao.push("Movie", item)}
      >
        <View className="space-y-1 mr-4 mb-6">
          <Image
            source={{
              uri: image500(item.poster_path),
            }}
            className="rounded-3xl"
            style={{
              width: width * 0.63,
              height: height * 0.15,
            }}
          />

          <Text className=" text-neutral-300 ml-1 text-lg font-bold">
            {
              item.title.length > 20
                ? item.title.slice(0, 20) + "..."
                : item.title
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View className="space-y-4 my-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg font-bold">{title}</Text>
      </View>

      {/* Exibe uma lista horizontal de filmes */}
      {/* Exibe apénas o que esta visível na tela */}
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />

    </View>
  )
}