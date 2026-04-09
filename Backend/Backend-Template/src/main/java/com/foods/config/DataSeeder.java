package com.foods.config;

import com.foods.entity.Category;
import com.foods.entity.MenuItem;
import com.foods.entity.Users;
import com.foods.repository.CategoryRepo;
import com.foods.repository.MenuItemRepo;
import com.foods.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private MenuItemRepo menuItemRepo;

    @Autowired
    private UserRepo userRepo;

    private PasswordEncoder passwordEncoder = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder(12);

    @Override
    public void run(String... args) throws Exception {
        if(userRepo.findByEmail("admin@tomato.com") == null) {
            Users admin = new Users();
            admin.setFirstName("Admin");
            admin.setEmail("admin@tomato.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole(Users.Role.ADMIN);
            userRepo.save(admin);
        }
        
        if(categoryRepo.count() == 0) {
            Category pizza = new Category();
            pizza.setName("Pizza");
            pizza.setImageUrl("https://images.unsplash.com/photo-1513104890138-7c749659a591");
            categoryRepo.save(pizza);

            Category burger = new Category();
            burger.setName("Burger");
            burger.setImageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd");
            categoryRepo.save(burger);
            
            Category sushi = new Category();
            sushi.setName("Sushi");
            sushi.setImageUrl("https://images.unsplash.com/photo-1579871494447-9811cf80d66c");
            categoryRepo.save(sushi);

            MenuItem item1 = new MenuItem();
            item1.setName("Margherita Pizza");
            item1.setDescription("Classic cheese and tomato pizza with basil.");
            item1.setPrice(new BigDecimal("12.99"));
            item1.setCategory(pizza);
            item1.setImageUrl("https://images.unsplash.com/photo-1574071318508-1cdbab80d002");
            menuItemRepo.save(item1);

            MenuItem item2 = new MenuItem();
            item2.setName("Cheeseburger");
            item2.setDescription("Juicy beef patty with melted cheese and fresh veggies.");
            item2.setPrice(new BigDecimal("8.99"));
            item2.setCategory(burger);
            item2.setImageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd");
            menuItemRepo.save(item2);
            
            MenuItem item3 = new MenuItem();
            item3.setName("Salmon Roll");
            item3.setDescription("Fresh salmon sushi roll.");
            item3.setPrice(new BigDecimal("14.99"));
            item3.setCategory(sushi);
            item3.setImageUrl("https://images.unsplash.com/photo-1579871494447-9811cf80d66c");
            menuItemRepo.save(item3);
        }
    }
}
