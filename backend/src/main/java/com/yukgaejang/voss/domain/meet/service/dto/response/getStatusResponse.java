package com.yukgaejang.voss.domain.meet.service.dto.response;

import lombok.Data;

@Data
public class getStatusResponse {
    private String status;

    public getStatusResponse(String status) {
        this.status = status;
    }
}
