import React, { useState, useContext } from 'react';
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    address: '',
    role: 'user' // Automatically set role to "user"
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      // Kiểm tra xem username đã tồn tại hay chưa
      const response = await fetch(`http://localhost:9999/users?username=${user.username}`);
      const existingUsers = await response.json();
  
      if (existingUsers.length > 0) {
        alert('Username already exists. Please choose another username.');
        return; // Dừng đăng ký nếu tài khoản đã tồn tại
      }
  
      // Nếu không tồn tại, tiến hành đăng ký
      await register(user);
      setUser({ username: '', password: '', address: '', role: 'user' });
      setShowModal(false);
      navigate('/login'); // Chuyển hướng về trang đăng nhập
  
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to register this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegisterForm;
