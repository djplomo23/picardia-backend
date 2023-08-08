import { FACTURA_ADD_ITEM, FACTURA_REMOVE_ITEM, FACTURA_SAVE_SHIPPING, FACTURA_SAVE_PAYMENT } from "../constants/facturaConstants";
import { CART_REMOVE_ITEM } from "../constants/cartConstants";

function facturaReducer(state={facturaItems:[]}, action){
    switch(action.type){
        case FACTURA_ADD_ITEM:
            const item = action.payload;
            const product = state.facturaItems.find(x => x.product === item.product);
            if(product){
              return{ facturaItems:  state.facturaItems.map(x => x.product === product.product ? item : x) };
            }
            return { facturaItems: [...state.facturaItems, item] };
            case FACTURA_REMOVE_ITEM:
                return{ facturaItems: state.facturaItems.filter(x => x.product !== action.payload)}
            case FACTURA_SAVE_SHIPPING:
                return {...state, shipping: action.payload}
            case FACTURA_SAVE_PAYMENT:
                return {...state, payment: action.payload}
            default:
                return state
    }
}

export { facturaReducer }