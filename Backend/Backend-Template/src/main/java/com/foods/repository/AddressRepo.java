package com.foods.repository;

import com.foods.entity.DeliveryAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<DeliveryAddress, Long> {
    List<DeliveryAddress> findByUser_Id(Long userId);
    List<DeliveryAddress> findByUser_Email(String email);
    List<DeliveryAddress> findByUser_IdAndIsDefaultTrue(Long userId);
}
