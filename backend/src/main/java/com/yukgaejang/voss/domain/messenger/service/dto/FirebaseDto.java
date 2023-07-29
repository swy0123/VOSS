package com.yukgaejang.voss.domain.messenger.service.dto;

import lombok.Data;

@Data
public class FirebaseDto {
    private Long chatId;
    private Long memberId;
    private String content;

    public FirebaseDto(Long chatId, Long memberId, String content) {
        this.chatId = chatId;
        this.memberId = memberId;
        this.content = content;
    }
}
