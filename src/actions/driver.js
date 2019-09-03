import constants from '../constants';
import {
    RSAA
} from 'redux-api-middleware';
import Config from 'react-native-config';
const BASE_URL = Config.BASE_URL;

export const driverProfile = details => ({
    [RSAA]: {
        endpoint: `${BASE_URL}/api/driver`,
        method: 'POST',
        types: [
            constants.REQUEST(constants.DRIVER_PROFILE),
            {
                type: constants.REQUEST_SUCCESS(constants.DRIVER_PROFILE),
                payload: (action, state, response) => response.json().then(data => {
                    return {
                        data
                    }
                })
            },
            {
                type: constants.REQUEST_FAILURE(constants.DRIVER_PROFILE),
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

export const editDriver = (id, data) => ({
    [RSAA]: {
        endpoint: `${BASE_URL}/api/driver/${id}`,
        method: "PUT",
        types: [
            constants.REQUEST(constants.EDIT_DRIVER),
            {
                type: constants.REQUEST_SUCCESS(constants.EDIT_DRIVER),
                payload: (action, state, res) => res.json().then(result => ({
                    result
                }))
            },
            {
                type: constants.REQUEST_FAILURE(constants.EDIT_DRIVER),
                meta: (action, state, res) => {
                    return res;
                }
            }
        ],
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    }
})

export const avatar = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL}/api/driver/avatar`,
        method: "PUT",
        types: [
            constants.REQUEST(constants.NEW_AVATAR),
            {
                type: constants.REQUEST_SUCCESS(constants.NEW_AVATAR),
                payload: (action, state, res) => res.json().then(result => ({
                    result
                }))
            },
            {
                type: constants.REQUEST_FAILURE(constants.NEW_AVATAR),
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
                    };
                }
            }
        ],
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    }
})

export const fetchDriver = id => ({
    [RSAA]: {
        endpoint: `${BASE_URL}/api/driver/${id}`,
        method: 'GET',
        types: [
            constants.REQUEST(constants.DRIVER_DATA),
            {
                type: constants.REQUEST_SUCCESS(constants.DRIVER_DATA),
                payload: (action, state, response) => response.json().then(data => {
                    return {
                        data
                    }
                })
            },
            {
                type: constants.REQUEST_FAILURE(constants.DRIVER_DATA),
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
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});