import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <FiSearch
                style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                }}
            />
            <input
                type="text"
                className="form-control"
                placeholder="Search for delicious food..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    paddingLeft: '40px',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-sm)'
                }}
            />
        </div>
    );
};

export default SearchBar;
