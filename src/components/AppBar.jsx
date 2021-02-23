import React from 'react';
import { StyleSheet, View, DrawerLayoutAndroid } from 'react-native';
import { Appbar, Headline, Menu, Button } from 'react-native-paper';
import { useHistory } from "react-router-native";

const AppBar = ({enableMenu, enableBell, enableBack, children}) => {
    const [drawerType, setDrawerType] = React.useState('');

    const drawer = React.useRef(null);

    let history = useHistory();

    React.useEffect(() => {
      if(drawer && drawer.current) drawer.current.openDrawer();
    }, [drawerType]);

    const openDrawer = (type) => {
        if(type === drawerType) {
            drawer.current.openDrawer();
        }else {
            setDrawerType(type);
        }
    }

    const menuDrawer = () => (
      <View>
        <Headline>I'm in the Drawer! MENU</Headline>
        <Button
          onPress={() => history.push('/game')}
        >Start Game</Button>
        <Button
          onPress={() => drawer.current.closeDrawer()}
        >Close drawer</Button>
      </View>
    );

    const bellDrawer = () => (
      <View>
        <Headline>I'm in the Drawer! BELL</Headline>
        <Button
          onPress={() => drawer.current.closeDrawer()}
        >Close drawer</Button>
      </View>
    );

    return (
        <React.Fragment>
            {(enableMenu || enableBell) && <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={250}
                drawerPosition={drawerType === 'menu'? 'left' : 'right'}
                renderNavigationView={drawerType === 'menu'? menuDrawer : bellDrawer}
            >
                <Appbar.Header>
                    {enableBack && <Appbar.BackAction onPress={history.goBack} />}
                    {enableMenu && <Appbar.Action icon="menu" onPress={() => openDrawer('menu')} />}
                    <Appbar.Content title="GymkhanAR" />
                    {enableBell && <Appbar.Action icon="bell" onPress={() => openDrawer('bell')} />}
                </Appbar.Header>
                {children}
            </DrawerLayoutAndroid>}
            {(!enableMenu && !enableBell) && <React.Fragment>
                <Appbar.Header>
                    {enableBack && <Appbar.BackAction onPress={history.goBack} />}
                    <Appbar.Content title="GymkhanAR" />
                </Appbar.Header>
                {children}
            </React.Fragment>}
        </React.Fragment>
    );
}

export default AppBar;
