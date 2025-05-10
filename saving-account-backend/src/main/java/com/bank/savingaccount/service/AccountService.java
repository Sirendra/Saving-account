package com.bank.savingaccount.service;

import com.bank.savingaccount.dto.CustomerSummary;
import com.bank.savingaccount.dto.PersonSummary;
import com.bank.savingaccount.exception.InsufficientFundsException;
import com.bank.savingaccount.exception.ResourceNotFoundException;
import com.bank.savingaccount.model.Customer;
import com.bank.savingaccount.model.Person;
import com.bank.savingaccount.repository.CustomerRepository;
import com.bank.savingaccount.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private static final String ADMIN_EMAIL = "sirendra99@gmail.com";

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionService transactionService;

    @Transactional
    public String createAccount(String personId, Double initialDeposit) {
        // Fetch the person by their ID (they should be a Person, not a Customer yet)
        Optional<Person> personOptional = personRepository.findById(personId);

        if (personOptional.isEmpty()) {
            throw new InsufficientFundsException( "Person not found.");
        }
        if (initialDeposit != null && initialDeposit < 1) {
            throw new IllegalArgumentException("Initial deposit must be at least 1 THB");
        }

        Person person = personOptional.get();

        // Generate a unique 7-digit account number
        String accountNumber = String.format("%07d", (int) (Math.random() * 10000000));

        Customer customer = new Customer();
        customer.setEmail(person.getEmail().toLowerCase());
        customer.setPassword(person.getPassword());
        customer.setCitizenId(person.getCitizenId());
        customer.setThaiName(person.getThaiName());
        customer.setEnglishName(person.getEnglishName());
        customer.setPin(person.getPin());
        customer.setAccountNumber(accountNumber);
        customer.setBalance(initialDeposit != null ? initialDeposit : 0.0);
        customer.setAdmin(ADMIN_EMAIL.equalsIgnoreCase(customer.getEmail()));
        // Save the new customer and delete the person
        customerRepository.save(customer);
        personRepository.delete(person);
        if(customer.getBalance() > 0){
            // means there was initial amount
            transactionService.recordTransaction(customer, "AD", initialDeposit, customer.getBalance(), "OTC", "Credit", "Deposited via Teller as Initial Deposit");
        }
        return "Account created successfully for " + person.getEmail();
    }

    @Transactional
    public String deposit(String accountNumber, double amount) {
        if (amount < 1) {
            throw new IllegalArgumentException( "Minimum deposit amount is 1 THB.");
        }

        Optional<Customer> customerOpt = customerRepository.findByAccountNumber(accountNumber);
        if (customerOpt.isEmpty()) {
            throw new ResourceNotFoundException("Account not found.");
        }

        Customer customer = customerOpt.get();
        customer.setBalance(customer.getBalance() + amount);
        customerRepository.save(customer);
        transactionService.recordTransaction(customer, "AD", amount, customer.getBalance(), "OTC", "Credit", "Deposited via Teller");
        return "Deposited " + amount + " THB to account " + accountNumber;
    }

    public List<PersonSummary> getAllPersons() {
        return personRepository.findAllBy();
    }

    public List<CustomerSummary> getAllCustomers() {
        return customerRepository.findAllBy();
    }
}
