package com.bank.savingaccount.exception;

import com.bank.savingaccount.dto.GenericApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericApiResponse<Object>> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, "Internal Server Error: " + ex.getMessage(), null),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.CONFLICT // 409
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.NOT_FOUND // 404
        );
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleUnauthorizedAccess(UnauthorizedAccessException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.FORBIDDEN // 403
        );
    }

    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleInsufficientFund(InsufficientFundsException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.BAD_REQUEST // 400
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleAccessDenied(AccessDeniedException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, "Access denied: " + ex.getMessage(), null),
                HttpStatus.FORBIDDEN // 403
        );
    }

    @ExceptionHandler(TransactionFailedException.class)
    public ResponseEntity<GenericApiResponse<Object>> handleTransactionFailed(TransactionFailedException ex) {
        return new ResponseEntity<>(
                new GenericApiResponse<>(false, "Transaction Failed: " + ex.getMessage(), null),
                HttpStatus.INTERNAL_SERVER_ERROR // 500
        );
    }
}
