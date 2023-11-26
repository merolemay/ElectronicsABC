package com.ABC.Electronics.controller;

import com.ABC.Electronics.model.Customer_Order;
import com.ABC.Electronics.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public String getAllOrders(Model model) {
        List<Customer_Order> orders = orderService.getAllOrders();
        model.addAttribute("orders", orders);
        return "order/list";
    }

    @GetMapping("/{id}")
    public String getOrderById(@PathVariable Long id, Model model) {
        orderService.getOrderById(id).ifPresent(orders -> model.addAttribute("order", orders));
        return "order/details";
    }

    @GetMapping("/create")
    public String showOrderForm(Model model) {
        model.addAttribute("order", new Customer_Order());
        return "order/create";
    }

    @PostMapping("/create")
    public String createOrder(@ModelAttribute Customer_Order orders) {
        orderService.saveOrder(orders);
        return "redirect:/orders";
    }

    @GetMapping("/{id}/delete")
    public String deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return "redirect:/orders";
    }
}
