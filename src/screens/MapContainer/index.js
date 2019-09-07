import React from "react";
import {
    StyleSheet,
    View,
    Text,
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
import {
    Item,
    Input,
    InputGroup,
    Icon
} from "native-base";
import styles from "./MapContainerStyles";
import Animated from "react-native-reanimated";
import MapViewDirections from 'react-native-maps-directions';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const API_KEY = "AIzaSyA-HjztLKyWGOUaIG9Bx_n6Ie_A5p1qMkQ";
const MapContainer = ({ region, coordinate, selectedAddress, toggleDrawer, zoomIn, zoomOut, mapRef }) => {
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
                loadingEnabled
                // onRegionChange={changeRegion}
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
                <Marker.Animated
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={coordinate}
                />

                {pickUp &&
                    <MapView.Marker
                        coordinate={{ latitude: pickUp.location.latitude, longitude: pickUp.location.longitude }}
                        pinColor="green"
                        title="Pick Up"
                    >
                        <Animated.View style={[styles.markerWrap]}>
                            <Animated.View style={[styles.ring]} />
                            <View style={styles.marker} />
                        </Animated.View>
                    </MapView.Marker>
                }
                {dropOff &&
                    <MapView.Marker
                        coordinate={{ latitude: dropOff.location.latitude, longitude: dropOff.location.longitude }}
                        pinColor="blue"
                        title="Drop Off"
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

            <View style={styles.searchBox}>
                <Icon
                    onPress={() => toggleDrawer()}
                    style={{ marginTop: 50, padding: 20, fontSize: 40 }}
                    type="Ionicons"
                    name="ios-menu"
                />
                {/* <View style={{ marginTop: 20, padding: 20 }}>
                    <Item style={[{ backgroundColor: "white" }, styles.cardShadow]} regular>
                        <Text style={{ color: "#bbb", paddingLeft: 8 }}>From</Text>
                        <Input
                            style={[styles.mainInput]}
                            placeholderTextColor={"#bbb"}
                            onFocus={() => this.toggleSearchModal()}
                        />
                        <TouchableOpacity>
                            <Icon style={{ color: "#bbb" }} type="Ionicons" name="locate" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={{ color: "#bbb" }} type="Ionicons" name="mic" />
                        </TouchableOpacity>
                    </Item>

                    <Item style={[{ backgroundColor: "white", position: "relative", bottom: 10 }, styles.cardShadow]} regular>
                        <Text style={{ color: "#bbb", paddingLeft: 8 }}>To</Text>
                        <Input
                            style={[styles.mainInput]}
                            placeholderTextColor={"#bbb"}
                        />
                        <TouchableOpacity>
                            <Icon style={{ color: "#bbb" }} type="Ionicons" name="mic" />
                        </TouchableOpacity>
                    </Item>
                </View> */}
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