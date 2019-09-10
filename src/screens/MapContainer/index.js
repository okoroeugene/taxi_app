import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Dimensions,
    Image
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import {
    Item,
    Input,
    InputGroup,
    Icon,
} from "native-base";
import styles from "./MapContainerStyles";
import Animated from "react-native-reanimated";
import MapViewDirections from 'react-native-maps-directions';
import marker from '../../imgs/icons8-marker.png';
import pickUpMarker from '../../imgs/flag-pink.png';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const API_KEY = "AIzaSyA-HjztLKyWGOUaIG9Bx_n6Ie_A5p1qMkQ";
const MapContainer = ({ region, coordinate, selectedAddress, toggleDrawer, zoomIn, zoomOut, mapRef, nearestDriver, onRegionChange }) => {
    const { pickUp, dropOff } = selectedAddress;
    function changeRegion(region) {
        onRegionChange(region)
    }
    return (
        <View style={styles.mapContainer}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // showUserLocation
                followUserLocation={true}
                zoomEnabled={true}
                // onRegionChangeComplete={onRegionChange}
                // loadingEnabled
                // onLayout={() => mapRef && mapRef.fitToCoordinates(coordinate, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })}
                region={region}
            >
                {/* <Polyline coordinates={routeCoordinates} strokeWidth={5} /> */}
                {/* {pickUp && dropOff && routeDirections ? <Polyline coordinates={routeDirections[1].toArray()} strokeWidth={3} /> : null} */}

                {
                    pickUp && dropOff ?
                        <MapViewDirections
                            origin={pickUp.location.latitude + "," + pickUp.location.longitude}
                            destination={dropOff.location.latitude + "," + dropOff.location.longitude}
                            apikey={API_KEY}
                            strokeWidth={3}
                        /> : null
                }
                {/* <Marker.Animated
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={coordinate}
                /> */}

                {pickUp &&
                    <MapView.Marker
                        coordinate={pickUp.location}
                        image={pickUpMarker}
                        // pinColor="green"
                        title="Pick Up"
                    />
                }
                {dropOff &&
                    <MapView.Marker
                        coordinate={dropOff.location}
                        pinColor="blue"
                        title="Drop Off"
                    />
                }

                {nearestDriver && Object.keys(nearestDriver).length > 0 &&
                    <MapView.Marker
                        coordinate={nearestDriver.position}
                        // pinColor="yellow"
                        image={require('../../imgs/taxi1-sm.png')}
                        title="Driver Location"
                    />
                }

                {/* {
                    nearByDrivers && nearByDrivers.map((marker, index) =>
                        <MapView.Marker
                            key={index}
                            coordinate={{ latitude: marker.coordinate.coordinates[1], longitude: marker.coordinate.coordinates[0] }}
                            image={carMarker}
                        />
                    )
                } */}

            </MapView>

            <View style={styles.markerFixed}>
                <Image style={styles.marker} source={marker} />
            </View>

            <View style={styles.searchBox}>
                <Icon
                    onPress={() => toggleDrawer()}
                    style={{ marginTop: 50, padding: 20, fontSize: 40 }}
                    type="Ionicons"
                    name="ios-menu"
                />
            </View>
            {/* 
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.bubble, styles.button]}>
                    <Text style={styles.bottomBarContent}>
                        {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

export default MapContainer;