import constants from '../constants';

export default function driverReducer(state = {}, action) {
    switch (action.type) {
        case constants.REQUEST(constants.DRIVER_PROFILE):
            return Object.assign({}, state, {
                update: false,
                isProcessing: true,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.DRIVER_PROFILE):
            return {
                ...state,
                isProcessing: false,
                update: true,
                // credentials: action.payload
            }
        case constants.REQUEST_FAILURE(constants.DRIVER_PROFILE):
            return Object.assign({}, state, {
                error: `An error occured: ${action.payload.status}`,
                isProcessing: false
            })
        case constants.REQUEST(constants.DRIVER_DATA):
            return Object.assign({}, state, {
                isLoaded: true,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.DRIVER_DATA):
            return {
                ...state,
                isLoaded: true,
                credentials: action.payload.data
            }
        case constants.REQUEST_FAILURE(constants.DRIVER_DATA):
            return Object.assign({}, state, {
                error: `An error occured: ${action.payload.status}`,
                isLoaded: false
            })
        case constants.REQUEST(constants.NEW_AVATAR):
            return Object.assign({}, state, {})
        case constants.REQUEST_SUCCESS(constants.NEW_AVATAR):
            return {
                avatar: true
            }
        case constants.REQUEST_FAILURE(constants.NEW_AVATAR):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request'
            })
        default:
            return state;
    }
}