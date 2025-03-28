import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

// lấy thông tin người dùng và giỏ hàng
const ProductCard = ({ product }) => {
    const { role } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
// hiển thị chi tiết sản phẩm
    const handleShowDetails = () => {
        if (role === 'user') {
            setShowModal(true); // nếu là user thì hiển thị            
        } else {
            alert('Bạn cần đăng nhập để xem sản phẩm');
            navigate('/login');// không thể xem nếu chưa login--> Login
        }
    };
    // const handleShowDetails = () => {
    //     if (role === 'user') {
    //         setShowModal(true); // Nếu là user, hiển thị modal
    //     } else {
    //         const confirmLogin = window.confirm('Bạn cần đăng nhập để xem sản phẩm. Bạn có muốn đăng nhập ngay không?');
            
    //         if (confirmLogin) {
    //             navigate('/login'); 
    //         } else {
    //             alert('Bạn đã huỷ đăng nhập.'); 
    //         }
    //     }
    // };
// xử lí thêm sp vào giỏ hàng 
    const handleAddToCart = () => {
    
        addToCart(product);// thêm sp
        setShowModal(false); // đóng modal sau khi thêm
        alert('Sản phẩm đã được thêm');
        
    };

    return (
        <>   
        
        {/* Hiển thị card sp*/}
            <Card style={{ width: '18rem', margin: '1rem' }}>
                <div onClick={handleShowDetails}>
                    <Card.Img variant="top" src={product.image} alt={product.name} />
                </div>
                {/* <Card.Img variant="top" src={product.image} alt={product.name} /> */}
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Price: ${product.price}</strong></Card.Text>
                    <Button variant="primary" onClick={handleShowDetails}>Details</Button>
                </Card.Body>
            </Card>
             {/*Hiển thị chi tiết sp*/}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                    <p>{product.description}</p>
                    <p><strong>Price: ${product.price}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>  {/*đóng xem chi tiết*/}
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>        {/*thêm sp*/}
                    
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductCard;
