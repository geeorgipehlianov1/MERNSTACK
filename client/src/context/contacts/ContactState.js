import { useReducer } from "react";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Jonson",
        email: "jill@abv.bg",
        phone: "0894646728",
        type: "personal",
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "sara@abv.bg",
        phone: "0894646729",
        type: "personal",
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@abv.bg",
        phone: "0894646730",
        type: "professional",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    contact.id = Math.random();
    dispatch({ type: ADD_CONTACT, payload: contact });
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
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFiltered = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        filtered: state.filtered,
        clearFiltered,
        filterContacts,
        updateContact,
        addContact,
        deleteContact,
        current: state.current,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
