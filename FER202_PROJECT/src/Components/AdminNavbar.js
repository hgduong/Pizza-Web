// src/Components/AdminNavbar.js
import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
      };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate('/admin')}>Admin Panel</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/admin/users')}>Manage Users</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/products')}>Manage Products</Nav.Link>
                    <Nav.Link onClick={handleLogout}>LOG OUT</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
