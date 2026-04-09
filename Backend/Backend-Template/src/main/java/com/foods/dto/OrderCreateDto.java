package com.foods.dto;

import lombok.Data;

@Data
public class OrderCreateDto {
    private Long deliveryAddressId;
    private String paymentMethod;
}
