import { axios } from "../axios";
import cookie from "js-cookie";
import { FACTURA_ADD_ITEM, FACTURA_REMOVE_ITEM, FACTURA_SAVE_PAYMENT, FACTURA_SAVE_SHIPPING } from "../constants/facturaConstants";


const addToFactura = (productId, qty) => async (dispatch, getState) =>{

    try{
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({type: FACTURA_ADD_ITEM, payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }});
        const {factura:{facturaItems}} = getState();
        cookie.set("facturaItems", JSON.stringify(facturaItems))

    }catch (error){

    }
}

const removeFromFactura = (productId) => (dispatch, getState) => {
    dispatch({ type: FACTURA_REMOVE_ITEM, payload: productId});

    const {factura:{facturaItems}} = getState();
    cookie.set("facturaItems", JSON.stringify(facturaItems))
}
const saveShipping = (data) => (dispatch) => {
    dispatch({ type: FACTURA_SAVE_SHIPPING, payload: data });
}
const savePayment = (data) => (dispatch) => {
    dispatch({ type: FACTURA_SAVE_PAYMENT, payload: data });
}
export { addToFactura, removeFromFactura, saveShipping, savePayment }