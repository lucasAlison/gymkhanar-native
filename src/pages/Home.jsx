import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from "react-router-native";
import { Title, Headline, Button, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    padding: 5,
    justifyContent: 'space-evenly',
  },
  heading: {
    paddingTop: 45,
    fontSize: 50,
    textAlign: 'center',
  },
});

const Home = () => {
  const onPress = () => {
      console.log('Pressed')
  }
  const [text, setText] = React.useState('');
  return (
    <View style={styles.container}>
        <Headline style={styles.heading}>GymkhanarAR</Headline>
        <TextInput
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
        />
        <Button mode="contained" onPress={onPress}>
              Press me {text}
        </Button>
    </View>
  );
}

export default Home;
