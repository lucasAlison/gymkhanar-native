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
                <Appbar.Content title="GymkhanAR" />
                {enableBell && <Appbar.Action icon="bell" onPress={() => {}} />}
            </Appbar.Header>
        </View>
    );
}

export default AppBar;
