package com.backend.cinema.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.cinema.model.user.Customer;
import com.backend.cinema.repository.user.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer getCustomerByUsername(String username) {
        return customerRepository.findByUsername(username);
    }


    public Customer updateCustomer(Long id, Customer customer) {
        return customerRepository.findById(id)
            .map(existingCustomer -> {
                existingCustomer.setUsername(customer.getUsername());
                return customerRepository.save(existingCustomer);
            })
            .orElse(null);
    }

    public boolean deleteCustomer(Long id) {
        customerRepository.deleteById(id);
        return !customerRepository.existsById(id);
    }
}
