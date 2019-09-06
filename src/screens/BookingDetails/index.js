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

const BookingDetails = ({ distanceMatrix, fare }) => {
    return (
        <View style={styles.cardContainer}>
            {/* <Text>{selectedAddress && selectedAddress.pickUp && selectedAddress.pickUp.address}</Text> */}
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => this.resetPractice()}
                    activeOpacity={0.7}
                >
                    <Thumbnail
                        style={{ width: 80, height: 80, resizeMode: "contain", borderWidth: 1, borderColor: "#ccc", borderRadius: 80 / 2 }}
                        source={require('../../imgs/taxi1.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.endPractice()}
                    activeOpacity={0.7}
                >
                    <Thumbnail
                        style={{ width: 80, height: 80, resizeMode: "contain", borderWidth: 4, borderColor: "#ccc", borderRadius: 80 / 2 }}
                        source={require('../../imgs/taxi2.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <View style={{ marginTop: 7 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 15 }}>Distance:</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5 }}>{distanceMatrix && distanceMatrix.rows[0].elements[0].distance.text} |</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5 }}>{distanceMatrix && distanceMatrix.rows[0].elements[0].duration.text}</Text>
                    </View>
                    {/* <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 15 }}>Time:</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5 }}>8 mins</Text>
                    </View> */}
                </View>

                <View>
                    <Text style={{ fontFamily: 'NoirPro-Medium', fontSize: 25 }}>${fare}</Text>
                </View>
            </View>
            <LinearGradient
                style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: 100 }}
                start={{ x: 1, y: 2 }} end={{ x: 1, y: 0 }} colors={['#F2784E', '#FF4531', '#ED5768']}>
                <Text style={{ color: "white", fontFamily: 'NoirPro-Medium', fontSize: 18 }}>Book Now</Text>
            </LinearGradient>
        </View>
    );
}

export default BookingDetails;