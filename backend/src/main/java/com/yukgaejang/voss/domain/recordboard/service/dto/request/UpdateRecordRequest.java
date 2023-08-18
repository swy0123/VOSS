package com.yukgaejang.voss.domain.recordboard.service.dto.request;

import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateRecordRequest {
    private String description;
    private Long deleteFileId;
    private CreateFileRequest newFile;

    @Builder
    public UpdateRecordRequest(String description, Long deleteFileId, CreateFileRequest newFile) {
        this.description = description;
        this.deleteFileId = deleteFileId;
        this.newFile = newFile;
    }

}
