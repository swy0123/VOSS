package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class LeaveMeetRoomResponse {
    private String status;

    public LeaveMeetRoomResponse(String status) {
        this.status = status;
    }
}
