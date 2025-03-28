import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CarouselPizza from './CarouselPizza';
import { useNavigate } from 'react-router-dom';
import BannerPizza from './BannerPizza';
import './CSS/UserHeader.css';
import ProductList from './ProductList';

function GuestHeader() {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn]=useState(false);

    const handleSignIn = () => {
        navigate('/login');
    };
    const handleVouchersClick = () => {
        if (!isLoggedIn) {
            const userConfirmed = window.confirm("Bạn cần đăng nhập để nhập mã voucher")
            if(userConfirmed){
                navigate('/login');
            }
            
                      
        } else {

            
        }
    };
    const handleSignUp = () => {
        navigate('/register');
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
                        <Nav.Link onClick={handleVouchersClick}>Mã E-Voucher</Nav.Link>
                        <Nav.Link href="#menu">Thực đơn</Nav.Link>
                        <Nav.Link href="#features">Blog</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link onClick={handleSignIn}>Sign In</Nav.Link>
                        <Nav.Link onClick={handleSignUp}>Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <CarouselPizza />
            <div id="menu">
                <BannerPizza />
            </div>
            <div className="my-3">
                <ProductList />
            </div>
        </div>
    );
}

export default GuestHeader;
