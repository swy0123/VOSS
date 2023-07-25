package com.yukgaejang.voss.domain.meet.exception;

public class WrongPinException extends RuntimeException{
    public WrongPinException(String message) {
        super(message);
    }
}
