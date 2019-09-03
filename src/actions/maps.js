import constants from '../constants';
import {
    RSAA
} from 'redux-api-middleware';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
const BASE_URL = Config.BASE_URL;

export const getCurrentLocation = _ => {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: constants.GET_CURRENT_LOCATION,
                    payload: position
                })
            }
        )
    }
}