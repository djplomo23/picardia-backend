import { OFFER_DELETE_FAIL, OFFER_DELETE_REQUEST, OFFER_DELETE_SUCCESS, OFFER_LIST_FAIL, OFFER_LIST_REQUEST, OFFER_LIST_SUCCESS, OFFER_SAVE_FAIL, OFFER_SAVE_REQUEST, OFFER_SAVE_SUCCESS } from '../constants/offerConstants';
import { axios } from '../axios';




const listOffers = () => async (dispatch) => {
try{
    dispatch({ type: OFFER_LIST_REQUEST });
    const { data } = await axios.get('/api/offers');
    dispatch({ type: OFFER_LIST_SUCCESS, payload: data });
}
catch (error) {
    dispatch({ type: OFFER_LIST_FAIL, payload: error.message });

    }
    
};

const saveOffer = (offer) => async (dispatch, getState) => {
    try {
        dispatch({ type: OFFER_SAVE_REQUEST, payload: offer });
        const { userSignin: {userInfo} } = getState();
        if(!offer._id){
            const {data} = await axios.post('/api/offers', offer, {headers:{
                Authorizatio: userInfo.token,
            },});
            dispatch({ type: OFFER_SAVE_SUCCESS, payload: data });

        } else {
            const { data } = await axios.put(
                '/api/offers/' + offer._id, offer, { 
                headers: {
                Authorization: userInfo.token,
                
                
            },
        }
        );console.log(userInfo);
            dispatch({ type: OFFER_SAVE_SUCCESS, payload: data });
        }
        
       
    } catch(error){

        dispatch({ type: OFFER_SAVE_FAIL, payload: error.message });

    }
};


const deleteOffer = (offerId) => async (dispatch, getState) => {
    try {
        const {userSignin: { userInfo },} = getState();
        dispatch({ type: OFFER_DELETE_REQUEST, payload: offerId });
        const { data } = await axios.delete("/api/offer/" + offerId, { headers: {
            Authorization: userInfo.token
        }});
        dispatch({type: OFFER_DELETE_SUCCESS, payload: data, success: true });
    } catch (error){
        dispatch({type: OFFER_DELETE_FAIL, payload: error.message });
    }
};
export { listOffers,  saveOffer, deleteOffer }