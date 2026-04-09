import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--text-dark)', color: 'var(--text-light)', paddingTop: '4rem', paddingBottom: '2rem', marginTop: 'auto' }}>
            <Container>
                <Row className="gy-4 mb-5">
                    <Col lg={4} md={6}>
                        <h3 style={{ color: 'var(--tomato-primary)', fontWeight: '800', marginBottom: '1rem' }}>🍅 Tomato.</h3>
                        <p className="text-muted mb-4" style={{ color: '#9ca3af !important' }}>
                            Delivering happiness to your doorstep. The best foods from top restaurants brought right to you, hot and fresh.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex' }}><FiFacebook /></a>
                            <a href="#" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex' }}><FiTwitter /></a>
                            <a href="#" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex' }}><FiInstagram /></a>
                        </div>
                    </Col>

                    <Col lg={2} md={6}>
                        <h5 className="text-white mb-4">Company</h5>
                        <ul className="list-unstyled" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                            <li><Link to="/" style={{ color: '#9ca3af' }}>About Us</Link></li>
                            <li><Link to="/menu" style={{ color: '#9ca3af' }}>Our Menu</Link></li>
                            <li><Link to="#" style={{ color: '#9ca3af' }}>Delivery Times</Link></li>
                            <li><Link to="#" style={{ color: '#9ca3af' }}>Privacy Policy</Link></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h5 className="text-white mb-4">Get in Touch</h5>
                        <ul className="list-unstyled" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                            <li style={{ color: '#9ca3af' }}>123 Food Street, NY 10001</li>
                            <li style={{ color: '#9ca3af' }}>support@tomato.com</li>
                            <li style={{ color: '#9ca3af' }}>+1 (555) 123-4567</li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h5 className="text-white mb-4">Newsletter</h5>
                        <p style={{ color: '#9ca3af' }}>Subscribe for exclusive deals and offers!</p>
                        <div className="d-flex mt-3">
                            <input type="email" placeholder="Your email address" className="form-control" style={{ borderRadius: 'var(--radius-md) 0 0 var(--radius-md)' }} />
                            <button className="btn btn-primary" style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>Subscribe</button>
                        </div>
                    </Col>
                </Row>

                <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af' }}>
                    <p className="mb-0">© {new Date().getFullYear()} Tomato Food Delivery. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
