package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreatePostLikeResponse {
    private boolean isSuccess;

    public CreatePostLikeResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
