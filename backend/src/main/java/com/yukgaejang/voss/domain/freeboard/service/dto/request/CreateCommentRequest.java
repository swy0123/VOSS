package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateCommentRequest {
    private String email;
    private String content;

    @Builder
    public CreateCommentRequest(String email, String content) {
        this.email = email;
        this.content = content;
    }
}
