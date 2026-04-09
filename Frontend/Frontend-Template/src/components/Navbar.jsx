import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const AppNavbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: 'var(--tomato-primary)', fontWeight: '800', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🍅 Tomato.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center" style={{ gap: '15px' }}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/cart" style={{ position: 'relative' }}>
                  <FiShoppingCart size={22} />
                  {cartQuantity > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      backgroundColor: 'var(--tomato-primary)',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      transform: 'translate(25%, -25%)'
                    }}>
                      {cartQuantity}
                    </span>
                  )}
                </Nav.Link>

                <NavDropdown
                  title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FiUser /> {user?.firstName}</span>}
                  id="basic-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                  {user?.role === 'ADMIN' && (
                    <NavDropdown.Item as={Link} to="/admin" className="text-danger">Admin Dashboard</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}><FiLogOut /> Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-flex" style={{ gap: '10px' }}>
                <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1.2rem' }}>Log in</Link>
                <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem' }}>Sign up</Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;