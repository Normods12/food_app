package com.foods.service;

import com.foods.dto.OrderCreateDto;
import com.foods.entity.*;
import com.foods.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private AddressService addressService;
    
    @Autowired
    private PaymentService paymentService;

    @Transactional
    public Order placeOrder(String email, OrderCreateDto createDto) {
        Users user = userService.getByEmail(email);
        Cart cart = cartService.getCartByUserEmail(email);
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        DeliveryAddress address = addressService.getAddressById(createDto.getDeliveryAddressId());
        
        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Invalid address");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setDeliveryAddress(address);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(cartItem.getMenuItem());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getMenuItem().getPrice());
            order.getItems().add(orderItem);
            
            total = total.add(orderItem.getPrice().multiply(new BigDecimal(orderItem.getQuantity())));
        }
        order.setTotalAmount(total);

        Order savedOrder = orderRepo.save(order);
        
        // Process Payment (Simulated)
        paymentService.createPayment(savedOrder, createDto.getPaymentMethod(), total);
        
        cartService.clearCart(email);
        
        return savedOrder;
    }

    public List<Order> getMyOrders(String email) {
        return orderRepo.findByUser_EmailOrderByCreatedAtDesc(email);
    }
    
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepo.save(order);
    }
    
    public Order updatePaymentStatus(Long id, Order.PaymentStatus status) {
        Order order = getOrderById(id);
        order.setPaymentStatus(status);
        return orderRepo.save(order);
    }
}
