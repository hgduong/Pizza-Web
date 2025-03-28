import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <h2>🎉 Đặt hàng thành công! 🎉</h2>
            <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
            <Button variant="primary" onClick={() => navigate('/home')}>
                Quay về Trang Chủ
            </Button>
        </Container>
    );
};

export default OrderSuccess;
