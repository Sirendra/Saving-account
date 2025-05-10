package com.bank.savingaccount.dto;

public record CustomerInfo(String id,String citizenId,String thaiName, String englishName, String accountNumber, String email, Double balance) {
    // Constructor
}
