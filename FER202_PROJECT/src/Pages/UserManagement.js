// UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Dropdown, Form, Row, Table } from 'react-bootstrap';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', address: '', role: 'user' });

    useEffect(() => {
        axios.get('http://localhost:9999/users?role=user')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const addUser = () => {
        axios.post('http://localhost:9999/users', newUser)
            .then(response => setUsers([...users, response.data]))
            .catch(error => console.error('Error adding user:', error));
    };

    const deleteUser = (id) => {
        if (users.role === 'admin') {
            alert("You cant delete admin");
        } else {
            axios.delete(`http://localhost:9999/users/${id}`)
                .then(() => setUsers(users.filter(user => user.id !== id)))
                .catch(error => console.error('Error deleting user:', error));
        }
    };


    return (
        <div>
            <Container>
                        <h2 style={{ textAlign: 'center', marginTop: '3%' }} >User Management</h2>
                <Row>
                    <Col xs={3}>
                        <Form onSubmit={addUser}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={newUser.username} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={newUser.password} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={newUser.address} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" name="role" value={newUser.role} onChange={handleInputChange} readOnly />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Add User
                            </Button>
                        </Form>
                    </Col>

                    <Col xs={9}>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default UserManagement;
