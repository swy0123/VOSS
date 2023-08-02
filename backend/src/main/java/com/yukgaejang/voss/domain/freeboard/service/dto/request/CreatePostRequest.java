package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import com.yukgaejang.voss.global.file.service.dto.FileDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CreatePostRequest {
    private String title;
    private String content;
    private List<FileDto> files;

    @Builder
    public CreatePostRequest(String title, String content, List<FileDto> files) {
        this.title = title;
        this.content = content;
        this.files = files;
    }
}
