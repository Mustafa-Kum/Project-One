import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';

import colors from '../constants/colors';
import SecondButton from '../components/SecondButton';

const GameOverScreen = props => {
  ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.DEFAULT);
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.bold}>The Game is Over!</Text>
        <View style = {styles.imagecontainer}>
          <Image 
          source={require('../assets/success.png')} 
          style = {styles.image}
          resizeMode = "cover" 
          />
        </View>
        <View style = {styles.resultContainer}>  
          <Text 
          style = {styles.yourphone}>Your phone needed <Text style = {styles.highlight}>{props.roundsNumber}</Text> Rounds to guess the Number is <Text style = {styles.highlights}>{props.userNumber}</Text> </Text>
          
        </View>
          <SecondButton onPress={props.onRestart} >
            Play Again
          </SecondButton>   
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 25,

  },

  imagecontainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
    },

  image: {
    width: 300,
    height: 300
  },

  bold: {
    fontFamily: 'ubuntu-bold',
    fontSize: 21,

  },
  highlight: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 17,
        
  },

  highlights: {
    fontWeight: 'bold',
    color:  colors.accent,
    fontSize: 17,
  },

  yourphone: {
    fontFamily: 'ubuntu-bold',
    fontSize: Dimensions.get('window').height / 20 < 400 ? 17 : 20,
    textAlign: 'center',
    
  },

  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },


});

export default GameOverScreen;
