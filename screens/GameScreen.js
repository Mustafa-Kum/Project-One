import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value) => (<View key={value} style={styles.listItem}><Text style={styles.text}>{value}</Text></View>);

const GameScreen = props => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.Opponent}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name="md-remove" size={24} color="white" /> </MainButton>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}
        ><Ionicons name="md-add" size={24} color="white" /></MainButton>
      </Card>
      <View style={styles.app} >
        {pastGuesses.map(guess => renderListItem(guess))}

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 15 : 8,
    width: 300,
    maxWidth: '90%'
  },
  Opponent: {
    fontWeight: 'bold',
    fontSize: 24
  },
  listItem: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: colors.accent,
    overflow: 'hidden',
    marginVertical: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 10,
    alignContent: 'space-around',
    flexWrap: 'wrap'


  },
  text: {
    fontSize: 20,
    color: colors.accent,
    fontWeight: 'bold',
  },
  app: {
    alignContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width > 500 ? '60%' : '95%',
    paddingLeft: 7,

  },
});

export default GameScreen;
