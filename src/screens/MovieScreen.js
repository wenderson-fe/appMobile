import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image, Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchMovieCredits, fetchMovieDetails, image500 } from '../../utils/moviesApi';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import Cast from '../components/Cast';

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
    // Extrai os parâmetros da rota atual e atribui à variável 'item'
    const { params: item } = useRoute();
    const navegacao = useNavigation();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);

    // É executado sempre que o valor de item mudar
    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
    }, [item]);

    // Função para pegar os detalhes do filme
    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        setLoading(false);
        if (data) {
            //Sobrescreve os dados
            setMovie({ ...movie, ...data });
        }
    };

    // Função para pegar o elenco do filme
    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id);
        if (data) {
            setCast(data.cast);
        }
    };

    // console.log("Detalhes do Filme", movie);

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 20,
                flexGrow: 1,
            }}
            className="flex-1 ng-neutral-900"
        >
            {/* Botão de voltar e card do filme*/}
            <View className="w-full">

                {/* Icone de voltar e icone de coração*/}
                <View className="z-20 w-full flex-row justify-between items-center px-4 mt-12 absolute">

                    {/* Icone de voltar */}
                    <View className="bg-red-700 p-2 rounded-full items-center justify-center">
                        <TouchableOpacity onPress={() => navegacao.goBack()}>
                            <ChevronLeftIcon size={20} strokeWidth={2} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Icone de coração */}
                    <View className="bg-red-700 p-2 rounded-full items-center justify-center">
                        <TouchableOpacity>
                            <HeartIcon
                                size={20}
                                strokeWidth={2}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Imagem do filme */}
                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image
                            source={{
                                uri:
                                    image500(movie.poster_path),
                            }}
                            style={{
                                width,
                                height: height * 0.55,
                            }}
                        />
                    </View>
                )}
            </View>

            {/* Detalhes do filme */}
            <View
                className="space-y-3 flex-1 bg-white relative py-4 mt-[-98] overflow-hidden"
                style={{
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}
            >
                <Image
                    source={require("../../assets/images/homescreen.png")}
                    style={{
                        width,
                        height,
                    }}
                    resizeMode="cover"
                    className="absolute top-0 left-0"
                />

                {/* Titulo */}
                <View className="space-y-3 p-4">
                    <Text className="text-white text-left text-2xl font-bold tracking-widest">
                        {movie?.title}
                    </Text>

                    {/* Gêneros */}
                    <Text className="flex-row space-x-2">
                        {/* Mapeia e itera sobre cada gênero do filme */}
                        {movie?.genres?.map((genre, index) => {
                            let mostraPonto = index + 1 != movie.genres.length;

                            return (
                                <Text
                                    key={index}
                                    className="text-neutral-400 font-semibold text-base text-center"
                                >
                                    {genre?.name} {mostraPonto ? "• " : null}
                                </Text>
                            );
                        })}
                    </Text>

                    {/* Descrição */}
                    <Text className="text-neutral-300 text-sm tracking-widest leading-6">{movie?.overview}
                    </Text>

                    {/* Elenco */}
                    {
                        movie?.id && cast.length > 0 && (
                            <Cast navigation={navegacao} cast={cast} />
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
}