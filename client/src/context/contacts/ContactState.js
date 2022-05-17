import { useReducer } from "react";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from 'axios' 
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CONTACT_ERROR,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch(err) {
      console.log(err);
      dispatch({type: GET_CONTACTS, payload: err.response.msg});
    }
  };


  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch(err) {
      console.log(err);
      dispatch({type: CONTACT_ERROR, payload: err.response.msg});
    }
  };

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const filterContacts = (text) => {
    dispatch({ type: CLEAR_CONTACTS, payload: text });
  };

  const clearFiltered = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        error: state.error,
        clearFiltered,
        filterContacts,
        updateContact,
        addContact,
        deleteContact,
        current: state.current,
        setCurrent,
        clearCurrent,
        getContacts
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
