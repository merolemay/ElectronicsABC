package com.ABC.Electronics.repository;

import com.ABC.Electronics.model.Customer_Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Customer_Order, Long> {

}