package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class RecordRequest {
    public enum COMMAND{
        START, STOP
    }
    private Long meetRoomId;
    private COMMAND command;
}
