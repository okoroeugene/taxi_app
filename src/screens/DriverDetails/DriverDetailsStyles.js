import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const styles = StyleSheet.create({
    cardContainer: {
        width: width,
        height: 150,
        padding: 20
    },
    searchBox: {
        bottom: 50,
        position: "absolute",
        width: width
    },
    actionBtn: {
        width: 50,
        height: 50,
        backgroundColor: "red",
        borderRadius: 50 / 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20
    },
    innerActionBtn: {
        width: 48,
        height: 48,
        backgroundColor: "red",
        borderRadius: 48 / 2,
        borderWidth: 2,
        borderColor: "#343839",
        justifyContent: "center",
        alignItems: "center"
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
})


export default styles