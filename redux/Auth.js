import * as ActionTypes from "./Actiontypes";
import * as SecureStore from "expo-secure-store";

async function getValFromStore(key) {
  let val = await SecureStore.getItemAsync(key);
  if (val) {
    return val;
  }
  return null;
}

export const auth = (
  state = {
    isLoading: false,
    isAuthenticated: getValFromStore("token") ? true : false,
    token: getValFromStore("token") ? getValFromStore("token") : null,
    user: getValFromStore("user") ? getValFromStore("user") : null,
    errmsg: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: false, user: action.info };
    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true, errmsg: "", token: action.token, user: action.user };
    case ActionTypes.REGISTER_FAILURE:
      return { ...state, isLoading: false, isAuthenticated: false, errmsg: action.message };
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: false, user: action.info };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true, errmsg: "", token: action.token, user: action.user };
    case ActionTypes.LOGIN_FAILURE:
      return { ...state, isLoading: false, isAuthenticated: false, errmsg: action.message };
    default:
      return state;
  }
};
