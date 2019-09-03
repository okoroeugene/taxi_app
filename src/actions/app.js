import constants from '../constants';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
const BASE_URL = Config.BASE_URL;

export const initializeApp = () => {
    return async (dispatch) => {
        return AsyncStorage.getItem(constants.TOKEN)
            .then((token) => {
                if (!token) return dispatch({
                    type: constants.INITIALIZATION_FAILURE
                })
                return dispatch({
                    type: constants.INITIALIZE_APP
                })
            })
    }
}

export const authorizeUser = (data = {}) => ({
    [RSAA]: {
        endpoint: `${BASE_URL}/verify`,
        method: 'POST',
        types: [
            constants.REQUEST(constants.AUTH_USER),
            {
                type: constants.REQUEST_SUCCESS(constants.AUTH_USER),
                payload: (action, state, response) => response.json().then(response => {
                    return {
                        token: data.token,
                        user: response
                    }
                })
            },
            {
                type: constants.REQUEST_FAILURE(constants.AUTH_USER),
                meta: (action, state, res) => {
                    if (res) {
                        return {
                            status: res.status,
                            statusText: JSON.parse(res._bodyInit).message
                        };
                    } else {
                        return {
                            status: 'Network request failed'
                        }
                    }
                }
            }
        ],
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});