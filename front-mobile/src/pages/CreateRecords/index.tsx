import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';
import RNPickerSelect from 'react-native-picker-select';
import { Value } from 'react-native-reanimated';
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const placeHolder = {
    label: 'Selecione o Game',
    value: null
}

const BASE_URL = 'http://192.168.43.210:8080';

const mapSelectValue = (games: Game[]) => {
    return games.map(game => ({
        ...game, //Pega todos os atributos do type Game
        label: game.title,
        value: game.id,
    }));
}

const CreateRecords = () => {

    const [platform, setPlatform] = useState<GamePlatform>();
    const [selectedGame, setSelectedGame] = useState('');
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleChangePlatform = (selectedPlatform: GamePlatform) => {
        setPlatform(selectedPlatform);
        const gamesByPlatform = allGames.filter(game => game.platform === selectedPlatform);
        setFilteredGames(gamesByPlatform);
    }

    const handleSubmit = () => {
        const payload = ({name, age, gameId: selectedGame});
        
        axios.post(`${BASE_URL}/records`, payload)
            .then(() => {
                Alert.alert('Dados Salvos Com Sucesso!');
                setName('');
                setAge('');
                setSelectedGame('');
                setPlatform(undefined);
            }).catch(() => Alert.alert('Erro ao Cadastrar os dados!'));
    }

    useEffect (() => {
        axios.get(`${BASE_URL}/games`).then(response => {
            const selectValue = mapSelectValue(response.data);
            setAllGames(selectValue);
        }).catch(() => Alert.alert('Erro ao Listar os Games!'));
    }, []);

    return ( 
        <>
            <Header />
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputText}
                    placeholder="Nome"
                    placeholderTextColor="#9E9E9E"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <TextInput 
                    keyboardType="numeric"
                    style={styles.inputText}
                    placeholder= "Idade"
                    placeholderTextColor="#9E9E9E"
                    maxLength={2}
                    onChangeText={text => setAge(text)}
                    value={age}
                />
                <View style={styles.platformContainer}>
                    <PlatformCard 
                        platform='PC'
                        icon="laptop"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    />
                    <PlatformCard 
                        platform='XBOX'
                        icon="xbox"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    />
                    <PlatformCard 
                        platform='PLAYSTATION'
                        icon="playstation"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    />
                </View>
                <RNPickerSelect 
                    onValueChange={Value => 
                        setSelectedGame(Value)
                    }
                    placeholder={placeHolder}
                    value={selectedGame}
                    items={filteredGames}
                    style={pickerSelectStyles}
                    Icon={() => {
                        return <Icon name="chevron-down" color='#9E9E9E' size={25}/>
                    }}
                />
                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            SALVAR
                        </Text>
                    </RectButton>
                </View>
            </View>

        </>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 30,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    inputAndroid: {
      fontSize: 30,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    placeholder: {
      color: '#9E9E9E',
      fontSize: 30,
      fontFamily: "Play_700Bold",
    },
    iconContainer: {
      top: 10,
      right: 12,
    }
  });

const styles = StyleSheet.create({
    container: {
      marginTop: '15%',
      paddingRight: '5%',
      paddingLeft: '5%',
      paddingBottom: 50
    },
    inputText: {
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      fontFamily: "Play_700Bold",
      fontSize: 16,
      paddingLeft: 20,
      marginBottom: 21
    },
    platformContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footer: {
      marginTop: '15%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#00D4FF',
      flexDirection: 'row',
      borderRadius: 10,
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontFamily: "Play_700Bold",
      fontWeight: 'bold',
      fontSize: 18,
      color: '#0B1F34',
    }
  });

export default CreateRecords;