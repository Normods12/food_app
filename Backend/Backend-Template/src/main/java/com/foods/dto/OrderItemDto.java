package com.foods.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long id;
    private MenuItemDto menuItem;
    private int quantity;
    private BigDecimal price;
}
