import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
 // tính tiền sp
    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += product.price;
        });
        setTotalPrice(total);
    }, [cart]);
 // hàm xử lí checkout
    const handleCheckout = () => {
        navigate('/invoice');
    };


    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center my-4"> <FiShoppingCart /> Shopping Cart</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        
                                        <Button variant="danger" size="sm" onClick={() => removeFromCart(product.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button style={{ marginLeft: '10px' }} variant="primary" onClick={() => navigate('/home')}>
                                Back to Homepage
                            </Button>
                            <Button style={{ display: cart.length === 0 ? 'none' : '', marginLeft: '10px' }} variant="secondary" onClick={clearCart} className="mr-2">
                                Clear Cart
                            </Button>
                            <Button style={{ display: cart.length === 0 ? 'none' : '', marginLeft: '10px' }} variant="primary" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                        <h4>Total: ${totalPrice.toFixed(2)}</h4>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
