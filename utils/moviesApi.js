import { movieApiKey } from "./apiKey";
import axios from "axios";

//Endpoints
const language = "&language=pt-BR";
const tmBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${tmBaseUrl}/trending/movie/day?api_key=${movieApiKey}${language}`;
const popularMoviesEndpoint = `${tmBaseUrl}/movie/popular?api_key=${movieApiKey}${language}`;
const upComingMoviesEndpoint = `${tmBaseUrl}/movie/upcoming?api_key=${movieApiKey}${language}`;
const topRatedMoviesEndpoint = `${tmBaseUrl}/movie/top_rated?api_key=${movieApiKey}${language}`;
const genresEndpoint = `${tmBaseUrl}/genre/movie/list?api_key=${movieApiKey}${language}`;
const searchMoviesEndpoint = `${tmBaseUrl}/search/movie?api_key=${movieApiKey}`;


//Detalhes de filmes endpoint
const movieDetailsEndpoint = (id) =>
    `${tmBaseUrl}/movie/${id}?api_key=${movieApiKey}${language}`;

//Creditos de filmes endpoint
const movieCreditsEndpoint = (id) =>
    `${tmBaseUrl}/movie/${id}/credits?api_key=${movieApiKey}${language}`;

//Chamada da API para obter filmes
const movieApiCall = async (endpoints, params) => {
    const options = {
        method: "GET",
        url: endpoints,
        params: params ? params : {},
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
};

//Função para pegar imagens de diferentes tamanhos
export const image500 = (posterpath) =>
    posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;

// Busca filmes em alta
export const fetchTrendingMovie = () => {
    return movieApiCall(trendingMoviesEndpoint);
};

// Busca filmes populares
export const fetchPopularMovie = () => {
    return movieApiCall(popularMoviesEndpoint);
};

// Busca filmes que estão por vir
export const fetchUpComingMovie = () => {
    return movieApiCall(upComingMoviesEndpoint);
};

// Busca filmes mais bem avaliados
export const fetchTopRatedMovie = () => {
    return movieApiCall(topRatedMoviesEndpoint);
};

// Busca a lista de gêneros de filmes
export const fetchGenres = () => {
    return movieApiCall(genresEndpoint);
};

// Busca os detalhes de um filme específico pelo seu ID
export const fetchMovieDetails = (id) => {
    return movieApiCall(movieDetailsEndpoint(id));
};

// Busca os creditos de um filme específico pelo seu ID
export const fetchMovieCredits = (movieId) => {
    return movieApiCall(movieCreditsEndpoint(movieId));
};

// Busca um filme pela tela de busca
export const searchMovies = (params) => {
    return movieApiCall(searchMoviesEndpoint, params);
};


