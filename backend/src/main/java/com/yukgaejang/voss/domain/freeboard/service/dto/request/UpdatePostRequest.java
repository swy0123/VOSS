package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdatePostRequest {
    private String title;
    private String content;

    @Builder
    public UpdatePostRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
