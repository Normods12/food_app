import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { orderService } from '../services/orderService';
import OrderStatusBadge from '../components/OrderStatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderService.getMyOrders();
                // Sort by id descending (newest first)
                setOrders(data.sort((a, b) => b.id - a.id));
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', padding: '40px 0', backgroundColor: 'var(--bg-main)' }}>
            <Container>
                <h2 style={{ fontWeight: '800', marginBottom: '2rem' }}>My <span className="text-gradient">Orders</span></h2>

                {orders.length === 0 ? (
                    <div className="text-center py-5 tomato-card">
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛍️</div>
                        <h4>No Orders Yet</h4>
                        <p className="text-muted">You haven't placed any orders. Discover something delicious!</p>
                        <Link to="/menu" className="btn btn-primary mt-3">Browse Menu</Link>
                    </div>
                ) : (
                    <Row className="g-4">
                        {orders.map(order => (
                            <Col lg={6} key={order.id}>
                                <div className="tomato-card p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Order #{order.id}</span>
                                        <OrderStatusBadge status={order.status} />
                                    </div>

                                    <div className="mb-3 text-muted small">
                                        Placed on: {new Date(order.createdAt).toLocaleString()}
                                    </div>

                                    <hr />

                                    <div className="mb-3">
                                        {order.items.map(item => (
                                            <div key={item.id} className="d-flex justify-content-between mb-2">
                                                <span>{item.quantity}x {item.menuItem.name}</span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Badge bg={order.paymentStatus === 'COMPLETED' ? 'success' : 'warning'} className="me-2">
                                                {order.paymentStatus}
                                            </Badge>
                                            <span className="text-muted small">via {order.paymentMethod}</span>
                                        </div>
                                        <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--tomato-primary)' }}>
                                            ${order.totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default MyOrdersPage;
