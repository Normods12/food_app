package com.foods.service;

import com.foods.entity.Order;
import com.foods.entity.Payment;
import com.foods.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepo paymentRepo;

    public Payment createPayment(Order order, String paymentMethodStr, BigDecimal amount) {
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(amount);
        
        try {
            payment.setPaymentMethod(Payment.PaymentMethod.valueOf(paymentMethodStr.toUpperCase()));
        } catch (IllegalArgumentException e) {
            payment.setPaymentMethod(Payment.PaymentMethod.CASH_ON_DELIVERY);
        }
        
        payment.setStatus(Payment.Status.SUCCESS); // Simulate successful payment
        payment.setTransactionId(UUID.randomUUID().toString());
        
        // Let's assume cash on delivery or instant success
        if(payment.getPaymentMethod() == Payment.PaymentMethod.CASH_ON_DELIVERY) {
             payment.setStatus(Payment.Status.PENDING);
        }
        
        return paymentRepo.save(payment);
    }

    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepo.findByOrder_Id(orderId);
    }
}
