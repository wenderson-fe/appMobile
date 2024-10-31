import axios from 'axios';

// Define a URL base da API
const kanyeBaseUrl = "https://api.kanye.rest";

// Função para fazer a requisição à API
const kanyeApiCall = async (endpoint) => {
    const options = {
        method: "GET",
        url: `${kanyeBaseUrl}${endpoint}`,
    };
    try {
        const response = await axios.request(options);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.log(error);
        return {}; // Retorna um objeto vazio em caso de erro
    }
};

// Função para buscar uma citação do Kanye
export const fetchKanyeQuote = () => {
    return kanyeApiCall('/');
};
