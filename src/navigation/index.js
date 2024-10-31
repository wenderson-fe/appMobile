import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "../screens/WelcomeScreen";
import SearchScreen from "../screens/SearchScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import MovieScreen from '../screens/MovieScreen';

// Criando navegação do tipo Stack(Pilha)
const Stack = createNativeStackNavigator();
// Navegador de abas
const Tab = createBottomTabNavigator();

export default function AppNavigation() {

  //Definindo navegação do tipo pilha
  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Bem Vindo" //primeira tela exibida
      >
        {/* Telas */}
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Bem Vindo" component={WelcomeScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />

      </Stack.Navigator>
    );
  }

  //Definindo navegação por abas
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Adicionado para remover o cabeçalho
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Define qual ícone usar baseado na rota
            if (route.name === 'Início') {
              iconName = 'home'; // Ícone para a aba Home
            } else if (route.name === 'Busca') {
              iconName = 'search'; // Ícone para a aba Busca
            }

            // Retorna o ícone com a cor apropriada
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white', // Cor do ícone ativo
          tabBarInactiveTintColor: 'gray', // Cor do ícone inativo
          tabBarStyle: {
            backgroundColor: '#1F1D2B',
            borderTopWidth: 0,
            paddingBottom: 10,
          },
        })}
      >
        {/* Abas */}
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Busca" component={SearchScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}