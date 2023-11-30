package com.ABC.Electronics.repository;

import com.ABC.Electronics.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
