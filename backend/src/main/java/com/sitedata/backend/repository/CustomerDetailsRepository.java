package com.sitedata.backend.repository;

import com.sitedata.backend.dto.CustomerStatsDTO;
import com.sitedata.backend.entity.CustomerDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerDetailsRepository extends JpaRepository<CustomerDetails, Long> {

    // City Statistics
    @Query("SELECT new com.sitedata.backend.dto.CustomerStatsDTO(c.city, COUNT(c)) FROM CustomerDetails c GROUP BY c.city")
    List<CustomerStatsDTO> getCityStats();

    // Recent Customers
    List<CustomerDetails> findTop5ByOrderByIdDesc();

    // Customers By City
    List<CustomerDetails> findByCityIgnoreCase(String city);

}