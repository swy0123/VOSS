package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class MeetRequestDto {
    private int page;
    private int limit;

    public MeetRequestDto(int page, int limit) {
        this.page = page;
        this.limit = limit;
    }
}
