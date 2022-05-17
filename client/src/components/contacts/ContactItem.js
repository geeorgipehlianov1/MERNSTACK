import React from "react";
import ContactContext from "../../context/contacts/contactContext";
import { useContext } from "react";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {/* {type.charAt(0).toUpperCase() + type.slice(1)} */}
        </span>
      </h3>
      <ul>
        {email && <li>{email}</li>}
        {phone && <li>{phone}</li>}
      </ul>
      <p className="btn btn-dark btn-small" onClick={() => setCurrent(contact)} >Edit</p>
      <p className="btn btn-danger btn-small" onClick={onDelete}>
        Delete
      </p>
    </div>
  );
};

export default ContactItem;
