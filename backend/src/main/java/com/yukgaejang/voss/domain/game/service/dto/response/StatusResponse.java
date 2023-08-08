package com.yukgaejang.voss.domain.game.service.dto.response;

import lombok.Data;

@Data
public class StatusResponse {
    private String status;

    public StatusResponse(String status) {
        this.status = status;
    }
}
