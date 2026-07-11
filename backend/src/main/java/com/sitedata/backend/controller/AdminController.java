package com.sitedata.backend.controller;

import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.entity.User;
import com.sitedata.backend.repository.CustomerDetailsRepository;
import com.sitedata.backend.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;
    private final CustomerDetailsRepository customerRepository;

    public AdminController(
            UserRepository userRepository,
            CustomerDetailsRepository customerRepository
    ) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

   @GetMapping("/dashboard")
public Map<String, Long> dashboard() {

    Map<String, Long> data = new HashMap<>();

    data.put("users", userRepository.count());

    data.put("customers", customerRepository.count());

    return data;

}

    @GetMapping("/users")
    public List<User> users() {

        return userRepository.findAll();

    }

    @GetMapping("/customers")
    public List<CustomerDetails> customers() {

        return customerRepository.findAll();

    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(
            @PathVariable Long id
    ) {

        userRepository.deleteById(id);

    }

}