package com.yukgaejang.voss.domain.meet.service.dto;

import lombok.Data;

@Data
public class GetSessionAndConnection {
    private String sessionId;
    private int connectionCnt;

    public GetSessionAndConnection(String sessionId, int connectionCnt) {
        this.sessionId = sessionId;
        this.connectionCnt = connectionCnt;
    }
}
