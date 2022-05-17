import React from "react";
import { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";

export const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;


  useEffect(() => {
      if(current !== null) {
          setContact(current)
      } else {
        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal",
          });
      }
  } , [contactContext ,current])

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubimtHandler = (e) => {
      if(current === null) {
          addContact(contact);
      } else {
        updateContact(contact)
        clearAll()
    }
    e.preventDefault();
    setContact({ name: "", email: "", phone: "", type: "personal" });
  };

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <form onSubmit={onSubimtHandler}>
      <h2 className="text-primary"> {current === null ? 'Add Contact' :'Edit Contact'} </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === "personal"}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        checked={type === "professional"}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current === null ? 'Add Contact' :' Update Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
      </div> }
    </form>
  );
};

export default ContactForm;
