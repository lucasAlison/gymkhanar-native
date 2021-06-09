import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';
/* Navegation */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
/* created */
import AppBar from './src/components/AppBar'
import Confirm from './src/pages/Confirm';
import Game from './src/pages/Game';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Team from './src/pages/Team';

const theme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#effeef',
    primary: '#12a548',
    accent: '#12a548',
  },
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeGame = () => {
    return (
      <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Object" component={Game} initialParams={{type : "object"}} />
          <Drawer.Screen name="Image" component={Game} initialParams={{type : "image"}} />
      </Drawer.Navigator>
    );
}

const App = () => {
  return (
    <Provider theme={theme}>
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{header: (props) => <AppBar {...props}/>}}
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Confirm" component={Confirm}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Team" component={Team}/>
                <Stack.Screen name="Home" component={HomeGame}/>
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

export default App;
