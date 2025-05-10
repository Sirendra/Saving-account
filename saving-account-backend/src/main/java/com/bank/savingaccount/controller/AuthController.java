package com.bank.savingaccount.controller;

import com.bank.savingaccount.dto.AuthResponse;
import com.bank.savingaccount.dto.GenericApiResponse;
import com.bank.savingaccount.dto.LoginRequest;
import com.bank.savingaccount.dto.RegisterRequest;
import com.bank.savingaccount.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<GenericApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        AuthResponse authResponse= authService.login(request);
        return ResponseEntity.ok(new GenericApiResponse<>(true,"Successfully logged in" ,authResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<GenericApiResponse<?>> register(@RequestBody RegisterRequest request) {
        String result= authService.register(request);
        return ResponseEntity.ok(new GenericApiResponse<>(true,result ,null));
    }
}
