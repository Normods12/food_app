package com.foods.service;

import com.foods.entity.MenuItem;
import com.foods.entity.Category;
import com.foods.repository.MenuItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {
    @Autowired
    private MenuItemRepo menuItemRepo;
    
    @Autowired
    private CategoryService categoryService;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepo.findAll();
    }

    public List<MenuItem> getMenuItemsByCategory(Long categoryId) {
        return menuItemRepo.findByCategory_Id(categoryId);
    }

    public List<MenuItem> searchMenuItems(String query) {
        return menuItemRepo.findByNameContainingIgnoreCase(query);
    }

    public MenuItem getMenuItemById(Long id) {
        return menuItemRepo.findById(id).orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    public MenuItem createMenuItem(MenuItem item, Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        item.setCategory(category);
        return menuItemRepo.save(item);
    }

    public MenuItem updateMenuItem(Long id, MenuItem updatedItem, Long categoryId) {
        MenuItem existing = getMenuItemById(id);
        if (categoryId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            existing.setCategory(category);
        }
        existing.setName(updatedItem.getName());
        existing.setDescription(updatedItem.getDescription());
        existing.setPrice(updatedItem.getPrice());
        existing.setImageUrl(updatedItem.getImageUrl());
        existing.setAvailable(updatedItem.isAvailable());
        return menuItemRepo.save(existing);
    }

    public void deleteMenuItem(Long id) {
        menuItemRepo.deleteById(id);
    }
}
