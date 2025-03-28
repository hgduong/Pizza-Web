import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showModal, setShowModal] = useState(false);
  const { login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:9999/users?username=${username}&password=${password}`);
      const user = response.data[0];
      if (user) {
        login(user.role);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        
        navigate('/home');
      } else {
        // alert('Invalid credentials');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  // const handleClose = () => {
  //   setShowModal(false);
  // };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            { showModal && <p style={{ color: 'red' }}>Your password or Username is incorrect</p>}
            <Row className="mt-3">
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" type="button" className="w-100" onClick={handleRegister}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

{/*       
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your password or user name is incorrect
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default Login;
