package com.sitedata.backend.service;

import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.repository.CustomerDetailsRepository;
import com.sitedata.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerDetailsServiceTest {

    @Mock
    private CustomerDetailsRepository customerRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomerDetailsService service;

    @Test
    void shouldTrimAndSearchCustomersByCityCaseInsensitively() {
        CustomerDetails customer = new CustomerDetails();
        customer.setCity("Mohali");

        when(customerRepository.findByCityIgnoreCase("Mohali")).thenReturn(List.of(customer));

        List<CustomerDetails> result = service.getCustomersByCity("  Mohali  ");

        assertEquals(1, result.size());
        assertEquals("Mohali", result.get(0).getCity());
        verify(customerRepository).findByCityIgnoreCase("Mohali");
    }
}
