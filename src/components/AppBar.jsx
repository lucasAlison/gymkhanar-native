import React from 'react';
import { StyleSheet, BackHandler  } from 'react-native';
import { Appbar, Headline } from 'react-native-paper';
import { useHistory } from "react-router-native";

const AppBar = ({enableMenu, enableBell, enableBack}) => {
    let history = useHistory();

    const goBack = () => {
        if(history.length > 0){
            history.goBack();
        }else {
            BackHandler.exitApp();
        }
    }

    return (
        <Appbar.Header>
            {enableBack && <Appbar.BackAction onPress={goBack} />}
            {enableMenu && <Appbar.Action icon="menu" onPress={() => {}} />}
            <Appbar.Content title="GymkhanarAR" />
            {enableBell && <Appbar.Action icon="bell" onPress={() => {}} />}
        </Appbar.Header>
    );
}

export default AppBar;
