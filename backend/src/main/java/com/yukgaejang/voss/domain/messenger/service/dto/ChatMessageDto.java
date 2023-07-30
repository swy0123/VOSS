package com.yukgaejang.voss.domain.messenger.service.dto;

import lombok.Data;

@Data
public class ChatMessageDto {
    private Long chatId;
    private String sessionId;
    private Long memberId; // sender
    private String content; // message
}
