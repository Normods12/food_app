package com.foods.repository;

import com.foods.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    Cart findByUser_Id(Long userId);
    Cart findByUser_Email(String email);
}
