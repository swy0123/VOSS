package com.yukgaejang.voss.domain.auth.exception;

public class NoEmailException extends RuntimeException {
    public NoEmailException(String message) {
        super(message);
    }

    public NoEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}
