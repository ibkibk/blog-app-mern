import {
  AUTH,
  LOGIN_FAIL,
  REGISTER_FAIL,
  UPDATED_USER,
  UPDATED_USER_FAIL,
} from "../types/types";
import * as api from "../api";
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch({ error: error.response.data, type: LOGIN_FAIL });
    console.log(error.response);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch({ error: error.response.data, type: REGISTER_FAIL });
    console.log(error.response.data);
  }
};

export const editProfile = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);

    dispatch({ type: UPDATED_USER, data });
    console.log(data);
    // router.push("/");
  } catch (error) {
    dispatch({ type: UPDATED_USER_FAIL, payload: error });
    console.log(error);
  }
};
