import * as loginActions from './login';
import * as registerActions from './register';
import * as userActions from './user';
import * as appActions from './app';
import * as driverActions from './driver';
import * as mapActions from './maps';
import * as homeActions from './home';

export const doLogin = loginActions.doLogin,
    doRegister = registerActions.doRegister,
    getCurrentUser = userActions.loggedInUser,
    fetchUsers = userActions.fetchUsers,
    logout = userActions.logout,
    initializeApp = appActions.initializeApp,
    authorizeUser = appActions.authorizeUser,
    updateDriverProfile = driverActions.driverProfile,
    fetchDriver = driverActions.fetchDriver,
    editUser = userActions.editUser,
    editDriver = driverActions.editDriver,
    fetchUser = userActions.fetchUser,
    addCard = userActions.addCard,
    avatar = driverActions.avatar,
    getCurrentLocation = homeActions.getCurrentLocation,
    toggleSearchModal = homeActions.toggleSearchResultModal,
    closeToggleModal = homeActions.unToggleSearchResultModal,
    getAddressPredictions = homeActions.getAddressPredictions,
    getInputData = homeActions.getInputData,
    getSelectedAddress = homeActions.getSelectedAddress,
    setInitialAddress = homeActions.setInitialAddress