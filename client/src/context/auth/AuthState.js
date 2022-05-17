import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);


  const register = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        let res = await axios.post('/api/users', formData, config)
        dispatch({type: REGISTER_SUCCESS, payload: res.data})
        loadUsers()
    } catch(err) {
        dispatch({type: REGISTER_FAIL, payload: err.response.data.msg})
    }
  }


  const loadUsers = async () => {
    if(localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'))
    }


    try {
        const res = await axios.get('/api/auth');
        dispatch({type: USER_LOADED, payload: res.data})
    } catch(err) {
        dispatch({type: AUTH_ERROR })
    } 
  }


  const clearErrors = () => {
      dispatch({type: CLEAR_ERRORS})
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        clearErrors,
        loadUsers
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;