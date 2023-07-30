package com.yukgaejang.voss.infra.openvidu.exception;

public class NoSessionExcepion extends RuntimeException {
    public NoSessionExcepion(String message) {
        super(message);
    }
}
