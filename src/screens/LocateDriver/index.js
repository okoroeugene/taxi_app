import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import Text from '../../config/AppText';
import { FakeDrivers } from "../../fakers/fake_drivers";
var Spinner = require('react-native-spinkit');
import haversine from "haversine";

const { width, height } = Dimensions.get('screen');

class LocateDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: {},
            nearbyDrivers: [],
            nearestDriver: {}
        }
        // if (Object.keys(this.state.nearestDriver).length > 0 && this.state.nearestDriver.constructor === Object) {
        //     alert('Yass!! Driver Found')
        //     console.log(this.state.nearestDriver)
        // }
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const nearestDriver = navigation.getParam('nearestDriver', '');
        this.props.getNearbyDrivers();
    }

    goBack = (driver) => {
        const { navigation } = this.props;
        // const { routeName, key } = navigation.getParam('returnToRoute');
        navigation.state.params.onSelect(driver);
        navigation.goBack();
        // navigation.navigate({ routeName, key, nearestDriver: driver });
    }
    
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.home.nearbyDrivers && prevProps.home.nearbyDrivers !== this.props.home.nearbyDrivers) {
            // var e = Math.random() * prevProps.home.nearbyDrivers.length;
            // var k = Math.round(e);
            var nearestDriver = prevProps.home.nearbyDrivers.reduce((prev, curr) => curr.distance < prev.distance ? curr : prev);
            setTimeout(() => {
                this.goBack(nearestDriver);
            }, 3000);
        }
    }

    getDriver() {
        var lat = this.props.home.location.coords.latitude;
        var long = this.props.home.location.coords.longitude;
        var minDistance = 0;
        var driver = {};
        var userLocation = {
            latitude: this.props.home.location.coords.latitude,
            longitude: this.props.home.location.coords.longitude
        }
        FakeDrivers(lat, long).forEach(drivers => {
            let distance = haversine(userLocation, drivers.position);
            if (minDistance === 0 || minDistance > distance) {
                minDistance = distance;
                driver = Object.assign({}, drivers);
            }
        })
        return driver;
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 20, backgroundColor: "black" }}>
                <View style={{ alignItems: "center", marginTop: 20, padding: 50 }}>
                    <Spinner style={{ alignItems: "center" }} isVisible={true} size={150} type={"Bounce"} color={"#FFFFFF"} />
                    {/* <Image
                        style={{ width: width, height: 300 }}
                        source={require("../../imgs/spinner4.gif")} /> */}
                </View>
                <View>
                    <View style={{ padding: 30 }}>
                        <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 24, color: "white", textAlign: "center" }}>Locating nearby drivers, please wait...</Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {/* <View style={{ marginTop: 4 }}>
                                <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: "red", borderWidth: 2, position: "relative", right: 2.8 }}></View>
                                <View style={{ marginLeft: 2.5 }}>
                                    <Text style={{ lineHeight: 5, color: "white" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "white" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "white" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "white" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "white" }}>.</Text>
                                </View>
                                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: "#00A87E", alignItems: "center", justifyContent: "center", marginLeft: -5.5 }}>
                                    <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 12, color: "white" }} />
                                </View>
                            </View> */}
                            <View style={{ marginTop: 8 }}>
                                <View style={{ width: 12, height: 12, borderRadius: 12 / 2, marginLeft: -1.8, borderWidth: 1, borderColor: "#9C9C9C", alignItems: "center", justifyContent: "center" }}>
                                    <View style={{ height: 6, width: 6, borderRadius: 6 / 2, borderWidth: 1, borderColor: "#9C9C9C", backgroundColor: "#9C9C9C" }}></View>
                                </View>
                                <View style={{ marginLeft: 2.5, marginTop: 2 }}>
                                    <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                    <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                </View>
                                <View>
                                    <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 22, color: "#FF4531", marginLeft: -1.5 }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginRight: 250, paddingLeft: 20, width: "100%" }}>
                                <View>
                                    <Text style={{ color: "#bbb", fontSize: 10 }}>Pick Up</Text>
                                    <Text style={{ color: "white", fontFamily: 'NoirPro-Medium' }}>{this.props.home.selectedAddress.pickUp.name}</Text>
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ color: "#bbb", fontSize: 10 }}>Destination</Text>
                                    <Text style={{ color: "white", fontFamily: 'NoirPro-Medium' }}>{this.props.home.selectedAddress.dropOff.name}</Text>
                                </View>
                            </View>
                            {/* <View>
                                <Text style={{ color: "#bbb", fontSize: 10 }}>Pick Up</Text>
                                <Text style={{ color: "white", fontFamily: 'NoirPro-Medium' }}>{this.props.home.selectedAddress.pickUp.address}</Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ color: "#bbb", fontSize: 10 }}>Destination</Text>
                                <Text style={{ color: "white", fontFamily: 'NoirPro-Medium' }}>{this.props.home.selectedAddress.dropOff.address}</Text>
                            </View> */}
                            {/* <View>
                            <TouchableOpacity
                                style={{ height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: "#00A87E", justifyContent: "center" }} iconLeft dark>
                                <Icon style={{ fontSize: 17, textAlign: "center", alignItems: "center", color: "white" }} name='checkmark' />
                            </TouchableOpacity>
                        </View> */}
                        </View>

                    </View>
                </View>

                <View style={{ position: "absolute", bottom: 50, width: width }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        activeOpacity={0.7}>
                        <LinearGradient
                            style={{ width: "90%", height: 50, justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: 10 }}
                            start={{ x: 1, y: 2 }} end={{ x: 1, y: 0 }} colors={['#F2784E', '#FF4531', '#ED5768']}>
                            <Text style={{ color: "white", fontFamily: 'NoirPro-Medium', fontSize: 18 }}>Cancel</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    home: state.home
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocateDriver);