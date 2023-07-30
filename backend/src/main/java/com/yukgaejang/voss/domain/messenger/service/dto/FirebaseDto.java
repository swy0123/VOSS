package com.yukgaejang.voss.domain.messenger.service.dto;

import com.google.cloud.Timestamp;
import lombok.Data;

import java.util.Date;

@Data
public class FirebaseDto {
    private Long chatId;
    private Long memberId;
    private String content;
    private Timestamp timestamp;

    public FirebaseDto() {
    }

    public FirebaseDto(Long chatId, Long memberId, String content, Timestamp timestamp) {
        this.chatId = chatId;
        this.memberId = memberId;
        this.content = content;
        this.timestamp = timestamp;
    }
}
