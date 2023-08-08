import { OFFER_DELETE_FAIL, OFFER_DELETE_REQUEST, OFFER_DELETE_SUCCESS, OFFER_LIST_FAIL, OFFER_LIST_REQUEST, OFFER_LIST_SUCCESS, OFFER_SAVE_FAIL, OFFER_SAVE_REQUEST, OFFER_SAVE_SUCCESS } from '../constants/offerConstants';

function offerListReducer(state = { offers: [] }, action ) {

    switch (action.type) {
        case OFFER_LIST_REQUEST:
            return {loadingOffers: true, offers: []};
        case OFFER_LIST_SUCCESS:
            return {loadingOffers: false, offers: action.payload };
        case OFFER_LIST_FAIL:
            return { loadingOffers: true,  errorOffers: action.playload}
        default:
            return state;

    }
}




function offerDeleteReducer(state = { offers: {} }, action ) {

    switch (action.type) {
        case OFFER_DELETE_REQUEST:
            return {loading: true};
        case OFFER_DELETE_SUCCESS:
            return {loading: false, offers: action.payload, success: true };
        case OFFER_DELETE_FAIL:
            return { loading: false, error: action.playload }
        default:
            return state;

    }
}

function offerSaveReducer(state = { offers: {} }, action ) {

    switch (action.type) {
        case OFFER_SAVE_REQUEST:
            return {loading: true};
        case OFFER_SAVE_SUCCESS:
            return {loading: false, success: true, offers: action.payload };
        case OFFER_SAVE_FAIL:
            return { loading: false, error: action.playload }
        default:
            return state;

    }
}
export { offerListReducer, offerSaveReducer, offerDeleteReducer }