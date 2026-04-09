package com.foods.dto;

import lombok.Data;
import java.util.List;
import java.math.BigDecimal;

@Data
public class CartDto {
    private Long id;
    private Long userId;
    private List<CartItemDto> items;
    private BigDecimal totalAmount;
}
