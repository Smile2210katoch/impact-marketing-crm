package com.sitedata.backend.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CustomerDetailsTest {

    @Test
    void shouldStoreSalutationAndCustomerType() {
        CustomerDetails customer = new CustomerDetails();

        customer.setSalutation("Mr");
        customer.setCustomerType("Owner");

        assertEquals("Mr", customer.getSalutation());
        assertEquals("Owner", customer.getCustomerType());
    }
}
