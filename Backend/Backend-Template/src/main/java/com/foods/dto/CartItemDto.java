package com.foods.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long id;
    private MenuItemDto menuItem;
    private int quantity;
}
