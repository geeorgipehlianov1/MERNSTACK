import { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertRedures from './AlertReducer';
import {SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertRedures, initialState);

    const setAlert = (msg, type) => {
        const id = Math.random();
        dispatch({type: SET_ALERT, payload: {msg, type, id}})

        setTimeout(() => {
            dispatch({type: REMOVE_ALERT, payload: id})
        },5000)
    } 

    return (
        <AlertContext.Provider value={{alerts: state, setAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
} 

export default AlertState;