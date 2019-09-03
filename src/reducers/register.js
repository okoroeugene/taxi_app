import constants from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

export default function registerReducer(state = {}, action) {
    switch (action.type) {
        case constants.REQUEST(constants.REGISTER):
            return Object.assign({}, state, {
                isProcessing: true,
            })
        case constants.REQUEST_SUCCESS(constants.REGISTER):
            if (action.payload.token) {
                AsyncStorage.setItem(constants.TOKEN, action.payload.token);
                return {
                    ...state,
                    isProcessing: false,
                    isAuthenticated: true,
                    current: action.payload.user
                };
            }
        case constants.REQUEST_FAILURE(constants.REGISTER):
            return Object.assign({}, state, {
                error: `network error: ${action.payload.error}`,
                isProcessing: false
            })
        default:
            return state;
    }
}
