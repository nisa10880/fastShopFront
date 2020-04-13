import Axios from "axios";
import ActionTypes from "../App/constants";
import errorHandler from "../../utils/errorHandler";

export const sendOrder = data => {
  return async dispatch => {
    try {
      const response = await Axios.post("/order", data);
      //    dispatch(setProducts(response.data[0], response.data[1]));
      console.log(response.data);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const setProducts = data => {
  return {
    type: ActionTypes.SEARCH_EVENTS,
    payload: data
  };
};
