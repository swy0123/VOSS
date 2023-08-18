package com.yukgaejang.voss.domain.recordboard.exception;

public class NoRecordFileException extends RuntimeException {
    public NoRecordFileException(String message) {
        super(message);
    }

    public NoRecordFileException(String message, Throwable cause) {
        super(message, cause);
    }
}
