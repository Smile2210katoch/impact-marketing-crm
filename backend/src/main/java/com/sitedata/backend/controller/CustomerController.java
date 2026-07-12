package com.sitedata.backend.controller;

import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.service.CustomerDetailsService;
import com.sitedata.backend.dto.CustomerStatsDTO;

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



    // Save Customer for logged-in user
    @PostMapping("/save")
    public CustomerDetails save(
            @RequestBody CustomerDetails details,
            Authentication authentication
    ) {


        String email = authentication.getName();


        return service.save(details, email);

    }





    // View logged-in user's customers
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





    // Get all customers (Admin use)
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





    // City statistics
    @GetMapping("/city-stats")
    public List<CustomerStatsDTO> cityStats() {


        return service.getCityStatistics();

    }





    // Recent customers
    @GetMapping("/recent")
    public List<CustomerDetails> recentCustomers() {


        return service.getRecentCustomers();

    }

}