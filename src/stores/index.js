import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunkMiddleware from "redux-thunk";
import {
    apiMiddleware
} from 'redux-api-middleware';
import appReducer from '../reducers/index';
import AsyncStorage from '@react-native-community/async-storage';
import apiAuthInjector from '../middlewares/apiAuthInjector';
import initialState from '../reducers/initialState';
import constants from '../constants';

function rootReducer(state, action) {
    if (action.type == constants.LOGOUT) {
        state = {};
        AsyncStorage.clear();
    }
    return appReducer(state, action)
}

const enhancers = compose(applyMiddleware(thunkMiddleware, apiAuthInjector, apiMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

const store = createStore(rootReducer, initialState, enhancers);

export default store;