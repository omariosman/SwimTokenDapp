import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";



const NewHeader = (props) => {

  return (
    // <nav >
    <header>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          bg="black"
          expand={expand}
          className="mb-0"
          fixed="top"
        >
          <Container>
            <Toaster style={{ zIndex: "2" }} />

            <Navbar.Brand href="http://www.swimspreadwisdom.io">
              <div className="logo-area">
                <img alt="SWIM" src="assets/img/logo.png" width="120" />
              </div>
            </Navbar.Brand>

            <Navbar
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="navbar-menus"
            >
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                <Nav.Link href="http://www.swimspreadwisdom.io">Home</Nav.Link>
                <Nav.Link>
                </Nav.Link>
              </Nav>
            </Navbar>
          </Container>
        </Navbar>
      ))}
    </header>
  );
};
export default NewHeader;
