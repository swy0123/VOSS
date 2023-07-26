package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreatePostResponse {
    private boolean isSuccess;

    public CreatePostResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
