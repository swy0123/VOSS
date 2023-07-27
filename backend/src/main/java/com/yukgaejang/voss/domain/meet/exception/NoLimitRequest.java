package com.yukgaejang.voss.domain.meet.exception;

public class NoLimitRequest extends RuntimeException{
    public NoLimitRequest(String message) {
        super(message);
    }
}
