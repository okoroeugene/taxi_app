import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import SplashScreen from '../screens/Splash';
import RiderMapScreen from '../screens/RiderMap';
import LocateDriver from '../screens/LocateDriver';
import { Container, Header, Body, Image, Thumbnail, Content } from "native-base";
// import drawerContentComponents from "../components/Drawer";

const AppNavigator = createStackNavigator({
    Splash: SplashScreen,
    RiderMap: RiderMapScreen,
    LocateDriver: LocateDriver
},
    {
        initialRouteName: "Splash",
        headerMode: "none"
    }
);

const drawerContentComponents = (props) => (
    <Container>
        <Header style={{ height: 200 }}>
            <Body>
                <Thumbnail source={require('../imgs/avatar.png')} />
            </Body>
        </Header>
        <Content>
            <DrawerNavigatorItems {...props} />
        </Content>
    </Container>
);

const MyDrawerNavigator = createDrawerNavigator({
    RiderMap: {
        screen: AppNavigator,
    },
}, {
    contentComponent: drawerContentComponents
});

export default createAppContainer(MyDrawerNavigator);