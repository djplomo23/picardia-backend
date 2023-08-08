import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productSearchReducer, productCreateReducer, productUpdateReducer, productCategoryListReducer, productReviewCreateReducer, productMeGustaReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, userRegisterReducer, usersListReducer, userDetailsReducer, userUpdateProfileReducer, userDeleteReducer, userListReducer, userUpdateReducer } from './reducers/userReducers';
import { offerDeleteReducer, offerListReducer, offerSaveReducer } from './reducers/offerReducers';
import { facturaReducer } from './reducers/facturaReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderSummaryReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const shippingAddress = Cookie.getJSON("shippingAddress") || {};
const facturaItems = Cookie.getJSON("facturaItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = { cart: { cartItems, shippingAddress: {}, paymentMethod: 'PayPal', }, userSignin: { userInfo }, factura: { facturaItems } };
const reducer = combineReducers({
    productList: productListReducer,
    productCategoryList: productCategoryListReducer,
    offerList: offerListReducer,
    productDetails: productDetailsReducer,
    productSearchs: productSearchReducer,
    cart: cartReducer,
    factura: facturaReducer,
    usersList: usersListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    productSave: productSaveReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productMeGusta: productMeGustaReducer,
    offerSave: offerSaveReducer,
    offerDelete: offerDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderSummary: orderSummaryReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;