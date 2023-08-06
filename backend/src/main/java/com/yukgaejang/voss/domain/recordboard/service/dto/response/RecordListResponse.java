package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RecordListResponse {
    private Long id;
    private String description;
    private String nickname;
    private String email;
    private Long hits;
    private RecordFileDetailResponse audioFile;
    private boolean isLiked;
    private LocalDateTime createdAt;

    public RecordListResponse(Long id, String description, String nickname, String email, Long hits, RecordFileDetailResponse audioFile, boolean isLiked, LocalDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.nickname = nickname;
        this.email = email;
        this.hits = hits;
        this.audioFile = audioFile;
        this.isLiked = isLiked;
        this.createdAt = createdAt;
    }
}
