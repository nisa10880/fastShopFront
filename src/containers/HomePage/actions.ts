import Axios from "axios";
import ActionTypes from "../App/constants";
import errorHandler from "../../utils/errorHandler";

export const searchProducts = search => {
  return async dispatch => {
    try {
      const response = await Axios.get("/product/search", { params: search });
      dispatch(setProducts(response.data[0], response.data[1]));
      console.log(response.data);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const setProducts = (data, countEvent) => {
  return {
    type: ActionTypes.SEARCH_EVENTS,
    payload: data,
    countEvent: countEvent
  };
};

export const addProductToBasket = data => {
  return {
    type: ActionTypes.ADD_PRODUCT_TO_BASKET,
    payload: data
  };
};
