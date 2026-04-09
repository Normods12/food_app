package com.foods.exception;

public class UnauthorizedResourceAccessException extends RuntimeException {
    public UnauthorizedResourceAccessException(String message) {
        super(message);
    }
}
