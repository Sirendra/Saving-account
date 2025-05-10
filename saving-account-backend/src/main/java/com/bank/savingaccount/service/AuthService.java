package com.bank.savingaccount.service;

import com.bank.savingaccount.dto.AuthResponse;
import com.bank.savingaccount.dto.LoginRequest;
import com.bank.savingaccount.dto.RegisterRequest;
import com.bank.savingaccount.exception.AccessDeniedException;
import com.bank.savingaccount.exception.ResourceNotFoundException;
import com.bank.savingaccount.exception.UserAlreadyExistsException;
import com.bank.savingaccount.model.Customer;
import com.bank.savingaccount.model.Person;
import com.bank.savingaccount.repository.CustomerRepository;
import com.bank.savingaccount.repository.PersonRepository;
import com.bank.savingaccount.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {
    private static final String ADMIN_EMAIL = "sirendra99@gmail.com";

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse login(LoginRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new AccessDeniedException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(customer.getEmail(),customer.getIsAdmin());
        return new AuthResponse(token);
    }

    @Transactional
    public String register(RegisterRequest request) {
        // Check if user already exists
        Optional<Person> existingPerson = personRepository.findByEmail(request.getEmail().toLowerCase());
        if (existingPerson.isPresent()) {
            throw new UserAlreadyExistsException("Email already registered");
        }
        Optional<Person> existingPersonByCitizenId = personRepository.findByCitizenId(request.getCitizenId());
        if (existingPersonByCitizenId.isPresent()) {
            throw new UserAlreadyExistsException("Citizen ID already registered");
        }

        // Create new person object and populate fields
        Person person = new Person();
        person.setEmail(request.getEmail().toLowerCase());
        person.setPassword(passwordEncoder.encode(request.getPassword()));
        person.setCitizenId(request.getCitizenId());
        person.setThaiName(request.getThaiName());
        person.setEnglishName(request.getEnglishName());
        person.setPin(passwordEncoder.encode(request.getPin()));

        // Save person to the repository
        personRepository.save(person);

        // Check if the person is an admin based on their name
        if (ADMIN_EMAIL.equalsIgnoreCase(person.getEmail())) {
            accountService.createAccount(person.getId(), null);  // Create account if admin
        }

        return "Person Registration successful";
    }
}
