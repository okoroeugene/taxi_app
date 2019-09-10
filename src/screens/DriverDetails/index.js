import React from "react";
import {
    View,
    TouchableOpacity,
} from "react-native";
import {
    Thumbnail, Icon, Card, CardItem
} from "native-base";
import styles from "./DriverDetailsStyles";
import Text from '../../config/AppText';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';

const DriverDetails = ({ driverDetails }) => {
    return (
        <View style={styles.searchBox}>
            <View style={{ marginTop: 20, padding: 15 }}>
                <Card style={[{ padding: 0 }, styles.cardShadow]}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                            {/* <CardItem style={{ backgroundColor: "red" }} header>
                                <Text>NativeBase</Text>
                            </CardItem> */}
                            <CardItem
                                onPress={() => toggleSearchModal("pickUp")}
                                style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                        >
                                            <Thumbnail
                                                style={{ width: 40, height: 40 }}
                                                source={require('../../imgs/avatar.png')} />
                                        </TouchableOpacity>
                                        <View style={{ paddingLeft: 10, alignItems: "flex-start" }}>
                                            <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 18 }}>{driverDetails.name}</Text>
                                            <AirbnbRating
                                                count={5}
                                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                                defaultRating={5}
                                                showRating={false}
                                                size={10}
                                            // starStyle={{ justifyContent: "flex-start" }}
                                            />
                                            <Text style={{ fontSize: 12, fontFamily: 'NoirPro-Medium' }}>38 Orders</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={{ color: "#bbb", fontSize: 12 }}>{driverDetails.plate_number}</Text>
                                    </View>
                                </View>
                            </CardItem>
                            <View style={{ borderWidth: 0.3, borderColor: "#F0F1F3", width: "93%", alignSelf: "flex-end" }}></View>
                            <TouchableOpacity onPress={() => toggleSearchModal("dropOff")}>
                                <CardItem
                                    onPress={() => toggleSearchModal("dropOff")}
                                    style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <View>
                                        <Icon
                                            style={{ color: "#898989" }}
                                            type="Ionicons"
                                            name="ios-call" />
                                    </View>
                                    <View
                                        style={{
                                            borderLeftWidth: 1,
                                            height: 30,
                                            borderLeftColor: '#F0F1F3',
                                        }}
                                    />
                                    <View>
                                        <Icon
                                            style={{ color: "#898989" }}
                                            type="Ionicons"
                                            name="ios-chatbubbles" />
                                    </View>
                                </CardItem>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

export default DriverDetails;