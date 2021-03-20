import * as actionType from "../types/types";

const authReducer = (state = { authData: null, error: false }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case actionType.LOGIN_FAIL:
    case actionType.REGISTER_FAIL:
      localStorage.removeItem("profile");
      return {
        ...state,
        authData: null,
        loading: false,
        error: action.error,
      };

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    case actionType.UPDATED_USER:
      return {
        ...state,
        authData: action.data,
        success: true,
        loading: false,
        errors: null,
      };
    case actionType.UPDATED_USER_FAIL:
      return {
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
