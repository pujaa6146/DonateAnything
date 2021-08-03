import * as ActionTypes from "./Actiontypes";
import * as SecureStore from "expo-secure-store";
import { baseUrl } from "../shared/baseUrl";

export const requestRegister = (info) => {
  return {
    type: ActionTypes.REGISTER_REQUEST,
    info,
  };
};

export const receiveRegister = (response) => {
  return {
    type: ActionTypes.REGISTER_SUCCESS,
    token: response.tokens,
    user: response.user,
  };
};

export const registerError = (message) => {
  return {
    type: ActionTypes.REGISTER_FAILURE,
    message,
  };
};

async function setValToStore(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function sendVerifyEmail(user, token) {
  await fetch(baseUrl + "auth/send-verification-email", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(
      (response) => {
        if (response.status != 201) {
          throw new Error("Failed to send verification email");
        }
      },
      (error) => {
        throw error;
      }
    )
    .catch((error) => console.log(error.message));
}

export const registerUser = (info) => (dispatch) => {
  dispatch(requestRegister(info));

  return fetch(baseUrl + "auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.user && response.tokens) {
        sendVerifyEmail(response.user, response.tokens.access.token);
        // If login was successful, set the token in local storage
        setValToStore("token", JSON.stringify(response.tokens));
        setValToStore("user", JSON.stringify(response.user));
        // Dispatch the success action

        dispatch(receiveRegister(response));
      } else {
        dispatch(registerError(response.message));
      }
    })
    .catch((error) => dispatch(registerError(error.message)));
};

export const requestLogin = (info) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    info,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.tokens,
    user: response.user,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (info) => (dispatch) => {
  dispatch(requestLogin(info));

  return fetch(baseUrl + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.user && response.tokens) {
        // If login was successful, set the token in local storage
        setValToStore("token", JSON.stringify(response.tokens));
        setValToStore("user", JSON.stringify(response.user));
        // Dispatch the success action

        dispatch(receiveLogin(response));
      } else {
        dispatch(loginError(response.message));
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};
export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};
export const logoutError = (message) => {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    message,
  };
};

async function deleteValFromStore(key, value) {
  await SecureStore.deleteItemAsync(key, value);
}
// Logs the user out
export const logoutUser = (refreshToken) => (dispatch) => {
  console.log("*****************************");
  console.log(refreshToken);
  dispatch(requestLogout());
  return fetch(baseUrl + "auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })
    .then(
      (response) => {
        if (response.status == 204) {
          deleteValFromStore("token");
          deleteValFromStore("user");
          dispatch(receiveLogout());
        } else {
          dispatch(logoutError(response.message));
        }
      },
      (error) => {
        throw error;
      }
    )
    .catch((error) => dispatch(logoutError(error.message)));
};
