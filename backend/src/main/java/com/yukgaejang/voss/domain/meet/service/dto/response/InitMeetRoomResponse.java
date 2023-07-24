package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class InitMeetRoomResponse {

    private String sessionId;

    public InitMeetRoomResponse(String sessionId) {
        this.sessionId = sessionId;
    }
}
