package com.yukgaejang.voss.domain.recordboard.exception;

public class NoRecordException extends RuntimeException {
    public NoRecordException(String message) {
        super(message);
    }

    public NoRecordException(String message, Throwable cause) {
        super(message, cause);
    }
}
