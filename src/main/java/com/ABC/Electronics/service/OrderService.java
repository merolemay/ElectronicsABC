package com.ABC.Electronics.service;

import com.ABC.Electronics.model.Customer_Order;
import com.ABC.Electronics.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Customer_Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Customer_Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Customer_Order saveOrder(Customer_Order orders) {
        return orderRepository.save(orders);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}