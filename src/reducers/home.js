import constants from '../constants';

const initialState = {
    searching: false,
    location: {
        coords: {}
    },
    selectedAddress: {}
}
export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case constants.GET_CURRENT_LOCATION:
            return Object.assign({}, state, {
                location: action.payload
            })

        case constants.GET_INITIAL_PICKUP_ADDRESS:
            return Object.assign({}, state, {
                selectedAddress: {
                    pickUp: action.payload
                }
            })

        case constants.GET_INITIAL_PICKUP_ADDRESS_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })

        case constants.GET_INPUT:
            return Object.assign({}, state, {
                searching: true,
                inputData: {
                    pickUp: action.payload.key == 'pickUp' ? action.payload.value : undefined,
                    dropOff: action.payload.key == 'dropOff' ? action.payload.value : undefined
                }
            })

        case constants.TOGGLE_SEARCH_RESULT:
            return Object.assign({}, state, {
                resultTypes: action.payload,
                toggle: true,
                predictions: {}
            })
        case constants.UNTOGGLE_SEARCH_RESULT:
            return Object.assign({}, state, {
                toggle: false,
                searching: false,
                predictions: undefined,
                error: undefined
            })
        case constants.GET_ADDRESS_PREDICTIONS:
            return Object.assign({}, state, {
                searching: false,
                predictions: action.payload,
                error: undefined
            })
        case constants.GET_ADDRESS_PREDICTIONS_ERROR:
            return Object.assign({}, state, {
                searching: false,
                error: action.payload,
                predictions: undefined
            })
        case constants.GET_SELECTED_ADDRESS:
            return Object.assign({}, state, {
                toggle: false,
                selectedAddress: {
                    pickUp: state.resultTypes == 'pickUp' ? action.payload : state.selectedAddress.pickUp,
                    dropOff: state.resultTypes == 'dropOff' ? action.payload : state.selectedAddress.dropOff
                }
            })
        case constants.GET_SELECTED_ADDRESS_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        case constants.GET_DISTANCE_MATRIX:
            return Object.assign({}, state, {
                distanceMatrix: action.payload
            })
        case constants.GET_DISTANCE_MATRIX_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        default:
            return state;
    }
}

// import ACTION_HANDLERS from './handlers';


// export function homeReducer(state = {}, action) {
//     const handler = ACTION_HANDLERS[action.type];

//     return handler ? handler(state, action) : state;
// }