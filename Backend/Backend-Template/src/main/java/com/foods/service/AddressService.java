package com.foods.service;

import com.foods.entity.DeliveryAddress;
import com.foods.entity.Users;
import com.foods.repository.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressRepo addressRepo;
    
    @Autowired
    private UserService userService;

    public List<DeliveryAddress> getMyAddresses(String email) {
        return addressRepo.findByUser_Email(email);
    }

    public DeliveryAddress getAddressById(Long id) {
        return addressRepo.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
    }

    public DeliveryAddress addAddress(String email, DeliveryAddress address) {
        Users user = userService.getByEmail(email);
        address.setUser(user);
        
        List<DeliveryAddress> existing = addressRepo.findByUser_Id(user.getId());
        if (existing.isEmpty() || address.isDefault()) {
            if (address.isDefault()) {
                existing.forEach(a -> {
                    a.setDefault(false);
                    addressRepo.save(a);
                });
            }
            address.setDefault(true);
        }
        
        return addressRepo.save(address);
    }

    public DeliveryAddress updateAddress(Long id, DeliveryAddress addressDetails, String email) {
        DeliveryAddress existing = getAddressById(id);
        if (!existing.getUser().getEmail().equals(email)) {
             throw new RuntimeException("Not authorized to update this address");
        }
        
        existing.setStreet(addressDetails.getStreet());
        existing.setCity(addressDetails.getCity());
        existing.setState(addressDetails.getState());
        existing.setZipCode(addressDetails.getZipCode());
        
        if (addressDetails.isDefault() && !existing.isDefault()) {
             List<DeliveryAddress> list = addressRepo.findByUser_Id(existing.getUser().getId());
             list.stream().filter(a -> !a.getId().equals(existing.getId())).forEach(a -> {
                 a.setDefault(false);
                 addressRepo.save(a);
             });
             existing.setDefault(true);
        }
        
        return addressRepo.save(existing);
    }

    public void deleteAddress(Long id, String email) {
        DeliveryAddress address = getAddressById(id);
        if (!address.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Not authorized to delete this address");
        }
        addressRepo.delete(address);
    }
}
