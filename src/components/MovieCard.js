import {Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { image500 } from '../../utils/moviesApi';

var { width, height } = Dimensions.get("window");

// Card de cada filme
export default function MovieCard({item, handleClick}) {
  //console.log("Imagem filme", item.poster_path);
  return (
    // Torna a imagem clicável
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          // Caminho relativo para a imagem do filme
          uri: image500(item.poster_path),
        }}
        style={{
          width: width * 0.8,
          height: height * 0.25,
        }}
        resizeMode="cover"
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}