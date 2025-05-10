package com.bank.savingaccount.controller;

import com.bank.savingaccount.dto.*;
import com.bank.savingaccount.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teller")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create-account")
    public ResponseEntity<GenericApiResponse<?>> createAccount(@RequestBody CreateAccountRequest request) {
        String result= accountService.createAccount(request.getPersonId(), request.getInitialDeposit());
        return ResponseEntity.ok(new GenericApiResponse<>(true,result ,null));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/deposit")
    public ResponseEntity<GenericApiResponse<?>>  deposit(@RequestBody DepositRequest request) {
        String result= accountService.deposit(request.getAccountNumber(), request.getAmount());
        return ResponseEntity.ok(new GenericApiResponse<>(true,result ,null));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/persons")
    public ResponseEntity<GenericApiResponse< List<PersonSummary>>> getPersonsNotCustomers() {
        List<PersonSummary> persons = accountService.getAllPersons();
        return ResponseEntity.ok(new GenericApiResponse<>(true,"Successfully retrieved all persons" ,persons));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/customers")
    public ResponseEntity<GenericApiResponse<List<CustomerSummary>>> getCustomers() {
        List<CustomerSummary> customers= accountService.getAllCustomers();
        return ResponseEntity.ok(new GenericApiResponse<>(true,"Successfully retrieved all customers" ,customers));
    }
}
