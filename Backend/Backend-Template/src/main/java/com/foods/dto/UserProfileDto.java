package com.foods.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String phone;
    private String profileImageUrl;
    private List<AddressDto> addresses;
}
