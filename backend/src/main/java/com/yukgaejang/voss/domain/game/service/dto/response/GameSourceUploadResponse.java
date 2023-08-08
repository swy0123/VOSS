package com.yukgaejang.voss.domain.game.service.dto.response;

import lombok.Data;

@Data
public class GameSourceUploadResponse {
    private String status;

    public GameSourceUploadResponse(String status) {
        this.status = status;
    }
}
