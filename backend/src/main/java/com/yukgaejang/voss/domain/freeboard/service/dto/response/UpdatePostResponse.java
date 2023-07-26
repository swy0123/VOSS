package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdatePostResponse {
    private boolean isSuccess;

    public UpdatePostResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
