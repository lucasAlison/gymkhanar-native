import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Headline, Drawer } from 'react-native-paper';
import { useHistory } from "react-router-native";

const AppBar = ({enableMenu, enableBell, enableBack}) => {
    let history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    const [active, setActive] = React.useState('');

    return (
        <View>
            <Appbar.Header>
                {enableBack && <Appbar.BackAction onPress={goBack} />}
                {enableMenu && <Appbar.Action icon="menu" onPress={() => {}} />}
                <Appbar.Content title="GymkhanarAR" />
                {enableBell && <Appbar.Action icon="bell" onPress={() => {}} />}
            </Appbar.Header>
            {/*
            <Drawer.Section title="Some title">
                <Drawer.Item
                  label="First Item"
                  active={active === 'first'}
                  onPress={() => setActive('first')}
                />
                <Drawer.Item
                  label="Second Item"
                  active={active === 'second'}
                  onPress={() => setActive('second')}
                />
            </Drawer.Section> */}
        </View>
    );
}

export default AppBar;
