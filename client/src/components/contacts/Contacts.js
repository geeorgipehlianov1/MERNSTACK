import React from "react";
import ContactContext from "../../context/contacts/contactContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useContext, useEffect } from "react";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts } = contactContext;

  
  useEffect(() => {
    getContacts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
          ? filtered.map(contact => (<CSSTransition key={contact._id} timeout={1000} className='item'><ContactItem contact={contact} /></CSSTransition>))
          : contacts.map(contact => (<CSSTransition key={contact._id} timeout={1000} className='item'><ContactItem contact={contact} /></CSSTransition>))
    }
    </TransitionGroup>   
    </>
  ); 
};

export default Contacts;
