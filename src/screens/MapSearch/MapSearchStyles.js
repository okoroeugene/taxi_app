import { StyleSheet, Dimensions } from 'react-native'
var width = Dimensions.get("window").width; //full width

const styles = StyleSheet.create({
    navigator: {
        flex: 1,
        height: 100,
    },
    // map: {
    //     flex: 1,
    // },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
        // flex: 1
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    },
    container: {
        flexGrow: 1,
        padding: 30,
        backgroundColor: "#F5F8F8"
        // position: "relative"
    },
    searchBar: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 999,
        left: 15,
        height: 40,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 20,
        opacity: .9,
    },
    setPickupButton: {
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        marginTop: 2,
    },
    inputBefore: {
        borderColor: "#00A87E",
        borderRadius: 2
    },
    inputAfter: {
        marginTop: 10,
        borderColor: "#00A87E",
        borderRadius: 2
    },
    mainInput: {
        fontFamily: 'NoirPro-Medium',
        fontSize: 12,
        color: '#5C5C5C',
        marginLeft: 0
    },
    textBold: {
        // fontFamily: "Kastelov - Axiforma Heavy"
    },
    searchBar: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 999,
        left: 15,
        height: 40,
    },
    cardShadow: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    inputShadow: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1.2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    backgroundImage: {
        resizeMode: "cover",
        flex: 1,
        width: null,
        height: null
    },
    pageLayout: {
        alignItems: "stretch",
        flex: 1
    },
    inputFormStyle: {
        // fontFamily: 'NoirPro-Regular',
        fontSize: 16
    },
    backgroundImageWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    defaultFont: {
        fontFamily: 'NoirPro-Regular',
        fontSize: 16
    },
    textHeader: {
        // fontFamily: 'Sofia Pro Bold',
        fontSize: 28,
        textAlign: "center"
    },
    searchBox: {
        top: 80,
        position: "absolute",
        width: width
    },
    inputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7
    },
    secondInputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7
    },
    inputSearch: {
        fontSize: 14
    },
    label: {
        fontSize: 10,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    },
    // button: {
    //     backgroundColor: '#263238',
    //     flexDirection: 'row',
    //     height: 45,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginBottom: 10
    // },
    buttonText: {
        color: 'white'
    },
    inputLauncher: {
        backgroundColor: '#F3F7F9',
        width: '100%',
        borderRadius: 4,
        height: 35,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 16
    },
    inputWrapper: {
        backgroundColor: '#F3F7F9',
        width: '100%',
        borderRadius: 2,
        justifyContent: 'center',
        paddingHorizontal: 8
    },
    input: {
        color: '#222B2F',
        height: 45,
        fontSize: 15,
        paddingVertical: 4
    },
    list: {
        marginTop: 16,
        height: Dimensions.get('window').height - 70
    },
    listItemWrapper: {
        backgroundColor: 'transparent',
        height: 56
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: '100%'
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#DAE4E9',
        width: '92%',
        marginHorizontal: 16,
        opacity: 0.6
    },
    primaryText: {
        color: '#222B2F',
        fontSize: 15,
        marginBottom: 3
    },
    placeMeta: {
        flex: 1,
        marginLeft: 15
    },
    secondaryText: {
        color: '#9BABB4',
        fontSize: 13,
    },
    listIcon: {
        width: 25,
        height: 25
    }
})


export default styles