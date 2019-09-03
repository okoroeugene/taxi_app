// import update from "react-addons-update";
import constants from "../constants";
import { Dimensions } from "react-native"
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";
import Axios from "axios";
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyBMMFhVJYdRRst-pXSje7f_I7EPHDkPkyk'); // use a valid API key
import store from '../stores';

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
    GET_INITIAL_PICKUP_ADDRESS,
    GET_INITIAL_PICKUP_ADDRESS_ERROR,
    GET_FARE,
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

export function setInitialAddress() {
    return (dispatch) => {
        Geocoder.from(store.getState().home.location.coords.latitude, store.getState().home.location.coords.longitude)
            .then(json => {
                var addressComponent = json.results[0];
                RNGooglePlaces.lookUpPlaceByID(addressComponent.place_id)
                    .then((results) => {
                        dispatch({
                            type: GET_INITIAL_PICKUP_ADDRESS,
                            payload: results
                        })
                    })
            })
            .catch(error => dispatch({
                type: GET_INITIAL_PICKUP_ADDRESS_ERROR,
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
                        origins: store().home.selectedAddress.pickUp.latitude + "," + store().home.selectedAddress.pickUp.longitude,
                        destinations: store().home.selectedAddress.pickUp.latitude + "," + store().home.selectedAddress.pickUp.longitude,
                        mode: "driving",
                        key: "AIzaSyBMMFhVJYdRRst-pXSje7f_I7EPHDkPkyk"
                    }
                    Axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', query)
                        .then(response => {
                            dispatch({
                                type: GET_DISTANCE_MATRIX,
                                payload: response.body
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

// //get nearby drivers

// export function getNearByDrivers(){
// 	return(dispatch, store)=>{
// 		request.get("http://localhost:3000/api/driverLocation")
// 		.query({
// 			latitude:3.145909,
// 			longitude:101.696985	
// 		})
// 		.finish((error, res)=>{
// 			if(res){
// 				dispatch({
// 					type:GET_NEARBY_DRIVERS,
// 					payload:res.body
// 				});
// 			}

// 		});
// 	};
// }
//--------------------
//Action Handlers
//--------------------
function handleGetCurrentLocation(state, action) {
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longitude: {
                $set: action.payload.coords.longitude
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }
        }
    })
}

function handleGetInputDate(state, action) {
    const { key, value } = action.payload;
    return update(state, {
        inputData: {
            [key]: {
                $set: value
            }
        }
    });
}


function handleGetAddressPredictions(state, action) {
    return update(state, {
        predictions: {
            $set: action.payload
        }
    })
}

function handleGetSelectedAddress(state, action) {
    let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
    return update(state, {
        selectedAddress: {
            [selectedTitle]: {
                $set: action.payload
            }
        },
        resultTypes: {
            pickUp: {
                $set: false
            },
            dropOff: {
                $set: false
            }
        }
    })
}

function handleGetDitanceMatrix(state, action) {
    return update(state, {
        distanceMatrix: {
            $set: action.payload
        }
    })
}

function handleGetFare(state, action) {
    return update(state, {
        fare: {
            $set: action.payload
        }
    })
}

//handle book car

function handleBookCar(state, action) {
    return update(state, {
        booking: {
            $set: action.payload
        }
    })
}


//handle get nearby drivers
function handleGetNearbyDrivers(state, action) {
    return update(state, {
        nearByDrivers: {
            $set: action.payload
        }
    });
}


function handleBookingConfirmed(state, action) {
    return update(state, {
        booking: {
            $set: action.payload
        }
    });

}