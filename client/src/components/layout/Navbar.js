import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import contactContext from "../../context/contacts/contactContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const ContactContext = useContext(contactContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearContats } = ContactContext;

  const onLogout = () => {
    logout();
    clearContats()
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <span>Logout</span>
        </a>
      </li>
    </>
  );

  const gusetLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>Contact Keeper</h1>
      <ul>{isAuthenticated ? authLinks : gusetLinks}</ul>
    </div>
  );
};

export default Navbar;
