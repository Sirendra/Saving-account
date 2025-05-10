package com.bank.savingaccount.repository;

import com.bank.savingaccount.dto.CustomerSummary;
import com.bank.savingaccount.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {
    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByAccountNumber(String accountNumber);

    List<CustomerSummary> findAllBy();
}