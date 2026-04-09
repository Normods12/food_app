package com.foods.controller;

import com.foods.dto.MenuItemCreateDto;
import com.foods.entity.MenuItem;
import com.foods.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping
    public List<MenuItem> getAll() {
        return menuItemService.getAllMenuItems();
    }

    @GetMapping("/category/{categoryId}")
    public List<MenuItem> getByCategory(@PathVariable Long categoryId) {
        return menuItemService.getMenuItemsByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<MenuItem> search(@RequestParam String query) {
        return menuItemService.searchMenuItems(query);
    }

    @GetMapping("/{id}")
    public MenuItem getById(@PathVariable Long id) {
        return menuItemService.getMenuItemById(id);
    }

    @PostMapping
    public MenuItem create(@RequestBody MenuItemCreateDto dto) {
        MenuItem item = new MenuItem();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setImageUrl(dto.getImageUrl());
        item.setAvailable(dto.isAvailable());
        return menuItemService.createMenuItem(item, dto.getCategoryId());
    }

    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, @RequestBody MenuItemCreateDto dto) {
        MenuItem item = new MenuItem();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setImageUrl(dto.getImageUrl());
        item.setAvailable(dto.isAvailable());
        return menuItemService.updateMenuItem(id, item, dto.getCategoryId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
    }
}
