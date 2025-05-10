package com.bank.savingaccount.dto;

public class RegisterRequest {
    private String email;
    private String password;
    private String citizenId;
    private String thaiName;
    private String englishName;
    private String pin;

    // Getters
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCitizenId() {
        return citizenId;
    }

    public String getThaiName() {
        return thaiName;
    }

    public String getEnglishName() {
        return englishName;
    }

    public String getPin() {
        return pin;
    }

    // Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCitizenId(String citizenId) {
        this.citizenId = citizenId;
    }

    public void setThaiName(String thaiName) {
        this.thaiName = thaiName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
