import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      toast.success("Account created successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-main)', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="tomato-card p-4 p-md-5"
            >
              <div className="text-center mb-4">
                <h2 style={{ fontWeight: '800', color: 'var(--tomato-primary)' }}>🍅 Tomato.</h2>
                <h4 className="mt-3" style={{ fontWeight: '700' }}>Create an Account</h4>
                <p className="text-muted">Join us to order the best food in town!</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="input-label">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="input-label">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="input-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="input-label">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="input-label">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control"
                        minLength="6"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="input-label">Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="form-control"
                        minLength="6"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-4"
                  style={{ padding: '0.8rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Log in</Link>
                  </p>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;