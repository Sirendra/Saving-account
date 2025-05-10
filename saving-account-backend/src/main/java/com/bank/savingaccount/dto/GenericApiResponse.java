package com.bank.savingaccount.dto;

public class GenericApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public GenericApiResponse() {}

    public GenericApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public GenericApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    // Getters and setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
