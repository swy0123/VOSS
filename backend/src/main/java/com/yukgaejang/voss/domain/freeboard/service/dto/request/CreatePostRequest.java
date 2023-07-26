package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreatePostRequest {
    private String email;
    private String title;
    private String content;

    @Builder
    public CreatePostRequest(String email, String title, String content) {
        this.email = email;
        this.title = title;
        this.content = content;
    }
}
