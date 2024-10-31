import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import MovieCard from '../MovieCard';

var { width } = Dimensions.get("window")

// Filmes em alta
export default function TrendingMovies({data}) {
    const navegacao = useNavigation();

    const handleClick = (item) => {
        navegacao.navigate("Movie", {item});
    };
    
    return (
        <View className="mt-2 mb-4">
            <View className="flex-row justify-between">
                <Text className="text-white text-lg font-bold mx-4 mb-4">
                    Filmes em Alta
                </Text>
            </View>

            {/* Efeito Carrossel  */}
            <Carousel
                data={data}
                renderItem={({ item }) => (
                    <MovieCard item={item} handleClick={handleClick} />
                )}
                firstItem={1}
                inactiveSlideScale={0.86}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.8}
                slideStyle={{ display: "flex", alignItems: "center" }}
            />
        </View>
    )
}