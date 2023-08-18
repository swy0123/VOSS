package com.yukgaejang.voss.global.file.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateFileRequest {
    private String originalFileName;
    private String savedFileName;
    private String contentType;
    private Long size;

    public CreateFileRequest(String originalFileName, String savedFileName, String contentType, Long size) {
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.contentType = contentType;
        this.size = size;
    }
}
