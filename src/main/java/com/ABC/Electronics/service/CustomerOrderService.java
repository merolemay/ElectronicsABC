package com.ABC.Electronics.service;

import com.ABC.Electronics.model.CustomerOrder;
import com.ABC.Electronics.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;


    /**
     * Constructor for CustomerOrderService.
     *
     * @param orderRepository Repository for managing Order entities.
     */
    @Autowired
    public CustomerOrderService(CustomerOrderRepository orderRepository) {
        this.customerOrderRepository = orderRepository;
    }

    /**
     * Retrieve all customer orders.
     *
     * @return List of all customer orders.
     */
    public List<CustomerOrder> getAllCustomerOrders() {
        return customerOrderRepository.findAll();
    }

    /**
     * Retrieve a customer order by its ID.
     *
     * @param id The ID of the customer order.
     * @return The customer order with the given ID, or null if not found.
     */
    public Optional<CustomerOrder> getCustomerOrderById(Long id) {
        return customerOrderRepository.findById(id);
    }

    /**
     * Save a customer order. Performs additional logic if needed before saving.
     *
     * @param order The customer order to be saved.
     * @return The saved customer order.
     */
    public CustomerOrder saveOrder(CustomerOrder order) {
        return customerOrderRepository.save(order);
    }

    /**
     * Delete a customer order by its ID.
     *
     * @param id The ID of the customer order.
     */
    public void deleteOrder(Long id) {
        customerOrderRepository.deleteById(id);
    }
}