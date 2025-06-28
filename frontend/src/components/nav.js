import React from "react";
import "../App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import MainLogo from "./assets/logo.png"

class nav extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    if (localStorage.getItem('loginAccess') !== 'true') {
      return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={MainLogo}
                className="navbar-site-logo"
                style={{ width: "40px" }}
              />
              <span className="nav-site-name">TRAFFIC GUARDIAN</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div class="navbar-nav ml-auto">
              <a href="/services" class="nav-item nav-link">Services</a>
              <a href="/about" class="nav-item nav-link">About Us</a>
              <a href="/contact" class="nav-item nav-link">Contact Us</a>
              <a href="/login" class="nav-item nav-link">Login</a>
              <a href="/register" class="nav-item nav-link">Register</a>
            </div>
          </Container>
        </Navbar>
      )
    } else {
      return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">TRAFFIC GUARDIAN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div class="navbar-nav ml-auto">
              <a href="/services" class="nav-item nav-link">Services</a>
              <a href="/about" class="nav-item nav-link">About Us</a>
              <a href="/contact" class="nav-item nav-link">Contact Us</a>
              <a href="/user" class="nav-item nav-link">Dashboard</a>
              <a onClick={() => this.Logout()} class="nav-item nav-link">Logout</a>
            </div>
          </Container>
        </Navbar>
      )
    }
  }
}

export default nav;
