package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RecordDetailResponse {
    private Long id;
    private String description;
    private String nickname;
    private String email;
    private Long hits;
    private RecordFileDetailResponse audioFile;
    private LocalDateTime createdAt;
    private boolean isLiked;

    public RecordDetailResponse(Long id, String description, String nickname, String email, Long hits, RecordFileDetailResponse audioFile, LocalDateTime createdAt, boolean isLiked) {
        this.id = id;
        this.description = description;
        this.nickname = nickname;
        this.email = email;
        this.hits = hits;
        this.audioFile = audioFile;
        this.createdAt = createdAt;
        this.isLiked = isLiked;
    }
}
