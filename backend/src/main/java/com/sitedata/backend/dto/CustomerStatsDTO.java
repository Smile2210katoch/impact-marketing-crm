package com.sitedata.backend.dto;

public class CustomerStatsDTO {

    private String city;
    private Long total;

    public CustomerStatsDTO(String city, Long total) {
        this.city = city;
        this.total = total;
    }

    public String getCity() {
        return city;
    }

    public Long getTotal() {
        return total;
    }
}