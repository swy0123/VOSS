package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class UpdatePostRequest {
    private String title;
    private String content;
    private List<Long> deleteFileIds;
    private List<CreateFileRequest> newFiles;

    @Builder
    public UpdatePostRequest(String title, String content, List<Long> deleteFileIds, List<CreateFileRequest> newFiles) {
        this.title = title;
        this.content = content;
        this.deleteFileIds = deleteFileIds;
        this.newFiles = newFiles;
    }
}
