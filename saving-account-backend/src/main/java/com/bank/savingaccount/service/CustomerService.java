package com.bank.savingaccount.service;

import com.bank.savingaccount.dto.StatementRequest;
import com.bank.savingaccount.dto.TransferRequest;
import com.bank.savingaccount.exception.AccessDeniedException;
import com.bank.savingaccount.exception.ResourceNotFoundException;
import com.bank.savingaccount.model.Customer;
import com.bank.savingaccount.model.Transaction;
import com.bank.savingaccount.repository.CustomerRepository;
import com.bank.savingaccount.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Customer getLoggedInCustomer(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtils.extractUsername(token);
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
    }

    @Transactional
    public String transferMoney(TransferRequest request, HttpServletRequest httpRequest) {
        Customer sender = getLoggedInCustomer(httpRequest);

        if (!passwordEncoder.matches(request.getPin(), sender.getPin())) {
            throw new AccessDeniedException("Invalid PIN");
        }

        if (request.getAmount() < 1) {
            throw new IllegalArgumentException("Minimum transfer amount is 1 THB");
        }

        if (sender.getBalance() < request.getAmount()) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        Customer recipient = customerRepository.findByAccountNumber(request.getRecipientAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found"));

        sender.setBalance(sender.getBalance() - request.getAmount());
        recipient.setBalance(recipient.getBalance() + request.getAmount());

        customerRepository.save(sender);
        customerRepository.save(recipient);
        // Record the transaction for sender (Debit)
        transactionService.recordTransaction(sender, "TM", request.getAmount(), sender.getBalance(), "ATS", "Debit", "Transfer to " + request.getRecipientAccountNumber());

        // Record the transaction for recipient (Credit)
        transactionService.recordTransaction(recipient, "TM", request.getAmount(), recipient.getBalance(), "ATS", "Credit", "Received from " + sender.getEnglishName());
        return "Transfer successful";
    }

    public List<Transaction> getMonthlyStatement( HttpServletRequest httpRequest, StatementRequest request) {
        Customer sender = getLoggedInCustomer(httpRequest);
        // Validate PIN
        if (!passwordEncoder.matches(request.getPin(), sender.getPin())) {
            throw new IllegalArgumentException("Invalid PIN");
        }

        return transactionService.getTransactionsForMonth(sender.getAccountNumber(), request.getMonth(), request.getYear());
    }

}
