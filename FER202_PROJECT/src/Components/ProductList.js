// src/ProductList.js
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from './ProductCard';
import { ProductContext } from '../Context/ProductContext';
// Hiển thị danh sách sp
const ProductList = () => {
    const { products } = useContext(ProductContext);

    return (
        <Container>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductList;
