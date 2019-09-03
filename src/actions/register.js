import constants from '../constants';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import Config from 'react-native-config';
import store from '../stores/index';
const BASE_URL = Config.BASE_URL;

export const doRegister = details => ({
    [RSAA]: {
        endpoint: `${BASE_URL}/register`,
        method: 'POST',
        types: [
            constants.REQUEST(constants.AUTH_USER),
            {
                type: constants.REQUEST_SUCCESS(constants.AUTH_USER),
                payload: (action, state, response) => response.json().then(data => {
                    return {
                        token: data.token,
                        user: data.user
                    }
                })
            },
            {
                type: constants.REQUEST_FAILURE(constants.AUTH_USER),
                meta: (action, state, res) => {
                    if (res) {
                        return {
                            status: res.status,
                            statusText: res.statusText
                        };
                    } else {
                        return {
                            status: 'Network request failed'
                        }
                    }
                }
            }
        ],
        body: JSON.stringify(details),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});