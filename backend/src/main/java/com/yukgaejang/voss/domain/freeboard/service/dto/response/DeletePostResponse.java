package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DeletePostResponse {
    private boolean success;

    public DeletePostResponse(boolean success) {
        this.success = success;
    }
}
