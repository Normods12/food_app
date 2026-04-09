package com.foods.dto;

import lombok.Data;

@Data
public class AddressDto {
    private Long id;
    private Long userId;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private boolean isDefault;
}
