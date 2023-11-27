package com.ABC.Electronics.service;

import com.ABC.Electronics.model.AdditionalInfo;
import com.ABC.Electronics.model.Customer;
import com.ABC.Electronics.repository.AdditionalInfoRepository;
import com.ABC.Electronics.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for managing customer-related operations.
 */
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AdditionalInfoRepository additionalInfoRepository;

    /**
     * Constructor for CustomerService.
     *
     * @param customerRepository        Repository for managing Customer entities.
     * @param additionalInfoRepository  Repository for managing AdditionalInfo entities.
     */
    @Autowired
    public CustomerService(CustomerRepository customerRepository, AdditionalInfoRepository additionalInfoRepository) {
        this.customerRepository = customerRepository;
        this.additionalInfoRepository = additionalInfoRepository;
    }

    /**
     * Save a customer. Performs additional logic if needed before saving.
     *
     * @param customer The customer to be saved.
     * @return The saved customer.
     */
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    /**
     * Save additional information about a customer. Performs additional logic if needed before saving.
     *
     * @param additionalInfo The additional information to be saved.
     * @return The saved additional information.
     */
    public AdditionalInfo saveAdditionalInfo(AdditionalInfo additionalInfo) {
        return additionalInfoRepository.save(additionalInfo);
    }

    /**
     * Retrieve a customer by their ID.
     *
     * @param customerId The ID of the customer.
     * @return The customer with the given ID, or null if not found.
     */
    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }

    /**
     * Retrieve additional information about a customer by its ID.
     *
     * @param additionalInfoId The ID of the additional information.
     * @return The additional information with the given ID, or null if not found.
     */
    public AdditionalInfo getAdditionalInfoById(String additionalInfoId) {
        return additionalInfoRepository.findById(additionalInfoId).orElse(null);
    }

    /**
     * Retrieve all customers.
     *
     * @return List of all customers.
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Retrieve all additional information records.
     *
     * @return List of all additional information records.
     */
    public List<AdditionalInfo> getAllAdditionalInfo() {
        return additionalInfoRepository.findAll();
    }

    /**
     * Delete a customer by their ID.
     *
     * @param customerId The ID of the customer.
     */
    public void deleteCustomerById(Long customerId) {
        customerRepository.deleteById(customerId);
    }

}
