package com.foods.service;

import com.foods.entity.Cart;
import com.foods.entity.CartItem;
import com.foods.entity.MenuItem;
import com.foods.entity.Users;
import com.foods.repository.CartRepo;
import com.foods.repository.CartItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;
    
    @Autowired
    private CartItemRepo cartItemRepo;
    
    @Autowired
    private MenuItemService menuItemService;

    @Autowired
    private UserService userService;

    public Cart getCartByUserEmail(String email) {
        Cart cart = cartRepo.findByUser_Email(email);
        if (cart == null) {
            cart = new Cart();
            Users user = userService.getByEmail(email);
            cart.setUser(user);
            cart = cartRepo.save(cart);
        }
        return cart;
    }

    @Transactional
    public Cart addToCart(String email, Long menuItemId, int quantity) {
        Cart cart = getCartByUserEmail(email);
        MenuItem menuItem = menuItemService.getMenuItemById(menuItemId);

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getMenuItem().getId().equals(menuItemId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setMenuItem(menuItem);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        return cartRepo.save(cart);
    }

    @Transactional
    public Cart updateCartItemQuantity(String email, Long cartItemId, int quantity) {
        Cart cart = getCartByUserEmail(email);
        CartItem cartItem = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Unauthorized cart access");
        }

        if (quantity <= 0) {
            cart.getItems().remove(cartItem);
            cartItemRepo.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepo.save(cartItem);
        }

        return cartRepo.save(cart); // Update cart
    }

    @Transactional
    public Cart removeCartItem(String email, Long cartItemId) {
        return updateCartItemQuantity(email, cartItemId, 0);
    }

    @Transactional
    public void clearCart(String email) {
        Cart cart = getCartByUserEmail(email);
        cartItemRepo.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepo.save(cart);
    }
}
