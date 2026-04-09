package com.foods.controller;

import com.foods.entity.DeliveryAddress;
import com.foods.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    public List<DeliveryAddress> getMyAddresses(Authentication authentication) {
        return addressService.getMyAddresses(authentication.getName());
    }

    @PostMapping
    public DeliveryAddress addAddress(Authentication authentication, @RequestBody DeliveryAddress address) {
        return addressService.addAddress(authentication.getName(), address);
    }

    @PutMapping("/{id}")
    public DeliveryAddress updateAddress(Authentication authentication, @PathVariable Long id, @RequestBody DeliveryAddress address) {
        return addressService.updateAddress(id, address, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(Authentication authentication, @PathVariable Long id) {
        addressService.deleteAddress(id, authentication.getName());
    }
}
