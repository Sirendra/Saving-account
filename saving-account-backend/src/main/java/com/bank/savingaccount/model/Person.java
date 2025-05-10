package com.bank.savingaccount.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "persons")
public class Person {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    private String password;
    @Indexed(unique = true)
    private String citizenId;
    private String thaiName;
    private String englishName;
    private String pin; // 6-digit PIN stored as String

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(String citizenId) {
        this.citizenId = citizenId;
    }

    public String getThaiName() {
        return thaiName;
    }

    public void setThaiName(String thaiName) {
        this.thaiName = thaiName;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
