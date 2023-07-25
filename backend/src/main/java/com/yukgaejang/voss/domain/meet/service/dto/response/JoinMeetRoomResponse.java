package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class JoinMeetRoomResponse {
    private String sessionId;
    private String status;

    public JoinMeetRoomResponse(String sessionId, String status) {
        this.sessionId = sessionId;
        this.status = status;
    }
}
