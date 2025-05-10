package com.bank.savingaccount.repository;

import com.bank.savingaccount.model.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // You can add custom query methods if needed, e.g., find by customer email
    List<Transaction> findByAccountNumberAndDateTimeBetween(String accountNumber, Date from, Date to, Sort sort);
}
