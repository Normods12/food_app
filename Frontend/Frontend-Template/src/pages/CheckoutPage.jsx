import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { addressService } from '../services/addressService';
import { orderService } from '../services/orderService';
import AddressForm from '../components/AddressForm';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('CARD');
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
            return;
        }
        fetchAddresses();
    }, [cartItems, navigate]);

    const fetchAddresses = async () => {
        try {
            const data = await addressService.getAll();
            setAddresses(data);
            if (data.length > 0) {
                const defaultAddress = data.find(a => a.isDefault);
                setSelectedAddressId(defaultAddress ? defaultAddress.id : data[0].id);
            } else {
                setShowAddressForm(true);
            }
        } catch (error) {
            toast.error("Failed to load addresses");
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async (formData) => {
        try {
            const newAddress = await addressService.add(formData);
            setAddresses([...addresses, newAddress]);
            setSelectedAddressId(newAddress.id);
            setShowAddressForm(false);
            toast.success("Address added successfully");
        } catch (error) {
            toast.error("Failed to add address");
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address");
            return;
        }

        setPlacingOrder(true);
        const orderData = {
            deliveryAddressId: selectedAddressId,
            paymentMethod: paymentMethod,
            orderItems: cartItems.map(item => ({
                menuItemId: item.menuItem.id,
                quantity: item.quantity
            }))
        };

        try {
            const order = await orderService.placeOrder(orderData);
            toast.success("Order placed successfully!");
            clearCart();
            // Wait a sec for the toast!
            setTimeout(() => navigate('/orders'), 1500);
        } catch (error) {
            toast.error("Failed to place order");
            setPlacingOrder(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', padding: '40px 0', backgroundColor: 'var(--bg-main)' }}>
            <Container>
                <h2 style={{ fontWeight: '800', marginBottom: '2rem' }}>Checkout</h2>

                <Row className="g-4">
                    <Col lg={8}>
                        {/* Address Selection */}
                        <div className="tomato-card p-4 mb-4">
                            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>1. Delivery Address</h4>

                            {!showAddressForm ? (
                                <>
                                    {addresses.length > 0 ? (
                                        <div className="d-flex flex-column gap-3">
                                            {addresses.map(address => (
                                                <div
                                                    key={address.id}
                                                    className="p-3 border rounded"
                                                    style={{
                                                        cursor: 'pointer',
                                                        borderColor: selectedAddressId === address.id ? 'var(--tomato-primary)' : 'var(--border-light)',
                                                        backgroundColor: selectedAddressId === address.id ? 'rgba(255, 65, 65, 0.05)' : 'white'
                                                    }}
                                                    onClick={() => setSelectedAddressId(address.id)}
                                                >
                                                    <div className="d-flex align-items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            checked={selectedAddressId === address.id}
                                                            onChange={() => setSelectedAddressId(address.id)}
                                                            style={{ accentColor: 'var(--tomato-primary)' }}
                                                        />
                                                        <div>
                                                            <p className="mb-0 fw-bold">{address.street}</p>
                                                            <p className="mb-0 text-muted small">{address.city}, {address.state} {address.zipCode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                className="btn btn-outline mt-2 align-self-start"
                                                onClick={() => setShowAddressForm(true)}
                                            >
                                                + Add New Address
                                            </button>
                                        </div>
                                    ) : (
                                        <p>No addresses found.</p>
                                    )}
                                </>
                            ) : (
                                <AddressForm
                                    onSubmit={handleAddAddress}
                                    onCancel={addresses.length > 0 ? () => setShowAddressForm(false) : null}
                                />
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="tomato-card p-4">
                            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>2. Payment Method</h4>
                            <div className="d-flex flex-column gap-3">
                                <div
                                    className="p-3 border rounded d-flex align-items-center gap-3"
                                    style={{
                                        cursor: 'pointer',
                                        borderColor: paymentMethod === 'CARD' ? 'var(--tomato-primary)' : 'var(--border-light)',
                                        backgroundColor: paymentMethod === 'CARD' ? 'rgba(255, 65, 65, 0.05)' : 'white'
                                    }}
                                    onClick={() => setPaymentMethod('CARD')}
                                >
                                    <input type="radio" checked={paymentMethod === 'CARD'} readOnly style={{ accentColor: 'var(--tomato-primary)' }} />
                                    <span className="fw-bold">Credit/Debit Card</span>
                                </div>
                                <div
                                    className="p-3 border rounded d-flex align-items-center gap-3"
                                    style={{
                                        cursor: 'pointer',
                                        borderColor: paymentMethod === 'COD' ? 'var(--tomato-primary)' : 'var(--border-light)',
                                        backgroundColor: paymentMethod === 'COD' ? 'rgba(255, 65, 65, 0.05)' : 'white'
                                    }}
                                    onClick={() => setPaymentMethod('COD')}
                                >
                                    <input type="radio" checked={paymentMethod === 'COD'} readOnly style={{ accentColor: 'var(--tomato-primary)' }} />
                                    <span className="fw-bold">Cash on Delivery (COD)</span>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        {/* Order Summary */}
                        <div className="tomato-card p-4 sticky-top" style={{ top: '90px' }}>
                            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>Order Details</h4>

                            <div className="d-flex flex-column gap-3 mb-4 max-height" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            <span style={{ fontWeight: '600', color: 'var(--tomato-primary)' }}>{item.quantity}x</span>
                                            <span className="text-truncate" style={{ maxWidth: '150px' }}>{item.menuItem.name}</span>
                                        </div>
                                        <span style={{ fontWeight: '600' }}>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-2 text-muted">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 text-muted">
                                <span>Delivery</span>
                                <span>$2.99</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Tax</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Total</span>
                                <span style={{ fontWeight: '800', color: 'var(--tomato-primary)', fontSize: '1.3rem' }}>
                                    ${(cartTotal + 2.99 + (cartTotal * 0.08)).toFixed(2)}
                                </span>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-3"
                                style={{ fontSize: '1.1rem', fontWeight: '600' }}
                                onClick={handlePlaceOrder}
                                disabled={placingOrder || !selectedAddressId}
                            >
                                {placingOrder ? 'Processing...' : 'Confirm Order'}
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CheckoutPage;
