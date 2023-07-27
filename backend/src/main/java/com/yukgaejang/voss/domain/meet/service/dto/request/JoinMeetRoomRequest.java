package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class JoinMeetRoomRequest {
    private String password;
    private Long meetRoomId;

}
