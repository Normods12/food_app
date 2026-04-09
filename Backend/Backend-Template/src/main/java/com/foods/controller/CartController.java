package com.foods.controller;

import com.foods.dto.ApiResponse;
import com.foods.entity.Cart;
import com.foods.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public Cart getCart(Authentication authentication) {
        return cartService.getCartByUserEmail(authentication.getName());
    }

    @PostMapping("/add")
    public Cart addToCart(Authentication authentication, @RequestParam Long menuItemId, @RequestParam int quantity) {
        return cartService.addToCart(authentication.getName(), menuItemId, quantity);
    }

    @PutMapping("/update")
    public Cart updateCartItem(Authentication authentication, @RequestParam Long cartItemId, @RequestParam int quantity) {
    	return cartService.updateCartItemQuantity(authentication.getName(), cartItemId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public Cart removeCartItem(Authentication authentication, @PathVariable Long cartItemId) {
        return cartService.removeCartItem(authentication.getName(), cartItemId);
    }

    @DeleteMapping("/clear")
    public ApiResponse<String> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return new ApiResponse<>(true, "Cart cleared successfully", null);
    }
}
