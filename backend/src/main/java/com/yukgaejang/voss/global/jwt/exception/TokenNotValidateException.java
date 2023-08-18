package com.yukgaejang.voss.global.jwt.exception;

public class TokenNotValidateException extends RuntimeException {

    public TokenNotValidateException(String message) {
        super(message);
    }

    public TokenNotValidateException(String message, Throwable cause) {
        super(message, cause);
    }
}
