import React, { createContext, useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { categoryService } from '../services/categoryService';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [menuData, categoryData] = await Promise.all([
                menuService.getAll(),
                categoryService.getAll()
            ]);
            setMenuItems(menuData);
            setCategories(categoryData);
        } catch (err) {
            console.error("Failed to fetch store data", err);
            setError("Unable to load initial data");
        } finally {
            setLoading(false);
        }
    };

    const searchItems = async (query) => {
        try {
            const data = await menuService.search(query);
            return data;
        } catch (err) {
            console.error("Failed to search", err);
            return [];
        }
    }

    return (
        <StoreContext.Provider value={{ menuItems, categories, loading, error, searchItems }}>
            {children}
        </StoreContext.Provider>
    );
};
