package com.yukgaejang.voss.domain.messenger.service.dto;

import lombok.Data;

@Data
public class ChatMessageDto {
    private MessageType type;
    private String sessionId;
    private String memberId; // sender
    private String content; // message
}
