import React from "react";
import ContactContext from "../../context/contacts/contactContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useContext } from "react";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;


  if(contacts.length === 0) {
      return <h4>Please add a contact!</h4>
  }

  let hasFilter = false;
  if(filtered !== null) {
      hasFilter = true;
  }

  return(
    <>
    <TransitionGroup>
     {hasFilter === true 
          ? filtered.map(contact => (<CSSTransition key={contact.id} timeout={1000} className='item'><ContactItem contact={contact} /></CSSTransition>))
          : contacts.map(contact => (<CSSTransition key={contact.id} timeout={1000} className='item'><ContactItem contact={contact} /></CSSTransition>))
    }
    </TransitionGroup>   
    </>
  ); 
};

export default Contacts;
