package com.yukgaejang.voss.domain.freeboard.exception;

public class DupliacteLikeException extends RuntimeException {
    public DupliacteLikeException() {
        super("이미 좋아요를 누른 게시글입니다.");
    }

    public DupliacteLikeException(String message) {
        super(message);
    }
}
