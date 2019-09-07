import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Dimensions
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import haversine from "haversine";
import {
    Item,
    Input,
    InputGroup,
    Icon
} from "native-base";
import styles from "./RiderMapStyles";
// import AutoComplete from "../AutoComplete";
import MapContainer from "../MapContainer";
import MapSearch from "../MapSearch";
import SearchResult from "../SearchResults";
import BookingDetails from '../BookingDetails';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class RiderMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputTxt: false,
            mapRef: {},
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: this.props.home.location.coords.latitude || 0,
                longitude: this.props.home.location.coords.longitude || 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            })
        };
        this.mapRef = this.mapRef.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentLocation();
        // const { coordinate } = this.state;
        // this.requestCameraPermission();

        // this.watchID = Geolocation.watchPosition(
        //     position => {
        //         const { routeCoordinates, distanceTravelled } = this.state;
        //         const { latitude, longitude } = position.coords;

        //         const newCoordinate = {
        //             latitude,
        //             longitude
        //         };
        //         console.log({ newCoordinate });

        //         if (Platform.OS === "android") {
        //             if (this.marker) {
        //                 this.marker._component.animateMarkerToCoordinate(
        //                     newCoordinate,
        //                     500
        //                 );
        //             }
        //         } else {
        //             coordinate.timing(newCoordinate).start();
        //         }

        //         this.setState({
        //             latitude,
        //             longitude,
        //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //             distanceTravelled:
        //                 distanceTravelled + this.calcDistance(newCoordinate),
        //             prevLatLng: newCoordinate
        //         });
        //     },
        //     error => console.log(error),
        //     {
        //         enableHighAccuracy: true,
        //         timeout: 20000,
        //         maximumAge: 1000,
        //         distanceFilter: 10
        //     }
        // );
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.home.location && prevProps.home.location != this.props.home.location) {
            this.setState({
                region: {
                    latitude: prevProps.home.location.coords.latitude,
                    longitude: prevProps.home.location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            })
        }
        if (prevProps.home.selectedAddress && prevProps.home.selectedAddress != this.props.home.selectedAddress) {
            if (prevProps.home.selectedAddress.pickUp.location) {
                // this.props.updateInputAddress();
                this.setState({
                    region: {
                        latitude: prevProps.home.selectedAddress.pickUp.location.latitude,
                        longitude: prevProps.home.selectedAddress.pickUp.location.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                })
            }

            if (prevProps.home.selectedAddress.pickUp && prevProps.home.selectedAddress.dropOff) {
                const region = {
                    latitude: prevProps.home.selectedAddress.pickUp.location.latitude,
                    longitude: prevProps.home.selectedAddress.pickUp.location.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                this.onPressZoomIn(region);
            }
        }
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    toggleSearchModal = () => {
        this.setState({ inputTxt: true })
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Location Access Permission",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    onPressZoomIn(region) {
        this.region = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: LATITUDE_DELTA * 10,
            longitudeDelta: LONGITUDE_DELTA * 10
        }

        this.setState({
            region: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })
        setTimeout(() => {
            this.map.animateToRegion(this.region, 1000);
            this.map.animateCamera(
                {
                    center: {
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }
                }
            );
        }, 1000);
    }

    onPressZoomOut(region) {
        this.region = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: LATITUDE_DELTA / 10,
            longitudeDelta: LONGITUDE_DELTA / 10
        }
        this.setState({
            region: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })
        setTimeout(() => {
            this.map.animateToRegion(this.region, 100);
        }, 1000);
    }

    mapRef(ref) {
        this.map = ref;
    }

    render() {
        const width = Dimensions.get('screen').width;
        return (
            <View style={{ flex: 1 }}>
                {!this.props.home.toggle ? <View style={{ flex: 1 }}>
                    <MapContainer
                    ref={this.map}
                        region={this.state.region}
                        // routeCoordinates={this.state.routeCoordinates}
                        coordinate={this.state.coordinate}
                        selectedAddress={this.props.home.selectedAddress}
                        toggleDrawer={this.props.toggleDrawer}
                        zoomIn={this.onPressZoomOut}
                        zoomOut={this.onPressZoomOut}
                        mapRef={this.mapRef}
                    />
                    <MapSearch
                        toggleSearchModal={this.props.toggleSearchModal}
                        getAddressPredictions={this.props.getAddressPredictions}
                        getInputData={this.props.getInputData}
                        selectedAddress={this.props.home.selectedAddress}
                    />
                    {
                        this.props.home.selectedAddress.pickUp && this.props.home.selectedAddress.dropOff ?
                            <BookingDetails
                                distanceMatrix={this.props.home.distanceMatrix}
                                fare={this.props.home.fare}
                            /> : null
                    }
                </View> : <SearchResult
                        inputData={this.props.home.inputData}
                        resultTypes={this.props.home.resultTypes}
                        predictions={this.props.home.predictions}
                        getInputData={this.props.getInputData}
                        getAddressPredictions={this.props.getAddressPredictions}
                        getSelectedAddress={this.props.getSelectedAddress}
                        closeToggleModal={this.props.closeToggleModal}
                        searching={this.props.home.searching}
                        error={this.props.home.error}
                    />}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    home: state.home
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RiderMap);