import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';
import { NativeRouter, Route, Switch, Redirect } from "react-router-native";
import AppBar from "./src/components/AppBar";
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

const App = () => {
  return (
    <Provider theme={theme}>
        <NativeRouter>
            <StatusBar style="auto" />
            <Switch>
                <Redirect from="/" to="/user/" exact/>
                <Route path="/user">
                    <AppBar enableBack>
                        <Switch>
                            <Route exact path="/user/" component={Login} />
                            <Route exact path="/user/confirm" component={Confirm} />
                            <Route exact path="/user/register" component={Register} />
                            <Route exact path="/user/team" component={Team} />
                        </Switch>
                    </AppBar>
                </Route>
                <Route path="/home">
                    <AppBar enableBell enableMenu>
                        <Route exact path="/home/" component={Home} />
                    </AppBar>
                </Route>
                <Route exact path="/game" component={Game} />
            </Switch>
        </NativeRouter>
    </Provider>
  );
}

export default App;
