package com.foods.controller;

import com.foods.dto.UserProfileDto;
import com.foods.entity.Users;
import com.foods.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public UserProfileDto getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        Users user = userService.getByEmail(email);
        
        UserProfileDto dto = new UserProfileDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setProfileImageUrl(user.getProfileImageUrl());
        dto.setRole(user.getRole().name());
        
        return dto;
    }
}
