package com.bank.savingaccount.dto;

public class StatementRequest {
    private int month; // 1-12
    private int year;
    private String pin;

    // Getters and setters
    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }
}
