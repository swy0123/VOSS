package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class InitMeetRoomResponse {

    private String sessionId;
    private Long meetRoomId;

    public InitMeetRoomResponse(String sessionId, Long meetRoomId) {
        this.sessionId = sessionId;
        this.meetRoomId = meetRoomId;
    }
}
