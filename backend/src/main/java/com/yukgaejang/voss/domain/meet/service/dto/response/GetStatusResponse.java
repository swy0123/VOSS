package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class GetStatusResponse {
    private String status;

    public GetStatusResponse(String status) {
        this.status = status;
    }
}
