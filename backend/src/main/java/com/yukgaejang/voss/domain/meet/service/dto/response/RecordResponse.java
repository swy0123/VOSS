package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.service.dto.request.RecordRequest;
import lombok.Data;

@Data
public class RecordResponse {

    private RecordRequest.COMMAND command;
    private String url;

    public RecordResponse(RecordRequest.COMMAND command, String url) {
        this.command = command;
        this.url = url;
    }
}
