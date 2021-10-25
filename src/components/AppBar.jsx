import React from 'react';
import { StyleSheet, View, DrawerLayoutAndroid } from 'react-native';
import { Appbar, Headline, Menu, Button } from 'react-native-paper';
import { DrawerActions, useRoute } from '@react-navigation/native';

const AppBar = ({navigation, previous}) => {
    const route = useRoute().name;
    const enableMenu = ["Home"].includes(route);
    return (
        <Appbar.Header>
            {previous && <Appbar.BackAction onPress={navigation.goBack} />}
            {/* {enableMenu && <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />} */}
            <Appbar.Content title="GymkhanAR" />
            {enableMenu && <Appbar.Action icon="bell" onPress={() => {}} />}
        </Appbar.Header>
    )
}

export default AppBar;
