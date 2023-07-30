package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class JoinMeetRoomResponse {
    private String token;
    private String status;

    public JoinMeetRoomResponse(String token, String status) {
        this.token = token;
        this.status = status;
    }
}
