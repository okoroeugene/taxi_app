import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Dimensions,
} from "react-native";
import {
    Item,
    Input,
    InputGroup,
    Icon,
    Card,
    CardItem
} from "native-base";
import styles from "./MapSearchStyles";
import Text from '../../config/AppText';

const truncateLength = 38;
const MapSearch = ({ toggleSearchModal, getAddressPredictions, getInputData, selectedAddress }) => {
    function handleSearch(key, val) {
        getInputData({
            key,
            value: val
        });
        getAddressPredictions();
    }
    return (
        <View style={styles.searchBox}>
            <View style={{ marginTop: 20, padding: 15 }}>
                {/* <Item style={[{ backgroundColor: "white" }, styles.cardShadow]} regular>
                    <Input
                        style={[styles.mainInput]}
                        placeholderTextColor={"#bbb"}
                        onFocus={() => toggleSearchModal("pickUp")}
                        onChangeText={handleSearch.bind(this, "pickUp")}
                        value={selectedAddress && selectedAddress["pickUp"] ? selectedAddress.pickUp.name : ""}
                    />
                    <TouchableOpacity>
                        <Icon style={{ color: "#bbb" }} type="Ionicons" name="locate" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={{ color: "#bbb" }} type="Ionicons" name="mic" />
                    </TouchableOpacity>
                </Item> */}
                <Card style={[{ padding: 0 }, styles.cardShadow]}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 15, padding: 10 }}>
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
                        <View style={{ flex: 1, flexDirection: "column", position: "relative", right: 10 }}>
                            <TouchableOpacity onPress={() => toggleSearchModal("pickUp")}>
                                <CardItem
                                    onPress={() => toggleSearchModal("pickUp")}
                                    style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                    <Text style={{ color: "#bbb", paddingLeft: 8, fontSize: 10 }}>Pick Up</Text>
                                    <Text style={{ paddingLeft: 8, fontSize: 14, fontFamily: 'NoirPro-Medium', color: "#898989" }}>
                                        {selectedAddress && selectedAddress["pickUp"] && selectedAddress.pickUp.name.length > truncateLength ? `${selectedAddress.pickUp.name.substring(0, truncateLength)}...` : selectedAddress.pickUp && selectedAddress.pickUp.name.length < truncateLength ? selectedAddress.pickUp.name : "Select a Pick Up location"}
                                    </Text>
                                </CardItem>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 0.3, borderColor: "#ccc", width: "93%", alignSelf: "flex-end" }}></View>
                            <TouchableOpacity onPress={() => toggleSearchModal("dropOff")}>
                                <CardItem
                                    onPress={() => toggleSearchModal("dropOff")}
                                    style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                    <Text style={{ color: "#bbb", paddingLeft: 8, fontSize: 10 }}>Destination</Text>
                                    <Text style={{ paddingLeft: 8, fontSize: 14, fontFamily: 'NoirPro-Medium', color: "#898989" }}>
                                        {selectedAddress && selectedAddress["dropOff"] && selectedAddress.dropOff.name.length > truncateLength ? `${selectedAddress.dropOff.name.substring(0, truncateLength)}...` : selectedAddress.dropOff && selectedAddress.dropOff.name.length < truncateLength ? selectedAddress.dropOff.name : "Select Destination"}
                                    </Text>
                                </CardItem>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

export default MapSearch;