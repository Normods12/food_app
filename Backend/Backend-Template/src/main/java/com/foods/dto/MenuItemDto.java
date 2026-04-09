package com.foods.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MenuItemDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private boolean isAvailable;
    private CategoryDto category;
}
