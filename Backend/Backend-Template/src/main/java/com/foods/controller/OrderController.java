package com.foods.controller;

import com.foods.dto.OrderCreateDto;
import com.foods.entity.Order;
import com.foods.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(Authentication authentication, @RequestBody OrderCreateDto createDto) {
        return orderService.placeOrder(authentication.getName(), createDto);
    }

    @GetMapping("/my")
    public List<Order> getMyOrders(Authentication authentication) {
        return orderService.getMyOrders(authentication.getName());
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/admin/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/admin/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestParam Order.OrderStatus status) {
        return orderService.updateOrderStatus(id, status);
    }
    
    @PutMapping("/admin/{id}/payment")
    public Order updatePaymentStatus(@PathVariable Long id, @RequestParam Order.PaymentStatus status) {
        return orderService.updatePaymentStatus(id, status);
    }
}
