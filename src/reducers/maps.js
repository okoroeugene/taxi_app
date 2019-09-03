import constants from '../constants';

export default function mapReducer(state = {}, action) {
    switch (action.type) {
        case constants.GET_CURRENT_LOCATION:
            return {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }
        default:
            return state;
    }
}