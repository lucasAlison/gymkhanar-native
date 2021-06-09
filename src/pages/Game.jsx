import React from 'react';
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import * as Linking from 'expo-linking';

//map easy name to unity scene name
const types = {
    "object": "areaHunt",
    "image": "imageChestQuest"
};

const Game = ({route}) => {
    const { type } = route.params;
    let url = 'unitydl://gymkhanar';
    Linking.openURL(url+"?123;"+types[type]);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Subheading>
              Carregando o Jogo...
          </Subheading>
      </View>
    );
}

export default Game;
