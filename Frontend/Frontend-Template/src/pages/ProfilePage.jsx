import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <LoadingSpinner />;

    if (!user) {
        return (
            <Container className="text-center py-5">
                <h2>No Profile Found</h2>
            </Container>
        );
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', padding: '40px 0', backgroundColor: 'var(--bg-main)' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="tomato-card p-5">
                            <div className="text-center mb-4">
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--tomato-primary)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        margin: '0 auto 1rem auto'
                                    }}
                                >
                                    <FiUser />
                                </div>
                                <h3 style={{ fontWeight: '800' }}>{user.firstName} {user.lastName}</h3>
                                <div className="badge bg-danger mt-2">{user.role}</div>
                            </div>

                            <hr />

                            <div className="d-flex flex-column gap-4 mt-4">
                                <div className="d-flex align-items-center gap-3">
                                    <FiMail size={24} color="var(--tomato-primary)" />
                                    <div>
                                        <p className="mb-0 text-muted small">Email Address</p>
                                        <p className="mb-0 fw-bold">{user.email}</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <FiPhone size={24} color="var(--tomato-primary)" />
                                    <div>
                                        <p className="mb-0 text-muted small">Phone Number</p>
                                        <p className="mb-0 fw-bold">{user.phone || 'Not Provided'}</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <FiCalendar size={24} color="var(--tomato-primary)" />
                                    <div>
                                        <p className="mb-0 text-muted small">Member Since</p>
                                        <p className="mb-0 fw-bold">{user.createdDate ? new Date(user.createdDate).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
