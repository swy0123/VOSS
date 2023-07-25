package com.yukgaejang.voss.domain.meet.exception;

public class ExceedMaxNumber extends RuntimeException{
    public ExceedMaxNumber(String message) {
        super(message);
    }
}
