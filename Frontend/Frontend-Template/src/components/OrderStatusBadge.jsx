import React from 'react';

const OrderStatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'PENDING':
                return { color: '#f59e0b', bg: '#fef3c7', text: 'Processing' };
            case 'CONFIRMED':
                return { color: '#3b82f6', bg: '#dbeafe', text: 'Confirmed' };
            case 'PREPARING':
                return { color: '#8b5cf6', bg: '#ede9fe', text: 'Preparing' };
            case 'OUT_FOR_DELIVERY':
                return { color: '#F97316', bg: '#ffedd5', text: 'On the Way' };
            case 'DELIVERED':
                return { color: '#10b981', bg: '#d1fae5', text: 'Delivered' };
            case 'CANCELLED':
                return { color: '#ef4444', bg: '#fee2e2', text: 'Cancelled' };
            default:
                return { color: '#6b7280', bg: '#f3f4f6', text: status };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span style={{
            backgroundColor: config.bg,
            color: config.color,
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'inline-block'
        }}>
            {config.text}
        </span>
    );
};

export default OrderStatusBadge;
