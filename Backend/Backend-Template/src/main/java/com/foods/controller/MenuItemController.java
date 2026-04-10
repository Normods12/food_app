package com.foods.controller;

import com.foods.dto.MenuItemCreateDto;
import com.foods.dto.MenuItemDto;
import com.foods.entity.MenuItem;
import com.foods.mapper.MenuItemMapper;
import com.foods.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @Autowired
    private MenuItemMapper menuItemMapper;

    @GetMapping
    public List<MenuItemDto> getAll() {
        return menuItemService.getAllMenuItems()
                .stream()
                .map(menuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/category/{categoryId}")
    public List<MenuItemDto> getByCategory(@PathVariable Long categoryId) {
        return menuItemService.getMenuItemsByCategory(categoryId)
                .stream()
                .map(menuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<MenuItemDto> search(@RequestParam String query) {
        return menuItemService.searchMenuItems(query)
                .stream()
                .map(menuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MenuItemDto getById(@PathVariable Long id) {
        return menuItemMapper.toDto(menuItemService.getMenuItemById(id));
    }

    @PostMapping
    public MenuItemDto create(@RequestBody MenuItemCreateDto dto) {
        MenuItem item = new MenuItem();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setImageUrl(dto.getImageUrl());
        item.setAvailable(dto.isAvailable());
        return menuItemMapper.toDto(menuItemService.createMenuItem(item, dto.getCategoryId()));
    }

    @PutMapping("/{id}")
    public MenuItemDto update(@PathVariable Long id, @RequestBody MenuItemCreateDto dto) {
        MenuItem item = new MenuItem();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setImageUrl(dto.getImageUrl());
        item.setAvailable(dto.isAvailable());
        return menuItemMapper.toDto(menuItemService.updateMenuItem(id, item, dto.getCategoryId()));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
    }
}
