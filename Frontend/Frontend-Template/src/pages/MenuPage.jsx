import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { StoreContext } from '../context/StoreContext';
import LoadingSpinner from '../components/LoadingSpinner';

const MenuPage = () => {
    const { menuItems, categories, loading, searchItems } = useContext(StoreContext);
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // If navigation passed state, set default category
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location]);

    useEffect(() => {
        if (menuItems.length === 0) return;

        const runFilter = async () => {
            let result = [];

            if (searchQuery.trim().length > 0) {
                setIsSearching(true);
                result = await searchItems(searchQuery);
                // Also apply category filter to search results if a category is selected
                if (selectedCategory) {
                    result = result.filter(item => item.category.id === selectedCategory);
                }
                setIsSearching(false);
            } else {
                // No search query, just filter by category
                if (selectedCategory) {
                    result = menuItems.filter(item => item.category.id === selectedCategory);
                } else {
                    result = [...menuItems];
                }
            }
            setFilteredItems(result);
        };

        const debounceTimer = setTimeout(() => {
            runFilter();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, selectedCategory, menuItems]);

    if (loading) return <LoadingSpinner />;

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
            {/* Banner */}
            <div style={{
                backgroundColor: 'var(--text-dark)',
                color: 'white',
                padding: '3rem 0',
                marginBottom: '2rem'
            }}>
                <Container>
                    <div className="text-center">
                        <h1 style={{ fontWeight: '800', color: 'white' }}>Our <span className="text-gradient">Menu</span></h1>
                        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                            Discover an incredible variety of delicious options, crafted fresh with love.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                {/* Search & Filters */}
                <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ gap: '1rem' }}>
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                        <span className="text-muted fw-bold">{filteredItems.length} items found</span>
                    </div>
                </div>

                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <div className="mt-4">
                    {isSearching ? (
                        <LoadingSpinner />
                    ) : filteredItems.length > 0 ? (
                        <Row className="g-4">
                            {filteredItems.map(item => (
                                <Col key={item.id} xs={12} sm={6} lg={4} xl={3}>
                                    <FoodCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center py-5">
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😢</div>
                            <h3>No items found</h3>
                            <p className="text-muted">Try switching categories or searching for something else.</p>
                            <button
                                className="btn btn-outline mt-2"
                                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default MenuPage;
