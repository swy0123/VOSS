package com.yukgaejang.voss.domain.messenger.service.dto.response;

import lombok.Data;

@Data
public class CreateMessengerResponse {
    private String status;
    private Long chatId;
    private String sessionId;

    public CreateMessengerResponse(String status, Long chatId, String sessionId) {
        this.status = status;
        this.chatId = chatId;
        this.sessionId = sessionId;
    }
}
