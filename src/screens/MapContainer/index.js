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

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const MapContainer = ({ region, routeCoordinates, coordinate, selectedAddress, toggleDrawer }) => {
    const { pickUp, dropOff } = selectedAddress;
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showUserLocation
                followUserLocation
                loadingEnabled
                // onRegionChange
                region={region}
            >
                {/* <Polyline coordinates={routeCoordinates} strokeWidth={5} /> */}
                <Marker.Animated
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={coordinate}
                />

                {pickUp &&
                    <MapView.Marker
                        coordinate={{ latitude: pickUp.latitude, longitude: pickUp.longitude }}
                        pinColor="green"
                    />
                }
                {dropOff &&
                    <MapView.Marker
                        coordinate={{ latitude: dropOff.latitude, longitude: dropOff.longitude }}
                        pinColor="blue"
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