import React, { useContext } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

const CartPage = () => {
    const { cartItems, cartTotal, loadingCart, updateQuantity, removeItem, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (loadingCart) return <LoadingSpinner />;

    if (cartItems.length === 0) {
        return (
            <Container className="py-5 text-center">
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
                <h3 style={{ fontWeight: '700' }}>Your cart is empty</h3>
                <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
            </Container>
        );
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', padding: '40px 0', backgroundColor: 'var(--bg-main)' }}>
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 style={{ fontWeight: '800' }}>Your <span className="text-gradient">Cart</span></h2>
                    <button className="btn btn-outline-danger btn-sm" onClick={clearCart} style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                        Clear Cart
                    </button>
                </div>

                <Row>
                    <Col lg={8} className="mb-4">
                        <div className="tomato-card p-0 overflow-hidden">
                            <Table responsive hover className="mb-0 align-middle">
                                <thead style={{ backgroundColor: '#f9fafb' }}>
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="py-3">Price</th>
                                        <th className="py-3">Quantity</th>
                                        <th className="py-3">Total</th>
                                        <th className="pe-4 py-3 text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <img
                                                        src={item.menuItem.imageUrl}
                                                        alt={item.menuItem.name}
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                                                    />
                                                    <span style={{ fontWeight: '600' }}>{item.menuItem.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3">${item.menuItem.price.toFixed(2)}</td>
                                            <td className="py-3">
                                                <div className="d-flex align-items-center gap-2" style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', padding: '2px 8px', width: 'fit-content' }}>
                                                    <button
                                                        className="btn btn-sm p-1"
                                                        onClick={() => {
                                                            if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                                                            else removeItem(item.id);
                                                        }}
                                                    ><FiMinus /></button>
                                                    <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                    <button
                                                        className="btn btn-sm p-1"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    ><FiPlus /></button>
                                                </div>
                                            </td>
                                            <td className="py-3" style={{ fontWeight: '600' }}>
                                                ${(item.menuItem.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="pe-4 py-3 text-end">
                                                <button className="btn btn-link text-danger p-0" onClick={() => removeItem(item.id)}>
                                                    <FiTrash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="tomato-card p-4 sticky-top" style={{ top: '90px' }}>
                            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h4>

                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Delivery Fee</span>
                                <span>$2.99</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Taxes</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-4">
                                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Total</span>
                                <span style={{ fontWeight: '800', color: 'var(--tomato-primary)', fontSize: '1.3rem' }}>
                                    ${(cartTotal + 2.99 + (cartTotal * 0.08)).toFixed(2)}
                                </span>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-3"
                                style={{ fontSize: '1.1rem', fontWeight: '600' }}
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CartPage;
