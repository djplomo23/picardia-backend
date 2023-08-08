import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_RESET, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_RESET, PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_ME_GUSTA_REQUEST, PRODUCT_ME_GUSTA_SUCCESS, PRODUCT_ME_GUSTA_FAIL, PRODUCT_ME_GUSTA_RESET } from '../constants/productConstants';

const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

function productSearchReducer(state = { searchs: [] }, action ) {

    switch (action.type) {
        case PRODUCT_SEARCH_REQUEST:
            return {loading: true, searchs: []};
        case PRODUCT_SEARCH_SUCCESS:
            return {loading: false, searchs: action.payload };
        case PRODUCT_SEARCH_FAIL:
            return { loading: true,  error: action.playload}
        default:
            return state;

    }
}


const productCategoryListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

function productSaveReducer(state = { product: {} }, action ) {

    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading: false, success: true, product: action.payload };
        case PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.playload }
        default:
            return state;

    }
};

const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  const productMeGustaReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_ME_GUSTA_REQUEST:
        return { loading: true };
      case PRODUCT_ME_GUSTA_SUCCESS:
        return { loading: false, success: true, meGustas: action.payload };
      case PRODUCT_ME_GUSTA_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_ME_GUSTA_RESET:
        return {};
      default:
        return state;
    }
  };

const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { loading: true };
      case PRODUCT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_REVIEW_CREATE_REQUEST:
        return { loading: true };
      case PRODUCT_REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case PRODUCT_REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_REVIEW_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
export { productCategoryListReducer, productSearchReducer, 
    productListReducer, productDetailsReducer, productSaveReducer, 
    productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productMeGustaReducer }