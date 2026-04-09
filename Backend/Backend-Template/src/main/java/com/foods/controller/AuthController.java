package com.foods.controller;

import com.foods.dto.AuthRequest;
import com.foods.dto.AuthResponse;
import com.foods.dto.RegisterRequest;
import com.foods.entity.Users;
import com.foods.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request){
        Users user = new Users();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        String rawPassword = request.getPassword();
        user.setPassword(rawPassword);
        user.setPhone(request.getPhone());
        user.setRole(Users.Role.USER); // Default to user
        
        Users saved = userService.register(user);
        
        Users verifyUser = new Users();
        verifyUser.setEmail(saved.getEmail());
        verifyUser.setPassword(rawPassword);
        String token = userService.verify(verifyUser);
        
        return new AuthResponse(token, saved.getRole().name());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request){
        Users user = new Users();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        
        String token = userService.verify(user);
        if(!token.equals("Fail")) {
           Users u = userService.getByEmail(request.getEmail());
           return new AuthResponse(token, u.getRole().name());
        }
        throw new RuntimeException("Invalid credentials");
    }

}
