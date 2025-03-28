// src/Pages/AdminPage.js
import React from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import { Container } from 'react-bootstrap';

const AdminPage = () => {
    return (
        <>
            <AdminNavbar />
            <h1 style={{ textAlign: 'center' }}>Welcome to the Admin Panel</h1>
            <p style={{ textAlign: 'center' }}>Please use the navigation above to manage users and products.</p>
        </>


    );
};

export default AdminPage;
