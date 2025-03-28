import React, { useState, useContext } from 'react';
import { VoucherContext } from '../Context/VoucherContext';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { MdDiscount } from "react-icons/md";

const VoucherPage = () => {
    const { applyVoucher } = useContext(VoucherContext);
    const [voucherCode, setVoucherCode] = useState('');
    const [message, setMessage] = useState('');

    const handleApplyVoucher = () => {
        if (applyVoucher(voucherCode)) {
            setMessage('Mã giảm giá hợp lệ! Đơn hàng của bạn sẽ được giảm giá.');
        } else {
            setMessage('Mã giảm giá không hợp lệ. Vui lòng thử lại.');
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} md={8} lg={6} className="mx-auto">
                    <h2 className="text-center">DISCOUNT <MdDiscount />

                    </h2>
                    <Form>
                        <Form.Group controlId="voucherCode">
                            <Form.Label>Discount code
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Please input discount code"
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleApplyVoucher} className="w-100 mt-3">
                            Áp dụng
                        </Button>
                    </Form>
                    {message && <Alert variant={message.includes('hợp lệ') ? 'success' : 'danger'} className="mt-3">{message}</Alert>}
                    <Link to="/home" className="btn btn-link mt-3">Back to Homepage</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default VoucherPage;
