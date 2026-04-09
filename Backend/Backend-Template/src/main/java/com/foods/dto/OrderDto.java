package com.foods.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private Long userId;
    private List<OrderItemDto> items;
    private BigDecimal totalAmount;
    private String status;
    private String paymentStatus;
    private AddressDto deliveryAddress;
    private LocalDateTime createdAt;
}
