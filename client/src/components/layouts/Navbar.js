import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand">
          <i className={icon}></i> {title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
