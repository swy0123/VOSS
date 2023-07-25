package com.yukgaejang.voss.domain.member.exception;

public class MemberEmailDuplicateException extends RuntimeException {
    public MemberEmailDuplicateException(String message) {
        super(message);
    }

    public MemberEmailDuplicateException(String message, Throwable cause) {
        super(message, cause);
    }
}
