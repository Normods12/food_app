import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import { StoreContext } from '../context/StoreContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

const HomePage = () => {
    const { menuItems, categories, loading } = useContext(StoreContext);

    if (loading) return <LoadingSpinner />;

    const featuredItems = menuItems.slice(0, 4);

    return (
        <div className="home-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836") center/cover',
                padding: '100px 0',
                color: 'white'
            }}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'white' }}>
                                    Delicious Food,<br />
                                    <span className="text-gradient">Delivered To You.</span>
                                </h1>
                                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
                                    Craving something delicious? Let us satisfy your hunger with the best dishes from top restaurants. Hot, fresh, and fast!
                                </p>
                                <div className="d-flex gap-3">
                                    <Link to="/menu" className="btn btn-primary btn-lg" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
                                        Order Now
                                    </Link>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Categories Section */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h2 style={{ fontWeight: '800' }}>Explore <span className="text-gradient">Categories</span></h2>
                        <p className="text-muted">Find exactly what you're craving</p>
                    </div>

                    <Row className="justify-content-center g-4">
                        {categories.map((cat, idx) => (
                            <Col key={cat.id} xs={6} md={3} lg={2}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                >
                                    <Link to="/menu" state={{ selectedCategory: cat.id }} style={{ textDecoration: 'none' }}>
                                        <div className="text-center p-3 tomato-card" style={{ cursor: 'pointer', borderRadius: 'var(--radius-lg)' }}>
                                            <div style={{ width: '80px', height: '80px', margin: '0 auto 15px', borderRadius: '50%', overflow: 'hidden' }}>
                                                <img src={cat.imageUrl} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <h6 style={{ fontWeight: '600', color: 'var(--text-dark)', margin: 0 }}>{cat.name}</h6>
                                        </div>
                                    </Link>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Featured Items Section */}
            <section className="py-5">
                <Container>
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 style={{ fontWeight: '800', margin: 0 }}>Featured <span className="text-gradient">Dishes</span></h2>
                            <p className="text-muted mb-0 mt-2">Popular choices from our menu</p>
                        </div>
                        <Link to="/menu" className="btn btn-outline">View All</Link>
                    </div>

                    <Row className="g-4">
                        {featuredItems.map((item, idx) => (
                            <Col key={item.id} xs={12} md={6} lg={3}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="h-100"
                                >
                                    <FoodCard item={item} />
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* How it works */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h2 style={{ fontWeight: '800' }}>How It <span className="text-gradient">Works</span></h2>
                    </div>
                    <Row className="text-center g-4">
                        <Col md={4}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                            <h4>1. Choose Order</h4>
                            <p className="text-muted">Browse our extensive menu and select your favorite dishes.</p>
                        </Col>
                        <Col md={4}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
                            <h4>2. Secure Payment</h4>
                            <p className="text-muted">Choose your preferred payment method and confirm.</p>
                        </Col>
                        <Col md={4}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛵</div>
                            <h4>3. Fast Delivery</h4>
                            <p className="text-muted">Your food is prepared and delivered right to your door.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default HomePage;
