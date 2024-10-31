import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  BellIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import TrendingMovies from '../components/TrendingMovies';
import { useQuery } from "@tanstack/react-query";
import { 
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchPopularMovie,
  fetchUpComingMovie,
} from "../../utils/moviesApi";
import Loading from "../components/Loading";
import TopRatedMovies from '../components/TopRatedMovies';
import PopularMovie from '../components/PopularMovie';


export default function HomeScreen() {
  const navegacao = useNavigation();

  const [tendencias, setTendencias] = useState([]);
  const [maisAvaliados, setMaisAvaliados] = useState([]);
  const [popular, setPopular] = useState([]);

  // Utiliza react-query para buscar filmes
  // A variável `isTrendingLoading` indica se a consulta está em andamento:
  // true significa que a consulta está carregando, false significa que foi concluída.

  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ["filmesEmAlta"],
    queryFn: fetchTrendingMovie,
    onSuccess: (data) => {
      setTendencias(data.results);
    },
    onError: (error) => {
      console.log("Erro ao buscar filmes em alta", error);
    }
  });

  const { isLoading: isTopReatedLoading } = useQuery({
    queryKey: ["filmesMaisAvaliados"],
    queryFn: fetchTopRatedMovie,
    onSuccess: (data) => {
      setMaisAvaliados(data.results);
    },
    onError: (error) => {
      console.log("Erro ao buscar filmes mais avaliados", error);
    }
  });

  const { isLoading: isTopPopularLoading } = useQuery({
    queryKey: ["filmesPopular"],
    queryFn: fetchPopularMovie,
    onSuccess: (data) => {
      setPopular(data.results);
    },
    onError: (error) => {
      console.log("Erro ao buscar filmes popular", error);
    }
  });

  //console.log("Filmes em alta", tendencias);

  return (
    <View className="flex-1 ">
      <Image
        source={require("../../assets/images/homescreen.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView className="mt-16">
        <StatusBar style='ligth' />

        {/* Titulo de Bem Vindo */}
        <View className="flex-row justify-between items-center mx-4 mg-4">
          <View className="border-2 border-white rounded-full overflow-hidden">
            {/* Imagem do avatar */}
            <Image
              source={require("../../assets/images/avatar.png")}
              style={{
                width: 45,
                height: 45,
              }}
              resizeMode='cover'
            />
          </View>

          {/* Icone de Notificação e icone de busca */}
          <View className="flex-row space-x-4">
            <BellIcon size={30} strokeWidth={2} color={"white"} />
            <TouchableOpacity onPress={() => navegacao.navigate("Busca")}>
              <MagnifyingGlassIcon
                size={30} strokeWidth={2} color={"white"}
              />
            </TouchableOpacity>
          </View>

        </View>

        {/* Cards de filmes */}

        {
          isTrendingLoading ? (
            <Loading />
          ) : (
            <ScrollView>
              {/* Filmes em alta */}
              {tendencias?.length > 0 && <TrendingMovies data={tendencias} />}

              {/* Filmes Popular */}
              {popular?.length > 0 && <PopularMovie title="Popular" data={popular} />}

              {/* Filmes mais avaliados */}
              {maisAvaliados?.length > 0 && <TopRatedMovies title={"Bem Avaliados"} data={maisAvaliados} />}
            </ScrollView>
          )
        }

      </ScrollView>
    </View>
  );
}
