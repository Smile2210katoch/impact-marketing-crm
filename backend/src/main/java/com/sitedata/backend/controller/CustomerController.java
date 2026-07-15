package com.sitedata.backend.controller;

import com.sitedata.backend.dto.CustomerStatsDTO;
import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.service.CustomerDetailsService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class CustomerController {

    private final CustomerDetailsService service;

    public CustomerController(CustomerDetailsService service) {
        this.service = service;
    }

    // Save Customer
    @PostMapping("/save")
    public CustomerDetails save(
            @RequestBody CustomerDetails details,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return service.save(details, email);

    }

    // Logged In User Customers
    @GetMapping("/my-data")
    public List<CustomerDetails> myData(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return service.getUserData(email);

    }

    // Update Customer
    @PutMapping("/update/{id}")
    public CustomerDetails update(
            @PathVariable Long id,
            @RequestBody CustomerDetails details
    ) {

        return service.update(id, details);

    }

    // All Customers
    @GetMapping("/all")
    public List<CustomerDetails> allCustomers() {

        return service.getAllCustomers();

    }

    // Delete Customer
    @DeleteMapping("/delete/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);

    }

    // City Statistics
    @GetMapping("/city-stats")
    public List<CustomerStatsDTO> cityStats() {

        return service.getCityStatistics();

    }

    // Customers By City (NEW)
    @GetMapping("/city/{city}")
    public List<CustomerDetails> getCustomersByCity(
            @PathVariable String city
    ) {

        return service.getCustomersByCity(city);

    }

    // Recent Customers
    @GetMapping("/recent")
    public List<CustomerDetails> recentCustomers() {

        return service.getRecentCustomers();

    }

}