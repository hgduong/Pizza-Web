import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi'; 
import { FaRegUserCircle } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb"; 
import { IoIosLogOut } from "react-icons/io";

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CarouselPizza from './CarouselPizza';
import BannerPizza from './BannerPizza';
import ProductList from './ProductList';

import './CSS/UserHeader.css';


function UserHeader() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
// lấy thông tin user và điều hướng đến profile
  const handleNavigate = () => {
    if (user && user.id) {
      navigate(`/profile/${user.id}`);
    } else {
      console.error('User not found');
    }
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="custom-navbar" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/2036px-Domino%27s_pizza_logo.svg.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Pizza logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/voucher')}>Mã E-Voucher</Nav.Link>
            <Nav.Link href="#menu">Thực đơn</Nav.Link>
            <Nav.Link href="#features">Blog</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate('/cart')}>
              <FiShoppingCart />   
            </Nav.Link>

            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleNavigate}><FaRegUserCircle /> Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}><IoIosLogOut /> Log Out</NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown title={user ? user.username : "Profile"} id="basic-nav-dropdown">
  <NavDropdown.Item onClick={handleNavigate}>
    <FaRegUserCircle /> Profile
  </NavDropdown.Item>
  <NavDropdown.Divider />
  <NavDropdown.Item onClick={handleLogout}>
    <IoIosLogOut /> Log Out
  </NavDropdown.Item>
</NavDropdown> */}

          </Nav>
        </Container>
      </Navbar>
      <CarouselPizza  id='home'/>
      <div id="menu">
      <BannerPizza />
      </div>
      <div className="my-3">
        <ProductList />
      </div>

    </div>
  );
}

export default UserHeader;
