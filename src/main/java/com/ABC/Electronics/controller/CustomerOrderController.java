package com.ABC.Electronics.controller;

import com.ABC.Electronics.model.CustomerOrder;
import com.ABC.Electronics.service.CustomerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/orders")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;


    /**
     * Constructor for CustomerOrderController.
     *
     * @param customerOrderService Service for managing customer order-related operations.
     */
    @Autowired
    public CustomerOrderController(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    /**
     * Endpoint to retrieve all customer orders.
     *
     * @return List of all customer orders.
     */
    @GetMapping
    public List<CustomerOrder> getAllCustomerOrders() {
        return customerOrderService.getAllCustomerOrders();
    }

    /**
     * Endpoint to retrieve a customer order by its ID.
     *
     * @param orderId The ID of the customer order.
     * @return The customer order with the given ID, or 404 Not Found if not found.
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<CustomerOrder> getCustomerOrderById(@PathVariable Long orderId) {
           return customerOrderService.getCustomerOrderById(orderId)
                    .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /**
     * Endpoint to save a new customer order.
     *
     * @param order The customer order to be saved.
     * @return The saved customer order with a 201 Created status.
     */
    @PostMapping
    public ResponseEntity<CustomerOrder> saveCustomerOrder(@RequestBody CustomerOrder order) {
        CustomerOrder savedOrder = customerOrderService.saveOrder(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    /**
     * Endpoint to delete a customer order by its ID.
     *
     * @param orderId The ID of the customer order.
     * @return 204 No Content if the customer order was deleted, 404 Not Found if not found.
     */
    @DeleteMapping("/{orderId}")
    public ResponseEntity<CustomerOrder> deleteCustomerOrder(@PathVariable Long orderId) {
        if (customerOrderService.getCustomerOrderById(orderId).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        customerOrderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
