import constants from '../constants';

export default function appReducer(state = {}, action) {
    switch (action.type) {
        case constants.INITIALIZE_APP:
            return Object.assign({}, state, {
                hasToken: true
            })
        case constants.INITIALIZATION_FAILURE:
            return Object.assign({}, state, {
                isInitializedFailure: true
            })
        default:
            return state;
    }
}
