package com.yukgaejang.voss.domain.messenger.service.dto;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class MongoDto {
    private Long chatId;
    private Long memberId;
    private String content;
    private LocalDateTime timestamp;

    public MongoDto() {
    }

    public MongoDto(Long chatId, Long memberId, String content, LocalDateTime timestamp) {
        this.chatId = chatId;
        this.memberId = memberId;
        this.content = content;
        this.timestamp = timestamp;
    }
}
