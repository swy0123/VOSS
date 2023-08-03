package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CreatePostRequest {
    private String title;
    private String content;
    private List<CreateFileRequest> files;

    @Builder
    public CreatePostRequest(String title, String content, List<CreateFileRequest> files) {
        this.title = title;
        this.content = content;
        this.files = files;
    }
}
