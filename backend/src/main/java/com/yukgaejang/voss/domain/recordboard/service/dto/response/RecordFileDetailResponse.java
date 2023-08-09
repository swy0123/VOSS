package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecordFileDetailResponse {
    private Long id;
    private String originalFileName;
    private String savedFileName;
    private String contentType;
    private Long size;

    public RecordFileDetailResponse(Long id, String originalFileName, String savedFileName, String contentType, Long size) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.contentType = contentType;
        this.size = size;
    }
}
