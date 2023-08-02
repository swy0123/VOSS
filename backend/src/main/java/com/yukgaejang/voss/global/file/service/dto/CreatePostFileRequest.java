package com.yukgaejang.voss.global.file.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreatePostFileRequest {
    private String originalFileName;
    private String savedFileName;
    private Long size;

    public CreatePostFileRequest(String originalFileName, String savedFileName, Long size) {
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.size = size;
    }
}
