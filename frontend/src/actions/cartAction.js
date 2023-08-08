import { axios } from "../axios";
import cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";


const addToCart = (productId, qty) => async (dispatch, getState) =>{

    try{
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({type: CART_ADD_ITEM, payload:{
            product: data._id,
            name: data.name,
            image: data.images,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }});
        const {cart:{cartItems}} = getState();
        cookie.set("cartItems", JSON.stringify(cartItems))

    }catch (error){

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId});

    const {cart:{cartItems}} = getState();
    cookie.set("cartItems", JSON.stringify(cartItems))
}
const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    cookie.set('shippingAddress', JSON.stringify(data));
  };
const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
}
export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod }