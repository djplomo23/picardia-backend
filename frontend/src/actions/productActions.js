import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CATEGORY_LIST_REQUEST,PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_ME_GUSTA_FAIL, PRODUCT_ME_GUSTA_SUCCESS, PRODUCT_ME_GUSTA_REQUEST, PRODUCT_ME_GUSTA_RESET  } from '../constants/productConstants';
import { axios } from '../axios';




const listProducts = ({
  pageNumber = '',
  name = '',
  category = '',
  order = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data  } = await axios.get(
      `/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
    );
    
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const { userSignin: {userInfo} } = getState();
        if(!product._id){
            const {data} = await axios.post('/api/products', product, {headers:{
                Authorizatio: userInfo.token,
            },});
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });

        } else {
            const { data } = await axios.put(
                '/api/products/' + product._id, product, { 
                headers: {
                Authorization: userInfo.token,
                
                
            },
        }
        );
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
        
       
    } catch(error){

        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });

    }
};

const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        '/api/products',
        {},
        {
            headers: {
                Authorization: userInfo.token,
                
                
            },
        }
      );
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
  };

  const meGustaProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_ME_GUSTA_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(`/api/products/megusta/${product.id}`, product, {
        headers: { Authorization: userInfo.token },
      });
      dispatch({ type: PRODUCT_ME_GUSTA_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_ME_GUSTA_FAIL, error: message });
      setTimeout(() => {
        dispatch({type: PRODUCT_ME_GUSTA_RESET})
      }, 2000);
    }
  };

  const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(`/api/products/${product._id}`, product, {
        headers: { Authorization: userInfo.token },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };

const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: userInfo.token },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
  };

  const createReview = (productId, review) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: userInfo.token },
        }
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
  };

export { meGustaProduct, listProducts,  detailsProduct, saveProduct, deleteProduct, listProductCategories, createProduct, updateProduct, createReview }