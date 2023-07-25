package com.yukgaejang.voss.domain.meet.exception;

public class ExceedMaxNumberException extends RuntimeException{
    public ExceedMaxNumberException(String message) {
        super(message);
    }
}
