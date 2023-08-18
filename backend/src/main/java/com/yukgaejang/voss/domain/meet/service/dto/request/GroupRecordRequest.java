package com.yukgaejang.voss.domain.meet.service.dto.request;

import com.yukgaejang.voss.domain.meet.service.dto.Command;
import lombok.Data;

@Data
public class GroupRecordRequest {

    private Long meetRoomId;
    private Command command;
}
