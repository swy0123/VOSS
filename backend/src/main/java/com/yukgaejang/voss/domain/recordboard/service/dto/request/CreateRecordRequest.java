package com.yukgaejang.voss.domain.recordboard.service.dto.request;

import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateRecordRequest {
    private String description;
    private CreateFileRequest file;

    @Builder
    public CreateRecordRequest(String description, CreateFileRequest file) {
        this.description = description;
        this.file = file;
    }
}
