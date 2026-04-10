package com.foods.mapper;

import com.foods.dto.CategoryDto;
import com.foods.dto.MenuItemDto;
import com.foods.entity.MenuItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MenuItemMapper {

    @Mapping(target = "category", expression = "java(mapCategory(item))")
    MenuItemDto toDto(MenuItem item);

    default CategoryDto mapCategory(MenuItem item) {
        if (item.getCategory() == null) return null;
        CategoryDto dto = new CategoryDto();
        dto.setId(item.getCategory().getId());
        dto.setName(item.getCategory().getName());
        dto.setDescription(item.getCategory().getDescription());
        dto.setImageUrl(item.getCategory().getImageUrl());
        return dto;
    }
}
