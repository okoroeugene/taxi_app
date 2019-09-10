import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
        // flex: 1
    }
})


export default styles