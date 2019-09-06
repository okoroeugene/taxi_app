// import update from "react-addons-update";
import constants from "../constants";
import { Dimensions } from "react-native"
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";
import Axios from "axios";
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyA-HjztLKyWGOUaIG9Bx_n6Ie_A5p1qMkQ'); // use a valid API key
import store from '../stores';
import calculateFare from '../helpers/FareCalculator';
var polyline = require('@mapbox/polyline');

const {
    GET_CURRENT_LOCATION,
    GET_INPUT,
    TOGGLE_SEARCH_RESULT,
    UNTOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_ADDRESS_PREDICTIONS_ERROR,
    GET_SELECTED_ADDRESS,
    GET_SELECTED_ADDRESS_ERROR,
    GET_DISTANCE_MATRIX,
    GET_DISTANCE_MATRIX_ERROR,
    UPDATE_INPUT_ADDRESS,
    UPDATE_INPUT_ADDRESS_ERROR,
    GET_FARE,
    GET_ROUTE_DIRECTIONS,
    GET_ROUTE_DIRECTIONS_ERROR,
    BOOK_CAR,
    GET_NEARBY_DRIVERS
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA



//--------------------
//Actions
//--------------------
export function getCurrentLocation() {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
}

export function updateInputAddress(region) {
    return (dispatch) => {
        Geocoder.from(region.latitude, region.longitude)
            .then(json => {
                var addressComponent = json.results[0];
                RNGooglePlaces.lookUpPlaceByID(addressComponent.place_id)
                    .then((results) => {
                        dispatch({
                            type: UPDATE_INPUT_ADDRESS,
                            payload: results
                        })
                    })
            })
            .catch(error => dispatch({
                type: UPDATE_INPUT_ADDRESS_ERROR,
                payload: error
            }));
    }
}

//GET USER INPUT

export function getInputData(payload) {
    return {
        type: GET_INPUT,
        payload
    }
}
//toggle search result modal
export function toggleSearchResultModal(payload) {
    return {
        type: TOGGLE_SEARCH_RESULT,
        payload
    }
}

export function unToggleSearchResultModal() {
    return {
        type: UNTOGGLE_SEARCH_RESULT
    }
}


//GET ADRESSES FROM GOOGLE PLACE

export function getAddressPredictions() {
    return (dispatch, store) => {
        let userInput = store().home.inputData.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
                country: "NG"
            }
        )
            .then((results) =>
                setTimeout(() => {
                    dispatch({
                        type: GET_ADDRESS_PREDICTIONS,
                        payload: results
                    })
                }, 2000)
            )
            .catch((error) =>
                setTimeout(() => {
                    dispatch({
                        type: GET_ADDRESS_PREDICTIONS_ERROR,
                        payload: error.message
                    })
                }, 2000)
            );
    };
}


//get selected address

export function getSelectedAddress(payload) {
    const dummyNumbers = {
        baseFare: 0.4,
        timeRate: 0.14,
        distanceRate: 0.97,
        surge: 1
    }
    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
            .then((results) => {
                dispatch({
                    type: GET_SELECTED_ADDRESS,
                    payload: results
                })
            })
            .then(() => {
                //Get the distance and time
                if (store().home.selectedAddress.pickUp && store().home.selectedAddress.dropOff) {
                    let query = {
                        origins: store().home.selectedAddress.pickUp.location.latitude + "," + store().home.selectedAddress.pickUp.location.longitude,
                        destinations: store().home.selectedAddress.dropOff.location.latitude + "," + store().home.selectedAddress.dropOff.location.longitude,
                        mode: "driving",
                        key: "AIzaSyA-HjztLKyWGOUaIG9Bx_n6Ie_A5p1qMkQ"
                    }
                    console.log(query)
                    Axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${query.origins}&destinations=${query.destinations}&mode=${query.mode}&key=${query.key}`)
                        .then(response => {
                            console.log('MATRIXXXXXXX')
                            console.log(response.data)
                            dispatch({
                                type: GET_DISTANCE_MATRIX,
                                payload: response.data
                            });
                        })
                        .catch(err => {
                            dispatch({
                                type: GET_DISTANCE_MATRIX_ERROR,
                                payload: err
                            });
                        })
                }
                setTimeout(function () {
                    if (store().home.selectedAddress.pickUp && store().home.selectedAddress.dropOff) {
                        const fare = calculateFare(
                            dummyNumbers.baseFare,
                            dummyNumbers.timeRate,
                            store().home.distanceMatrix.rows[0].elements[0].duration.value,
                            dummyNumbers.distanceRate,
                            store().home.distanceMatrix.rows[0].elements[0].distance.value,
                            dummyNumbers.surge,
                        );
                        dispatch({
                            type: GET_FARE,
                            payload: fare
                        })
                    }
                }, 2000)

            })
            .catch((error) =>
                setTimeout(() => {
                    dispatch({
                        type: GET_SELECTED_ADDRESS_ERROR,
                        payload: error.message
                    })
                }, 2000)
            );
    }
}

export function getRouteDirections() {
    return (dispatch, store) => {
        if (store().home.selectedAddress.pickUp && store().home.selectedAddress.dropOff) {
            let query = {
                origins: store().home.selectedAddress.pickUp.location.latitude + "," + store().home.selectedAddress.pickUp.location.longitude,
                destinations: store().home.selectedAddress.dropOff.location.latitude + "," + store().home.selectedAddress.dropOff.location.longitude,
                mode: "driving",
                key: "AIzaSyA-HjztLKyWGOUaIG9Bx_n6Ie_A5p1qMkQ"
            }
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${query.origins}&destination=${query.destinations}&key=${query.key}&mode=${query.mode}`;
            Axios.get(url)
                .then(response => {
                    dispatch({
                        type: GET_ROUTE_DIRECTIONS,
                        payload: polyline.decode(response.data.routes[0].overview_polyline.points)
                    });
                })
                .catch(err => {
                    dispatch({
                        type: GET_ROUTE_DIRECTIONS_ERROR,
                        payload: err
                    });
                })
        }
    }
}