package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.service.dto.Command;
import lombok.Data;

@Data
public class GroupRecordResponse {

    private Command command;
    private String url;

    public GroupRecordResponse(Command command, String url) {
        this.command = command;
        this.url = url;
    }
}
