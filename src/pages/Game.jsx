import React from 'react';
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { useRoute } from '@react-navigation/native';

//map easy name to unity scene name
const types = {
    "object": "areaHunt",
    "image": "imageChestQuest"
};

const Game = ({navigation}) => {
    const route = useRoute();
    console.log(route);
    // const { type } = navigation.params;
    // let url = 'unitydl://gymkhanar';
    // Linking.openURL(url+"?123;"+types[type]);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Subheading>
              Carregando o Jogo...
          </Subheading>
      </View>
    );
}

export default Game;
