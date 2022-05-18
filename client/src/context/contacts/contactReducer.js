import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CONTACTS,
    FILTER_CONTCTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
  } from "../types";

  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT: 
            return {...state, contacts: [...state.contacts, action.payload]}
        case GET_CONTACTS:
            return {...state, contacts: action.payload}
        case DELETE_CONTACT: 
            return {...state, contacts: state.contacts.filter(c => c._id !== action.payload)}
        case SET_CURRENT: 
            return {...state, current: action.payload}
        case CLEAR_CURRENT: 
            return {...state, current: null}
        case CLEAR_CONTACTS: 
            return {...state, contacts: [] }
        case UPDATE_CONTACT: 
            return {...state, contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)}
        case FILTER_CONTCTS: 
            return {...state, filtered: state.contacts.filter(contact => {
                const regex = new RegExp(`${action.payload}`, 'gi')
                return contact.name.match(regex) || contact.email.match(regex)
            })}
        case CLEAR_FILTER: 
            return {...state, filtered: null}
        case CONTACT_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
  }