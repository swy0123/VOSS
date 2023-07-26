package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class LeaveMeetRomRequest {
    private Long meetRoomId;
    private String email;
}
