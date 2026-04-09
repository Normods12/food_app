package com.foods.repository;

import com.foods.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepo extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory_Id(Long categoryId);
    List<MenuItem> findByNameContainingIgnoreCase(String name);
}
