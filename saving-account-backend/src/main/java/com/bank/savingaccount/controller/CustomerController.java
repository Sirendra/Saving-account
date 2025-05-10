package com.bank.savingaccount.controller;

import com.bank.savingaccount.dto.*;
import com.bank.savingaccount.model.Customer;
import com.bank.savingaccount.model.Transaction;
import com.bank.savingaccount.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/myInfo")
    public ResponseEntity<GenericApiResponse<CustomerInfo>> getMyAccountInfo(HttpServletRequest request) {
        Customer customer = customerService.getLoggedInCustomer(request);
        CustomerInfo customerInfo = new CustomerInfo(
                customer.getId(),
                customer.getCitizenId(),
                customer.getThaiName(),
                customer.getEnglishName(),
                customer.getAccountNumber(),
                customer.getEmail(),
                customer.getBalance()
        );
        return ResponseEntity.ok(new GenericApiResponse<>(true ,"Successfully retrieved customer Info",customerInfo));
    }

    @PostMapping("/transfer")
    public ResponseEntity<GenericApiResponse<?>> transferMoney(@RequestBody TransferRequest request, HttpServletRequest httpRequest) {
            String result = customerService.transferMoney(request, httpRequest);
            return ResponseEntity.ok(new GenericApiResponse<>(true,result,null));
    }

    @PostMapping("/statement")
    public ResponseEntity<GenericApiResponse<List<Transaction>>> getStatement(@RequestBody StatementRequest request, HttpServletRequest httpRequest) {
            List<Transaction> transactions= customerService.getMonthlyStatement(httpRequest, request);
            return ResponseEntity.ok(new GenericApiResponse<>(true,"Successfully retrieved account statement" ,transactions));
    }
}
