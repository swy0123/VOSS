package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostFile;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostFileDetailResponse {
    private Long id;
    private String originalFileName;
    private String savedFileName;
    private String contentType;
    private Long size;

    public PostFileDetailResponse(PostFile postFile) {
        this.id = postFile.getId();
        this.originalFileName = postFile.getOriginalFileName();
        this.savedFileName = postFile.getSavedFileName();
        this.contentType = postFile.getContentType();
        this.size = postFile.getSize();
    }
}
