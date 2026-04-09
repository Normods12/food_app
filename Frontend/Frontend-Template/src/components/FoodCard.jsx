import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FiPlus, FiMinus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ item }) => {
    const { cartItems, addToCart, updateQuantity, removeItem } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const cartItem = cartItems.find(c => c.menuItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items");
            navigate('/login');
            return;
        }

        if (quantity === 0) {
            const loadingToast = toast.loading("Adding...");
            try {
                await addToCart(item.id, 1);
                toast.success("Added to cart", { id: loadingToast });
            } catch (err) {
                toast.error("Failed to add", { id: loadingToast });
            }
        } else {
            updateQuantity(cartItem.id, quantity + 1);
        }
    };

    const handleRemove = () => {
        if (quantity === 1) {
            removeItem(cartItem.id);
        } else if (quantity > 1) {
            updateQuantity(cartItem.id, quantity - 1);
        }
    };

    return (
        <div className="tomato-card h-100 d-flex flex-column" style={{ position: 'relative' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={item.imageUrl || "https://via.placeholder.com/300x200?text=Food"}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    className="food-img"
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>

            <div className="p-3 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item.name}</h5>
                    <span style={{ color: 'var(--tomato-primary)', fontWeight: '700', fontSize: '1.2rem' }}>
                        ${item.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-muted small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                </p>

                <div className="mt-3">
                    {quantity === 0 ? (
                        <button
                            className="btn btn-outline w-100"
                            onClick={handleAdd}
                            disabled={!item.available}
                        >
                            {item.available ? "Add to Cart" : "Out of Stock"}
                        </button>
                    ) : (
                        <div className="d-flex align-items-center justify-content-between px-3 py-1 bg-light rounded-pill" style={{ border: '1px solid var(--border-light)' }}>
                            <button onClick={handleRemove} className="btn p-1" style={{ color: 'var(--tomato-primary)' }}><FiMinus /></button>
                            <span style={{ fontWeight: '600' }}>{quantity}</span>
                            <button onClick={handleAdd} className="btn p-1" style={{ color: 'var(--tomato-primary)' }}><FiPlus /></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
