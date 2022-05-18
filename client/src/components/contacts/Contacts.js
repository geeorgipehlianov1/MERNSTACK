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


  return(
    <>    
    {contacts && contacts.map(contact => (<ContactItem  key={contact._id} contact={contact} />))}
    </>
  ); 
};

export default Contacts;
