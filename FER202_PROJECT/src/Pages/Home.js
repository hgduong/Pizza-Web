import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useAuth from '../Hooks/useAuth';
import AdminHeader from '../Components/AdminPage';
import UserHeader from '../Components/UserHeader';

const Management = () => {
  const { role } = useAuth();
  
  const renderContent = () => {
    switch(role) {
      case 'admin':
        return <AdminHeader />;
      case 'user':
        return <UserHeader />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Management;
