import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';
import { NativeRouter, Route } from "react-router-native";
import Home from "./src/pages/Home";

const theme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#f2f2f2',
    primary: '#12a548',
    accent: '#aa9834',
  },
};

const App = () => {
  return (
    <Provider theme={theme}>
        <NativeRouter>
            <StatusBar style="auto" />
            <Route exact path="/" component={Home} />
        </NativeRouter>
    </Provider>
  );
}

export default App;
