package com.sitedata.backend.service;

import com.sitedata.backend.dto.CustomerStatsDTO;
import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.entity.User;
import com.sitedata.backend.repository.CustomerDetailsRepository;
import com.sitedata.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDetailsService {

    private final CustomerDetailsRepository customerRepository;
    private final UserRepository userRepository;

    public CustomerDetailsService(
            CustomerDetailsRepository customerRepository,
            UserRepository userRepository
    ) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    // Save Customer
    public CustomerDetails save(
            CustomerDetails details,
            String email
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        details.setUser(user);

        // Location
        details.setLocationLink(details.getLocationLink());

        // Images
        details.setImage1(details.getImage1());
        details.setImage2(details.getImage2());
        details.setImage3(details.getImage3());
        details.setImage4(details.getImage4());
        details.setImage5(details.getImage5());

        return customerRepository.save(details);
    }

    // Get Logged In User Customers
    public List<CustomerDetails> getUserData(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getCustomerDetails();
    }

    // Get All Customers
    public List<CustomerDetails> getAllCustomers() {

        return customerRepository.findAll();

    }

    // Update Customer
    public CustomerDetails update(
            Long id,
            CustomerDetails updatedDetails
    ) {

        CustomerDetails existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existing.setFirstName(updatedDetails.getFirstName());
        existing.setLastName(updatedDetails.getLastName());
        existing.setMobile(updatedDetails.getMobile());
        existing.setHouseNo(updatedDetails.getHouseNo());
        existing.setStreet(updatedDetails.getStreet());
        existing.setCity(updatedDetails.getCity());
        existing.setState(updatedDetails.getState());
        existing.setArchitectName(updatedDetails.getArchitectName());
        existing.setArchitectMobile(updatedDetails.getArchitectMobile());
        existing.setSiteStage(updatedDetails.getSiteStage());
        existing.setEnquiryType(updatedDetails.getEnquiryType());
        existing.setSource(updatedDetails.getSource());

        // Google Map Link
        existing.setLocationLink(updatedDetails.getLocationLink());

        // Images
        existing.setImage1(updatedDetails.getImage1());
        existing.setImage2(updatedDetails.getImage2());
        existing.setImage3(updatedDetails.getImage3());
        existing.setImage4(updatedDetails.getImage4());
        existing.setImage5(updatedDetails.getImage5());

        return customerRepository.save(existing);

    }

    // Delete Customer
    public void delete(Long id) {

        CustomerDetails customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customerRepository.delete(customer);

    }

    // Customer Statistics
    public List<CustomerStatsDTO> getCityStatistics() {

        return customerRepository.getCityStats();

    }

    // Recent Customers
    public List<CustomerDetails> getRecentCustomers() {

        return customerRepository.findTop5ByOrderByIdDesc();

    }

    // Customers By City
    public List<CustomerDetails> getCustomersByCity(String city) {

        return customerRepository.findByCity(city);

    }

}