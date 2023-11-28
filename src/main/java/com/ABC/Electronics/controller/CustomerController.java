package com.ABC.Electronics.controller;
import com.ABC.Electronics.model.Customer;
import com.ABC.Electronics.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controller class for handling HTTP requests related to customers.
 */
@RestController
@RequestMapping("/api/customers")
public class CustomerController {




    @GetMapping("/add_customer")
    public String showAddCustomerForm(Model model) {
        // You can add any model attributes if needed
        model.addAttribute("customer", new Customer());

        return "add_customer"; // Assuming "add_customer.html" is your Thymeleaf template
    }
    private final CustomerService customerService;

    /**
     * Constructor for CustomerController.
     *
     * @param customerService Service for managing customer-related operations.
     */
    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    /**
     * Endpoint to retrieve all customers.
     *
     * @return List of all customers.
     */
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    /**
     * Endpoint to retrieve a customer by their ID.
     *
     * @param customerId The ID of the customer.
     * @return The customer with the given ID, or 404 Not Found if not found.
     */
    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        return customer != null ?
                new ResponseEntity<>(customer, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Endpoint to create a new customer.
     *
     * @param customer The customer to be saved.
     * @return The saved customer with a 201 Created status.
     */
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerService.saveCustomer(customer);
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    /**
     * Endpoint to update an existing customer.
     *
     * @param customerId The ID of the customer to be updated.
     * @param customer   The updated customer information.
     * The customer must already exist in the database.
     * If the customer does not exist NOT_FOUND status would be returned.
     * If the customer exists OK status would be returned.
     * @return The updated customer with a 200 OK status, or 404 Not Found if the customer does not exist.
     */
    @PutMapping("/{customerId}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long customerId, @RequestBody Customer customer) {
        Customer existingCustomer = customerService.getCustomerById(customerId);

        if (existingCustomer != null) {
            Customer savedCustomer = customerService.saveCustomer(customer);
            return new ResponseEntity<>(savedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Endpoint to delete a customer by their ID.
     *
     * @param customerId The ID of the customer to be deleted.
     * @return 204 No Content if the customer is successfully deleted, or 404 Not Found if the customer does not exist.
     */
    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long customerId) {
        Customer existingCustomer = customerService.getCustomerById(customerId);

        if (existingCustomer != null) {
            customerService.deleteCustomerById(customerId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
