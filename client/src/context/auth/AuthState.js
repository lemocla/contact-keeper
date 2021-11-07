import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    //Reducer - dispatch allow to 
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Actions

    // Load User
    const loadUser = async () => {
        //@todo - load token in global headers
        if (localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
             });
        } catch (err) {
            dispatch({ type: AUTH_ERROR})
        }
    }

    // Register User
    const register = async formData => {
        //set headers by using config function from axios
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        try {
            //api --> route routes/users.js
            const res = await axios.post('/api/users', formData, config);

            // dispatch to reducer
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Login User
    const login = () => console.log('login')

    // Logout
    const logout = () => console.log('logout')

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS})

    //Return provider
    return (
        <AuthContext.Provider
            value={{
               token: state.token,
               isAuthenticated: state.isAuthenticated,
               loading: state.loading,
               user: state.user,
               error: state.error,
               loadUser,
               register,
               login,
               logout,
               clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;