import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: '' });

    useEffect(() => {
        axios.get('http://localhost:9999/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'price' ? parseFloat(value) : value;
        console.log("🚀 ~ handleInputChange ~ newValue:", newValue)
        setNewProduct({ ...newProduct, [name]: newValue });
    };

    const addProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9999/products', newProduct)
            .then(response => setProducts([...products, response.data]))
            .catch(error => console.error('Error adding product:', error));
    };

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:9999/products/${id}`)
            .then(() => setProducts(products.filter(product => product.id !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    const updateProduct = (id, updatedProduct) => {
        axios.put(`http://localhost:9999/products/${id}`, updatedProduct)
            .then(response => {
                setProducts(products.map(product => product.id === id ? response.data : product));
            })
            .catch(error => console.error('Error updating product:', error));
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '3%' }}>Product Management</h2>
            <Container>
                <Row>
                    <Col xs={3}>
                        <Form onSubmit={addProduct}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="textarea" name="description" value={newProduct.description} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control type="text" name="image" value={newProduct.image} onChange={handleInputChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Product
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={9}>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td><img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} /></td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => deleteProduct(product.id)}>
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

export default ProductManagement;
