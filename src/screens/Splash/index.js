import React, { Component } from "react";
import { View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";

class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'RiderMap' })],
        });

        setTimeout(() => this.props.navigation.dispatch(resetAction), 4000)
    }

    startHome() {
        this.props.navigation.navigate('RiderMap')
    }

    startLogin() {

    }

    render() {
        return (
            <LinearGradient
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                start={{ x: 1, y: 2 }} end={{ x: 1, y: 0 }} colors={['#F2784E', '#FF4531', '#ED5768']}>
                <Icon
                    style={{ fontSize: 80, color: "white" }}
                    type="Ionicons"
                    name="ios-car" />
            </LinearGradient>
        );
    }
}

export default Splash;
