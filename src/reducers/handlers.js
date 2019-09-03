import * as homeActions from '../actions/home';

export const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: homeActions.getCurrentLocation,
    GET_INPUT: homeActions.getInputData,
    TOGGLE_SEARCH_RESULT: homeActions.toggleSearchResultModal,
    GET_ADDRESS_PREDICTIONS: homeActions.getAddressPredictions
    // GET_SELECTED_ADDRESS: homeActions.getSelectedAddress,
    // GET_DISTANCE_MATRIX: homeActions.,
    // GET_FARE: handleGetFare,
    // BOOK_CAR: handleBookCar,
    // GET_NEARBY_DRIVERS: homeActions.getNearByDrivers
    // BOOKING_CONFIRMED: handleBookingConfirmed
}