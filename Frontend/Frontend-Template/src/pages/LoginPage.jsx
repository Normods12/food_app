import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-main)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="tomato-card p-4 p-md-5"
            >
              <div className="text-center mb-4">
                <h2 style={{ fontWeight: '800', color: 'var(--tomato-primary)' }}>🍅 Tomato.</h2>
                <h4 className="mt-3" style={{ fontWeight: '700' }}>Welcome Back</h4>
                <p className="text-muted">Sign in to your account</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="input-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control"
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="input-label">Password</Form.Label>
                    <Link to="#" className="small" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                  </div>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control"
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-4"
                  style={{ padding: '0.8rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Don't have an account? <Link to="/signup" style={{ fontWeight: '600' }}>Sign up</Link>
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

export default LoginPage;