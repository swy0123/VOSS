package com.yukgaejang.voss.domain.member.exception;

public class NoMemberException extends RuntimeException {
    public NoMemberException(String message) {
        super(message);
    }

    public NoMemberException(String message, Throwable cause) {
        super(message, cause);
    }
}
