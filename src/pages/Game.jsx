import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import * as Linking from 'expo-linking';
// import { WebView } from 'react-native-webview';

const Game = () => {
  let url = 'unitydl://gymkhanar';
  Linking.openURL(url);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Subheading>
            Carregando o Jogo...
        </Subheading>
        {/*<WebView source={{ uri: 'https://expo.io' }} style={{ marginTop: 20 }}/>*/}
    </View>
  );
}

export default Game;
