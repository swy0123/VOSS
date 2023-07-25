package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdatePostRequest {
    private Long id;
    private String title;
    private String content;

    @Builder
    public UpdatePostRequest(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
