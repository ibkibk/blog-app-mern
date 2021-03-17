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
    default:
      return state;
  }
};

export default authReducer;
