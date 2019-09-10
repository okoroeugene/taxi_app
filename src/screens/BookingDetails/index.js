import React from "react";
import {
    View,
    TouchableOpacity,
} from "react-native";
import {
    Item,
    Input,
    InputGroup,
    Icon,
    Thumbnail
} from "native-base";
import styles from "./BookingDetailsStyles";
import Text from '../../config/AppText';
import LinearGradient from 'react-native-linear-gradient';
var Spinner = require('react-native-spinkit');

const BookingDetails = ({ distanceMatrix, fare, requestRide }) => {
    return (
        <View style={styles.cardContainer}>
            {
                distanceMatrix && fare ? <View>
                    <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 15, textAlign: "center" }}>Taxi Lite</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.resetPractice()}
                            activeOpacity={0.7}
                        >
                            <Thumbnail
                                style={{ width: 80, height: 80, resizeMode: "contain" }}
                                source={require('../../imgs/taxi1.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                        <View style={{ marginTop: 7 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 15 }}>Distance:</Text>
                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>{distanceMatrix && distanceMatrix.rows[0].elements[0].distance.text} |</Text>
                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>{distanceMatrix && distanceMatrix.rows[0].elements[0].duration.text}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 25 }}>${fare}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => requestRide()}
                        activeOpacity={0.7}>
                        <LinearGradient
                            style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: 100 }}
                            start={{ x: 1, y: 2 }} end={{ x: 1, y: 0 }} colors={['#F2784E', '#FF4531', '#ED5768']}>
                            <Text style={{ color: "white", fontFamily: 'NoirPro-Medium', fontSize: 18 }}>Book Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* start={{ x: 1, y: 2 }} end={{ x: 1, y: 0 }} colors={['#F2784E', '#FF4531', '#ED5768']}> */}
                </View> : <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Spinner style={{ alignItems: "center" }} isVisible={true} size={50} type={"Arc"} color={"#FF4531"} />
                    </View>
            }
        </View>
    );
}

export default BookingDetails;