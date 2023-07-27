package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class SelectScriptRequest {
    private Long scriptId;
    private Long meetRoomId;
}
