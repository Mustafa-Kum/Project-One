import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView,ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchfonts = () => {
  return Font.loadAsync({
    'ubuntu': require('./assets/Fonts/Ubuntu-Regular.ttf'),
    'ubuntu-bold': require('./assets/Fonts/Ubuntu-Bold.ttf'),
    'lemonmilk': require('./assets/Fonts/Lemonmilk-Bold.otf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (<AppLoading startAsync = {fetchfonts} onFinish = {() => setDataLoaded(true)} onError = {(err) => console.log(err)} />);
  }

  

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guessing AI"/>
        <ImageBackground source = {require('./assets/wat.jpg')} style={styles.screen}>
          {content}
        </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
