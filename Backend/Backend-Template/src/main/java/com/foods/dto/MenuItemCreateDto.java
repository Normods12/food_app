package com.foods.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MenuItemCreateDto {
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private boolean isAvailable;
    private Long categoryId;
}
