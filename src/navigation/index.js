import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import SplashScreen from '../screens/Splash';
import RiderMapScreen from '../screens/RiderMap';

const AppNavigator = createStackNavigator({
    Splash: SplashScreen,
    RiderMap: RiderMapScreen
},
    {
        initialRouteName: "Splash",
        headerMode: "none"
    }
);

const MyDrawerNavigator = createDrawerNavigator({
    RiderMap: {
        screen: RiderMapScreen,
    },
});

export default createAppContainer(MyDrawerNavigator);