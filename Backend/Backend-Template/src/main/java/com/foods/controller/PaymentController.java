package com.foods.controller;

import com.foods.entity.Payment;
import com.foods.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/order/{orderId}")
    public Payment getPaymentByOrderId(Authentication authentication, @PathVariable Long orderId) {
        return paymentService.getPaymentByOrderId(orderId);
    }
}
