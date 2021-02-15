import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider, Headline } from 'react-native-paper';
import { NativeRouter, Route, Switch } from "react-router-native";
import Login from './src/pages/Login';
import Confirm from './src/pages/Confirm';
import Register from './src/pages/Register';

const styles = StyleSheet.create({
  heading: {
    paddingTop: 100,
    fontSize: 50,
    textAlign: 'center',
  },
});

const theme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#f2f2f2',
    primary: '#12a548',
    accent: '#12a548',
  },
};

const App = () => {
  return (
    <Provider theme={theme}>
        <NativeRouter>
            <StatusBar style="auto" />
            <Switch>
                <Route path="/">
                    <Headline style={styles.heading}>GymkhanarAR</Headline>
                    <Switch>
                      <Route exact path="/" component={Login} />
                      <Route exact path="/confirm" component={Confirm} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/team" component={Login} />
                    </Switch>
                </Route>
                <Route exact path="/home" component={Login} />
                <Route exact path="/game" component={Login} />
            </Switch>
        </NativeRouter>
    </Provider>
  );
}

export default App;
