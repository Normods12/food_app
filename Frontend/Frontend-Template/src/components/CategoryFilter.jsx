import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="category-filter-container py-3">
            <div
                className="d-flex flex-nowrap overflow-auto"
                style={{
                    gap: '1.5rem',
                    paddingBottom: '1rem',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE
                }}
            >
                <div
                    onClick={() => onSelectCategory(null)}
                    style={{
                        minWidth: '90px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: selectedCategory === null ? 1 : 0.6,
                        transform: selectedCategory === null ? 'scale(1.05)' : 'scale(1)',
                        transition: 'var(--transition-fast)'
                    }}
                >
                    <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: selectedCategory === null ? 'var(--shadow-md)' : 'none',
                        border: selectedCategory === null ? '2px solid var(--tomato-primary)' : '2px solid transparent',
                        marginBottom: '8px'
                    }}>
                        🍽️
                    </div>
                    <span style={{ fontWeight: selectedCategory === null ? '600' : '500', fontSize: '0.9rem' }}>All</span>
                </div>

                {categories.map(cat => (
                    <div
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        style={{
                            minWidth: '90px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            opacity: selectedCategory === cat.id ? 1 : 0.6,
                            transform: selectedCategory === cat.id ? 'scale(1.05)' : 'scale(1)',
                            transition: 'var(--transition-fast)'
                        }}
                    >
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: selectedCategory === cat.id ? 'var(--shadow-md)' : 'none',
                            border: selectedCategory === cat.id ? '2px solid var(--tomato-primary)' : '2px solid transparent',
                            marginBottom: '8px'
                        }}>
                            <img
                                src={cat.imageUrl}
                                alt={cat.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <span style={{ fontWeight: selectedCategory === cat.id ? '600' : '500', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
            <style>{"\
        .category-filter-container ::-webkit-scrollbar {\
          display: none;\
        }\
      "}</style>
        </div>
    );
};

export default CategoryFilter;
