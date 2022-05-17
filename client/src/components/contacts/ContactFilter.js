import React from 'react'
import ContactContext from '../../context/contacts/contactContext'
import { useContext, useRef, useEffect } from 'react'


const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const text = useRef('')
    const {filterContacts, clearFiltered, filtered } = contactContext


    useEffect(() => {
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChangeHandler = (e) => {
        if(text.current.value !== '') {
           filterContacts(e.target.value);
        } else {
            clearFiltered();
        }
    }

  return (
    <form>
        <input ref={text} placeholder='Filter Contacts...' onChange={onChangeHandler} type="text" name="" id="" />
    </form>
  )
}


export default ContactFilter;