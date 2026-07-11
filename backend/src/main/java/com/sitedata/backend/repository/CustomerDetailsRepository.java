package com.sitedata.backend.repository;

import com.sitedata.backend.entity.CustomerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sitedata.backend.dto.CustomerStatsDTO;

import java.util.List;

public interface CustomerDetailsRepository extends JpaRepository<CustomerDetails, Long> {

    @Query("SELECT new com.sitedata.backend.dto.CustomerStatsDTO(c.city, COUNT(c)) FROM CustomerDetails c GROUP BY c.city")
    List<CustomerStatsDTO> getCityStats();
    List<CustomerDetails> findTop5ByOrderByIdDesc();
}